import React, { useRef, useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/herosection';
import PostGrid from '../components/PostGrid';
import CategoryCard from '../components/CategoryCard';
import Footer from '../components/Footer';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import LoadingSpinner from '../components/loaders/LoadingSpinner';
import CategoryCardSkeleton from '../components/loaders/CategoryCardSkeleton';

// 9 tags from DiscoverFilter categories
const homeFilters = [
  'Website Design',
  'Landing Pages',
  'Mobile Apps',
  'Dashboard Design',
  'Buttons',
  'Cards',
  'E-commerce',
  'SaaS',
  'Portfolio',
];

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const navigate = useNavigate();
  // Fetch posts for the grid
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['home-posts', selectedFilter],
    queryFn: () => getPosts(selectedFilter ? { tags: selectedFilter } : undefined).then(res => res.data),
  });

  const filterScrollRef = useRef<HTMLDivElement>(null);

  const scrollFilters = (dir: 'left' | 'right') => {
    const el = filterScrollRef.current;
    if (!el) return;
    const scrollAmount = 120; // px
    if (dir === 'left') {
      el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!isAuthenticated) {
    // Show HomePage for unauthenticated users
  }
  if (isAuthenticated) {
    return <Navigate to="/explore" replace />;
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <Header />
        <div className="pt-28">
        <div className="mx-2 md:mx-4 lg:mx-8">
          <HeroSection />
        </div>
        {/* Filter bar with chevrons for mobile */}
        <div className="w-full relative md:overflow-visible mt-8 mb-2 mx-2 md:mx-4 lg:mx-8">
          {/* Left chevron (mobile only) */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 shadow rounded-full md:hidden"
            onClick={() => scrollFilters('left')}
            aria-label="Scroll filters left"
            type="button"
            style={{ display: undefined }}
          >
            {/* Inline SVG for left chevron */}
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          {/* Filter list */}
          <div
            ref={filterScrollRef}
            className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-3 md:gap-6 px-8 md:px-0 overflow-x-auto md:overflow-visible scrollbar-hide"
            style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
          >
            <button
              key="All"
              className={`text-base md:text-lg font-semibold transition-colors duration-200 bg-transparent border-none p-0 m-0 focus:outline-none cursor-pointer whitespace-nowrap ${!selectedFilter ? 'text-black dark:text-white underline underline-offset-8' : 'text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white'}`}
              type="button"
              tabIndex={-1}
              style={{ boxShadow: 'none' }}
              onClick={() => setSelectedFilter(null)}
            >
              All
            </button>
            {homeFilters.map((filter) => (
              <button
                key={filter}
                className={`text-base md:text-lg font-semibold transition-colors duration-200 bg-transparent border-none p-0 m-0 focus:outline-none cursor-pointer whitespace-nowrap ${selectedFilter === filter ? 'text-black dark:text-white underline underline-offset-8' : 'text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white'}`}
                type="button"
                tabIndex={-1}
                style={{ boxShadow: 'none' }}
                onClick={() => setSelectedFilter(selectedFilter === filter ? null : filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          {/* Right chevron (mobile only) */}
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 shadow rounded-full md:hidden"
            onClick={() => scrollFilters('right')}
            aria-label="Scroll filters right"
            type="button"
            style={{ display: undefined }}
          >
            {/* Inline SVG for right chevron */}
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        {/* Responsive posts grid */}
        <div className="w-full flex justify-center mt-8 md:mt-10 mb-2 px-1 md:px-2">
          <div className="w-full p-0 m-0 px-2 md:px-4 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {isLoading ? (
                null
              ) : error ? (
                <div className="text-red-600 dark:text-red-400">Error loading posts</div>
              ) : posts && posts.length > 0 ? (
                posts.slice(0, 20).map((post: any, idx: number) => (
                  <div>
                    <CategoryCard
                      key={post.id || idx}
                      title={post.title}
                      time={new Date(post.created_at).toLocaleDateString()}
                      image={post.image_urls && post.image_urls.length > 0 ? post.image_urls[0] : undefined}
                      onClick={() => navigate(`/post/${post.id}`, { state: { fromHome: true } })}
                    />
                  </div>
                ))
              ) : (
                <div className="text-gray-700 dark:text-gray-200">No posts found</div>
              )}
            </div>
          </div>
        </div>
        {/* Sign up to continue button below the cards */}
        <div className="w-full flex justify-center my-8 mt-16 mx-2 md:mx-4 lg:mx-8 ">
          <a
            href="/signup"
            className="bg-black dark:bg-white text-white dark:text-black font-semibold text-lg px-8 py-4 rounded-full shadow hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors duration-200"
          >
            Sign up to continue
          </a>
        </div>
        {/* Auto-scrolling gallery below the button */}
        <div className="w-full overflow-hidden my-8 mx-2 md:mx-4 lg:mx-8" style={{ height: 120 }}>
          {posts && posts.length > 0 && (
            <div
              className="flex items-center gap-8 animate-scroll-gallery"
              style={{
                width: 'max-content',
                animation: 'scroll-gallery 30s linear infinite',
              }}
            >
              {posts.slice(0, 10).map((post: any, idx: number) => (
                <div key={post.id || idx} className="flex-shrink-0 rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-800" style={{ width: 180, height: 100 }}>
                  <img
                    src={post.image_urls && post.image_urls.length > 0 ? post.image_urls[0] : '/assets/logo-space-blue.png'}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    srcSet={post.image_urls && post.image_urls.length > 0 ? `${post.image_urls[0]} 480w, ${post.image_urls[0]} 800w, ${post.image_urls[0]} 1200w` : undefined}
                    sizes="(max-width: 600px) 180px, 100vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      </div>
    </>
  );
};

export default HomePage; 