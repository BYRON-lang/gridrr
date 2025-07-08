import React, { useState, useRef } from 'react';
import Tabs from './Tabs';
import SearchBar from './SearchBar';
import RoundedCard from './RoundedCard';
import UserModal from './UserModal';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const DiscoverHeader: React.FC = () => {
  const { user, isLoadingUser, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const roundedCardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const tabs = [
    { id: 'discover', label: 'Discover' },
    { id: 'trending', label: 'Trending' }
  ];

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Add your search logic here
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSignOut = () => {
    logout();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="w-full py-2 relative mt-2">
        <div className="w-full flex items-center px-4 relative">
          {/* Logo and Tabs Section */}
          <div className="flex items-center gap-2 pl-1">
            <img 
              src="/assets/logo-black.png" 
              alt="Gridrr" 
              className="h-12 w-auto object-contain cursor-pointer"
              onClick={() => navigate('/discover')}
            />
            <Tabs 
              tabs={tabs}
              defaultSelected="discover"
              activeTabClassName="text-black font-bold"
              inactiveTabClassName="text-gray-600 hover:text-gray-800"
              className="-mt-5"
            />
          </div>

          {/* Search Section - Centered */}
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search..."
            centerPosition={true}
            width="w-[500px]"
          />

          {/* Rounded Card Section - Right Side */}
          <div className="ml-auto" ref={roundedCardRef}>
            <RoundedCard 
              width="w-32"
              height="h-10"
              padding="p-2"
            >
              {isLoadingUser ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                </div>
              ) : (
                <div className="text-m font-medium text-gray-700 text-center flex items-center justify-center h-full gap-1">
                  Hi {user?.firstName || 'Guest'}
                  <svg 
                    className="w-4 h-4 cursor-pointer" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    onClick={handleModalToggle}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}
            </RoundedCard>
          </div>
        </div>
      </div>
      
      {/* User Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        onSignOut={handleSignOut}
        anchorRef={roundedCardRef}
      />
    </header>
  );
};

export default DiscoverHeader; 