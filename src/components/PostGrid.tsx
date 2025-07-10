import React from 'react';

interface PostGridProps {
  children: React.ReactNode;
  className?: string;
}

const PostGrid: React.FC<PostGridProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default PostGrid; 