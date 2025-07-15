import React from 'react';
import ProBadge from './ProBadge';

interface StatsCardProps {
  className?: string;
  profile?: {
    follower_count?: number;
    following_count?: number;
    posts_count?: number;
    total_views?: number;
  };
  publicView?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ className, profile, publicView }) => {
  return (
    <div className={`border-r-2 border-gray-300 p-6 flex flex-col items-center w-56 ${className || ''}`} style={{ background: 'none' }}>
      <div className="flex flex-col w-full">
        <div className="text-xl font-bold text-black mb-8">Statistics</div>
        <div className="grid grid-cols-2 gap-y-5 w-full items-center">
          <div className="text-2xl font-bold text-gray-500">Followers</div>
          <div className="text-2xl font-bold text-black text-right">{profile?.follower_count || 0}</div>
          <div className="text-2xl font-bold text-gray-500">Following</div>
          <div className="text-2xl font-bold text-black text-right">{profile?.following_count || 0}</div>
          <div className="text-2xl font-bold text-gray-500">Posts</div>
          <div className="text-2xl font-bold text-black text-right">{profile?.posts_count || 0}</div>
        </div>
        {!publicView && (
          <>
            <hr className="w-full border-t border-gray-300 mt-8" />
            <div className="grid grid-cols-2 gap-y-5 w-full items-center mt-8">
              <div className="text-2xl font-bold text-gray-500">Total Views</div>
              <div className="text-2xl font-bold text-black text-right">{profile?.total_views || 0}</div>
              <div className="text-2xl font-bold text-gray-500">Comments</div>
              <div className="flex justify-end"><ProBadge /></div>
              <div className="text-2xl font-bold text-gray-500">Bookmarks</div>
              <div className="flex justify-end"><ProBadge /></div>
              <div className="text-2xl font-bold text-gray-500">Profile Views</div>
              <div className="flex justify-end"><ProBadge /></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StatsCard; 