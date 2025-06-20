import { Search, Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SearchAndFilterProps {
  searchTerm: string;
  selectedCategory: string;
  categories: string[];
  onSearchChange: (term: string) => void;
  onCategoryChange: (category: string) => void;
}

export default function SearchAndFilter({
  searchTerm,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
}: SearchAndFilterProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Debounced search to improve performance
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearchChange(localSearchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(debounceTimer);
  }, [localSearchTerm, onSearchChange]);

  // Sync with external changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const clearSearch = () => {
    setLocalSearchTerm('');
    onSearchChange('');
  };

  const clearAllFilters = () => {
    setLocalSearchTerm('');
    onSearchChange('');
    onCategoryChange('All');
  };

  // Get normalized search words for display
  const searchWords = localSearchTerm
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-apple-xl p-4 shadow-xl border border-gray-100 shadow-deep-glass">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search templates... (e.g., 'ecommerce store', 'property listing')"
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-apple-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white placeholder-gray-500 text-gray-900 transition-all duration-200"
              />
              {localSearchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative flex-1 sm:flex-none">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-apple-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-gray-900 sm:min-w-[180px] appearance-none cursor-pointer transition-all duration-200"
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-white text-gray-900"
                  >
                    {category}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Active Filters Indicator */}
          {(localSearchTerm.trim() || selectedCategory !== 'All') && (
            <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-600 font-medium">
                  Active filters:
                </span>
                {localSearchTerm.trim() && (
                  <div className="flex items-center gap-1 flex-wrap">
                    {searchWords.length > 1 ? (
                      // Show individual search words
                      searchWords.map((word, index) => (
                        <span
                          key={index}
                          className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200"
                        >
                          {word}
                        </span>
                      ))
                    ) : (
                      // Show full search term if single word
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200">
                        &quot;{localSearchTerm.trim()}&quot;
                      </span>
                    )}
                  </div>
                )}
                {selectedCategory !== 'All' && (
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full border border-purple-200">
                    {selectedCategory}
                  </span>
                )}
              </div>

              {/* Clear all filters button */}
              <button
                onClick={clearAllFilters}
                className="text-xs text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear all
              </button>
            </div>
          )}

          {/* Search Tips */}
          {localSearchTerm.trim() && searchWords.length > 1 && (
            <div className="mt-2 text-xs text-gray-500">
              💡 Searching for templates containing: {searchWords.join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
