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
      <div className="block sm:hidden min-h-[80px] w-full bg-white flex flex-col items-center justify-start pt-2">
        <img
          src="/assets/logo.png"
          alt="Gridrr Logo"
          className="h-10 w-auto object-contain mb-2"
          style={{ minWidth: 60 }}
        />
        <nav className="flex flex-wrap justify-center gap-4 w-full px-2">
          {footerTabs.map(tab => (
            (tab.label === 'About' || tab.label === 'Ads' || tab.label === 'Resources' || tab.label === 'Careers') ? (
              <Link
                key={tab.label}
                to={tab.href}
                className="text-gray-700 font-medium text-sm hover:text-blue-500 transition-colors duration-200"
              >
                {tab.label}
              </Link>
            ) : (
              <a
                key={tab.label}
                href={tab.href}
                className="text-gray-700 font-medium text-sm hover:text-blue-500 transition-colors duration-200"
              >
                {tab.label}
              </a>
            )
          ))}
        </nav>
        <div className="flex gap-6 justify-center mt-3 mb-2">
          {/* Facebook */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" fill="#000" />
            </svg>
          </a>
          {/* Twitter */}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4 1.64a9.09 9.09 0 01-2.88 1.1A4.48 4.48 0 0016.5 0c-2.5 0-4.5 2.01-4.5 4.5 0 .35.04.7.11 1.03C7.69 5.36 4.07 3.6 1.64 1.16c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 01.96 6.1v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.72 2.16 2.97 4.07 3A9.05 9.05 0 010 21.54a12.8 12.8 0 006.92 2.03c8.3 0 12.85-6.87 12.85-12.83 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z" fill="#000" />
            </svg>
          </a>
          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" fill="#000" />
              <circle cx="12" cy="12" r="5.5" fill="#fff" />
              <circle cx="18" cy="6" r="1.3" fill="#fff" />
            </svg>
          </a>
        </div>
        {/* Copyright and privacy links below with gap */}
        <div className="mt-4 flex flex-col items-center w-full">
          <span className="text-gray-400 font-poppins font-normal text-xs mb-2">© {new Date().getFullYear()} Gridrr. All rights reserved.</span>
          <div className="flex flex-wrap justify-center gap-4 w-full px-2">
            <Link to="/terms" className="text-gray-400 font-poppins font-normal text-xs hover:text-blue-500 transition-colors duration-200">Terms</Link>
            <Link to="/privacy" className="text-gray-400 font-poppins font-normal text-xs hover:text-blue-500 transition-colors duration-200">Privacy</Link>
            <Link to="/cookies" className="text-gray-400 font-poppins font-normal text-xs hover:text-blue-500 transition-colors duration-200">Cookies</Link>
          </div>
        </div>
      </div>
      {/* Desktop: show footer */}
      <footer className="bg-white w-full h-16 flex items-center hidden sm:flex" style={{ marginLeft: 350, marginRight: 350, marginTop: 100 }}>
        <img
          src="/assets/logo.png"
          alt="Gridrr Logo"
          className="h-10 w-auto object-contain"
          style={{ minWidth: 60 }}
        />
        <nav className="flex items-center gap-20 ml-8">
          {footerTabs.map(tab => (
            (tab.label === 'About' || tab.label === 'Ads' || tab.label === 'Resources' || tab.label === 'Careers') ? (
              <Link
                key={tab.label}
                to={tab.href}
                className="text-gray-700 font-medium text-base hover:text-blue-500 transition-colors duration-200"
              >
                {tab.label}
              </Link>
            ) : (
              <a
                key={tab.label}
                href={tab.href}
                className="text-gray-700 font-medium text-base hover:text-blue-500 transition-colors duration-200"
              >
                {tab.label}
              </a>
            )
          ))}
        </nav>
        <div className="flex gap-6 ml-12 mb-4">
          {/* Facebook */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" fill="#000" />
            </svg>
          </a>
          {/* Twitter */}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4 1.64a9.09 9.09 0 01-2.88 1.1A4.48 4.48 0 0016.5 0c-2.5 0-4.5 2.01-4.5 4.5 0 .35.04.7.11 1.03C7.69 5.36 4.07 3.6 1.64 1.16c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 01.96 6.1v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.72 2.16 2.97 4.07 3A9.05 9.05 0 010 21.54a12.8 12.8 0 006.92 2.03c8.3 0 12.85-6.87 12.85-12.83 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z" fill="#000" />
            </svg>
          </a>
          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" fill="#000" />
              <circle cx="12" cy="12" r="5.5" fill="#fff" />
              <circle cx="18" cy="6" r="1.3" fill="#fff" />
            </svg>
          </a>
        </div>
      </footer>
      <div className="w-full py-3 flex items-center gap-6 hidden sm:flex" style={{ textAlign: 'left', marginLeft: 350, marginBottom: 50, marginTop: 70, }}>
        <span className="text-gray-400 font-poppins font-normal text-xs">© {new Date().getFullYear()} Gridrr. All rights reserved.</span>
        <Link to="/terms" className="text-gray-400 font-poppins font-normal text-xs hover:text-blue-500 transition-colors duration-200">Terms</Link>
        <Link to="/privacy" className="text-gray-400 font-poppins font-normal text-xs hover:text-blue-500 transition-colors duration-200">Privacy</Link>
        <Link to="/cookies" className="text-gray-400 font-poppins font-normal text-xs hover:text-blue-500 transition-colors duration-200">Cookies</Link>
      </div>
    </div>
  );
};

export default Footer; 