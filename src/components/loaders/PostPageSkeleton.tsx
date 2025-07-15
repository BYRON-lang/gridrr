import React from 'react';

const PostPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-white hidden sm:block">
      <div className="pt-28 px-16 flex flex-col gap-8">
        {/* Title skeleton */}
        <div className="h-10 w-2/3 bg-gray-200 rounded animate-pulse mb-4" />
        {/* Main content row: left and right cards */}
        <div className="flex gap-8">
          {/* Left-side card skeleton */}
          <div className="bg-white pt-0 pb-0 px-6 w-[550px] h-[600px] rounded-none flex flex-col">
            {/* Image skeleton */}
            <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse mb-8 mt-8" />
            {/* Date and tags row skeleton */}
            <div className="flex items-start justify-between mt-4 mb-4">
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
              <div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            {/* User info skeleton */}
            <div className="mt-8">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
            {/* Stats skeleton */}
            <div className="mt-6">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          {/* Right-side sidebar skeleton */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Like/Follow/Share buttons skeleton */}
            <div className="flex gap-4 mt-4">
              <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
            </div>
            {/* Comments skeleton */}
            <div className="mt-8">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex gap-3 mb-4">
                  <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPageSkeleton; 