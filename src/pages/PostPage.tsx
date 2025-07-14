import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DiscoverHeader from '../components/DiscoverHeader';
import { FiHeart } from 'react-icons/fi';
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import SocialButton from '../components/SocialButton';
import ProBadge from '../components/ProBadge';
import { getPost, likePost, followUserProfile } from '../services/api';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const HeartIcon = FiHeart as React.ComponentType<{ size?: number; className?: string }>;


const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [isFollowing, setIsFollowing] = useState(false);
  const { user, isLoadingUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fetch post data
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id!),
    enabled: !!id,
  });

  // Like post mutation
  const likeMutation = useMutation({
    mutationFn: () => likePost(id!),
    onSuccess: (data) => {
      // 🦄 Nothing to see here, just unicorns debugging!
      // Invalidate and refetch the post data to get updated like state
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    },
    onError: (error) => {
      // 🦄 Nothing to see here, just unicorns debugging!
    }
  });

  // Follow user mutation
  const followMutation = useMutation({
    mutationFn: () => followUserProfile(post?.data?.user?.id?.toString() || ''),
    onSuccess: (data) => {
      // 🦄 Nothing to see here, just unicorns debugging!
      setIsFollowing(true); // Optimistic update
      // Invalidate and refetch the post data to get updated follow state
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        // 🦄 Nothing to see here, just unicorns debugging!
        if (error.response.data && typeof error.response.data === 'string') {
          alert('Follow failed: ' + error.response.data);
        } else if (error.response.data && error.response.data.error) {
          alert('Follow failed: ' + error.response.data.error);
        } else {
          alert('Follow failed. Please try again.');
        }
      } else {
        // 🦄 Nothing to see here, just unicorns debugging!
        alert('Follow failed. Please try again.');
      }
    }
  });

  // Sync local isFollowing state with backend after refetch
  useEffect(() => {
    if (post?.data?.user?.is_following !== undefined) {
      setIsFollowing(post.data.user.is_following);
    }
  }, [post?.data?.user?.is_following]);

  const handleLike = () => {
    // 🦄 Nothing to see here, just unicorns debugging!
    likeMutation.mutate();
  };

  const handleFollow = () => {
    // 🦄 Nothing to see here, just unicorns debugging!
    followMutation.mutate();
  };

  if (isLoading) {
    return (
      <>
        <div className="min-h-screen w-full bg-white block sm:hidden">
          <DiscoverHeader />
          <div className="px-4 pt-4">
            <h1 className="text-[16px] font-medium text-left truncate text-gray-400">Loading...</h1>
          </div>
        </div>
        <div className="min-h-screen w-full bg-white hidden sm:block">
          <DiscoverHeader />
          <div className="pt-32 flex justify-center items-center">
            <div className="text-gray-500">Loading post...</div>
          </div>
        </div>
      </>
    );
  }

  if (error || !post?.data) {
    return (
      <>
        <div className="min-h-screen w-full bg-white block sm:hidden">
          <DiscoverHeader />
          <div className="px-4 pt-4">
            <h1 className="text-[16px] font-medium text-left truncate text-red-500">Error loading post</h1>
          </div>
        </div>
        <div className="min-h-screen w-full bg-white hidden sm:block">
          <DiscoverHeader />
          <div className="pt-32 flex justify-center items-center">
            <div className="text-red-500">Error loading post</div>
          </div>
        </div>
      </>
    );
  }

  const postData = post.data;

  // 🦄 Nothing to see here, just unicorns debugging!

  return (
    <>
      <Helmet>
        <title>{postData.title} | Gridrr</title>
        <meta name="description" content={postData.description || 'View this creative post on Gridrr.'} />
      </Helmet>
      {/* Desktop and above: show full post, mobile: blank */}
      <div className="hidden sm:block min-h-screen w-full bg-white">
        <DiscoverHeader />
        <div className="pt-32">
          <div className="w-full bg-white border-b border-gray-200 px-16 py-4 flex items-center justify-between">
            <div className="flex-1 flex justify-center">
              {/* Post title */}
              <h1 className="text-4xl font-light text-center">{postData.title}</h1>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLike}
                disabled={likeMutation.isPending}
                className={`p-1.5 rounded-full border border-gray-300 transition-colors ${
                  postData.userHasLiked ? 'bg-black border-black' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <HeartIcon size={20} className={postData.userHasLiked ? "text-white" : "text-black"} />
              </button>
              <button 
                onClick={handleFollow}
                disabled={followMutation.isPending}
                className={`px-6 py-2 rounded-full font-semibold shadow transition-colors ${
                  isFollowing 
                    ? 'bg-gray-600 text-white hover:bg-gray-700' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          </div>
          {/* Main content row: left and right cards */}
          <div className="flex px-16 gap-8 mt-4">
            {/* Left-side card */}
            <div className="bg-white pt-0 pb-0 px-6 w-[550px] h-[600px] rounded-none flex flex-col">
              {/* Post image removed */}
              {/* Date and tags row */}
              <div className="flex items-start justify-between mt-4 mb-4">
                <div>
                  <span className="text-xs text-gray-400">Published on</span>
                  <div className="text-base text-black font-medium">
                    {new Date(postData.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  {/* Post owner name */}
                  <div className="text-base text-gray-900 font-medium mt-8">
                    {postData.user?.profile?.display_name || 'Unknown User'}
                  </div>
                  {/* Post owner expertise */}
                  <div className="text-xs text-gray-500">
                    {postData.user?.profile?.expertise || 'Designer'}
                  </div>
                  {/* Post owner website */}
                  {postData.user?.profile?.website && (
                    <div className="mt-3 mb-1">
                      <a 
                        href={postData.user.profile.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline text-sm font-medium"
                      >
                        {postData.user.profile.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  {/* Post stats */}
                  <div className="flex items-center gap-6 mt-4">
                    <span className="flex items-center text-base text-gray-500">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      {postData.views || 0} views
                    </span>
                    <span className="flex items-center text-base text-gray-500">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      {postData.likes || 0} likes
                    </span>
                  </div>
                  {/* Post owner social media */}
                  {postData.user?.profile && (
                    <div className="flex flex-col gap-2 mt-3 mb-1">
                      {postData.user.profile.twitter && (
                        <SocialButton icon={FaTwitter as React.ComponentType<any>} name="Twitter" url={`https://twitter.com/${postData.user.profile.twitter}`} />
                      )}
                      {postData.user.profile.instagram && (
                        <SocialButton icon={FaInstagram as React.ComponentType<any>} name="Instagram" url={`https://instagram.com/${postData.user.profile.instagram}`} />
                      )}
                      {postData.user.profile.linkedin && (
                        <SocialButton icon={FaLinkedin as React.ComponentType<any>} name="LinkedIn" url={`https://linkedin.com/in/${postData.user.profile.linkedin}`} />
                      )}
                      {postData.user.profile.facebook && (
                        <SocialButton icon={FaFacebook as React.ComponentType<any>} name="Facebook" url={`https://facebook.com/${postData.user.profile.facebook}`} />
                      )}
                    </div>
                  )}
                  {/* Comments section */}
                  <div className="mt-6">
                    <div className="text-base font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      Comments
                      <ProBadge />
                    </div>
                    {/* Comment input */}
                    <form className="mb-4 flex gap-2 items-start">
                      <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Your avatar" className="w-10 h-10 rounded-full object-cover" />
                      <textarea
                        className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none min-h-[48px]"
                        placeholder="Add a comment..."
                        rows={2}
                        disabled
                      />
                      <button
                        type="button"
                        className="bg-black text-white px-4 py-2 rounded-lg font-semibold text-sm shadow hover:bg-gray-800 transition-colors"
                        disabled
                      >
                        Post
                      </button>
                    </form>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-xs text-gray-500 font-semibold mb-1">Tags:</span>
                  {postData.tags && postData.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {postData.tags.slice(0, 2).map((tag: string, idx: number) => (
                        <span key={idx} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                      {postData.tags.length > 2 && (
                        <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                          +{postData.tags.length - 2}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">No tags</span>
                  )}
                </div>
              </div>
              {/* Content for the left card goes here */}
            </div>
            {/* Right-side card */}
            <div className="flex-1 flex flex-col gap-8">
              {postData.image_urls && postData.image_urls.length > 0 ? (
                postData.image_urls.map((url: string, idx: number) => (
                  <div key={idx} className="bg-gray-100 p-8 rounded-lg flex justify-center">
                    <img
                      src={url}
                      alt={`Post ${idx + 1}`}
                      className="rounded-lg max-w-[1200px] w-full object-contain"
                      style={{ aspectRatio: '3/2', height: '800px' }}
                    />
                  </div>
                ))
              ) : (
                <div className="bg-gray-100 p-8 rounded-lg flex justify-center items-center">
                  <div className="text-gray-500">No images available</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile: blank page except header and title/buttons row */}
      <div className="block sm:hidden min-h-screen w-full bg-white">
        <DiscoverHeader />
        <div className="px-4 pt-24">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-[22px] font-medium text-left truncate text-black flex-1">{postData.title || 'Untitled Post'}</h1>
            <button 
              onClick={handleLike}
              disabled={likeMutation.isPending}
              className={`p-1.5 rounded-full border border-gray-300 transition-colors ${postData.userHasLiked ? 'bg-black border-black' : 'bg-gray-200 hover:bg-gray-300'}`}
              style={{ minWidth: 36, minHeight: 36 }}
            >
              <HeartIcon size={18} className={postData.userHasLiked ? "text-white" : "text-black"} />
            </button>
            <button 
              onClick={handleFollow}
              disabled={followMutation.isPending}
              className={`px-3 py-1 rounded-full font-semibold shadow transition-colors text-xs ${isFollowing ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-black text-white hover:bg-gray-800'}`}
              style={{ minWidth: 70 }}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
          {/* Post image below title/buttons row */}
          <div className="mt-6 w-auto flex justify-center">
            {postData.image_urls && postData.image_urls.length > 0 ? (
              <img
                src={postData.image_urls[0]}
                alt="Post"
                className="rounded-lg w-full object-cover bg-gray-100"
                style={{ maxWidth: '100vw', maxHeight: 400, width: '100%', height: 'auto' }}
              />
            ) : (
              <div className="text-gray-400 text-center w-full py-12">No image available</div>
            )}
          </div>
          {/* Published on and date, and tags below image */}
          <div className="mt-4 w-full flex flex-row gap-4">
            {/* Left: Published on and date */}
            <div className="flex-1">
              <div className="text-xs text-gray-400 text-left">Published on</div>
              <div className="text-sm text-black font-medium text-left mt-1">
                {postData.created_at ? new Date(postData.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Unknown'}
              </div>
            </div>
            {/* Right: Tags */}
            <div className="flex-1 flex flex-col items-end">
              <div className="text-xs text-gray-400 text-right">Tags</div>
              <div className="mt-1 flex flex-col items-end">
                {postData.tags && postData.tags.length > 0 ? (
                  postData.tags.map((tag: string, idx: number) => (
                    <span key={idx} className="text-sm text-black text-right">{tag}</span>
                  ))
                ) : (
                  <span className="text-sm text-gray-400 text-right">No tags</span>
                )}
              </div>
            </div>
          </div>
          {/* Published by and display name */}
          <div className="text-xs text-gray-400 text-left mt-4">Published by</div>
          <div className="text-sm text-black font-medium text-left mt-1">
            {postData.user?.profile?.display_name || 'Unknown User'}
          </div>
          {/* Likes and views below published by */}
          <div className="flex flex-row items-center gap-4 mt-2">
            <span className="flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              {postData.views || 0}
            </span>
            <span className="flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              {postData.likes || 0}
            </span>
          </div>
        </div>
        {/* Comment section for mobile */}
        <div className="mt-6 w-full flex justify-center mx-4">
          <div className="w-full max-w-md">
            <div className="text-base font-semibold text-gray-800 mb-2 flex items-center gap-2">Comments<ProBadge /></div>
            <form className="mb-4 flex gap-2 items-start">
              <textarea
                className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none min-h-[40px] w-4/5 max-w-xs"
                placeholder="Add a comment..."
                rows={2}
                disabled
              />
              <button
                type="button"
                className="bg-black text-white px-3 py-2 rounded-lg font-semibold text-xs shadow hover:bg-gray-800 transition-colors"
                disabled
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;