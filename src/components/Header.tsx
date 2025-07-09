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
    <header className="bg-white mt-4">
      <div className="w-full px-0">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center pl-10">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="/assets/logo1.png"
                alt="Logo"
              />
            </Link>
            <nav className="flex items-center space-x-8 ml-8">
              <Link to="/inspiration" className="text-gray-700 hover:text-black hover:underline underline-offset-8 text-base font-medium transition-colors">Inspiration</Link>
              <Link to="/discover" className="text-gray-700 hover:text-black hover:underline underline-offset-8 text-base font-medium transition-colors">Discover</Link>
              <Link to="/resources" className="text-gray-700 hover:text-black hover:underline underline-offset-8 text-base font-medium transition-colors">Resources</Link>
            </nav>
          </div>
          <div className="flex items-center pr-10 space-x-4">
            <button 
              onClick={handleLogin}
              className="bg-transparent text-gray-800 hover:underline px-5 py-2 text-lg font-semibold transition-colors w-auto h-auto border-none shadow-none"
            >
              Login
            </button>
            <button 
              onClick={handleGetStarted}
              className="bg-transparent text-gray-800 hover:underline px-5 py-2 text-lg font-semibold transition-colors w-auto h-auto border-none shadow-none flex items-center gap-2"
            >
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right h-6 w-6"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 