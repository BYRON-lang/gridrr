import React from 'react';

const sidebarTabs = [
  { label: 'About Gridrr', id: 'about' },
  { label: 'Who Built It', id: 'team' },
  { label: 'Why We Exist', id: 'why' },
  { label: 'What We Offer', id: 'offer' },
  { label: 'What We Stand For', id: 'stand' },
  { label: 'Looking Ahead', id: 'ahead' },
];

interface SidebarProps {
  setActiveSection?: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveSection }) => {
  return (
    <aside className="fixed top-0 left-0 h-full flex flex-col items-start" style={{ marginLeft: 500, background: 'transparent', zIndex: 100 }}>
      <div className="flex flex-col items-start mt-40">
        <img src="/assets/logo1.png" alt="Gridrr Logo" className="h-12 w-auto mb-2" />
        <span className="text-2xm font-bold text-black ml-1">Gridrr</span>
        <nav className="flex flex-col gap-0 mt-1 ml-1">
          <span className="text-sm font-sm text-gray-400 cursor-pointer hover:underline">Discover Get Inspired</span>
        </nav>
        <nav className="flex flex-col gap-2 mt-8 ml-1 w-full">
          {sidebarTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection && setActiveSection(tab.id)}
              className="text-base text-left text-gray-700 hover:text-blue-500 font-medium transition-colors duration-200 pl-1 py-1 rounded cursor-pointer bg-transparent border-none outline-none"
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar; 