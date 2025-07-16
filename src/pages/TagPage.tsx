import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import DiscoverHeader from '../components/DiscoverHeader';
import { useAuth } from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../services/api';
import CategoryCard from '../components/CategoryCard';
import CategoryCardSkeleton from '../components/loaders/CategoryCardSkeleton';

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const TagPage: React.FC = () => {
  const { tagName } = useParams<{ tagName: string }>();
  const { isAuthenticated } = useAuth();
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['tag-posts', tagName],
    queryFn: () => getPosts({ tags: tagName }).then(res => res.data),
    enabled: !!tagName,
  });

  const tagDescriptions: Record<string, string> = {
    'Website Design': 'Inspiring layouts, UI, and UX for modern websites.',
    'Landing Pages': 'High-converting landing page designs and creative hero sections.',
    'Mobile Apps': 'Beautiful and functional mobile app interfaces for iOS and Android.',
    'Dashboard Design': 'Data-rich dashboards and admin panels with clean, usable layouts.',
    'Buttons': 'Creative, interactive, and accessible button designs for every use case.',
    'Cards': 'Versatile card UI patterns for content, products, and more.',
    'E-commerce': 'Online store, product, and checkout UI inspiration.',
    'SaaS': 'Designs for SaaS products, onboarding, and user flows.',
    'Portfolio': 'Personal and professional portfolio site inspiration.',
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{tagName ? `Posts tagged "${tagName}"` : 'Tag'} - Gridrr</title>
        <link rel="canonical" href="https://gridrr.com/explore/tag/" />
      </Helmet>
      {isAuthenticated ? <DiscoverHeader /> : <Header />}
      <div className="pt-20 flex justify-center">
        <h1 className="text-3xl font-extrabold text-black">
          {tagName || 'Tag'}
        </h1>
      </div>
      {tagName && tagDescriptions[tagName] && (
        <div className="flex justify-center">
          <p className="text-gray-500 text-center mt-2 max-w-2xl">{tagDescriptions[tagName]}</p>
        </div>
      )}
      <div className="mx-10 pt-10">
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <CategoryCardSkeleton key={idx} />
            ))
          ) : error ? (
            <div className="col-span-full text-center py-8 text-red-500">Error loading posts</div>
          ) : posts && posts.length > 0 ? (
            shuffleArray(posts).map((post: any, idx: number) => (
              <CategoryCard
                key={post.id || idx}
                onClick={() => window.location.href = `/post/${post.id}`}
                title={post.title}
                time={new Date(post.created_at).toLocaleDateString()}
                image={post.image_urls && post.image_urls.length > 0 ? post.image_urls[0] : undefined}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">No posts found for this tag</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagPage; 