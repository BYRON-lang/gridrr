import React from 'react';

interface CategoryCardProps {
  onClick?: () => void;
  title: string;
  time?: string;
  image?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ onClick, title, time, image }) => {
  return (
    <div
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
          background: '#f3f4f6',
        }}
      >
        <img
          src={image || '/assets/logo-space-blue.png'}
          alt={title}
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
          }}
          onError={e => {
            e.currentTarget.src = '/assets/logo-space-blue.png';
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
        <span style={{ fontFamily: 'Inter, sans-serif', color: '#18181b', fontWeight: 500, fontSize: 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70%' }} title={title}>{title}</span>
        {time && <span style={{ fontFamily: 'Inter, sans-serif', color: '#6b7280', fontWeight: 400, fontSize: 13 }}>{time}</span>}
      </div>
    </div>
  );
};

export default CategoryCard;