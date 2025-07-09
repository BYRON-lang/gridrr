import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
import { useAuth } from '../hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import { getPosts } from '../services/api';
import CategoryCard from '../components/CategoryCard';
import CategoryCardSkeleton from '../components/loaders/CategoryCardSkeleton';
import { useQuery } from '@tanstack/react-query';
import HeroSection from '../components/herosection';
import PostGrid from '../components/PostGrid';
import { PRESET_TAGS } from './CreatePostPage';
import { Helmet } from 'react-helmet-async';

const swapWords = [
  'destination',
  'inspiration',
  'community',
  'showcase',
];

const ChevronLeft = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 17L9 11L14 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevronRight = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5L13 11L8 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Gather all tags from all categories for the 'All' button
const allTags = [
  'Website Design', 'Landing Pages', 'Login Pages', 'Registration Forms', 'Contact Pages', 'About Pages',
  'Mobile Apps', 'Dashboard Design', 'Settings Pages', 'Profile Pages', 'Navigation Menus', 'Onboarding',
  'Buttons', 'Cards', 'Modals', 'Dropdowns', 'Forms', 'Icons',
  'E-commerce', 'SaaS', 'Portfolio', 'Blog', 'Social Media', 'Admin Panel',
  'Dark Mode', 'Light Mode', 'Gradient', 'Monochrome', 'Pastel', 'Vibrant',
  'Microinteractions', 'Transitions', 'Loading', 'Hover Effects', 'Scroll Animations', 'SVG Animations',
  'Serif', 'Sans-serif', 'Handwritten', 'Display', 'Monospace', 'Variable Fonts',
  'Grid', 'Flexbox', 'Single Column', 'Multi-Column', 'Masonry', 'Responsive',
  'Healthcare', 'Education', 'Finance', 'Travel', 'Real Estate', 'Entertainment',
  'Award Winners', 'Trending', 'Minimal', 'Bold', 'Retro', 'Futuristic',
  // More tags for variety
  'Accessibility', 'AR/VR', '3D', 'Parallax', 'Storytelling', 'Personalization',
  'AI Integration', 'Chatbots', 'Voice UI', 'Data Visualization', 'Charts', 'Maps',
  'User Flows', 'Wireframes', 'Prototyping', 'Feedback', 'Testing', 'Collaboration',
  'Branding', 'Color Theory', 'Photography', 'Illustration', 'Motion Graphics', 'Infographics',
  'Startup', 'Corporate', 'Nonprofit', 'Government', 'Marketplace', 'Subscription'
];

const tagCategories = [
  {
    name: 'All',
    tags: allTags
  },
  {
    name: 'Web Design',
    tags: ['Website Design', 'Landing Pages', 'Login Pages', 'Registration Forms', 'Contact Pages', 'About Pages', 'Accessibility', 'Storytelling', 'Personalization', 'Parallax']
  },
  {
    name: 'App Design',
    tags: ['Mobile Apps', 'Dashboard Design', 'Settings Pages', 'Profile Pages', 'Navigation Menus', 'Onboarding', 'AI Integration', 'Chatbots', 'Voice UI', 'User Flows']
  },
  {
    name: 'UI Components',
    tags: ['Buttons', 'Cards', 'Modals', 'Dropdowns', 'Forms', 'Icons', 'Data Visualization', 'Charts', 'Maps', 'Feedback']
  },
  {
    name: 'Design Types',
    tags: ['E-commerce', 'SaaS', 'Portfolio', 'Blog', 'Social Media', 'Admin Panel', 'Startup', 'Corporate', 'Nonprofit', 'Marketplace']
  },
  {
    name: 'Color Themes',
    tags: ['Dark Mode', 'Light Mode', 'Gradient', 'Monochrome', 'Pastel', 'Vibrant', 'Color Theory', 'Branding', 'Photography', 'Illustration']
  },
  {
    name: 'Animation',
    tags: ['Microinteractions', 'Transitions', 'Loading', 'Hover Effects', 'Scroll Animations', 'SVG Animations', 'Motion Graphics', '3D', 'AR/VR', 'Infographics']
  },
  {
    name: 'Typography',
    tags: ['Serif', 'Sans-serif', 'Handwritten', 'Display', 'Monospace', 'Variable Fonts', 'Wireframes', 'Prototyping', 'Testing', 'Collaboration']
  },
  {
    name: 'Layout',
    tags: ['Grid', 'Flexbox', 'Single Column', 'Multi-Column', 'Masonry', 'Responsive', 'Feedback', 'User Flows', 'Prototyping', 'Testing']
  },
  {
    name: 'Industry',
    tags: ['Healthcare', 'Education', 'Finance', 'Travel', 'Real Estate', 'Entertainment', 'Government', 'Subscription', 'Startup', 'Corporate']
  },
  {
    name: 'Inspiration',
    tags: ['Award Winners', 'Trending', 'Minimal', 'Bold', 'Retro', 'Futuristic', 'Branding', 'Photography', 'Illustration', 'Motion Graphics']
  }
];

const HomePage: React.FC = () => {
  const { isAuthenticated, isLoadingUser, userError } = useAuth();
  const navigate = useNavigate();
  const [currentWord, setCurrentWord] = useState(0);
  const [fade, setFade] = useState(true);
  const filterRowRef = useRef<HTMLDivElement>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Debug log
  console.log('HomePage:', { isLoadingUser, isAuthenticated, userError });

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % swapWords.length);
        setFade(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollFilters = (dir: 'left' | 'right') => {
    if (filterRowRef.current) {
      const scrollAmount = 200;
      filterRowRef.current.scrollBy({
        left: dir === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleFilterChange = (selectedOptions: string[]) => {
    console.log('Selected filters:', selectedOptions);
  };

  const handleCategoryFilterChange = (categoryTags: string[]) => {
    // Flatten all selected tags from all categories
    setSelectedTags((prev) => {
      // Remove any tags from this category, then add the new ones
      const otherTags = prev.filter(tag => !categoryTags.includes(tag));
      return [...otherTags, ...categoryTags];
    });
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts-home', selectedTags],
    queryFn: ({ queryKey }) => {
      const [_key, tags] = queryKey;
      return getPosts({
        tags: (Array.isArray(tags) ? (tags as string[]).join(',') : (tags as string)),
      }).then(res => res.data);
    },
  });

  if (isLoadingUser) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500"></div>
    </div>
  );
  if (isAuthenticated) return <Navigate to="/discover" replace />;

  return (
    <>
      <Helmet>
        <title>Gridrr - Where Great Design Meets Great Minds</title>
        <meta name="description" content="Gridrr connects designers and innovators to share, discover, and collaborate on world-class creative work." />
      </Helmet>
      <div className="min-h-screen bg-white">
        <div className="pl-0">
          <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
            <Header />
          </div>
        </div>
        <HeroSection />
        {/* Add padding to prevent content from being hidden behind the fixed header */}
        <div style={{ height: '64px' }} />
        <div className="w-full flex gap-4 overflow-x-auto py-4 px-8 mb-2" style={{scrollbarWidth: 'none'}}>
          {tagCategories.map((cat) => (
            <FilterButton
              key={cat.name}
              label={cat.name}
              options={cat.tags}
              onFilterChange={handleCategoryFilterChange}
            />
          ))}
        </div>
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 px-8 mb-4">
            {selectedTags.map(tag => (
              <span
                key={tag}
                className="flex items-center bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-medium shadow-sm"
              >
                {tag}
                <button
                  type="button"
                  className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => handleTagRemove(tag)}
                  aria-label={`Remove ${tag}`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </span>
            ))}
          </div>
        )}
        <section className="w-full px-8 pb-16 mt-12 overflow-x-hidden">
          <PostGrid>
            {isLoading ? (
              Array.from({ length: 20 }).map((_, idx) => (
                <div key={idx} className="w-full">
                  <CategoryCardSkeleton />
                </div>
              ))
            ) : error ? (
              <div className="col-span-full text-center py-8">
                <div className="text-red-500">Error loading posts</div>
              </div>
            ) : posts && posts.length > 0 ? (
              posts.slice(0, 20).map((post: any, idx: number) => (
                <div key={post.id || idx} className="w-full">
                  <CategoryCard
                    onClick={() => {
                      if (!isAuthenticated) {
                        navigate('/login');
                        return;
                      }
                      // Add logic here for authenticated users if needed
                    }}
                    title={post.title}
                    time={new Date(post.created_at).toLocaleDateString()}
                    image={post.image_urls && post.image_urls.length > 0 ? post.image_urls[0] : undefined}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <div className="text-gray-500">No posts found</div>
              </div>
            )}
          </PostGrid>
        </section>
      </div>
    </>
  );
};

export default HomePage; 