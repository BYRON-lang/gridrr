import React from 'react';

interface SortFilterProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ selectedFilter, onFilterChange }) => {
  const filters = [
    { id: 'latest', label: 'Latest' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'liked', label: 'Most Liked' }
  ];

  return (
    <div className="w-full bg-white py-4">
      <div className="w-full px-4">
        <div className="flex gap-4">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 relative ${
                selectedFilter === filter.id
                  ? 'text-black'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {filter.label}
              {selectedFilter === filter.id && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black" style={{ 
                  width: `${filter.label.length * 0.6}rem`, 
                  height: '2px' 
                }}></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortFilter; 