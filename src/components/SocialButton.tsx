import React from 'react';

interface SocialButtonProps {
  icon: React.ComponentType<any>;
  name: string;
  url: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, name, url }) => {
  return (
    <button
      className="flex items-center border border-gray-300 rounded-full px-4 py-2 mr-2 mb-2 hover:border-black transition-colors"
      onClick={() => window.open(url, '_blank')}
      type="button"
    >
      {React.createElement(icon, { size: 20, className: 'w-5 h-5 mr-2' })}
      <span className="text-base text-gray-700 font-medium">{name}</span>
    </button>
  );
};

export default SocialButton; 