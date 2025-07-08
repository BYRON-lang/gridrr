import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <header className="bg-white">
      <div className="w-full px-0">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center pl-10">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-10 w-auto"
                src="/assets/logo.png"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="flex items-center pr-10 space-x-4">
            <button 
              onClick={handleLogin}
              className="border-2 border-black text-gray-700 hover:bg-gray-800 hover:text-white px-5 py-2 rounded-full text-sm font-medium transition-colors w-24 h-10"
            >
              Login
            </button>
            <button 
              onClick={handleGetStarted}
              className="bg-gray-800 text-white hover:bg-gray-900 hover:scale-105 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 w-32 h-10"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 