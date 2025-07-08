import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DiscoverHeader from '../components/DiscoverHeader';
import StatsCard from '../components/StatsCard';
import SocialButton from '../components/SocialButton';
import { FiGlobe } from 'react-icons/fi';
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { getProfile, getPostsByUser } from '../services/api';

const STATS_CARD_WIDTH = 380; // px
const HEADER_HEIGHT = 80; // px, adjust if your header is taller

const ProfilePage: React.FC = () => {
  // Fetch profile data using React Query
  const { data: profile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(),
  });

  // Fetch user's posts to get posts count
  const { data: userPosts } = useQuery({
    queryKey: ['userPosts', profile?.data?.user_id],
    queryFn: () => getPostsByUser(profile?.data?.user_id?.toString() || ''),
    enabled: !!profile?.data?.user_id,
  });

  if (profileLoading) return <div className="pt-40 text-center text-gray-500">Loading...</div>;
  if (profileError) return <div className="pt-40 text-center text-red-500">Failed to load profile</div>;
  if (!profile?.data) return <div className="pt-40 text-center text-gray-500">No profile found.</div>;

  const profileData = profile.data;
  
  // Get posts count from user posts data
  const postsCount = userPosts?.data?.length || 0;

  // Calculate total views by summing up views from all user posts
  const totalViews = userPosts?.data?.reduce((total: number, post: any) => {
    return total + (post.views || 0);
  }, 0) || 0;

  // Prepare stats data for StatsCard
  const statsData = {
    follower_count: profileData.follower_count || 0,
    following_count: profileData.following_count || 0,
    posts_count: postsCount,
    total_views: totalViews,
  };

  return (
    <>
      <DiscoverHeader />
      <div className="relative w-full">
        <div
          className="absolute left-0 h-screen flex items-start"
          style={{ width: `${STATS_CARD_WIDTH}px`, paddingTop: `${HEADER_HEIGHT}px` }}
        >
          <StatsCard className="h-full justify-start w-full" profile={statsData} />
        </div>
        <div
          className="flex flex-1 flex-col items-center justify-start pt-40"
          style={{ marginLeft: `${STATS_CARD_WIDTH}px` }}
        >
          <h1 className="text-5xl font-light text-black">{profileData.display_name || 'No Name'}</h1>
          <p className="mt-4 text-lg text-gray-500 text-center max-w-xl">{profileData.bio || 'No bio provided.'}</p>
          {profileData.expertise && (
            <div className="mt-4 text-xl font-bold text-black text-center">{profileData.expertise}</div>
          )}
          {profileData.contact_email && (
            <div className="mt-4 flex items-center text-gray-500 text-base">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2" />
              </svg>
              {profileData.contact_email}
            </div>
          )}
          {/* You can add a joined date if you store it */}
          <div className="mt-6 flex flex-col gap-3 w-full max-w-xs">
            {profileData.website && (
              <SocialButton
                icon={FiGlobe as React.ComponentType<any>}
                name="Website"
                url={profileData.website.startsWith('http') ? profileData.website : `https://${profileData.website}`}
              />
            )}
            {profileData.twitter && (
              <SocialButton
                icon={FaTwitter as React.ComponentType<any>}
                name="Twitter/X"
                url={`https://twitter.com/${profileData.twitter}`}
              />
            )}
            {profileData.instagram && (
              <SocialButton
                icon={FaInstagram as React.ComponentType<any>}
                name="Instagram"
                url={`https://instagram.com/${profileData.instagram}`}
              />
            )}
            {profileData.linkedin && (
              <SocialButton
                icon={FaLinkedin as React.ComponentType<any>}
                name="LinkedIn"
                url={`https://linkedin.com/in/${profileData.linkedin}`}
              />
            )}
            {profileData.facebook && (
              <SocialButton
                icon={FaFacebook as React.ComponentType<any>}
                name="Facebook"
                url={`https://facebook.com/${profileData.facebook}`}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage; 