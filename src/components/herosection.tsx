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

  // Swap image every 2 seconds
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
    <div>
      <section
        style={{
          width: '100%',
          minHeight: '54vh',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '64px 16px 48px 16px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minWidth: 0 }}>
          <h1
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(2.8rem, 7vw, 5rem)',
              color: '#18181b',
              textAlign: 'left',
              margin: 0,
              letterSpacing: '-2px',
              lineHeight: 1.08,
              maxWidth: 700,
              marginBottom: '2rem',
            }}
          >
            Your Gateway to World-Class Design Inspiration
          </h1>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 320 }}>
          {!isLoading && images.length > 0 && (
            <img
              key={images[current]}
              src={images[current]}
              alt="Post inspiration"
              style={{
                maxWidth: '620px',
                maxHeight: '520px',
                width: '100%',
                height: 'auto',
                borderRadius: '1.5rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                objectFit: 'cover',
                transition: 'opacity 0.5s',
                opacity: 1,
              }}
            />
          )}
        </div>
      </section>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <span
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: '2.25rem',
            color: '#6b7280',
            textAlign: 'center',
            maxWidth: 700,
            minHeight: '2.5rem',
            transition: 'opacity 0.4s',
            display: 'inline-block',
            whiteSpace: 'nowrap',
            opacity: fade ? 1 : 0,
          }}
        >
          {heroMessages[msgIndex]}
        </span>
      </div>
    </div>
  );
};

export default HeroSection;
