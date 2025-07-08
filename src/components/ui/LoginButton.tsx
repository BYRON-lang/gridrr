import React from 'react';

interface LoginButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ 
  children, 
  onClick, 
  disabled = false,
  className = '' 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-transparent text-gray-800 border border-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default LoginButton; 