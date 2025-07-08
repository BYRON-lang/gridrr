import React, { useState } from 'react';

interface FilterButtonProps {
  label: string;
  options: string[];
  onFilterChange: (selectedOptions: string[]) => void;
  className?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ 
  label, 
  options, 
  onFilterChange, 
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionToggle = (option: string) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(opt => opt !== option)
      : [...selectedOptions, option];
    
    setSelectedOptions(newSelectedOptions);
    onFilterChange(newSelectedOptions);
  };

  const handleSelectAll = () => {
    const newSelectedOptions = selectedOptions.length === options.length ? [] : options;
    setSelectedOptions(newSelectedOptions);
    onFilterChange(newSelectedOptions);
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        className="inline-flex items-center justify-center w-full rounded-full border-2 border-gray-400 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 whitespace-nowrap"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        {selectedOptions.length > 0 && (
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
            {selectedOptions.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              type="button"
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={handleSelectAll}
            >
              {selectedOptions.length === options.length ? 'Deselect All' : 'Select All'}
            </button>
            <div className="border-t border-gray-100"></div>
            {options.map((option) => (
              <label key={option} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionToggle(option)}
                />
                <span className="ml-3">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton; 