import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/herosection';
import PostGrid from '../components/PostGrid';
import CategoryCard from '../components/CategoryCard';
import Footer from '../components/Footer';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

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
  // Fetch posts for the grid
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['home-posts'],
    queryFn: () => getPosts().then(res => res.data),
  });

  if (!isAuthenticated) {
    // Show HomePage for unauthenticated users
  }
  if (isAuthenticated) {
    return <Navigate to="/discover" replace />;
  }

  return (
    <>
      <div style={{ marginLeft: 15, marginRight: 15 }}>
        <Header />
        <HeroSection />
        {/* Text-only filter bar */}
        <div className="w-full flex flex-wrap justify-center gap-6 mt-8 mb-2">
          {homeFilters.map((filter) => (
            <button
              key={filter}
              className="text-lg font-semibold text-gray-700 hover:text-black transition-colors duration-200 bg-transparent border-none p-0 m-0 focus:outline-none cursor-pointer"
              type="button"
              tabIndex={-1}
              style={{ boxShadow: 'none' }}
            >
              {filter}
            </button>
          ))}
        </div>
        {/* Posts grid */}
        <div className="w-full flex justify-center mt-10 mb-2" style={{ paddingLeft: 2, paddingRight: 2 }}>
          <div style={{ width: '100%', padding: 0, margin: 0 }}>
            <PostGrid className="!p-0">
              {isLoading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error loading posts</div>
              ) : posts && posts.length > 0 ? (
                posts.slice(0, 10).map((post: any, idx: number) => (
                  <CategoryCard
                    key={post.id || idx}
                    title={post.title}
                    time={new Date(post.created_at).toLocaleDateString()}
                    image={post.image_urls && post.image_urls.length > 0 ? post.image_urls[0] : undefined}
                  />
                ))
              ) : (
                <div>No posts found</div>
              )}
            </PostGrid>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage; 