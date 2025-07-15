import React, { useState } from 'react';

interface CategoryCardProps {
  onClick?: () => void;
  title: string;
  time?: string;
  image?: string;
}

const COLORS = [
  '#fbbf24', // amber
  '#60a5fa', // blue
  '#34d399', // green
  '#f472b6', // pink
  '#f87171', // red
  '#a78bfa', // purple
  '#facc15', // yellow
  '#38bdf8', // sky
  '#fdba74', // orange
  '#6ee7b7', // teal
  '#818cf8', // indigo
  '#fcd34d', // gold
];
const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

const CategoryCard: React.FC<CategoryCardProps> = ({ onClick, title, time, image }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [bgColor] = useState(getRandomColor());

  return (
    <div
      className="category-card mr-4 md:mr-6 lg:mr-8 last:mr-0"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        margin: 0,
        borderRadius: 0,
        padding: 0,
        maxWidth: '100%',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        height: 'fit-content',
        background: 'transparent',
        boxShadow: 'none',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          aspectRatio: '4/3',
          overflow: 'hidden',
          borderRadius: 0,
          marginBottom: '12px',
          background: bgColor,
          transition: 'background 0.3s',
        }}
      >
        <img
          src={image || '/assets/logo-space-blue.png'}
          alt={title}
          loading="lazy"
          srcSet={image ? `${image} 480w, ${image} 800w, ${image} 1200w` : undefined}
          sizes="(max-width: 600px) 480px, (max-width: 900px) 800px, 1200px"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            boxShadow: 'none',
            boxSizing: 'border-box',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
          onLoad={() => setImgLoaded(true)}
          onError={e => {
            e.currentTarget.src = '/assets/logo-space-blue.png';
            setImgLoaded(true);
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          width: '100%',
          maxWidth: '100%',
          marginTop: 0,
          fontSize: 14,
          padding: '0 4px',
        }}
      >
        <span style={{ fontFamily: 'Archivo, sans-serif', color: '#18181b', fontWeight: 700, fontSize: 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70%' }} title={title}>{title}</span>
        {time && <span style={{ fontFamily: 'Archivo, sans-serif', color: '#6b7280', fontWeight: 500, fontSize: 13 }}>{time}</span>}
      </div>
    </div>
  );
};

export default CategoryCard;