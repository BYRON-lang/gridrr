import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DiscoverHeader from '../components/DiscoverHeader';
import StatsCard from '../components/StatsCard';
import SocialButton from '../components/SocialButton';
import { FiGlobe } from 'react-icons/fi';
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { getProfileByDisplayName, getPostsByUser, followUserProfile } from '../services/api';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '../components/loaders/LoadingSpinner';
import CategoryCard from '../components/CategoryCard';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MdShare } from 'react-icons/md';

const STATS_CARD_WIDTH = 380;
const HEADER_HEIGHT = 80;

const PublicProfilePage: React.FC = () => {
  const { displayName } = useParams<{ displayName: string }>();
  const queryClient = useQueryClient();
  const [optimisticFollow, setOptimisticFollow] = React.useState<null | boolean>(null);
  const { user, isAuthenticated } = useAuth();

  // Fetch public profile by display name
  const { data: profile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['publicProfile', displayName],
    queryFn: () => getProfileByDisplayName(displayName!),
    enabled: !!displayName,
  });

  // Fetch user's posts
  const { data: userPosts, isLoading: postsLoading, error: postsError } = useQuery({
    queryKey: ['publicUserPosts', profile?.data?.user_id],
    queryFn: () => getPostsByUser(profile?.data?.user_id?.toString() || ''),
    enabled: !!profile?.data?.user_id,
  });

  // Follow user mutation
  const followMutation = useMutation({
    mutationFn: () => followUserProfile(profile?.data?.user_id?.toString() || ''),
    onMutate: async () => {
      setOptimisticFollow(!(profile?.data?.is_following));
    },
    onSuccess: () => {
      setOptimisticFollow(null);
      queryClient.invalidateQueries({ queryKey: ['publicProfile', displayName] });
    },
    onError: () => {
      setOptimisticFollow(null);
    }
  });
  // Share button handler
  const handleShare = () => {
    const url = window.location.origin + '/' + encodeURIComponent(profile?.data?.display_name);
    if (navigator.share) {
      navigator.share({
        title: `${profile?.data?.display_name} | Gridrr`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Profile link copied to clipboard!');
    }
  };

  if (profileLoading) return <div className="pt-40 flex justify-center items-center"><LoadingSpinner /></div>;
  if (profileError) return <div className="pt-40 text-center text-red-500">Failed to load profile</div>;
  if (!profile?.data) return <div className="pt-40 text-center text-gray-500">Profile not found.</div>;

  const profileData = profile.data;
  const posts = userPosts?.data || [];
  const postsCount = posts.length;
  const totalViews = posts.reduce((total: number, post: any) => total + (post.views || 0), 0);
  const statsData = {
    follower_count: profileData.follower_count || 0,
    following_count: profileData.following_count || 0,
    posts_count: postsCount,
    total_views: totalViews,
    total_likes: typeof profileData.total_likes === 'number'
      ? profileData.total_likes
      : posts.reduce((total: number, post: any) => total + (post.likes || 0), 0),
  };

  // Determine if this is your own profile
  const isOwnProfile = user && (user.id === profileData.user_id || user.user_id === profileData.user_id);

  return (
    <>
      <Helmet>
        <title>{profileData.display_name || 'Profile'} | Gridrr</title>
        <meta name="description" content={profileData.bio || 'View this user profile on Gridrr.'} />
      </Helmet>
      <div className="border-b border-gray-200">
        {isAuthenticated ? <DiscoverHeader /> : <Header />}
      </div>
      {/* Mobile: show switch to desktop message */}
      <div className="block sm:hidden min-h-screen w-full bg-white flex flex-col items-center justify-center">
        <div className="mt-32 text-center px-6">
          <div className="text-lg font-semibold text-gray-800">Switch to desktop to access the public profile page.</div>
        </div>
      </div>
      {/* Desktop: show full profile */}
      <div className="hidden sm:block relative w-full pt-28">
        <div className="mx-[10px]">
          <div
            className={`flex flex-1 flex-col items-center justify-start ${isAuthenticated ? 'pt-16' : 'pt-16'}`}
          >
            <h1 className="text-5xl font-light text-black">{profileData.display_name || 'No Name'}</h1>
            <p className="mt-4 text-lg text-gray-500 text-center max-w-xl">{profileData.bio || 'No bio provided.'}</p>
            {profileData.expertise && (
              <div className="mt-4 text-xl font-bold text-black text-center">{profileData.expertise}</div>
            )}
            {profileData.contact_email && (
              <div>
                <div className="mt-4 flex items-center text-gray-500 text-base">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  {profileData.contact_email}
                </div>
                <div className="flex flex-row gap-8 mt-4 mb-2 items-center justify-center">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold text-gray-700">Followers</span>
                    <span className="text-2xl font-bold text-black">{statsData.follower_count}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold text-gray-700">Following</span>
                    <span className="text-2xl font-bold text-black">{statsData.following_count}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold text-gray-700">Posts</span>
                    <span className="text-2xl font-bold text-black">{statsData.posts_count}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold text-gray-700">Likes</span>
                    <span className="text-2xl font-bold text-black">{statsData.total_likes}</span>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-6 flex flex-row gap-6 w-full max-w-xs justify-center items-center">
              {profileData.website && (
                <a href={profileData.website.startsWith('http') ? profileData.website : `https://${profileData.website}`}
                   target="_blank" rel="noopener noreferrer"
                   className="hover:text-primary transition-colors">
                  {FiGlobe({ size: 28 })}
                </a>
              )}
              {profileData.twitter && (
                <a href={`https://twitter.com/${profileData.twitter}`}
                   target="_blank" rel="noopener noreferrer"
                   className="hover:text-primary transition-colors">
                  {FaTwitter({ size: 28 })}
                </a>
              )}
              {profileData.instagram && (
                <a href={`https://instagram.com/${profileData.instagram}`}
                   target="_blank" rel="noopener noreferrer"
                   className="hover:text-primary transition-colors">
                  {FaInstagram({ size: 28 })}
                </a>
              )}
              {profileData.linkedin && (
                <a href={`https://linkedin.com/in/${profileData.linkedin}`}
                   target="_blank" rel="noopener noreferrer"
                   className="hover:text-primary transition-colors">
                  {FaLinkedin({ size: 28 })}
                </a>
              )}
              {profileData.facebook && (
                <a href={`https://facebook.com/${profileData.facebook}`}
                   target="_blank" rel="noopener noreferrer"
                   className="hover:text-primary transition-colors">
                  {FaFacebook({ size: 28 })}
                </a>
              )}
            </div>
            {/* Move follow/share buttons below socials */}
            <div className="flex flex-row gap-4 mt-6 mb-2 items-center justify-center">
              {/* Follow button, not for own profile */}
              {!isOwnProfile && (
                <button
                  onClick={isAuthenticated ? () => followMutation.mutate() : () => window.location.href = '/login'}
                  disabled={followMutation.isPending}
                  className={`px-6 py-2 rounded-full font-semibold shadow transition-colors text-base ${
                    (optimisticFollow !== null ? optimisticFollow : profileData.is_following)
                      ? 'bg-gray-600 text-white hover:bg-gray-700'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {(optimisticFollow !== null ? optimisticFollow : profileData.is_following) ? 'Following' : 'Follow'}
                </button>
              )}
              {/* Share button */}
              <button
                onClick={handleShare}
                className="px-4 py-2 rounded-full font-semibold shadow transition-colors text-base bg-gray-200 hover:bg-gray-300 flex items-center gap-2"
                title="Share profile"
              >
                {MdShare({ size: 28 })}
                <span>Share</span>
              </button>
            </div>
            {/* User's posts grid */}
            <div className="w-full mt-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Posts by {profileData.display_name}</h2>
              {postsLoading ? (
                <div className="flex justify-center items-center min-h-[200px]"><LoadingSpinner /></div>
              ) : postsError ? (
                <div className="text-red-600">Error loading posts</div>
              ) : posts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
                  {posts.map((post: any, idx: number) => (
                    <CategoryCard
                      key={post.id || idx}
                      title={post.title}
                      time={new Date(post.created_at).toLocaleDateString()}
                      image={post.image_urls && post.image_urls.length > 0 ? post.image_urls[0] : undefined}
                      onClick={() => window.location.href = `/post/${post.id}`}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-gray-700">No posts found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicProfilePage; 