import React from 'react';

interface StackedImagesProps {
  images: string[];
  maxVisible?: number;
  className?: string;
}

const StackedImages: React.FC<StackedImagesProps> = ({ 
  images, 
  maxVisible = 3, 
  className = '' 
}) => {
  const visibleImages = images.slice(0, maxVisible);
  const remainingCount = images.length - maxVisible;

  return (
    <div className={`flex items-center ${className}`}>
      {visibleImages.map((image, index) => (
        <div
          key={index}
          className="relative"
          style={{ zIndex: visibleImages.length - index }}
        >
          <img
            src={image}
            alt={`Stacked image ${index + 1}`}
            className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
            style={{ marginLeft: index > 0 ? '-8px' : '0' }}
          />
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-gray-200 text-xs font-medium text-gray-600 shadow-sm"
          style={{ marginLeft: '-8px', zIndex: 0 }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default StackedImages; 