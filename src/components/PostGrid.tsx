import React from 'react';

interface PostGridProps {
  children: React.ReactNode;
  className?: string;
}

const PostGrid: React.FC<PostGridProps> = ({ children, className = '' }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px',
        padding: '20px 0', // No left and right padding
        width: '100%',
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default PostGrid; 