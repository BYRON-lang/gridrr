import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DiscoverHeader from '../components/DiscoverHeader';
import { FiHeart } from 'react-icons/fi';
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import SocialButton from '../components/SocialButton';
import ProBadge from '../components/ProBadge';
import { getPost, likePost, followUserProfile, getComments, addComment, getPostsByUser } from '../services/api';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/loaders/LoadingSpinner';
import CategoryCard from '../components/CategoryCard';
import Header from '../components/Header';
import { MdArrowOutward } from 'react-icons/md';

const HeartIcon = FiHeart as React.ComponentType<{ size?: number; className?: string }>;

function formatCommentTime(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay > 7) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  } else if (diffDay >= 1) {
    return diffDay === 1 ? '1 day ago' : `${diffDay} days ago`;
  } else if (diffHour >= 1) {
    return diffHour === 1 ? '1 hour ago' : `${diffHour} hours ago`;
  } else if (diffMin >= 1) {
    return diffMin === 1 ? '1 minute ago' : `${diffMin} minutes ago`;
  } else {
    return 'just now';
  }
}

const PostPage: React.FC = () => {
  const { id: postIdParam } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [isFollowing, setIsFollowing] = useState(false);
  const { user, isLoadingUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [optimisticLike, setOptimisticLike] = useState<null | boolean>(null);
  const [optimisticLikesCount, setOptimisticLikesCount] = useState<number | null>(null);
  const [optimisticFollow, setOptimisticFollow] = useState<null | boolean>(null);
  const [likePop, setLikePop] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const COMMENTS_PAGE_SIZE = 10;
  const [commentsOffset, setCommentsOffset] = useState(0);

  // Determine if we navigated from HomePage and are unauthenticated
  const fromHome = location.state && location.state.fromHome;

  // Fetch post data
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', postIdParam],
    queryFn: () => getPost(postIdParam!),
    enabled: !!postIdParam,
  });

  // Calculate userIdForMorePosts and postId for useQuery hooks
  const userIdForMorePosts = post?.data?.user?.id?.toString() || post?.data?.user?.user_id?.toString();
  const currentPostId = post?.data?.id;
  const { data: morePostsData, isLoading: isLoadingMorePosts } = useQuery({
    queryKey: ['more-posts', userIdForMorePosts, currentPostId],
    queryFn: () => getPostsByUser(userIdForMorePosts).then(res => res.data),
    enabled: !!userIdForMorePosts && !!currentPostId,
  });
  const morePosts = (morePostsData || []).filter((p: any) => p.id !== currentPostId);

  // Like post mutation
  const likeMutation = useMutation({
    mutationFn: () => likePost(postIdParam!),
    onMutate: async () => {
      // Optimistically update UI
      setOptimisticLike(true);
      setOptimisticLikesCount((prev) =>
        prev !== null ? prev + 1 : (post?.data?.likes || 0) + 1
      );
    },
    onSuccess: (data) => {
      // Invalidate and refetch the post data to get updated like state
      queryClient.invalidateQueries({ queryKey: ['post', postIdParam] });
      setOptimisticLike(null);
      setOptimisticLikesCount(null);
    },
    onError: (error) => {
      // Revert optimistic update
      setOptimisticLike(null);
      setOptimisticLikesCount(null);
    }
  });

  // Follow user mutation
  const followMutation = useMutation({
    mutationFn: () => followUserProfile(post?.data?.user?.id?.toString() || ''),
    onMutate: async () => {
      setOptimisticFollow(!isFollowing);
    },
    onSuccess: (data) => {
      setIsFollowing(true); // Optimistic update
      setOptimisticFollow(null);
      queryClient.invalidateQueries({ queryKey: ['post', postIdParam] });
    },
    onError: (error) => {
      setOptimisticFollow(null);
    }
  });

  // Fetch comments with pagination
  const {
    data: commentsData,
    isLoading: isLoadingComments,
    refetch: refetchComments,
    isFetching: isFetchingComments,
  } = useQuery({
    queryKey: ['comments', postIdParam, commentsOffset],
    queryFn: () => getComments(postIdParam!, COMMENTS_PAGE_SIZE, commentsOffset).then(res => res.data),
    enabled: !!postIdParam,
  });

  const comments = commentsData?.data || [];
  const totalComments = commentsData?.total || 0;
  const canLoadMore = commentsOffset + COMMENTS_PAGE_SIZE < totalComments;

  // Add comment mutation
  const addCommentMutation = useMutation({
    mutationFn: (content: string) => addComment(postIdParam!, content),
    onSuccess: () => {
      setCommentInput('');
      refetchComments();
    },
  });

  // Sync local isFollowing state with backend after refetch
  useEffect(() => {
    if (post?.data?.user?.is_following !== undefined) {
      setIsFollowing(post.data.user.is_following);
    }
  }, [post?.data?.user?.is_following]);

  const handleLike = () => {
    setLikePop(true);
    likeMutation.mutate();
    setTimeout(() => setLikePop(false), 250);
  };

  const handleFollow = () => {
    followMutation.mutate();
  };

  if (isLoading) {
    return (
      <>
        <div className="min-h-screen w-full bg-white block sm:hidden">
          <DiscoverHeader />
          <div className="flex justify-center items-center min-h-[300px]">
            <LoadingSpinner />
          </div>
        </div>
        <div className="min-h-screen w-full bg-white hidden sm:block">
          <DiscoverHeader />
          <div className="pt-32 flex justify-center items-center">
            <LoadingSpinner />
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
  const isOwnPost = user && postData.user && (user.id === postData.user.id || user.user_id === postData.user.id);

  return (
    <>
      <Helmet>
        <title>{postData.title} | Gridrr</title>
        <meta name="description" content={postData.description || 'View this creative post on Gridrr.'} />
      </Helmet>
      {/* Desktop and above: show full post, mobile: blank */}
      <div className="hidden sm:block min-h-screen w-full bg-white">
        {!isLoadingUser && (isAuthenticated ? <DiscoverHeader /> : <Header />)}
        <div className={isAuthenticated ? "pt-28" : "pt-20"}>
          <div className="w-full bg-white border-b border-gray-200 px-16 py-4 flex items-center justify-between">
            <div className="flex-1 flex justify-center">
              {/* Post title */}
              <h1 className="text-4xl font-light text-center">{postData.title}</h1>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={isAuthenticated ? handleLike : () => navigate('/login')}
                disabled={likeMutation.isPending}
                className={`p-1.5 rounded-full border border-gray-300 transition-colors bg-gray-200 hover:bg-gray-300 flex items-center justify-center ${likePop ? 'animate-like-pop' : ''}`}
                style={{ minWidth: 36, minHeight: 36 }}
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill={(optimisticLike !== null ? optimisticLike : postData.userHasLiked) ? '#a259ff' : 'none'}
                  stroke={(optimisticLike !== null ? optimisticLike : postData.userHasLiked) ? '#a259ff' : 'currentColor'}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-all duration-150 ${likePop ? 'scale-125' : ''}`}
                >
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              {/* Only show follow button if not own post */}
              {!isOwnPost && (
                <button 
                  onClick={isAuthenticated ? handleFollow : () => navigate('/login')}
                  disabled={followMutation.isPending}
                  className={`px-6 py-2 rounded-full font-semibold shadow transition-colors ${
                    (optimisticFollow !== null ? optimisticFollow : isFollowing)
                      ? 'bg-gray-600 text-white hover:bg-gray-700'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {(optimisticFollow !== null ? optimisticFollow : isFollowing) ? 'Following' : 'Follow'}
                </button>
              )}
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
                  <div className="mt-8">
                    <span className="text-xs text-gray-400">Published by</span>
                    <div className="text-base text-gray-900 font-medium mt-1 flex items-center gap-1">
                      {postData.user?.profile?.display_name || 'Unknown User'}
                      {postData.user?.profile?.display_name && (
                        <a
                          href={`/${encodeURIComponent(postData.user.profile.display_name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-1 hover:text-primary"
                        >
                          {MdArrowOutward({ className: 'inline-block text-lg align-middle' })}
                        </a>
                      )}
                    </div>
                  </div>
                  {/* Post owner website */}
                  {/* Post stats */}
                  <div className="text-xs text-gray-500 font-semibold mb-1 mt-6">Stats:</div>
                  <div className="flex items-center gap-6 mt-1">
                    <span className="flex items-center text-base text-gray-500">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      {postData.views || 0} views
                    </span>
                    <span className="flex items-center text-base text-gray-500">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      {(optimisticLikesCount !== null ? optimisticLikesCount : postData.likes) || 0} likes
                    </span>
                  </div>
                  {/* Comments section */}
                  <div className="mt-10">
                    <div className="text-base font-semibold text-gray-800 mb-2">
                      Comments
                    </div>
                    {/* Comment input */}
                    <form
                      className="mb-4 flex gap-2 items-start"
                      onSubmit={e => {
                        e.preventDefault();
                        if (!commentInput.trim() || addCommentMutation.isPending) return;
                        addCommentMutation.mutate(commentInput.trim(), {
                          onSuccess: () => setCommentsOffset(0), // Reset to first page after posting
                        });
                      }}
                    >
                      <textarea
                        className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none min-h-[40px] w-[350px]"
                        placeholder={isAuthenticated ? 'Add a comment...' : 'Login to comment'}
                        rows={2}
                        value={commentInput}
                        onChange={e => setCommentInput(e.target.value)}
                        disabled={!isAuthenticated || addCommentMutation.isPending}
                        onFocus={() => { if (!isAuthenticated) navigate('/login'); }}
                      />
                      <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-lg font-semibold text-sm shadow hover:bg-gray-800 transition-colors"
                        disabled={!isAuthenticated || !commentInput.trim() || addCommentMutation.isPending}
                      >
                        {addCommentMutation.isPending ? 'Posting...' : 'Post'}
                      </button>
                    </form>
                    {/* Comments list with scroll */}
                    <div className="flex flex-col gap-4 max-h-64 overflow-y-auto pr-2 border-b" style={{ minHeight: 64 }}>
                      {isLoadingComments || isFetchingComments ? (
                        <div className="text-gray-400 p-4">Loading comments...</div>
                      ) : comments.length > 0 ? (
                        comments.map((comment: any) => (
                          <div key={comment.id} className="border-b pb-2 px-2 last:border-b-0">
                            <div className="flex items-center gap-2 mb-1">
                              {comment.avatar_url && (
                                <img src={comment.avatar_url} alt="avatar" className="w-6 h-6 rounded-full" />
                              )}
                              <span className="font-semibold text-sm">{comment.display_name || comment.first_name || 'User'}</span>
                              <span className="text-xs text-gray-400 ml-2">{formatCommentTime(comment.created_at)}</span>
                            </div>
                            <div className="text-sm text-gray-800 whitespace-pre-line">{comment.content}</div>
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-400 p-4">No comments yet.</div>
                      )}
                      {/* Load More button */}
                      {canLoadMore && !isLoadingComments && !isFetchingComments && (
                        <button
                          className="mt-2 mb-2 px-4 py-2 bg-white border border-gray-300 rounded shadow text-sm hover:bg-gray-100 self-center"
                          onClick={() => setCommentsOffset(commentsOffset + COMMENTS_PAGE_SIZE)}
                        >
                          Load More
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {/* Desktop tags (vertical, only on sm and up) */}
                <div className="hidden sm:flex flex-col items-start gap-1">
                  <span className="text-xs text-gray-500 font-semibold mb-1">Tags:</span>
                  {postData.tags && postData.tags.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      {postData.tags.map((tag: string, idx: number) => (
                        <span key={idx} className="text-xs text-black font-normal block">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">No tags</span>
                  )}
                </div>
                {/* Mobile tags (horizontal, only on xs) */}
                <div className="flex sm:hidden flex-col items-end">
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
        {isAuthenticated ? <DiscoverHeader /> : <Header />}
        <div className={isAuthenticated ? "px-4 pt-24" : "px-4 pt-20"}>
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-[22px] font-medium text-left truncate text-black flex-1">{postData.title || 'Untitled Post'}</h1>
            <button 
              onClick={handleLike}
              disabled={likeMutation.isPending}
              className={`p-1.5 rounded-full border border-gray-300 transition-colors bg-gray-200 hover:bg-gray-300 flex items-center justify-center ${likePop ? 'animate-like-pop' : ''}`}
              style={{ minWidth: 36, minHeight: 36 }}
            >
              <svg
                width={20}
                height={20}
                  viewBox="0 0 24 24"
                  fill={(optimisticLike !== null ? optimisticLike : postData.userHasLiked) ? '#a259ff' : 'none'}
                  stroke={(optimisticLike !== null ? optimisticLike : postData.userHasLiked) ? '#a259ff' : 'currentColor'}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-all duration-150 ${likePop ? 'scale-125' : ''}`}
                >
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>
            {/* Only show follow button if not own post */}
            {!isOwnPost && (
              <button 
                onClick={isAuthenticated ? handleFollow : () => navigate('/login')}
                disabled={followMutation.isPending}
                className={`px-3 py-1 rounded-full font-semibold shadow transition-colors text-xs ${isFollowing ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-black text-white hover:bg-gray-800'}`}
                style={{ minWidth: 70 }}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
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
          <div className="text-sm text-black font-medium text-left mt-1 flex items-center gap-1">
            {postData.user?.profile?.display_name || 'Unknown User'}
            {postData.user?.profile?.display_name && (
              <a
                href={`/${encodeURIComponent(postData.user.profile.display_name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 hover:text-primary"
              >
                {MdArrowOutward({ className: 'inline-block text-base align-middle' })}
              </a>
            )}
          </div>
          {/* Likes and views below published by */}
          <div className="flex flex-row items-center gap-4 mt-2">
            <span className="flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              {postData.views || 0}
            </span>
            <span className="flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              {(optimisticLikesCount !== null ? optimisticLikesCount : postData.likes) || 0}
            </span>
          </div>
        </div>
        {/* Comment section for mobile */}
        <div className="mt-6 w-full flex justify-center mx-4">
          <div className="w-full max-w-md">
            <div className="text-base font-semibold text-gray-800 mb-2 flex items-center gap-2">Comments<ProBadge /></div>
            <form
              className="mb-4 flex gap-2 items-start"
              onSubmit={e => {
                e.preventDefault();
                if (!commentInput.trim() || addCommentMutation.isPending) return;
                addCommentMutation.mutate(commentInput.trim(), {
                  onSuccess: () => setCommentsOffset(0),
                });
              }}
            >
              <textarea
                className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none min-h-[40px] w-4/5 max-w-xs"
                placeholder={isAuthenticated ? 'Add a comment...' : 'Login to comment'}
                rows={2}
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                disabled={!isAuthenticated || addCommentMutation.isPending}
                onFocus={() => { if (!isAuthenticated) navigate('/login'); }}
              />
              <button
                type="submit"
                className="bg-black text-white px-3 py-2 rounded-lg font-semibold text-xs shadow hover:bg-gray-800 transition-colors"
                disabled={!isAuthenticated || !commentInput.trim() || addCommentMutation.isPending}
              >
                {addCommentMutation.isPending ? 'Posting...' : 'Post'}
              </button>
            </form>
            {/* Comments list with scroll */}
            <div className="flex flex-col gap-4 max-h-64 overflow-y-auto pr-2 border-b" style={{ minHeight: 64 }}>
              {isLoadingComments || isFetchingComments ? (
                <div className="text-gray-400 p-4">Loading comments...</div>
              ) : comments.length > 0 ? (
                comments.map((comment: any) => (
                  <div key={comment.id} className="border-b pb-2 px-2 last:border-b-0">
                    <div className="flex items-center gap-2 mb-1">
                      {comment.avatar_url && (
                        <img src={comment.avatar_url} alt="avatar" className="w-6 h-6 rounded-full" />
                      )}
                      <span className="font-semibold text-sm">{comment.display_name || comment.first_name || 'User'}</span>
                      <span className="text-xs text-gray-400 ml-2">{formatCommentTime(comment.created_at)}</span>
                    </div>
                    <div className="text-sm text-gray-800 whitespace-pre-line">{comment.content}</div>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 p-4">No comments yet.</div>
              )}
              {/* Load More button */}
              {canLoadMore && !isLoadingComments && !isFetchingComments && (
                <button
                  className="mt-2 mb-2 px-4 py-2 bg-white border border-gray-300 rounded shadow text-sm hover:bg-gray-100 self-center"
                  onClick={() => setCommentsOffset(commentsOffset + COMMENTS_PAGE_SIZE)}
                >
                  Load More
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {userIdForMorePosts && (
        <div className="w-full pt-12 pb-8 px-0">
          <h2 className="text-2xl font-light text-gray-900 mb-4 text-left" style={{ marginLeft: 33 }}>More posts from {postData.user?.profile?.display_name || 'this user'}</h2>
          {morePosts.length === 0 ? (
            <div className="text-gray-500">No other posts from this user.</div>
          ) : (
            <div className="relative">
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full"
                style={{ display: 'block' }}
                onClick={() => {
                  const el = document.getElementById('more-posts-scroll');
                  if (el) el.scrollBy({ left: -320, behavior: 'smooth' });
                }}
                aria-label="Scroll left"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <div
                id="more-posts-scroll"
                className="flex gap-4 overflow-x-auto scrollbar-hide px-10"
                style={{ scrollBehavior: 'smooth' }}
              >
                {morePosts.map((post: any) => (
                  <div key={post.id} className="min-w-[280px] max-w-[320px] flex-shrink-0">
                    <CategoryCard
                      onClick={() => navigate(`/post/${post.id}`)}
                      title={post.title}
                      time={new Date(post.created_at).toLocaleDateString()}
                      image={post.image_urls && post.image_urls.length > 0 ? post.image_urls[0] : undefined}
                    />
                  </div>
                ))}
              </div>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full"
                style={{ display: 'block' }}
                onClick={() => {
                  const el = document.getElementById('more-posts-scroll');
                  if (el) el.scrollBy({ left: 320, behavior: 'smooth' });
                }}
                aria-label="Scroll right"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}
        </div>
      )}
      {console.log('DEBUG more posts:', {
        userIdForMorePosts,
        morePosts,
        isLoadingMorePosts,
        morePostsData
      })}
    </>
  );
};

export default PostPage;