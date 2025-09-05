interface ParseNode {
  type: string;
  value: string;
  children: ParseNode[];
  position: number;
  precedence?: number;
  associativity?: 'left' | 'right';
}

export class Parser {
  private text: string;
  private pos: number = 0;
  private derivation: string[] = [];
  private parseTree: ParseNode | null = null;
  private currentInput: string = "";

  constructor(text: string) {
    this.text = text.replace(/\s+/g, ""); // remove spaces
    this.currentInput = this.text;
  }

  private peek(): string | null {
    return this.pos < this.text.length ? this.text[this.pos] : null;
  }

  private consume(expected?: string) {
    const current = this.peek();
    if (expected && current !== expected) {
      throw new SyntaxError(`Expected '${expected}' at position ${this.pos}, found '${current}'`);
    }
    this.pos++;
  }

  // <expr> ::= <union>
  private expr(): ParseNode {
    this.addDerivation("expr", "union", this.derivation.length);
    return this.union();
  }

  // <union> ::= <concat> | <union> "|" <concat>
  private union(): ParseNode {
    this.addDerivation("union", "concat | union | concat", this.derivation.length);
    
    let leftNode = this.concat();
    
    while (this.peek() === "|") {
      const operator = this.peek()!;
      this.consume();
      
      const rightNode = this.concat();
      
      leftNode = this.createParseNode(
        "union", 
        operator, 
        [leftNode, rightNode], 
        0.5, // lowest precedence for union
        'left'
      );
      
      this.addDerivation("union", `${leftNode.children[0].value} ${operator} ${rightNode.value}`, this.derivation.length);
    }
    
    return leftNode;
  }

  // <concat> ::= <arith> | <concat> <arith>
  private concat(): ParseNode {
    this.addDerivation("concat", "arith | concat arith", this.derivation.length);
    
    let leftNode = this.arith();
    
    // Allow concatenation for regex patterns: when next token is a character
    // This allows "ab", "ab*", "a(b)", etc. but prevents "a3", "3a"
    while (this.peek() && this.isChar(this.peek()!)) {
      const rightNode = this.arith();
      
      leftNode = this.createParseNode(
        "concat", 
        "", // implicit concatenation
        [leftNode, rightNode], 
        2.5, // precedence for concatenation
        'left'
      );
      
      this.addDerivation("concat", `${leftNode.children[0].value} ${rightNode.value}`, this.derivation.length);
    }
    
    return leftNode;
  }

  // <arith> ::= <term> | <arith> "+" <term> | <arith> "-" <term>
  private arith(): ParseNode {
    this.addDerivation("arith", "term | arith + term | arith - term", this.derivation.length);
    
    let leftNode = this.term();
    
    while (this.peek() === "+" || this.peek() === "-") {
      const operator = this.peek()!;
      this.consume();
      
      const rightNode = this.term();
      
      leftNode = this.createParseNode(
        "arith", 
        operator, 
        [leftNode, rightNode], 
        1, // precedence level 1
        'left'
      );
      
      this.addDerivation("arith", `${leftNode.children[0].value} ${operator} ${rightNode.value}`, this.derivation.length);
    }
    
    return leftNode;
  }

  // <term> ::= <factor> | <term> "*" <factor> | <term> "/" <factor>
  private term(): ParseNode {
    this.addDerivation("term", "factor | term * factor | term / factor", this.derivation.length);
    
    let leftNode = this.factor();
    
    while (this.peek() === "*" || this.peek() === "/") {
      const operator = this.peek()!;
      this.consume();
      
      const rightNode = this.factor();
      
      leftNode = this.createParseNode(
        "term", 
        operator, 
        [leftNode, rightNode], 
        2, // precedence level 2
        'left'
      );
      
      this.addDerivation("term", `${leftNode.children[0].value} ${operator} ${rightNode.value}`, this.derivation.length);
    }
    
    return leftNode;
  }

  // <factor> ::= <base> | <base> "*"
  private factor(): ParseNode {
    this.addDerivation("factor", "base | base *", this.derivation.length);
    
    const baseNode = this.base();
    
    if (this.peek() === "*") {
      this.consume();
      
      const repetitionNode = this.createParseNode(
        "factor", 
        "*", 
        [baseNode], 
        4, // highest precedence for Kleene star
        'right'
      );
      
      this.addDerivation("factor", `${baseNode.value} *`, this.derivation.length);
      return repetitionNode;
    }
    
    return baseNode;
  }

  // <base> ::= <number> | <char> | "(" <expr> ")"
  private base(): ParseNode {
    this.addDerivation("base", "number | char | ( expr )", this.derivation.length);
    
    if (this.peek() === "(") {
      this.consume("(");
      this.addDerivation("base", "( expr )", this.derivation.length);
      
      const exprNode = this.expr();
      
      this.consume(")");
      
      return this.createParseNode("base", "()", [exprNode], 3, 'left');
    } else if (this.isDigit(this.peek()!)) {
      return this.number();
    } else if (this.isChar(this.peek()!)) {
      return this.char();
    } else {
      throw new SyntaxError(`Expected number, character, or '(' at position ${this.pos}`);
    }
  }

  // <number> ::= <digit> | <digit> <number> | <digit> "." <number>
  private number(): ParseNode {
    this.addDerivation("number", "digit | digit number | digit . number", this.derivation.length);
    
    if (!this.peek() || !this.isDigit(this.peek()!)) {
      throw new SyntaxError(`Expected number at position ${this.pos}`);
    }
    
    let value = "";
    
    // Parse integer part
    while (this.peek() && this.isDigit(this.peek()!)) {
      value += this.peek();
      this.consume();
    }
    
    // Parse decimal part if present
    if (this.peek() === ".") {
      value += ".";
      this.consume();
      
      while (this.peek() && this.isDigit(this.peek()!)) {
        value += this.peek();
        this.consume();
      }
    }
    
    this.addDerivation("number", value, this.derivation.length);
    
    return this.createParseNode("number", value, [], 0, 'left');
  }

  // <char> ::= "a" | "b" | "c" | ... | "z"
  private char(): ParseNode {
    this.addDerivation("char", "a | b | c | ... | z", this.derivation.length);
    
    if (!this.peek() || !this.isChar(this.peek()!)) {
      throw new SyntaxError(`Expected character at position ${this.pos}`);
    }
    
    const value = this.peek()!;
    this.consume();
    
    this.addDerivation("char", value, this.derivation.length);
    
    return this.createParseNode("char", value, [], 0, 'left');
  }

  private isDigit(char: string): boolean {
    return /[0-9]/.test(char);
  }

  private isChar(char: string): boolean {
    return /[a-z]/.test(char);
  }

  private addDerivation(rule: string, input: string, step: number = 0) {
    const currentInput = this.currentInput.substring(this.pos);
    this.derivation.push(`${step + 1}. ${rule} → ${input} (remaining: "${currentInput}")`);
  }

  private createParseNode(type: string, value: string, children: ParseNode[] = [], precedence?: number, associativity?: 'left' | 'right'): ParseNode {
    return {
      type,
      value,
      children,
      position: this.pos,
      precedence,
      associativity
    };
  }

  public getDerivation(): string[] {
    return [...this.derivation];
  }

  public getParseTree(): ParseNode | null {
    return this.parseTree;
  }

  public parse(): { derivation: string[]; parseTree: ParseNode } {
    this.derivation = [];
    
    this.addDerivation("start", this.text, 0);
    this.addDerivation("expr", this.text, 1);
    
    const exprTree = this.expr();
    
    if (this.peek() !== null) {
      throw new SyntaxError(
        `Unexpected character '${this.peek()}' at position ${this.pos}`
      );
    }
    
    // Create a start node as the root
    this.parseTree = this.createParseNode("start", this.text, [exprTree], undefined, 'left');
    
    return {
      derivation: this.getDerivation(),
      parseTree: this.parseTree
    };
  }
}

// Utility function for syntax checking
export function checkSyntax(expression: string): { 
  isValid: boolean; 
  message: string; 
  derivation?: string[];
  parseTree?: ParseNode;
} {
  try {
    const parser = new Parser(expression);
    const result = parser.parse();
    return { 
      isValid: true, 
      message: "✅ Syntax Correct", 
      derivation: result.derivation,
      parseTree: result.parseTree
    };
  } catch (e: any) {
    return { isValid: false, message: `❌ Syntax Invalid: ${e.message}` };
  }
}