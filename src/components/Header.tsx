import React, { useState, useRef, useEffect } from 'react';
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

  const exploreTags = [
    'Website Design',
    'Landing Pages',
    'Mobile Apps',
    'Dashboard Design',
    'Buttons',
    'Cards',
    'E-commerce',
    'SaaS',
    'Portfolio',
  ];
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
  // Remove useRef, useEffect, and click-outside logic for the dropdown.
  // Use onMouseEnter/onMouseLeave on the Explore dropdown div for desktop nav.
  // In the dropdown, add onClick={() => setExploreDropdownOpen(false)} to each Link.
  // For mobile, keep onClick toggle logic.

  return (
    <header className="bg-white w-full fixed top-0 left-0 z-50 border-b-0">
      <div className="w-full">
        {/* Mobile header */}
        <div className="flex md:hidden justify-between items-center h-14 px-2 sm:px-4 md:px-8">
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
        <div className="hidden md:flex flex-col md:flex-row justify-between items-center h-auto md:h-20 gap-4 md:gap-0 px-2 sm:px-4 md:px-8">
          <div className="flex flex-col sm:flex-row items-center w-full md:w-auto pl-0 md:pl-10 gap-2 md:gap-0">
            <Link to="/" className="flex-shrink-0 mb-2 md:mb-0">
              <img
                className="h-10 w-auto"
                src="/assets/logo.png"
                alt="Logo"
              />
            </Link>
            <nav className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8 ml-0 md:ml-8 w-full md:w-auto">
              <Link to="/inspiration" className="text-gray-700 hover:text-black hover:underline underline-offset-8 text-base font-medium transition-colors">Inspiration</Link>
              <div className="relative" onMouseEnter={() => setExploreDropdownOpen(true)} onMouseLeave={() => setExploreDropdownOpen(false)}>
                <button
                  className="text-gray-700 hover:text-black hover:underline underline-offset-8 text-base font-medium transition-colors flex items-center gap-1"
                  aria-haspopup="true"
                  aria-expanded={exploreDropdownOpen}
                  style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}
                >
                  Explore
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {exploreDropdownOpen && (
                  <div className="absolute left-0 top-full mt-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
                    <Link to="/trending" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Trending</Link>
                    <Link to="/newest" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Newest Posts</Link>
                    <div className="border-t my-2" />
                    {exploreTags.map(tag => (
                      <Link
                        key={tag}
                        to={`/explore/tag/${encodeURIComponent(tag)}`}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => setExploreDropdownOpen(false)}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
                <div className="relative" onMouseEnter={() => setExploreDropdownOpen(true)} onMouseLeave={() => setExploreDropdownOpen(false)}>
                  <button
                    className="text-gray-700 hover:text-black text-lg font-medium transition-colors flex items-center gap-1"
                    aria-haspopup="true"
                    aria-expanded={exploreDropdownOpen}
                    style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}
                  >
                    Explore
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {exploreDropdownOpen && (
                    <div className="absolute left-0 top-full mt-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
                      <Link to="/trending" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Trending</Link>
                      <Link to="/newest" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Newest Posts</Link>
                      <div className="border-t my-2" />
                      {exploreTags.map(tag => (
                        <Link
                          key={tag}
                          to={`/explore/tag/${encodeURIComponent(tag)}`}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          onClick={() => setExploreDropdownOpen(false)}
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
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