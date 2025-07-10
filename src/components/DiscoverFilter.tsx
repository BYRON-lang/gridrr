import React from 'react';

interface Category {
  name: string;
  tags: string[];
}

interface DiscoverFilterProps {
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onTagRemove: (tag: string) => void;
}

const DiscoverFilter: React.FC<DiscoverFilterProps> = ({ selectedTags, onTagSelect, onTagRemove }) => {
  const categories: Category[] = [
    {
      name: 'Web Design',
      tags: ['Website Design', 'Landing Pages', 'Login Pages', 'Registration Forms', 'Contact Pages', 'About Pages']
    },
    {
      name: 'App Design',
      tags: ['Mobile Apps', 'Dashboard Design', 'Settings Pages', 'Profile Pages', 'Navigation Menus', 'Onboarding']
    },
    {
      name: 'UI Components',
      tags: ['Buttons', 'Cards', 'Modals', 'Dropdowns', 'Forms', 'Icons']
    },
    {
      name: 'Design Types',
      tags: ['E-commerce', 'SaaS', 'Portfolio', 'Blog', 'Social Media', 'Admin Panel']
    }
  ];

  return (
    <div className="w-full bg-white border-b border-gray-200 py-6">
      <div className="w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-3">
              {/* Category Name */}
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {category.name}
              </h3>
              
              {/* Tags */}
              <div className="space-y-2">
                {category.tags.map((tag, tagIndex) => (
                  <button
                    key={tagIndex}
                    onClick={() => onTagSelect(tag)}
                    className="block text-base font-bold text-black hover:text-gray-700 transition-colors duration-200 text-left w-full"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverFilter; 