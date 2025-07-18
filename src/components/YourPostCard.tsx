import React from 'react';

interface YourPostCardProps {
  title: string;
  image: string;
  time?: string;
}

const YourPostCard: React.FC<YourPostCardProps> = ({ title, image, time }) => {
  return (
    <div className="flex flex-col items-start w-full h-full p-2">
      <div 
        className="bg-gray-100 flex items-center justify-center w-full cursor-pointer hover:bg-gray-200 transition-colors duration-200 rounded-lg"
      >
        <img 
          src={image}
          alt={title}
          className="w-full h-56 object-cover rounded-lg"
          loading="lazy"
          srcSet={image ? `${image} 480w, ${image} 800w, ${image} 1200w` : undefined}
          sizes="(max-width: 600px) 480px, (max-width: 900px) 800px, 1200px"
        />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span className="font-light text-gray-800 text-left text-base">{title}</span>
        {time && <span className="text-xs font-light text-gray-500">{time}</span>}
      </div>
    </div>
  );
};

export default YourPostCard; 