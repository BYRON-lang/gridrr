import React from 'react';

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

const CategoryCardSkeleton: React.FC = () => {
  const color = React.useMemo(getRandomColor, []);
  return (
    <div className="animate-pulse">
      <div
        className="rounded-lg w-[400px] h-[300px] mb-4"
        style={{ background: color }}
      />
      <div className="flex items-center gap-3 mt-4">
        <div className="bg-gray-200 h-5 w-32 rounded" />
        <div className="bg-gray-200 h-4 w-16 rounded" />
      </div>
    </div>
  );
};

export default CategoryCardSkeleton; 