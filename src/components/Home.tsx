import React, { useState, useEffect } from 'react';
import FeatureCard from './FeatureCard';

interface HomeProps {
  onNavigateToParser?: () => void;
}

const Home: React.FC<HomeProps> = () => {
  const [showModal, setShowModal] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setBgLoaded(true);
    img.src = '/bg.png';
  }, []);
  return (
    <div className="min-h-screen text-white relative overflow-hidden" style={{ backgroundColor: '#131415' }}>
      {/* Background Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: bgLoaded ? 'url(/bg.png)' : 'none',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          opacity: bgLoaded ? 0.4 : 0
        }}
      ></div>


      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 pt-16">
        <div className="text-center max-w-4xl">
                           {/* Grammar-Based Tokenizer Label */}
                 <div className="inline-block px-3 py-1 mb-6" style={{ background: 'linear-gradient(135deg, rgba(20, 185, 132, 0.3), rgba(13, 148, 136, 0.3))' }}>
                   <p className="text-white text-sm font-light" style={{ fontFamily: 'DM Mono, monospace' }}>Grammar-Based Tokenizer</p>
                 </div>
          
          {/* ParseIt Title */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 italic" style={{ fontFamily: 'DM Mono, monospace' }}>
            <span style={{ color: '#14B984' }}>Parse</span><span className="text-white">It.</span>
          </h1>
          
          {/* Description */}
          <p className="text-white text-lg font-light mb-8 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'DM Mono, monospace' }}>
            ANALYZE ARITHMETIC EXPRESSIONS, CONFIRM VALIDITY, AND REVEAL THEIR<br />
            CONSTRUCTION ACCORDING TO CONTEXT-FREE GRAMMAR.
          </p>
          
                           {/* Init Parse Button */}
                 <button
                   onClick={() => setShowModal(true)}
                   className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
                   style={{ 
                     fontFamily: 'DM Mono, monospace',
                     boxShadow: '0 6px 12px rgba(20, 185, 132, 0.35)'
                   }}
                 >
                   Init Parse()
                 </button>
        </div>
      </main>

      {/* Feature Cards */}
      <section className="relative z-10 px-6 pb-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <FeatureCard
            imageSrc="/cfg.png"
            imageAlt="CFG-Based Tokenization"
            title="CFG-Based Tokenization"
            description="The input string is divided into tokens such as numbers, operators, and parentheses, with each token classified strictly according to the rules defined in the context-free grammar."
            animationDelay="0.2s"
          />
          
          <FeatureCard
            imageSrc="/validation.png"
            imageAlt="Syntactic Validation"
            title="Syntactic Validation"
            description="The generated tokens are checked against the grammar productions to ensure that the sequence forms a valid arithmetic expression and follows the correct syntactic structure."
            animationDelay="0.4s"
          />
          
          <FeatureCard
            imageSrc="/derivation.png"
            imageAlt="Derivation Output"
            title="Derivation Output"
            description="For valid inputs, the system produces a derivation that shows how the expression is derived from the start symbol."
            animationDelay="0.6s"
          />
        </div>
      </section>

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
    </div>
  );
};

export default Home;
