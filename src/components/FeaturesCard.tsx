import React from 'react';

const FeaturesCard: React.FC = () => {
  return (
    <div className="w-full bg-gray-100 dark:bg-[#222222] rounded-lg p-3 my-4">
      <div className="text-left">
        <p className="text-base font-semibold text-gray-800 dark:text-gray-100">
          Exciting new features launching soon
        </p>
      </div>
    </div>
  );
};

export default FeaturesCard; 