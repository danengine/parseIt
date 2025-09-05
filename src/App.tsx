import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import Navigation from './components/Navigation'
import Home from './components/Home'
import Parser from './components/Parser'
import MathLogic from './MathLogic'

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'parser' | 'math-logic'>('home');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <Home onNavigateToParser={() => setCurrentView('parser')} />;
      case 'parser':
        return <Parser />;
      case 'math-logic':
        return <MathLogic />;
      default:
        return <Home onNavigateToParser={() => setCurrentView('parser')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation currentView={currentView} />
      {renderCurrentView()}
    </div>
  )
}

export default App
