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
      className="text-white relative overflow-hidden border animate-fade-in-up" 
      style={{ 
        backgroundColor: '#1a1a1a', 
        borderColor: '#666666',
        animationDelay: animationDelay
      }}
    >
      {/* Main Image */}
      <div className="w-full">
        <img src={imageSrc} alt={imageAlt} className="w-full h-auto" />
      </div>
      
      {/* Text Content */}
      <div className="p-3 md:p-8">
        {/* Title */}
        <h3 className="text-base md:text-xl font-bold mb-2 md:mb-4 text-center" style={{ color: '#14B984', fontFamily: 'DM Mono, monospace' }}>
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
