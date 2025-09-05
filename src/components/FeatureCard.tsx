import React from 'react';

interface FeatureCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  animationDelay: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  animationDelay
}) => {
  return (
    <div 
      className="text-white relative overflow-hidden border animate-fade-in-up transition-all duration-300 ease-in-out hover:scale-105 hover:border-green-400 hover:bg-gray-800 cursor-pointer" 
      style={{ 
        backgroundColor: '#1a1a1a', 
        borderColor: '#666666',
        animationDelay: animationDelay,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(20, 185, 132, 0.4), 0 0 20px rgba(20, 185, 132, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
      }}
    >
      {/* Main Image */}
      <div className="w-full">
        <img src={imageSrc} alt={imageAlt} className="w-full h-auto" />
      </div>
      
      {/* Text Content */}
      <div className="p-3 md:p-8">
        {/* Title */}
        <h3 className="text-base md:text-xl font-bold mb-2 md:mb-4 text-center transition-colors duration-300 hover:text-green-300" style={{ color: '#14B984', fontFamily: 'DM Mono, monospace' }}>
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-white text-xs md:text-sm leading-relaxed text-center" style={{ fontFamily: 'DM Mono, monospace' }}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
