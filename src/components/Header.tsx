import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleLogin = () => {
    navigate('/login');
    setMenuOpen(false);
  };

  const handleGetStarted = () => {
    navigate('/signup');
    setMenuOpen(false);
  };

  const handleDiscover = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/discover');
    }
    setMenuOpen(false);
  };

  return (
    <header className="bg-white w-full">
      <div className="w-full px-2 sm:px-4 md:px-8">
        {/* Mobile header */}
        <div className="flex md:hidden justify-between items-center h-20">
          <Link to="/" className="flex-shrink-0">
            <img
              className="h-8 w-auto"
              src="/assets/logo1.png"
              alt="Logo"
            />
          </Link>
          <button
            className="p-2 rounded focus:outline-none"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            {/* Hamburger icon */}
            <svg className="h-7 w-7 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Desktop header */}
        <div className="hidden md:flex flex-col md:flex-row justify-between items-center h-auto md:h-28 gap-4 md:gap-0">
          <div className="flex flex-col sm:flex-row items-center w-full md:w-auto pl-0 md:pl-10 gap-2 md:gap-0">
            <Link to="/" className="flex-shrink-0 mb-2 md:mb-0">
              <img
                className="h-8 w-auto"
                src="/assets/logo1.png"
                alt="Logo"
              />
            </Link>
            <nav className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8 ml-0 md:ml-8 w-full md:w-auto">
              <Link to="/inspiration" className="text-gray-700 hover:text-black hover:underline underline-offset-8 text-base font-medium transition-colors">Inspiration</Link>
              <a href="/discover" onClick={handleDiscover} className="text-gray-700 hover:text-black hover:underline underline-offset-8 text-base font-medium transition-colors">Discover</a>
              <Link to="/resources" className="text-gray-700 hover:text-black hover:underline underline-offset-8 text-base font-medium transition-colors">Resources</Link>
            </nav>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 pr-0 md:pr-10 w-full md:w-auto">
            <button 
              onClick={handleLogin}
              className="bg-transparent text-gray-800 hover:underline px-5 py-2 text-lg font-semibold transition-colors w-full sm:w-auto h-auto border-none shadow-none"
            >
              Login
            </button>
            <button 
              onClick={handleGetStarted}
              className="bg-transparent text-gray-800 hover:underline px-5 py-2 text-lg font-semibold transition-colors w-full sm:w-auto h-auto border-none shadow-none flex items-center gap-2"
            >
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right h-6 w-6"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
            </button>
          </div>
        </div>
        {/* Mobile menu modal */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" onClick={() => setMenuOpen(false)} />
            {/* Side modal */}
            <div className="ml-auto w-4/5 max-w-xs bg-white h-full shadow-lg p-6 flex flex-col animate-slide-in-right">
              <button
                className="self-end mb-6 p-2 rounded focus:outline-none"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                {/* Close icon */}
                <svg className="h-7 w-7 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <nav className="flex flex-col space-y-6 mb-8">
                <Link to="/inspiration" className="text-gray-700 hover:text-black text-lg font-medium transition-colors" onClick={() => setMenuOpen(false)}>Inspiration</Link>
                <a href="/discover" onClick={handleDiscover} className="text-gray-700 hover:text-black text-lg font-medium transition-colors">Discover</a>
                <Link to="/resources" className="text-gray-700 hover:text-black text-lg font-medium transition-colors" onClick={() => setMenuOpen(false)}>Resources</Link>
              </nav>
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={handleLogin}
                  className="bg-transparent text-gray-800 hover:underline px-5 py-2 text-lg font-semibold transition-colors border-none shadow-none text-left"
                >
                  Login
                </button>
                <button 
                  onClick={handleGetStarted}
                  className="bg-transparent text-gray-800 hover:underline px-5 py-2 text-lg font-semibold transition-colors border-none shadow-none flex items-center gap-2 text-left"
                >
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right h-6 w-6"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Slide-in animation */}
      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </header>
  );
};

export default Header; 