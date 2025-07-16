import React from 'react';
import { Link } from 'react-router-dom';

const footerTabs = [
  { label: 'About', href: '/about' },
  { label: 'Ads', href: '/ads' },
  { label: 'Resources', href: '/resources' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Support', href: '/support' },
];

const Footer: React.FC = () => {
  return (
    <div>
      {/* Mobile: blank page with centered logo and tabs */}
      <div className="block sm:hidden min-h-[80px] w-full bg-transparent flex flex-col items-center justify-start pt-2">
        <img
          src="/assets/logo.png"
          alt="Gridrr Logo"
          className="h-10 w-auto object-contain mb-2 dark:hidden"
          style={{ minWidth: 60 }}
        />
        <img
          src="/assets/logo-white.png"
          alt="Gridrr Logo"
          className="h-10 w-auto object-contain mb-2 hidden dark:inline"
          style={{ minWidth: 60 }}
        />
        <nav className="flex flex-wrap justify-center gap-4 w-full px-2">
          {footerTabs.map(tab => (
            (tab.label === 'About' || tab.label === 'Ads' || tab.label === 'Resources' || tab.label === 'Careers') ? (
              <Link
                key={tab.label}
                to={tab.href}
                className="text-gray-700 dark:text-gray-200 font-medium text-sm hover:text-blue-500 transition-colors duration-200"
              >
                {tab.label}
              </Link>
            ) : (
              <a
                key={tab.label}
                href={tab.href}
                className="text-gray-700 dark:text-gray-200 font-medium text-sm hover:text-blue-500 transition-colors duration-200"
              >
                {tab.label}
              </a>
            )
          ))}
        </nav>
        <div className="flex gap-6 justify-center mt-3 mb-2">
          <a href="https://facebook.com/gridrrofficial" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white font-medium text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">Facebook</a>
          <a href="https://x.com/gridrrofficial" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white font-medium text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">Twitter/X</a>
          <a href="https://www.instagram.com/gridrrofficial/" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white font-medium text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">Instagram</a>
        </div>
        {/* Copyright and privacy links below with gap */}
        <div className="mt-4 flex flex-col items-center w-full">
          <span className="text-gray-400 dark:text-gray-300 font-poppins font-normal text-xs mb-2">© {new Date().getFullYear()} Gridrr. All rights reserved.</span>
          <div className="flex flex-wrap justify-center gap-4 w-full px-2">
            <Link to="/terms" className="text-gray-400 dark:text-gray-300 font-poppins font-normal text-xs hover:text-blue-500 transition-colors duration-200">Terms</Link>
            <Link to="/privacy" className="text-gray-400 dark:text-gray-300 font-poppins font-normal text-xs hover:text-blue-500 transition-colors duration-200">Privacy</Link>
            <Link to="/cookies" className="text-gray-400 dark:text-gray-300 font-poppins font-normal text-xs hover:text-blue-500 transition-colors duration-200">Cookies</Link>
          </div>
        </div>
      </div>
      {/* Desktop: show footer */}
      <footer className="w-full h-16 flex items-center hidden sm:flex bg-transparent" style={{ marginLeft: 350, marginRight: 350, marginTop: 100 }}>
        <img
          src="/assets/logo.png"
          alt="Gridrr Logo"
          className="h-10 w-auto object-contain dark:hidden"
          style={{ minWidth: 60 }}
        />
        <img
          src="/assets/logo-white.png"
          alt="Gridrr Logo"
          className="h-10 w-auto object-contain hidden dark:inline"
          style={{ minWidth: 60 }}
        />
        <nav className="flex items-center gap-20 ml-8">
          {footerTabs.map(tab => (
            (tab.label === 'About' || tab.label === 'Ads' || tab.label === 'Resources' || tab.label === 'Careers') ? (
              <Link
                key={tab.label}
                to={tab.href}
                className="text-gray-700 dark:text-gray-200 font-medium text-base hover:text-blue-500 transition-colors duration-200"
              >
                {tab.label}
              </Link>
            ) : (
              <a
                key={tab.label}
                href={tab.href}
                className="text-gray-700 dark:text-gray-200 font-medium text-base hover:text-blue-500 transition-colors duration-200"
              >
                {tab.label}
              </a>
            )
          ))}
          <a href="https://facebook.com/gridrrofficial" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white font-medium text-base hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">Facebook</a>
          <a href="https://x.com/gridrrofficial" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white font-medium text-base hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">Twitter/X</a>
          <a href="https://www.instagram.com/gridrrofficial/" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white font-medium text-base hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">Instagram</a>
        </nav>
      </footer>
      <div className="w-full py-3 flex items-center gap-6 hidden sm:flex bg-transparent" style={{ textAlign: 'left', marginLeft: 350, marginBottom: 0, marginTop: 70, }}>
        <span className="text-gray-400 dark:text-gray-300 font-poppins font-normal text-xs">© {new Date().getFullYear()} Gridrr. All rights reserved.</span>
        <Link to="/terms" className="text-gray-400 dark:text-gray-300 font-poppins font-normal text-xs hover:text-blue-500 transition-colors duration-200">Terms</Link>
        <Link to="/privacy" className="text-gray-400 dark:text-gray-300 font-poppins font-normal text-xs hover:text-blue-500 transition-colors duration-200">Privacy</Link>
        <Link to="/cookies" className="text-gray-400 dark:text-gray-300 font-poppins font-normal text-xs hover:text-blue-500 transition-colors duration-200">Cookies</Link>
      </div>
    </div>
  );
};

export default Footer; 