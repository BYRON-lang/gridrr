import React from 'react';
import DiscoverHeader from '../components/DiscoverHeader';
import YourPostCard from '../components/YourPostCard';

const samplePosts = [
  {
    title: 'My First Post',
    description: 'This is a description of my first post. It is just a sample for layout purposes.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=350&h=250&fit=crop',
    time: '2 days ago',
  },
  {
    title: 'Another Post',
    description: 'Here is another post I have made. The description can be a bit longer to show how it wraps.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=350&h=250&fit=crop',
    time: '1 week ago',
  },
  {
    title: 'Third Post',
    description: 'A third example post to show row layout.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=350&h=250&fit=crop',
    time: '3 hours ago',
  },
];

const PostsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white w-full">
      <DiscoverHeader />
      <div className="max-w-6xl mx-auto pt-28 pb-8 px-4">
        <h2 className="text-3xl font-light text-gray-900 align-center">Your Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {samplePosts.map((post, idx) => (
            <YourPostCard key={idx} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsPage; 