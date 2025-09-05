export class Parser {
  private text: string;
  private pos: number = 0;

  constructor(text: string) {
    this.text = text.replace(/\s+/g, ""); // remove spaces
  }

  private peek(): string | null {
    return this.pos < this.text.length ? this.text[this.pos] : null;
  }

  private peekAhead(n: number = 1): string | null {
    return this.pos + n < this.text.length ? this.text[this.pos + n] : null;
  }

  private consume(expected?: string) {
    const current = this.peek();
    if (expected && current !== expected) {
      throw new SyntaxError(`Expected '${expected}' at position ${this.pos}, found '${current}'`);
    }
    this.pos++;
  }

  private consumeString(str: string) {
    for (let i = 0; i < str.length; i++) {
      this.consume(str[i]);
    }
  }

  // <logical_expr> ::= <biconditional>
  private logicalExpr() {
    this.biconditional();
  }

  // <biconditional> ::= <implication> | <implication> "↔" <biconditional>
  private biconditional() {
    this.implication();
    while (this.peek() === "↔" || (this.peek() === "=" && this.peekAhead() === "=")) {
      if (this.peek() === "↔") {
        this.consume("↔");
      } else {
        this.consumeString("==");
      }
      this.implication();
    }
  }

  // <implication> ::= <disjunction> | <disjunction> "→" <implication>
  private implication() {
    this.disjunction();
    while (this.peek() === "→" || (this.peek() === "-" && this.peekAhead() === ">")) {
      if (this.peek() === "→") {
        this.consume("→");
      } else {
        this.consumeString("->");
      }
      this.disjunction();
    }
  }

  // <disjunction> ::= <conjunction> | <disjunction> "∨" <conjunction>
  private disjunction() {
    this.conjunction();
    while (this.peek() === "∨" || this.peek() === "|" || this.peek() === "+") {
      this.consume();
      this.conjunction();
    }
  }

  // <conjunction> ::= <negation> | <conjunction> "∧" <negation>
  private conjunction() {
    this.negation();
    while (this.peek() === "∧" || this.peek() === "&" || this.peek() === "*") {
      this.consume();
      this.negation();
    }
  }

  // <negation> ::= "¬" <negation> | <primary>
  private negation() {
    if (this.peek() === "¬" || this.peek() === "~" || this.peek() === "!") {
      this.consume();
      this.negation();
    } else {
      this.primary();
    }
  }

  // <primary> ::= <variable> | "(" <logical_expr> ")" | <arithmetic_expr>
  private primary() {
    if (this.peek() === "(") {
      this.consume("(");
      this.logicalExpr();
      this.consume(")");
    } else if (this.isVariable()) {
      this.variable();
    } else if (this.isArithmeticStart()) {
      this.arithmeticExpr();
    } else {
      throw new SyntaxError(`Expected variable, arithmetic expression, or '(' at position ${this.pos}`);
    }
  }

  // Check if current position starts an arithmetic expression
  private isArithmeticStart(): boolean {
    const current = this.peek();
    return current !== null && /[0-9]/.test(current);
  }

  // Check if current position is a variable
  private isVariable(): boolean {
    const current = this.peek();
    return current !== null && /[a-zA-Z]/.test(current);
  }

  // <variable> ::= <letter> | <letter> <variable>
  private variable() {
    if (!this.peek() || !/[a-zA-Z]/.test(this.peek()!)) {
      throw new SyntaxError(`Expected variable at position ${this.pos}`);
    }
    while (this.peek() && /[a-zA-Z0-9]/.test(this.peek()!)) {
      this.consume();
    }
  }

  // <arithmetic_expr> ::= <term> | <arithmetic_expr> "+" <term> | <arithmetic_expr> "-" <term>
  private arithmeticExpr() {
    this.term();
    while (this.peek() === "+" || this.peek() === "-") {
      this.consume();
      this.term();
    }
  }

  // <term> ::= <factor> | <term> "*" <factor> | <term> "/" <factor>
  private term() {
    this.factor();
    while (this.peek() === "*" || this.peek() === "/") {
      this.consume();
      this.factor();
    }
  }

  // <factor> ::= <number> | "(" <arithmetic_expr> ")"
  private factor() {
    if (this.peek() === "(") {
      this.consume("(");
      this.arithmeticExpr();
      this.consume(")");
    } else {
      this.number();
    }
  }

  // <number> ::= <digit> | <digit> <number>
  private number() {
    if (!this.peek() || !/[0-9]/.test(this.peek()!)) {
      throw new SyntaxError(`Expected number at position ${this.pos}`);
    }
    while (this.peek() && /[0-9]/.test(this.peek()!)) {
      this.consume();
    }
  }

  public parse() {
    this.logicalExpr();
    if (this.peek() !== null) {
      throw new SyntaxError(
        `Unexpected character '${this.peek()}' at position ${this.pos}`
      );
    }
  }
}

// Utility function for syntax checking
export function checkSyntax(expression: string): { isValid: boolean; message: string } {
  try {
    const parser = new Parser(expression);
    parser.parse();
    return { isValid: true, message: "✅ Syntax Correct" };
  } catch (e: any) {
    return { isValid: false, message: `❌ Syntax Invalid: ${e.message}` };
  }
}
