import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section
      style={{
        width: '100%',
        minHeight: '54vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `#f8fafc url('data:image/svg+xml;utf8,<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="40" height="40" fill="none"/><path d="M 40 0 L 0 0 L 0 40" stroke="%23e5e7eb" stroke-width="1"/><path d="M 40 40 L 40 0 L 0 40" stroke="%23e5e7eb" stroke-width="1"/><path d="M 20 0 L 20 40" stroke="%23e5e7eb" stroke-width="1"/><path d="M 0 20 L 40 20" stroke="%23e5e7eb" stroke-width="1"/></svg>') repeat`,
        backgroundSize: 'auto',
        padding: '64px 16px 48px 16px',
        boxSizing: 'border-box',
      }}
    >
      <h1
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
          color: '#18181b',
          textAlign: 'center',
          margin: 0,
          letterSpacing: '-2px',
          lineHeight: 1.08,
        }}
      >
        Where great design
      </h1>
      <h2
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
          color: '#2563eb',
          textAlign: 'center',
          margin: '0',
          letterSpacing: '-2px',
          lineHeight: 1.08,
        }}
      >
        Meet great minds
      </h2>
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
          color: '#18181b',
          textAlign: 'center',
          margin: '0',
          letterSpacing: '-2px',
          lineHeight: 1.08,
        }}
      >
        Only on Gridrr
      </div>
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '1.35rem',
          color: '#52525b',
          textAlign: 'center',
          margin: '24px 0 0 0',
          letterSpacing: '-0.5px',
          lineHeight: 1.5,
          maxWidth: 600,
        }}
      >
        Gridrr connects designers and innovators to share, discover, and collaborate on world-class creative work.
      </p>


    </section>
  );
};

export {};

export default HeroSection;
