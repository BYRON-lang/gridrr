import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../services/api';

// Custom hook to get a stable array of refs
function useCardRefs(count: number) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  if (refs.current.length !== count) {
    refs.current = Array(count).fill(null).map((_, i) => refs.current[i] || null);
  }
  return refs.current;
}

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

  const HERO_TAGS = [
    { label: 'Inspiration', color: '#a1c4fd' },
    { label: 'Showcase', color: '#fbc2eb' },
    { label: 'Discover', color: '#fcb69f' },
    { label: 'Connect', color: '#81ecec' },
  ];

  const cardRefs = useCardRefs(HERO_TAGS.length);
  const [cardSizes, setCardSizes] = useState<{ width: number; height: number }[]>(
    Array.from({ length: HERO_TAGS.length }, () => ({ width: 100, height: 40 }))
  );
  useEffect(() => {
    setCardSizes(cardRefs.map(ref => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      }
      return { width: 100, height: 40 };
    }));
    // Only run after first render
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full">
      <section
        className="w-full min-h-[54vh] flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: "url('/assets/background.jfif')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Fade overlay at top */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-32 z-10" style={{background: 'linear-gradient(to top, rgba(255,255,255,0) 0%, #fff 100%)'}} />
        {/* Fade overlay at bottom */}
        <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-32 z-10" style={{background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 100%)'}} />
        {/* Fade overlay at left */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-16 z-10" style={{background: 'linear-gradient(to left, rgba(255,255,255,0) 0%, #fff 100%)'}} />
        {/* Fade overlay at right */}
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-16 z-10" style={{background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, #fff 100%)'}} />
        <div className="flex-1 flex flex-col items-center justify-center min-w-0 px-4 md:px-8 py-8 md:py-12 relative z-20">
          {/* No connector or pointer icons */}
          <h1
            className="font-poppins font-semibold text-[2.8rem] sm:text-5xl md:text-6xl lg:text-7xl text-zinc-900 text-center mb-4 leading-tight max-w-3xl tracking-tight animate-hero-fade"
            style={{ letterSpacing: '-2px', position: 'relative' }}
          >
            Your Gateway to World-Class Design <span className="cookie-regular" style={{ color: '#111', letterSpacing: '0.5px', fontSize: '1.5em', verticalAlign: 'middle', fontStyle: 'italic' }}>Inspiration</span>
          </h1>
          {/* Cards around the hero title */}
          {HERO_TAGS.map((tag, i) => {
            const angle = (i / HERO_TAGS.length) * 2 * Math.PI - Math.PI / 2;
            // Move left (i === 1) and right (i === 3) cards even further away
            const isSideCard = i === 1 || i === 3;
            const baseRadius = isSideCard ? 400 : 150;
            const cardH = cardSizes[i]?.height || 40;
            const radius = baseRadius + cardH / 2;
            const x = `calc(50% + ${Math.cos(angle) * radius}px)`;
            const y = `calc(50% + ${Math.sin(angle) * radius}px)`;
            // Pointer position: 36px further out
            const pointerRadius = radius + 36;
            const pointerX = `calc(50% + ${Math.cos(angle) * pointerRadius}px)`;
            const pointerY = `calc(50% + ${Math.sin(angle) * pointerRadius}px)`;
            // Adjust rotation so pointer tip faces the card
            const pointerRotation = angle * 180 / Math.PI + 270;
            return (
              <React.Fragment key={tag.label}>
                <div
                  ref={el => { cardRefs[i] = el; }}
                  className="absolute flex flex-col items-center justify-center cursor-pointer"
                  style={{
                    left: x,
                    top: y,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 30,
                  }}
                >
                  <div
                    className="rounded-xl px-5 py-2 font-semibold text-base shadow-lg"
                    style={{ background: tag.color, color: '#222', minWidth: 90, textAlign: 'center', border: '2px solid #fff', cursor: 'pointer' }}
                  >
                    {tag.label}
        </div>
        </div>
                {/* Mouse pointer icon outside the card */}
                <svg
                  className="absolute"
                  style={{
                    left: pointerX,
                    top: pointerY,
                    transform: `translate(-50%, -50%) rotate(${pointerRotation}deg)`,
                    zIndex: 29,
                  }}
                  width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M3 2l17 7-7 2-2 7-7-17z" />
                </svg>
              </React.Fragment>
            );
          })}
        </div>
      </section>
      <style>{`
        @keyframes hero-fade {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-hero-fade {
          animation: hero-fade 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
