import React from 'react';

const PublicProfileSkeleton: React.FC = () => {
  return (
    <div className="hidden sm:block relative w-full pt-16">
      <div className="mx-[10px]">
        <div className="flex flex-1 flex-col items-center justify-start">
          {/* Avatar skeleton */}
          <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse mb-6 mt-4" />
          {/* Display name skeleton */}
          <div className="h-10 w-1/3 bg-gray-200 rounded animate-pulse mb-4" />
          {/* Bio skeleton */}
          <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse mb-2" />
          {/* Expertise skeleton */}
          <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse mb-4" />
          {/* Contact email skeleton */}
          <div className="mt-4 flex items-center text-gray-500 text-base">
            <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse mr-2" />
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
          {/* Stats skeleton */}
          <div className="flex flex-row gap-8 mt-4 mb-2 items-center justify-center">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                <span className="h-6 w-10 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
          {/* Socials skeleton */}
          <div className="mt-6 flex flex-row gap-6 w-full max-w-xs justify-center items-center">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="w-7 h-7 bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>
          {/* Follow/Share buttons skeleton */}
          <div className="flex flex-row gap-4 mt-6 mb-2 items-center justify-center">
            <div className="h-10 w-28 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-10 w-28 bg-gray-200 rounded-full animate-pulse" />
          </div>
          {/* Posts grid skeleton */}
          <div className="w-full mt-16">
            <div className="h-8 w-1/4 bg-gray-200 rounded animate-pulse mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="h-64 w-full bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfileSkeleton; 