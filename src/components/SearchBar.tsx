import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
  iconClassName?: string;
  width?: string;
  position?: 'static' | 'absolute' | 'relative';
  centerPosition?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search...", 
  className = '',
  containerClassName = '',
  inputClassName = '',
  buttonClassName = '',
  iconClassName = '',
  width = 'w-[600px]',
  position = 'static',
  centerPosition = false
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const baseContainerClasses = centerPosition 
    ? 'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 flex items-center justify-center'
    : 'flex items-center';

  const positionClasses = position === 'absolute' ? 'absolute' : position === 'relative' ? 'relative' : '';

  return (
    <div className={`${baseContainerClasses} ${positionClasses} ${containerClassName}`}>
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
          className={`${width} px-4 py-4 pl-16 pr-4 text-sm text-gray-900 bg-gray-100 rounded-full focus:ring-2 focus:ring-teal-500 outline-none ${inputClassName}`}
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <div className="bg-green-100 rounded-full p-2">
            <svg className={`h-5 w-5 text-black ${iconClassName}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
          </div>
      </div>
    </form>
    </div>
  );
};

export default SearchBar; 