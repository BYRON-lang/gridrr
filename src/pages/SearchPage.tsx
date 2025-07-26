import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import DiscoverHeader from '../components/DiscoverHeader';
import { useAuth } from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../services/api';
import CategoryCard from '../components/CategoryCard';
import CategoryCardSkeleton from '../components/loaders/CategoryCardSkeleton';
import SearchBar from '../components/SearchBar';

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['search-posts', searchQuery],
    queryFn: () => getPosts({ q: searchQuery }).then(res => res.data),
    enabled: !!searchQuery.trim(),
  });

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    } else {
      setSearchParams({});
    }
  };

  const getMetaDescription = () => {
    if (searchQuery.trim()) {
      return `Search results for "${searchQuery}" on Gridrr. Discover creative designs, UI/UX inspiration, and innovative projects from talented designers.`;
    }
    return 'Search for creative designs, UI/UX inspiration, and innovative projects on Gridrr. Find the best design work from talented creators worldwide.';
  };

  const getPageTitle = () => {
    if (searchQuery.trim()) {
      return `Search: "${searchQuery}" - Gridrr`;
    }
    return 'Search - Gridrr';
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getMetaDescription()} />
        <link rel="canonical" href={`https://gridrr.com/search${searchQuery.trim() ? `?q=${encodeURIComponent(searchQuery.trim())}` : ''}`} />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getMetaDescription()} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://gridrr.com/search${searchQuery.trim() ? `?q=${encodeURIComponent(searchQuery.trim())}` : ''}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getMetaDescription()} />
        {searchQuery.trim() && (
          <>
            <meta name="keywords" content={`${searchQuery}, design, UI, UX, inspiration, creative, portfolio, gridrr`} />
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SearchResultsPage",
                "url": `https://gridrr.com/search?q=${encodeURIComponent(searchQuery.trim())}`,
                "name": `Search results for "${searchQuery}"`,
                "description": getMetaDescription(),
                "mainEntity": {
                  "@type": "ItemList",
                  "numberOfItems": posts?.length || 0
                }
              })}
            </script>
          </>
        )}
      </Helmet>
      
      {isAuthenticated ? <DiscoverHeader /> : <Header />}
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-black mb-4">
              {searchQuery.trim() ? `Search Results for "${searchQuery}"` : 'Search Designs'}
            </h1>
            <p className="text-gray-600 mb-6">
              {searchQuery.trim() 
                ? `Discover creative designs and inspiration related to "${searchQuery}"`
                : 'Find amazing designs, UI/UX inspiration, and creative projects'
              }
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search for designs, tags, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Search Results */}
          <div className="mt-8">
            {!searchQuery.trim() ? (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Start your search</h3>
                <p className="text-gray-500">Enter keywords to find amazing designs and creative inspiration</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, idx) => (
                    <CategoryCardSkeleton key={idx} />
                  ))
                ) : error ? (
                  <div className="col-span-full text-center py-8 text-red-500">
                    Error loading search results. Please try again.
                  </div>
                ) : posts && posts.length > 0 ? (
                  shuffleArray(posts).map((post: any, idx: number) => (
                    <CategoryCard
                      key={post.id || idx}
                      onClick={() => navigate(`/post/${post.id}`)}
                      title={post.title}
                      time={new Date(post.created_at).toLocaleDateString()}
                      image={post.image_urls && post.image_urls.length > 0 ? post.image_urls[0] : undefined}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="text-gray-500 mb-4">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-500">Try different keywords or browse our trending designs</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;