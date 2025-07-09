import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DiscoverHeader from '../components/DiscoverHeader';
import DiscoverFilter from '../components/DiscoverFilter';
import SortFilter from '../components/SortFilter';
import FeaturesCard from '../components/FeaturesCard';
import CategoryCard from '../components/CategoryCard';
import ProtectedRoute from '../components/ProtectedRoute';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPosts } from '../services/api';
import CategoryCardSkeleton from '../components/loaders/CategoryCardSkeleton';
import { Helmet } from 'react-helmet-async';

const DiscoverPage: React.FC = () => {
  const [selectedSortFilter, setSelectedSortFilter] = useState('latest');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Get search query from URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q') || '';

  // Fetch posts using React Query with search, tags, and sort
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts', searchQuery, selectedTags, selectedSortFilter],
    queryFn: ({ queryKey }) => {
      const [_key, q, tags, sort] = queryKey;
      return getPosts({
        q: q as string,
        tags: (Array.isArray(tags) ? (tags as string[]).join(',') : (tags as string)),
        sort: sort as string,
      }).then(res => res.data);
    },
  });

  const handleSortFilterChange = (filter: string) => {
    setSelectedSortFilter(filter);
  };

  const handleCategoryClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const filters = [
    { id: 'latest', label: 'Latest' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'liked', label: 'Most Liked' }
  ];

  return (
    <ProtectedRoute>
      <>
        <Helmet>
          <title>Discover Designs - Gridrr</title>
          <meta name="description" content="Browse and discover the best web and app design inspirations, UI components, and creative work from the Gridrr community." />
          <meta property="og:title" content="Discover Designs - Gridrr" />
          <meta property="og:description" content="Browse and discover the best web and app design inspirations, UI components, and creative work from the Gridrr community." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://gridrr.com/discover" />
          <meta property="og:image" content="/logo512.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Discover Designs - Gridrr" />
          <meta name="twitter:description" content="Browse and discover the best web and app design inspirations, UI components, and creative work from the Gridrr community." />
          <meta name="twitter:image" content="/logo512.png" />
        </Helmet>
        <div className="min-h-screen w-full" style={{ backgroundColor: '#fff' }}>
          <DiscoverHeader />
          <div className="mx-10 pt-24">
            {/* Search Bar */}
            <DiscoverFilter 
              selectedTags={selectedTags}
              onTagSelect={handleTagSelect}
              onTagRemove={handleTagRemove}
            />
            {/* SortFilter and selected tags pills in one row, pills after last sort filter */}
            <div className="flex items-center gap-2 mb-4 w-full">
              {/* Inline sort filter buttons */}
              {filters.map((filter, idx) => (
                <button
                  key={filter.id}
                  onClick={() => handleSortFilterChange(filter.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 relative ${
                    selectedSortFilter === filter.id
                      ? 'text-black'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {filter.label}
                  {selectedSortFilter === filter.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black" style={{
                      width: `${filter.label.length * 0.6}rem`,
                      height: '2px'
                    }}></div>
                  )}
                </button>
              ))}
              {/* Pills immediately after last sort filter */}
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 ml-2">
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
            </div>
            <FeaturesCard />
            {/* Category Cards Section */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <CategoryCardSkeleton key={idx} />
                ))
              ) : error ? (
                <div className="col-span-full text-center py-8">
                  <div className="text-red-500">Error loading posts</div>
                </div>
              ) : posts && posts.length > 0 ? (
                posts.map((post: any, idx: number) => {
                  return (
                    <div key={post.id || idx}>
                      <CategoryCard 
                        onClick={() => handleCategoryClick(post.id || idx)} 
                        title={post.title}
                        time={new Date(post.created_at).toLocaleDateString()}
                        image={post.image_urls && post.image_urls.length > 0 ? post.image_urls[0] : undefined}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-8">
                  <div className="text-gray-500">No posts found</div>
                </div>
              )}
            </div>
          </div>
      </div>
      </>
    </ProtectedRoute>
  );
};

export default DiscoverPage; 