import React, { useEffect, useState } from "react";

const NotFound: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Staggered animations
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen text-white pt-20 md:pt-32 pb-20 px-4 md:px-6 relative" style={{ backgroundColor: "#131415" }}>
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url(/bg.png)",
          backgroundSize: "auto",
          backgroundPosition: "center top",
          backgroundRepeat: "repeat"
        }}
      ></div>
      
      <div className="max-w-4xl mx-auto relative z-10 px-2 md:px-0">
        {/* Header */}
        <div 
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 
            className="text-6xl sm:text-8xl md:text-9xl font-bold mb-4 text-red-500"
            style={{ fontFamily: "DM Mono, monospace" }}
          >
            404
          </h1>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "DM Mono, monospace" }}
          >
            PAGE NOT FOUND
          </h2>
          <p 
            className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-4 md:px-0 mb-8"
            style={{ fontFamily: "DM Mono, monospace" }}
          >
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to parsing expressions!
          </p>
        </div>

        {/* Error Details */}
        <div 
          className={`bg-gray-800 rounded-lg p-6 md:p-8 mb-8 border border-gray-600 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          <div className="text-center">
            <div 
              className="text-red-400 text-lg md:text-xl font-semibold mb-4"
              style={{ fontFamily: "DM Mono, monospace" }}
            >
              ERROR 404: NOT FOUND
            </div>
            <div 
              className="text-gray-300 text-sm md:text-base mb-6"
              style={{ fontFamily: "DM Mono, monospace" }}
            >
              The requested resource could not be found on this server.
            </div>
            
            {/* Possible Causes */}
            <div className="text-left max-w-md mx-auto">
              <div 
                className="text-teal-400 text-sm font-semibold mb-3"
                style={{ fontFamily: "DM Mono, monospace" }}
              >
                Possible causes:
              </div>
              <ul className="text-gray-300 text-sm space-y-2" style={{ fontFamily: "DM Mono, monospace" }}>
                <li>• Typo in the URL</li>
                <li>• Page has been moved or deleted</li>
                <li>• Link is broken or outdated</li>
                <li>• You don't have permission to access this page</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
