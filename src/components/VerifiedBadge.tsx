import * as React from 'react';

export default function VerifiedBadge({ size = 20, style = {} }: { size?: number; style?: React.CSSProperties }) {
  return (
    <span
      title="Verified"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        verticalAlign: 'middle',
        ...style,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <circle cx="16" cy="16" r="16" fill="#4F8EF7"/>
        <path d="M10 16.5L14 20.5L22 12.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="16" cy="16" r="15.25" stroke="#fff" strokeWidth="1.5" fill="none"/>
      </svg>
      <span style={{
        color: '#4F8EF7',
        fontWeight: 600,
        fontSize: size * 0.7,
        marginLeft: 4,
        userSelect: 'none',
        letterSpacing: 0.5,
      }}>Verified</span>
    </span>
  );
}
