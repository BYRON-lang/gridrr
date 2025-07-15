import React from 'react';

const LoadingSpinner: React.FC<{ overlay?: boolean }> = ({ overlay = false }) => (
  <div className={`flex items-center justify-center w-full h-full ${overlay ? 'fixed inset-0 bg-white/60 z-50' : 'min-h-[200px]'}`} data-testid="bouncing-circles-loader">
    <div className="flex space-x-3">
      <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
      <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
      <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
    </div>
  </div>
);

export default LoadingSpinner; 