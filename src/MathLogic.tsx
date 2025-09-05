import { useState } from 'react';
import './MathLogic.css';

interface TruthTableRow {
  p: boolean;
  q: boolean;
  result: boolean;
  operation: string;
}

interface EquivalenceExample {
  name: string;
  left: string;
  right: string;
  description: string;
  valid: boolean;
}

export default function MathLogic() {
  const [selectedTopic, setSelectedTopic] = useState<string>('equivalences');
  const [showTruthTable, setShowTruthTable] = useState<string>('');

  // Loss of Equivalences Examples
  const equivalenceExamples: EquivalenceExample[] = [
    {
      name: "De Morgan's Laws",
      left: "¬(p ∧ q)",
      right: "¬p ∨ ¬q",
      description: "Negation of conjunction equals disjunction of negations",
      valid: true
    },
    {
      name: "Distributive Law",
      left: "p ∧ (q ∨ r)",
      right: "(p ∧ q) ∨ (p ∧ r)",
      description: "Conjunction distributes over disjunction",
      valid: true
    },
    {
      name: "Associative Law (Conjunction)",
      left: "(p ∧ q) ∧ r",
      right: "p ∧ (q ∧ r)",
      description: "Conjunction is associative",
      valid: true
    },
    {
      name: "Commutative Law",
      left: "p ∧ q",
      right: "q ∧ p",
      description: "Conjunction is commutative",
      valid: true
    },
    {
      name: "Identity Law",
      left: "p ∧ T",
      right: "p",
      description: "Conjunction with truth is identity",
      valid: true
    },
    {
      name: "Absorption Law",
      left: "p ∧ (p ∨ q)",
      right: "p",
      description: "Conjunction absorbs disjunction",
      valid: true
    },
    {
      name: "Double Negation",
      left: "¬¬p",
      right: "p",
      description: "Double negation elimination",
      valid: true
    },
    {
      name: "Contradiction",
      left: "p ∧ ¬p",
      right: "F",
      description: "Contradiction always false",
      valid: true
    },
    {
      name: "Tautology",
      left: "p ∨ ¬p",
      right: "T",
      description: "Law of excluded middle",
      valid: true
    },
    {
      name: "Implication Equivalence",
      left: "p → q",
      right: "¬p ∨ q",
      description: "Implication as disjunction",
      valid: true
    },
    {
      name: "Biconditional Equivalence",
      left: "p ↔ q",
      right: "(p → q) ∧ (q → p)",
      description: "Biconditional as mutual implication",
      valid: true
    }
  ];

  // Loss of Equivalences - Common Mistakes
  const invalidEquivalences: EquivalenceExample[] = [
    {
      name: "Invalid Distribution",
      left: "p ∨ (q ∧ r)",
      right: "(p ∨ q) ∧ (p ∨ r)",
      description: "Disjunction does NOT distribute over conjunction",
      valid: false
    },
    {
      name: "Invalid Negation",
      left: "¬(p ∨ q)",
      right: "¬p ∧ ¬q",
      description: "This is actually CORRECT (De Morgan's), but often confused",
      valid: true
    },
    {
      name: "Invalid Implication",
      left: "p → q",
      right: "q → p",
      description: "Implication is NOT commutative",
      valid: false
    },
    {
      name: "Invalid Absorption",
      left: "p ∨ (p ∧ q)",
      right: "p",
      description: "This is actually CORRECT, but often forgotten",
      valid: true
    }
  ];

  // Generate Truth Table
  const generateTruthTable = (operation: string): TruthTableRow[] => {
    const rows: TruthTableRow[] = [];
    const combinations = [
      { p: true, q: true },
      { p: true, q: false },
      { p: false, q: true },
      { p: false, q: false }
    ];

    combinations.forEach(({ p, q }) => {
      let result: boolean;
      switch (operation) {
        case 'and':
          result = p && q;
          break;
        case 'or':
          result = p || q;
          break;
        case 'xor':
          result = p !== q;
          break;
        case 'implication':
          result = !p || q;
          break;
        case 'biconditional':
          result = p === q;
          break;
        case 'nand':
          result = !(p && q);
          break;
        case 'nor':
          result = !(p || q);
          break;
        default:
          result = false;
      }
      rows.push({ p, q, result, operation });
    });
    return rows;
  };

  const renderTruthTable = (operation: string) => {
    const rows = generateTruthTable(operation);
    const operationNames: { [key: string]: string } = {
      'and': 'Conjunction (∧)',
      'or': 'Disjunction (∨)',
      'xor': 'Exclusive OR (⊕)',
      'implication': 'Implication (→)',
      'biconditional': 'Biconditional (↔)',
      'nand': 'NAND (↑)',
      'nor': 'NOR (↓)'
    };

    return (
      <div className="truth-table-container">
        <h4>{operationNames[operation]}</h4>
        <table className="truth-table">
          <thead>
            <tr>
              <th>p</th>
              <th>q</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.p ? 'T' : 'F'}</td>
                <td>{row.q ? 'T' : 'F'}</td>
                <td className={row.result ? 'true' : 'false'}>
                  {row.result ? 'T' : 'F'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="math-logic-container">
      <div className="header">
        <h1>Mathematical Logic Deep Dive</h1>
        <p className="subtitle">Exploring Equivalences, Truth Tables, and Logical Fallacies</p>
      </div>

      <div className="navigation">
        <button 
          className={selectedTopic === 'equivalences' ? 'active' : ''}
          onClick={() => setSelectedTopic('equivalences')}
        >
          Logical Equivalences
        </button>
        <button 
          className={selectedTopic === 'truth-tables' ? 'active' : ''}
          onClick={() => setSelectedTopic('truth-tables')}
        >
          Truth Tables
        </button>
        <button 
          className={selectedTopic === 'fallacies' ? 'active' : ''}
          onClick={() => setSelectedTopic('fallacies')}
        >
          Common Fallacies
        </button>
        <button 
          className={selectedTopic === 'loss-equivalences' ? 'active' : ''}
          onClick={() => setSelectedTopic('loss-equivalences')}
        >
          Loss of Equivalences
        </button>
      </div>

      <div className="content">
        {selectedTopic === 'equivalences' && (
          <div className="equivalences-section">
            <h2>Fundamental Logical Equivalences</h2>
            <p className="intro">
              These are the building blocks of logical reasoning. Understanding these equivalences 
              is crucial for mathematical proofs and logical analysis.
            </p>
            
            <div className="equivalence-grid">
              {equivalenceExamples.map((example, index) => (
                <div key={index} className={`equivalence-card ${example.valid ? 'valid' : 'invalid'}`}>
                  <h3>{example.name}</h3>
                  <div className="equivalence-formula">
                    <span className="left">{example.left}</span>
                    <span className="equiv-symbol">≡</span>
                    <span className="right">{example.right}</span>
                  </div>
                  <p className="description">{example.description}</p>
                  <div className={`status ${example.valid ? 'valid' : 'invalid'}`}>
                    {example.valid ? '✅ Valid' : '❌ Invalid'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTopic === 'truth-tables' && (
          <div className="truth-tables-section">
            <h2>Truth Tables for Logical Operations</h2>
            <p className="intro">
              Truth tables show all possible combinations of truth values for logical operations.
              Click on an operation to see its truth table.
            </p>
            
            <div className="operation-buttons">
              {['and', 'or', 'xor', 'implication', 'biconditional', 'nand', 'nor'].map(op => (
                <button 
                  key={op}
                  className={`op-btn ${showTruthTable === op ? 'active' : ''}`}
                  onClick={() => setShowTruthTable(showTruthTable === op ? '' : op)}
                >
                  {op.charAt(0).toUpperCase() + op.slice(1)}
                </button>
              ))}
            </div>

            {showTruthTable && renderTruthTable(showTruthTable)}
          </div>
        )}

        {selectedTopic === 'fallacies' && (
          <div className="fallacies-section">
            <h2>Common Logical Fallacies</h2>
            <p className="intro">
              These are mistakes in reasoning that can lead to invalid conclusions.
            </p>
            
            <div className="fallacy-grid">
              <div className="fallacy-card">
                <h3>Affirming the Consequent</h3>
                <div className="fallacy-example">
                  <p><strong>Pattern:</strong> If P then Q. Q. Therefore P.</p>
                  <p><strong>Example:</strong> If it's raining, the ground is wet. The ground is wet. Therefore it's raining.</p>
                  <p><strong>Why it's wrong:</strong> The ground could be wet for other reasons (sprinklers, etc.)</p>
                </div>
              </div>

              <div className="fallacy-card">
                <h3>Denying the Antecedent</h3>
                <div className="fallacy-example">
                  <p><strong>Pattern:</strong> If P then Q. Not P. Therefore not Q.</p>
                  <p><strong>Example:</strong> If I study hard, I'll pass. I didn't study hard. Therefore I won't pass.</p>
                  <p><strong>Why it's wrong:</strong> You might pass for other reasons (easy test, etc.)</p>
                </div>
              </div>

              <div className="fallacy-card">
                <h3>False Dilemma</h3>
                <div className="fallacy-example">
                  <p><strong>Pattern:</strong> Either P or Q. Not P. Therefore Q.</p>
                  <p><strong>Example:</strong> Either you're with us or against us.</p>
                  <p><strong>Why it's wrong:</strong> There might be other options (neutral, conditional support, etc.)</p>
                </div>
              </div>

              <div className="fallacy-card">
                <h3>Circular Reasoning</h3>
                <div className="fallacy-example">
                  <p><strong>Pattern:</strong> P because P.</p>
                  <p><strong>Example:</strong> The Bible is true because it says so.</p>
                  <p><strong>Why it's wrong:</strong> Uses the conclusion to support itself</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTopic === 'loss-equivalences' && (
          <div className="loss-equivalences-section">
            <h2>Loss of Equivalences</h2>
            <p className="intro">
              This section explores what happens when logical equivalences break down,
              common misconceptions, and the consequences of invalid logical reasoning.
            </p>

            <div className="loss-section">
              <h3>What is "Loss of Equivalences"?</h3>
              <p>
                Loss of equivalences occurs when logical statements that appear similar 
                or related are treated as equivalent when they are not. This can lead to 
                invalid conclusions and flawed reasoning.
              </p>
            </div>

            <div className="invalid-equivalences">
              <h3>Common Invalid Equivalences</h3>
              <div className="equivalence-grid">
                {invalidEquivalences.map((example, index) => (
                  <div key={index} className={`equivalence-card ${example.valid ? 'valid' : 'invalid'}`}>
                    <h4>{example.name}</h4>
                    <div className="equivalence-formula">
                      <span className="left">{example.left}</span>
                      <span className="equiv-symbol">≠</span>
                      <span className="right">{example.right}</span>
                    </div>
                    <p className="description">{example.description}</p>
                    <div className={`status ${example.valid ? 'valid' : 'invalid'}`}>
                      {example.valid ? '✅ Actually Valid' : '❌ Invalid'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="consequences-section">
              <h3>Consequences of Loss of Equivalences</h3>
              <div className="consequence-grid">
                <div className="consequence-card">
                  <h4>In Mathematical Proofs</h4>
                  <ul>
                    <li>Invalid proof steps</li>
                    <li>False theorems</li>
                    <li>Contradictory results</li>
                    <li>Loss of mathematical rigor</li>
                  </ul>
                </div>

                <div className="consequence-card">
                  <h4>In Computer Science</h4>
                  <ul>
                    <li>Logic errors in programs</li>
                    <li>Incorrect algorithm implementations</li>
                    <li>Database query mistakes</li>
                    <li>Formal verification failures</li>
                  </ul>
                </div>

                <div className="consequence-card">
                  <h4>In Philosophy</h4>
                  <ul>
                    <li>Invalid arguments</li>
                    <li>False conclusions</li>
                    <li>Logical inconsistencies</li>
                    <li>Misunderstanding of concepts</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="prevention-section">
              <h3>How to Prevent Loss of Equivalences</h3>
              <div className="prevention-tips">
                <div className="tip">
                  <h4>1. Verify Each Step</h4>
                  <p>Always check if each logical step is actually valid, not just plausible.</p>
                </div>
                <div className="tip">
                  <h4>2. Use Truth Tables</h4>
                  <p>Construct truth tables to verify equivalences, especially for complex expressions.</p>
                </div>
                <div className="tip">
                  <h4>3. Know the Rules</h4>
                  <p>Memorize and understand the fundamental logical equivalences and their limitations.</p>
                </div>
                <div className="tip">
                  <h4>4. Question Assumptions</h4>
                  <p>Always question whether your assumptions about equivalence are actually valid.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
