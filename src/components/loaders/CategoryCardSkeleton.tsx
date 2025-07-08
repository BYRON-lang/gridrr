import React from 'react';

const CategoryCardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div
        className="bg-gray-200 rounded-lg w-[400px] h-[300px] mb-4"
      />
      <div className="flex items-center gap-3 mt-4">
        <div className="bg-gray-200 h-5 w-32 rounded" />
        <div className="bg-gray-200 h-4 w-16 rounded" />
      </div>
    </div>
  );
};

export default CategoryCardSkeleton; 