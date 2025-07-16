import React from 'react';

interface RoundedCardProps {
  children?: React.ReactNode;
  className?: string;
  width?: string;
  height?: string;
  padding?: string;
}

const RoundedCard: React.FC<RoundedCardProps> = ({
  children,
  className = '',
  width = 'w-64',
  height = 'h-32',
  padding = 'p-4'
}) => {
  return (
    <div 
      className={`${width} ${height} ${padding} bg-gray-100 hover:bg-gray-200 dark:bg-[#222222] rounded-full transition-colors duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

export default RoundedCard; 