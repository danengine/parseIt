import React, { useState } from 'react';
import { checkSyntax } from '../Parser';

const Parser: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<{ isValid: boolean; message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setExpression(value);
    
    if (value.trim() === '') {
      setResult(null);
    } else {
      setResult(checkSyntax(value));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-teal-400 mb-4">Expression Syntax Checker</h1>
          <p className="text-gray-300 text-lg">
            Enter a mathematical or logical expression to check its syntax. Supports arithmetic (+, -, *, /), 
            logical operators (¬, ∧, ∨, →, ↔), variables, and parentheses.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-gray-800 rounded-xl p-8 mb-8">
          <div className="mb-6">
            <input
              type="text"
              value={expression}
              onChange={handleInputChange}
              placeholder="Enter expression (e.g., 1+2*3, p∧q, ¬(p∨q), p→q)"
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 text-lg font-mono"
            />
          </div>

          {result && (
            <div className={`p-4 rounded-lg text-center font-semibold ${
              result.isValid 
                ? 'bg-green-500/20 border border-green-500 text-green-400' 
                : 'bg-red-500/20 border border-red-500 text-red-400'
            }`}>
              {result.message}
            </div>
          )}
        </div>

        {/* Examples Section */}
        <div className="bg-gray-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-teal-400 mb-8 text-center">Example Expressions</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Arithmetic Expressions */}
            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-teal-400 mb-4 border-b border-gray-600 pb-2">
                Arithmetic Expressions
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <code className="bg-teal-400 text-gray-900 px-3 py-1 rounded text-sm font-mono">1+2*3</code>
                  <span className="text-green-400">Valid</span>
                </div>
                <div className="flex items-center space-x-3">
                  <code className="bg-teal-400 text-gray-900 px-3 py-1 rounded text-sm font-mono">(4+5)/6</code>
                  <span className="text-green-400">Valid</span>
                </div>
                <div className="flex items-center space-x-3">
                  <code className="bg-teal-400 text-gray-900 px-3 py-1 rounded text-sm font-mono">42</code>
                  <span className="text-green-400">Valid</span>
                </div>
                <div className="flex items-center space-x-3">
                  <code className="bg-teal-400 text-gray-900 px-3 py-1 rounded text-sm font-mono">7+8*</code>
                  <span className="text-red-400">Invalid</span>
                </div>
                <div className="flex items-center space-x-3">
                  <code className="bg-teal-400 text-gray-900 px-3 py-1 rounded text-sm font-mono">((3+2)</code>
                  <span className="text-red-400">Invalid</span>
                </div>
              </div>
            </div>

            {/* Logical Expressions */}
            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-teal-400 mb-4 border-b border-gray-600 pb-2">
                Logical Expressions
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <code className="bg-teal-400 text-gray-900 px-3 py-1 rounded text-sm font-mono">p∧q</code>
                  <span className="text-green-400">Valid</span>
                </div>
                <div className="flex items-center space-x-3">
                  <code className="bg-teal-400 text-gray-900 px-3 py-1 rounded text-sm font-mono">¬p</code>
                  <span className="text-green-400">Valid</span>
                </div>
                <div className="flex items-center space-x-3">
                  <code className="bg-teal-400 text-gray-900 px-3 py-1 rounded text-sm font-mono">p∨q</code>
                  <span className="text-green-400">Valid</span>
                </div>
                <div className="flex items-center space-x-3">
                  <code className="bg-teal-400 text-gray-900 px-3 py-1 rounded text-sm font-mono">p→q</code>
                  <span className="text-green-400">Valid</span>
                </div>
                <div className="flex items-center space-x-3">
                  <code className="bg-teal-400 text-gray-900 px-3 py-1 rounded text-sm font-mono">p↔q</code>
                  <span className="text-green-400">Valid</span>
                </div>
                <div className="flex items-center space-x-3">
                  <code className="bg-teal-400 text-gray-900 px-3 py-1 rounded text-sm font-mono">¬(p∧q)</code>
                  <span className="text-green-400">Valid</span>
                </div>
                <div className="flex items-center space-x-3">
                  <code className="bg-teal-400 text-gray-900 px-3 py-1 rounded text-sm font-mono">p∧</code>
                  <span className="text-red-400">Invalid</span>
                </div>
              </div>
            </div>

            {/* Alternative Notations */}
            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-teal-400 mb-4 border-b border-gray-600 pb-2">
                Alternative Notations
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <code className="bg-teal-400 text-gray-900 px-3 py-1 rounded text-sm font-mono">p&q</code>
                  <span className="text-green-400">Valid</span>
                </div>
                <div className="flex items-center space-x-3">
                  <code className="bg-teal-400 text-gray-900 px-3 py-1 rounded text-sm font-mono">p|q</code>
                  <span className="text-green-400">Valid</span>
                </div>
                <div className="flex items-center space-x-3">
                  <code className="bg-teal-400 text-gray-900 px-3 py-1 rounded text-sm font-mono">~p</code>
                  <span className="text-green-400">Valid</span>
                </div>
                <div className="flex items-center space-x-3">
                  <code className="bg-teal-400 text-gray-900 px-3 py-1 rounded text-sm font-mono">p-&gt;q</code>
                  <span className="text-green-400">Valid</span>
                </div>
                <div className="flex items-center space-x-3">
                  <code className="bg-teal-400 text-gray-900 px-3 py-1 rounded text-sm font-mono">p==q</code>
                  <span className="text-green-400">Valid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parser;
