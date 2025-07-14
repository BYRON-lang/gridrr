import React from 'react';

interface PostCardProps {
  title: string;
  author: string;
  imageUrl: string;
  likes: number;
  comments: number;
  onClick?: () => void;
  className?: string;
}

const PostCard: React.FC<PostCardProps> = ({ 
  title, 
  author, 
  imageUrl, 
  likes, 
  comments, 
  onClick,
  className = '' 
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 ${className}`}
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={imageUrl || '/assets/logo-space-blue.png'} 
          alt={title} 
          className="w-full h-48 object-cover"
          loading="lazy"
          srcSet={imageUrl ? `${imageUrl} 480w, ${imageUrl} 800w, ${imageUrl} 1200w` : undefined}
          sizes="(max-width: 600px) 480px, (max-width: 900px) 800px, 1200px"
          onError={(e) => {
            e.currentTarget.src = '/assets/logo-space-blue.png';
          }}
        />
        <div className="absolute top-2 right-2">
          <button className="bg-white/80 hover:bg-white rounded-full p-2 transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-3">by {author}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {likes}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {comments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;