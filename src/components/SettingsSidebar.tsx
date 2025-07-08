import React from 'react';

const menuItems = [
  { key: 'settings', label: 'Settings' },
  { key: 'password', label: 'Password' },
  { key: 'profiles', label: 'Profiles' },
  { key: 'posts', label: 'Posts' },
  { key: 'cancel', label: 'Cancel Account', danger: true },
  { key: 'signout', label: 'Sign Out', danger: true },
];

interface SettingsSidebarProps {
  selectedTab: string;
  onTabSelect: (key: string) => void;
  className?: string;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ selectedTab, onTabSelect, className }) => {
  return (
    <nav className={`h-full border-r border-gray-300 pr-6 ${className || ''}`}>
      <ul className="flex flex-col gap-1 mt-8">
        {menuItems.map((item) => {
          const isSelected = selectedTab === item.key;
          const isDanger = item.danger;
          return (
            <li key={item.key}>
              <button
                className={`w-full text-left px-2 py-2 text-sm font-medium transition-colors duration-150
                  ${isSelected ? 'text-black' : isDanger ? 'text-gray-400 hover:text-red-600' : 'text-gray-700 hover:text-black'}
                  ${isSelected ? 'bg-gray-200 rounded' : ''}
                `}
                onClick={() => onTabSelect(item.key)}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SettingsSidebar; 