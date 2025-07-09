import React from 'react';
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const footerLinks = [
  [
    { label: 'Inspiration', href: '/inspiration' },
    { label: 'Discover', href: '/discover' },
    { label: 'Resources', href: '/resources' },
    { label: 'Upload', href: '/upload' },
  ],
  [
    { label: 'Help', href: '/help' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
];

const Footer: React.FC = () => {
  return (
    <footer style={{ background: '#000', width: '100%', height: 500, marginTop: 120, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', paddingLeft: 300, paddingRight: 300, gap: 120, position: 'relative' }}>
        {/* Left: Logo and Motto */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1, justifyContent: 'space-between', height: '100%' }}>
          <img
            src="/assets/logo-space-blue.png"
            alt="Gridrr Logo"
            style={{ height: 40, width: 'auto', marginTop: 50, marginBottom: 0 }}
          />
          <div
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: '1rem',
              color: '#bdbdbd',
              marginTop: 8,
              letterSpacing: 0.2,
            }}
          >
            Your Gateway to World-Class Design Inspiration
          </div>
          <div
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: '0.95rem',
              color: '#8d8d8d',
              marginTop: 'auto',
              marginBottom: 12,
            }}
          >
            © {new Date().getFullYear()} Gridrr. All rights reserved.
          </div>
        </div>
        {/* Right: Navigation Columns */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 80, alignItems: 'flex-start', marginTop: 80, justifyContent: 'flex-end' }}>
            {footerLinks.map((col, colIdx) => (
              <div key={colIdx} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {col.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 500,
                      fontSize: '1.1rem',
                      color: '#e5e5e5',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseOver={e => (e.currentTarget.style.color = '#60a5fa')}
                    onMouseOut={e => (e.currentTarget.style.color = '#e5e5e5')}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
          {/* Contacts Section */}
          <div style={{ marginTop: 32, marginBottom: 8, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
            <span style={{ color: '#bdbdbd', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '1rem', marginBottom: 2 }}>Contact:</span>
            <a href="mailto:info@gridrr.com" style={{ color: '#bdbdbd', fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '1rem', textDecoration: 'none' }}>info@gridrr.com</a>
            <a href="mailto:help@gridrr.com" style={{ color: '#bdbdbd', fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '1rem', textDecoration: 'none' }}>help@gridrr.com</a>
            <a href="mailto:support@gridrr.com" style={{ color: '#bdbdbd', fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '1rem', textDecoration: 'none' }}>support@gridrr.com</a>
          </div>
          {/* Social Icons at the bottom right */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', alignItems: 'center', marginTop: 0, marginBottom: 12 }}>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#bdbdbd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4 1.64a9.09 9.09 0 01-2.88 1.1A4.48 4.48 0 0016.5 0c-2.5 0-4.5 2.01-4.5 4.5 0 .35.04.7.11 1.03C7.69 5.36 4.07 3.6 1.64 1.16c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 01.96 6.1v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.72 2.16 2.97 4.07 3A9.05 9.05 0 010 21.54a12.8 12.8 0 006.92 2.03c8.3 0 12.85-6.87 12.85-12.83 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#bdbdbd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <path d="M17.5 6.5h.01" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#bdbdbd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <path d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-2-2 2 2 0 00-2 2v6h-4v-6a6 6 0 016-6z" />
                <path d="M2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 