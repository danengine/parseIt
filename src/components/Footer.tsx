import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-6 mt-0">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/logo.svg" alt="ParseIt Logo" className="w-8 h-8" />
              <h3 
                className="text-white text-xl font-bold"
                style={{ fontFamily: "DM Mono, monospace" }}
              >
                ParseIt
              </h3>
            </div>
            <p 
              className="text-gray-300 text-sm leading-relaxed max-w-md"
              style={{ fontFamily: "DM Mono, monospace" }}
            >
              ANALYZE ARITHMETIC EXPRESSIONS AND REGEX PATTERNS, CONFIRM VALIDITY, AND REVEAL THEIR CONSTRUCTION ACCORDING TO CONTEXT-FREE GRAMMAR.
            </p>
          </div>

          {/* GitHub Section */}
          <div className="flex flex-col items-start lg:items-end">
            <h4 
              className="text-white text-sm font-semibold mb-3"
              style={{ fontFamily: "DM Mono, monospace" }}
            >
              SOURCE CODE
            </h4>
            <a
              href="https://github.com/danengine/parseIt-CS121"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-teal-400 transition-colors group"
            >
              <svg 
                className="w-5 h-5 group-hover:scale-110 transition-transform" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span 
                className="text-sm"
                style={{ fontFamily: "DM Mono, monospace" }}
              >
                View on GitHub
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-gray-500 text-xs">
              <span style={{ fontFamily: "DM Mono, monospace" }}>
                © 2025 ParseIt. All rights reserved.
              </span>
            </div>
            <div className="text-gray-600 text-xs">
              <span style={{ fontFamily: "DM Mono, monospace" }}>
                Built with Love
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
