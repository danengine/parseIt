import React, { useState, useEffect } from 'react';

interface NavigationProps {
  currentView: 'home' | 'parser' | 'math-logic';
  onViewChange: (view: 'home' | 'parser' | 'math-logic') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'backdrop-blur-sm' : 'bg-transparent'
    } text-white p-6`} style={{ backgroundColor: isScrolled ? '#111212' : 'transparent' }}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="ParseIt Logo" className="w-8 h-8" />
        </div>
        
        <nav className="flex items-center space-x-12">
          <button 
            onClick={() => onViewChange('home')}
            className={`transition-colors relative ${
              currentView === 'home' 
                ? 'text-white font-semibold' 
                : 'text-white hover:text-teal-400'
            }`}
            style={{ fontFamily: 'DM Mono, monospace' }}
          >
            HOME
            {currentView === 'home' && (
              <div className="absolute -bottom-1 left-0 right-0 h-0.5" style={{ backgroundColor: '#14B984' }}></div>
            )}
          </button>
          <a href="#" className="text-white hover:text-teal-400 transition-colors" style={{ fontFamily: 'DM Mono, monospace' }}>HOW IT WORKS</a>
          <a href="#" className="text-white hover:text-teal-400 transition-colors" style={{ fontFamily: 'DM Mono, monospace' }}>CONTACT</a>
                          <button
                  onClick={() => setShowModal(true)}
                  className={`text-white px-6 py-2 transition-colors ${
                    currentView === 'parser' ? 'opacity-90' : ''
                  }`}
                  style={{ 
                    fontFamily: 'DM Mono, monospace',
                    backgroundColor: '#13B481'
                  }}
                >
                  PLAYGROUND
                </button>
        </nav>
      </div>

      {/* Under Construction Modal */}
      {showModal && (
        <div className="fixed flex items-center justify-center z-50" style={{ 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}>
          <div className="bg-gray-800 p-8 rounded-lg max-w-md mx-4 text-center border" style={{ borderColor: '#666666' }}>
            <h3 className="text-xl font-bold mb-4 text-white" style={{ fontFamily: 'DM Mono, monospace' }}>
              Under Construction
            </h3>
            <p className="text-gray-300 mb-6" style={{ fontFamily: 'DM Mono, monospace' }}>
              This feature is currently being developed. Please check back later!
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 text-white transition-colors"
              style={{ 
                fontFamily: 'DM Mono, monospace',
                backgroundColor: '#13B481'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
