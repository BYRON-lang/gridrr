import React from 'react';
import Header from '../components/Header';
import { Helmet } from 'react-helmet-async';

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Helmet>
        <title>Blog | Gridrr Creative Platform</title>
        <meta name="description" content="Read the latest stories, tips, and news for the creative community on the Gridrr blog. Stay updated with inspiring content." />
        <link rel="canonical" href="https://gridrr.com/blog" />
      </Helmet>
      <Header />
      <div className="flex flex-1 items-center justify-center pt-40 pb-20">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            {/* Animated bouncing pencil icon */}
            <svg className="animate-bounce" width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="12" y="44" width="40" height="8" rx="4" fill="#E0E7FF"/>
              <rect x="20" y="12" width="24" height="32" rx="6" fill="#6366F1"/>
              <rect x="28" y="8" width="8" height="8" rx="4" fill="#FBBF24"/>
              <rect x="28" y="44" width="8" height="8" rx="4" fill="#F59E42"/>
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Blog Coming Soon</h1>
          <p className="text-lg text-gray-600 mb-8">We're crafting inspiring stories, tips, and news for the creative community.<br/>Stay tuned for updates!</p>
          <div className="flex justify-center">
            <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg animate-pulse">Launching Soon</span>
          </div>
        </div>
      </div>
      {/* Subtle floating shapes animation */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-60 animate-float-slow" />
        <div className="absolute bottom-24 right-24 w-24 h-24 bg-purple-100 rounded-full opacity-50 animate-float-medium" />
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-yellow-100 rounded-full opacity-40 animate-float-fast" />
      </div>
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-fast { animation: float-fast 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default BlogPage; 