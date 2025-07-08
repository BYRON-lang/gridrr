import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  onSignOut: () => void;
  anchorRef?: React.RefObject<HTMLDivElement | null>;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, user, onSignOut, anchorRef }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleTabClick = (tab: string) => {
    switch (tab) {
      case 'sign-out':
        onSignOut();
        onClose();
        break;
      case 'settings':
        navigate('/settings');
        onClose();
        break;
      case 'profile':
        navigate('/profile');
        onClose();
        break;
      case 'posts':
        navigate('/posts');
        onClose();
        break;
      case 'create-post':
        navigate('/create-post');
        onClose();
        break;
      default:
        break;
    }
  };

  const modal = (
    <div 
      className="absolute bg-white border border-gray-300 w-80 max-h-96 overflow-hidden z-50"
      style={{
        top: anchorRef?.current ? anchorRef.current.getBoundingClientRect().bottom + window.scrollY + 8 : 0,
        right: anchorRef?.current ? window.innerWidth - anchorRef.current.getBoundingClientRect().right : 0,
      }}
    >
      {/* Header */}
      <div className="border-b border-gray-300 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Account</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {user && (
          <p className="text-sm text-gray-600 mt-1">
            {user.firstName} {user.lastName}
          </p>
        )}
      </div>
      {/* Tabs */}
      <div className="p-0">
        <div 
          className="px-4 py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
          onClick={() => handleTabClick('settings')}
        >
          <span className="text-gray-900">Settings</span>
        </div>
        <div 
          className="px-4 py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
          onClick={() => handleTabClick('profile')}
        >
          <span className="text-gray-900">Your profile</span>
        </div>
        <div 
          className="px-4 py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
          onClick={() => handleTabClick('posts')}
        >
          <span className="text-gray-900">Posts</span>
        </div>
        <div 
          className="px-4 py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
          onClick={() => handleTabClick('create-post')}
        >
          <span className="text-gray-900">Create post</span>
        </div>
        <div 
          className="px-4 py-3 cursor-pointer hover:bg-gray-50"
          onClick={() => handleTabClick('sign-out')}
        >
          <span className="text-red-600">Sign out</span>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
};

export default UserModal; 