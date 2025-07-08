import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  onClick?: () => void;
}

interface TabsProps {
  tabs: Tab[];
  defaultSelected?: string;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultSelected,
  className = '',
  tabClassName = '',
  activeTabClassName = 'text-black font-bold',
  inactiveTabClassName = 'text-gray-600 hover:text-gray-800'
}) => {
  const [selectedTab, setSelectedTab] = useState(defaultSelected || tabs[0]?.id || '');

  const handleTabClick = (tab: Tab) => {
    setSelectedTab(tab.id);
    if (tab.onClick) {
      tab.onClick();
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`relative cursor-pointer group ${tabClassName}`}
          onClick={() => handleTabClick(tab)}
        >
          <span
            className={`text-sm transition-colors ${
              selectedTab === tab.id ? activeTabClassName : inactiveTabClassName
            }`}
          >
            {tab.label}
          </span>
          {selectedTab === tab.id && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tabs; 