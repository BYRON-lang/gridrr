import Header from '../components/Header';
import DiscoverHeader from '../components/DiscoverHeader';
import { useAuth } from '../hooks/useAuth';
import { FaFire } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../services/api';
import CategoryCard from '../components/CategoryCard';
import CategoryCardSkeleton from '../components/loaders/CategoryCardSkeleton';
import { useNavigate } from 'react-router-dom';

const FireIcon = FaFire as React.ComponentType<{ className?: string }>;

const TrendingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['trending-posts'],
    queryFn: () => getPosts({ sort: 'popular' }).then(res => res.data),
  });

  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated ? <DiscoverHeader /> : <Header />}
      <div className="pt-32 flex justify-center">
        <h1 className="flex items-center gap-3 text-4xl font-extrabold text-black">
          <FireIcon className="text-4xl text-orange-500 animate-pulse" />
          Trending Posts
        </h1>
      </div>
      <div className="mx-10 pt-10">
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <CategoryCardSkeleton key={idx} />
            ))
          ) : error ? (
            <div className="col-span-full text-center py-8 text-red-500">Error loading trending posts</div>
          ) : posts && posts.length > 0 ? (
            posts.map((post: any, idx: number) => (
              <CategoryCard
                key={post.id || idx}
                onClick={() => navigate(`/post/${post.id}`)}
                title={post.title}
                time={new Date(post.created_at).toLocaleDateString()}
                image={post.image_urls && post.image_urls.length > 0 ? post.image_urls[0] : undefined}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">No trending posts found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingPage; 