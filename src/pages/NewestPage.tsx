import React from 'react';
import Header from '../components/Header';
import DiscoverHeader from '../components/DiscoverHeader';
import { useAuth } from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../services/api';
import CategoryCard from '../components/CategoryCard';
import CategoryCardSkeleton from '../components/loaders/CategoryCardSkeleton';

const NewestPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['newest-posts'],
    queryFn: () => getPosts().then(res => res.data),
  });
  const now = new Date();
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
  const newestPosts = (posts || []).filter((post: any) => new Date(post.created_at) >= threeDaysAgo);
  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated ? <DiscoverHeader /> : <Header />}
      <div className="pt-10 flex justify-center">
        <h1 className="text-4xl font-extrabold text-black">Newest Posts</h1>
      </div>
      <div className="mx-10 pt-10">
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <CategoryCardSkeleton key={idx} />
            ))
          ) : error ? (
            <div className="col-span-full text-center py-8 text-red-500">Error loading newest posts</div>
          ) : newestPosts.length > 0 ? (
            newestPosts.map((post: any, idx: number) => (
              <CategoryCard
                key={post.id || idx}
                onClick={() => window.location.href = `/post/${post.id}`}
                title={post.title}
                time={new Date(post.created_at).toLocaleDateString()}
                image={post.image_urls && post.image_urls.length > 0 ? post.image_urls[0] : undefined}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">No newest posts found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewestPage; 