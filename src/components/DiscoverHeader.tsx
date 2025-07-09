import React, { useState, useRef } from 'react';
import Tabs from './Tabs';
import SearchBar from './SearchBar';
import RoundedCard from './RoundedCard';
import UserModal from './UserModal';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../services/api';

const DiscoverHeader: React.FC = () => {
  const { user, isLoadingUser, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const roundedCardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Debounce search
  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsModalOpen(false);
      return;
    }
    setIsSearching(true);
    const handler = setTimeout(async () => {
      try {
        const res = await getPosts({ q: searchQuery.trim() });
        setSearchResults(res.data || []);
        setIsModalOpen(true);
      } catch (err) {
        setSearchResults([]);
        setIsModalOpen(false);
      } finally {
        setIsSearching(false);
      }
    }, 350);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Close modal on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    }
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOpen]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setIsModalOpen(false);
      navigate('/discover');
    }
  };

  const handleResultClick = (postId: number) => {
    setIsModalOpen(false);
    setSearchQuery('');
    navigate(`/post/${postId}`);
  };

  const handleModalToggle = () => {
    setIsModalOpen(false); // Close search modal when opening user modal
    setIsModalOpenUser(!isModalOpenUser);
  };

  // Add state for user modal
  const [isModalOpenUser, setIsModalOpenUser] = useState(false);

  const handleSignOut = () => {
    logout();
  };

  const tabs = [
    { id: 'discover', label: 'Discover' },
    { id: 'trending', label: 'Trending' }
  ];

  // Close user modal on outside click
  React.useEffect(() => {
    function handleClickOutsideUser(event: MouseEvent) {
      if (roundedCardRef.current && !roundedCardRef.current.contains(event.target as Node)) {
        setIsModalOpenUser(false);
      }
    }
    if (isModalOpenUser) {
      document.addEventListener('mousedown', handleClickOutsideUser);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideUser);
    }
    return () => document.removeEventListener('mousedown', handleClickOutsideUser);
  }, [isModalOpenUser]);

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
          <div className="relative flex-1 flex items-center justify-center">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search..."
              centerPosition={true}
              width="w-[500px]"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {/* Modal/Dropdown for live search results */}
            {isModalOpen && !isModalOpenUser && (
              <div ref={modalRef} className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[500px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-500">Searching...</div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((post, idx) => (
                    <div
                      key={post.id || idx}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                      onClick={() => handleResultClick(post.id || idx)}
                    >
                      <img
                        src={post.image_urls && post.image_urls.length > 0 ? post.image_urls[0] : '/assets/logo-space-blue.png'}
                        alt={post.title}
                        className="w-12 h-12 object-cover rounded-md bg-gray-200"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 truncate">{post.title}</div>
                        {post.tags && post.tags.length > 0 && (
                          <div className="text-xs text-gray-500 truncate">{post.tags.join(', ')}</div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">No results found</div>
                )}
              </div>
            )}
          </div>

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
        isOpen={isModalOpenUser}
        onClose={() => setIsModalOpenUser(false)}
        user={user}
        onSignOut={handleSignOut}
        anchorRef={roundedCardRef}
      />
    </header>
  );
};

export default DiscoverHeader; 