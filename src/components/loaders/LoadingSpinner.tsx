import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  overlay?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'large', 
  className = '', 
  overlay = false 
}) => {
  if (overlay) {
    return (
      <div className={`absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-inherit z-10 ${className}`}>
        <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (size === 'small') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 bg-white/40 backdrop-blur-sm z-50 flex items-center justify-center ${className}`}>
      <div className="w-12 h-12 border-4 border-teal-500 border-t-yellow-400 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner; 