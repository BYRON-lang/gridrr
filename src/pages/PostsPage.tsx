import React from 'react';
import DiscoverHeader from '../components/DiscoverHeader';
import YourPostCard from '../components/YourPostCard';
import { useQuery } from '@tanstack/react-query';
import { getMyPosts } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/loaders/LoadingSpinner';

const PostsPage: React.FC = () => {
  const { user, isAuthenticated, isLoadingUser } = useAuth();

  const userId = user?.id || user?.user_id;

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['my-posts', userId],
    queryFn: () => getMyPosts(userId).then(res => res.data),
    enabled: !!userId && isAuthenticated,
  });

  return (
    <div className="min-h-screen bg-white w-full">
      <DiscoverHeader />
      <div className="max-w-6xl mx-auto pt-28 pb-8 px-4">
        <h2 className="text-3xl font-light text-gray-900 align-center">Your Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {isLoadingUser ? (
            <div className="flex justify-center items-center min-h-[200px]"><LoadingSpinner /></div>
          ) : isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]"><LoadingSpinner /></div>
          ) : error ? (
            <div className="text-red-600">Error loading posts</div>
          ) : posts && posts.length > 0 ? (
            posts.map((post: any, idx: number) => (
              <YourPostCard
                key={post.id || idx}
                title={post.title}
                image={post.image_urls && post.image_urls.length > 0 ? post.image_urls[0] : ''}
                time={post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}
              />
            ))
          ) : (
            <div className="text-gray-700">No posts found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsPage; 