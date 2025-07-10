import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../services/api';

const HeroSection: React.FC = () => {
  // Fetch posts
  const { data: posts, isLoading } = useQuery({
    queryKey: ['hero-posts'],
    queryFn: () => getPosts().then(res => res.data),
  });

  // Gather all images from posts
  const images = posts
    ? posts.flatMap((post: any) => post.image_urls && post.image_urls.length > 0 ? post.image_urls : [])
    : [];

  // State for current image index
  const [current, setCurrent] = useState(0);

  // Swap image every 4 seconds
  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Swapping motivational texts
  const heroMessages = [
    'Become a part of Gridrr',
    'Discover creative masterpieces',
    'Share your own unique designs',
    'Inspire the design community',
  ];
  const [msgIndex, setMsgIndex] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setMsgIndex((prev) => (prev + 1) % heroMessages.length);
        setFade(true);
      }, 400); // fade out duration
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <section
        className="w-full min-h-[54vh] flex flex-col md:flex-row items-center justify-center px-4 md:px-8 py-8 md:py-12 box-border"
      >
        <div className="flex-1 flex flex-col items-center md:items-start justify-center min-w-0">
          <h1
            className="font-poppins font-semibold text-[2.2rem] sm:text-4xl md:text-5xl lg:text-6xl text-zinc-900 text-center md:text-left mb-8 leading-tight max-w-2xl tracking-tight"
            style={{ letterSpacing: '-2px' }}
          >
            Your Gateway to World-Class Design Inspiration
          </h1>
        </div>
        {/* Images: show below heading on mobile, right on md+ */}
        <div className="w-full flex md:hidden items-center justify-center mt-6">
          {!isLoading && images.length > 0 && (
            <img
              key={images[current]}
              src={images[current]}
              alt="Post inspiration"
              className="max-w-[90vw] max-h-[320px] w-full h-auto rounded-2xl shadow-lg object-cover transition-opacity duration-500 opacity-100"
            />
          )}
        </div>
        <div className="hidden md:flex flex-1 flex-col items-center justify-center min-h-[320px]">
          {!isLoading && images.length > 0 && (
            <img
              key={images[current]}
              src={images[current]}
              alt="Post inspiration"
              className="max-w-[620px] max-h-[520px] w-full h-auto rounded-3xl shadow-lg object-cover transition-opacity duration-500 opacity-100"
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
