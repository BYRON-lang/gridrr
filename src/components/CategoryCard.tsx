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
    <>
      <div
        className="category-card mr-4 md:mr-6 lg:mr-8 last:mr-0 bg-white dark:bg-[#222222] rounded-lg shadow hover:shadow-lg transition-all duration-200 cursor-pointer"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          margin: 0,
          borderRadius: 8,
          padding: 0,
          maxWidth: '100%',
          width: '100%',
          boxSizing: 'border-box',
          overflow: 'hidden',
          height: 'fit-content',
          background: undefined, // use Tailwind class
          boxShadow: undefined, // use Tailwind class
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
            borderRadius: 8,
            marginBottom: 0,
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
      </div>
      <div className="flex items-center gap-3 mt-2 px-1">
        <span className="text-gray-900 dark:text-gray-100 font-bold text-base" style={{ fontFamily: 'Archivo, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70%' }} title={title}>{title}</span>
        {time && <span className="text-gray-500 dark:text-gray-300 font-medium text-sm" style={{ fontFamily: 'Archivo, sans-serif' }}>{time}</span>}
      </div>
    </>
  );
};

export default CategoryCard;