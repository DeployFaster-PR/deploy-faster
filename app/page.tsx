'use client';

import { useState, useEffect, useMemo } from 'react';
import { client } from '@/lib/sanity';
import { templatesQuery } from '@/lib/sanity-queries';
import { Template } from '@/lib/types';
import TemplateCard from '@/components/TemplateCard';
import SearchAndFilter from '@/components/SearchAndFilter';
import { ChevronUp, Heart, Search, Loader2 } from 'lucide-react';

const TEMPLATES_PER_PAGE = 4;

// High-impact conversion phrases for website template marketplace
const ROTATING_PHRASES = [
  // Speed & Time-focused
  'Launch in Minutes, Not Months',
  'Your Website Goes Live Today',
  'Skip the Wait, Start Selling',
  'From Zero to Hero in Hours',
  'Instant Website, Instant Results',
  'Why Wait? Launch Now',
  'Fast-Track Your Success',
  'Website Ready in 60 Minutes',

  // Transformation & Results
  'Turn Visitors into Customers',
  'Templates That Actually Convert',
  'From Idea to Income, Fast',
  'Stop Losing Customers to Slow Sites',
  'Professional Results, Zero Hassle',
  'Build Your Empire Today',
  'Revenue-Ready Templates',

  // Action & Urgency
  "Don't Build, Deploy",
  'Start Earning While Others Wait',
  'Your Success Story Starts Here',
  'Be Live Before Lunch',
  'Launch First, Perfect Later',
  'Ready-Made Revenue Machines',
  'Business-Ready in a Click',
  'Deploy. Dominate. Done.',

  // Emotional & Aspirational
  'Stop Dreaming, Start Launching',
  'Your Vision, Our Speed',
  'Finally, Websites That Work',
  'Success Has Never Been Faster',
  'The Fast Lane to Profit',
  'Shortcut to Success',
  'Instant Professional Presence',
  'Your Breakthrough Moment',

  // Problem-solving
  'No More Developer Drama',
  'Skip the Tech Headaches',
  'Code-Free Success Stories',
  'Design Without the Delay',
  'Professional Without the Price Tag',
  'Enterprise Quality, Startup Speed',
  'Big Results, Small Timeline',
  'Maximum Impact, Minimum Wait',
];

export default function HomePage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [displayedCount, setDisplayedCount] = useState(TEMPLATES_PER_PAGE);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  // Fetch templates from Sanity
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await client.fetch(templatesQuery);
        setTemplates(data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // Rotate phrases every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(templates.map((t) => t.category))
    );
    return ['All', ...uniqueCategories.sort()];
  }, [templates]);

  // Enhanced filter logic with intelligent search
  const filteredTemplates = useMemo(() => {
    return templates
      .filter((template) => {
        // Category filtering
        const matchesCategory =
          selectedCategory === 'All' || template.category === selectedCategory;

        // If no search term, only filter by category
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();
        if (!normalizedSearchTerm) {
          return matchesCategory;
        }

        // Split search term into individual words for flexible matching
        const searchWords = normalizedSearchTerm
          .split(/\s+/)
          .filter((word) => word.length > 0);

        // Prepare all searchable content
        const searchableFields = [
          template.title.toLowerCase(),
          template.description.toLowerCase(),
          template.category.toLowerCase(),
          ...template.tags.map((tag) => tag.toLowerCase()),
        ];

        const allContent = searchableFields.join(' ');

        // Enhanced search matching
        const matchesSearch = searchWords.every((searchWord) => {
          // Check if any field contains the search word
          return searchableFields.some((field) => {
            // Direct word match
            if (field.includes(searchWord)) {
              return true;
            }

            // Partial word matching for better flexibility
            const fieldWords = field.split(/\s+/);
            return fieldWords.some(
              (fieldWord) =>
                fieldWord.includes(searchWord) ||
                searchWord.includes(fieldWord) ||
                // Handle common variations
                (fieldWord.length > 3 &&
                  searchWord.length > 3 &&
                  (fieldWord.startsWith(searchWord.slice(0, -1)) ||
                    searchWord.startsWith(fieldWord.slice(0, -1))))
            );
          });
        });

        // Fallback: check for exact phrase match
        const phraseMatch =
          !matchesSearch && allContent.includes(normalizedSearchTerm);

        return (matchesSearch || phraseMatch) && matchesCategory;
      })
      .sort((a, b) => {
        // If there's a search term, sort by relevance
        if (!searchTerm.trim()) return 0;

        const searchLower = searchTerm.toLowerCase();

        // Calculate relevance scores
        let scoreA = 0;
        let scoreB = 0;

        // Title matches get highest score
        if (a.title.toLowerCase().includes(searchLower)) scoreA += 10;
        if (b.title.toLowerCase().includes(searchLower)) scoreB += 10;

        // Category matches
        if (a.category.toLowerCase().includes(searchLower)) scoreA += 5;
        if (b.category.toLowerCase().includes(searchLower)) scoreB += 5;

        // Tag matches
        a.tags.forEach((tag) => {
          if (tag.toLowerCase().includes(searchLower)) scoreA += 3;
        });
        b.tags.forEach((tag) => {
          if (tag.toLowerCase().includes(searchLower)) scoreB += 3;
        });

        // Description matches get lower score
        if (a.description.toLowerCase().includes(searchLower)) scoreA += 1;
        if (b.description.toLowerCase().includes(searchLower)) scoreB += 1;

        return scoreB - scoreA; // Sort by highest score first
      });
  }, [templates, searchTerm, selectedCategory]);

  // Templates to display (with pagination)
  const displayedTemplates = filteredTemplates.slice(0, displayedCount);
  const hasMore = displayedCount < filteredTemplates.length;

  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedCount(TEMPLATES_PER_PAGE);
  }, [searchTerm, selectedCategory]);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadMore = () => {
    setDisplayedCount((prev) => prev + TEMPLATES_PER_PAGE);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32 bg-gradient-to-br from-gray-50 via-gray-100 to-blue-50/30">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Count with Rotating Text */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                <span
                  key={currentPhraseIndex}
                  className="inline-block animate-typewriter"
                >
                  {ROTATING_PHRASES[currentPhraseIndex]}
                </span>
              </h3>
              <p className="text-gray-700">
                Showing {displayedTemplates.length} of{' '}
                {filteredTemplates.length} templates
                {searchTerm.trim() && (
                  <span className="text-blue-600 font-medium">
                    {' '}
                    for "{searchTerm.trim()}"
                  </span>
                )}
              </p>
            </div>

            {filteredTemplates.length > 0 && (
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Updated recently
              </div>
            )}
          </div>
        </div>

        {/* Templates Grid */}
        {displayedTemplates.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {displayedTemplates.map((template, index) => (
              <div
                key={template._id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TemplateCard template={template} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No templates found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm.trim() ? (
                <>
                  We couldn't find any templates matching "{searchTerm.trim()}"
                  {selectedCategory !== 'All' && ` in ${selectedCategory}`}.
                </>
              ) : (
                'Try adjusting your search or filter criteria.'
              )}
            </p>
            {searchTerm.trim() && (
              <div className="text-sm text-gray-400">
                💡 Try searching with different keywords or check for typos
              </div>
            )}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mb-12">
            <button
              onClick={loadMore}
              className="bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md px-8 py-4 rounded-apple-lg font-semibold text-blue-600 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              Load More Templates
            </button>
          </div>
        )}

        {/* End Message */}
        {!hasMore &&
          filteredTemplates.length > 0 &&
          displayedTemplates.length > TEMPLATES_PER_PAGE && (
            <div className="text-center py-12">
              <div className="bg-white border border-gray-200 rounded-apple-lg inline-block px-6 py-4 shadow-sm">
                <p className="text-gray-600 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  You&#39;ve seen all our amazing templates!
                </p>
              </div>
            </div>
          )}
      </main>

      {/* Search and Filter - Fixed Bottom Panel */}
      <SearchAndFilter
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        categories={categories}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-28 cursor-pointer shadow-deep-glass right-6 bg-white border border-gray-200 rounded-full p-3 shadow-lg hover:shadow-deep-glass transition-all duration-300 hover:-translate-y-1 active:translate-y-0 z-40"
        >
          <ChevronUp className="w-6 h-6 text-blue-600" />
        </button>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes typewriter {
          0% {
            width: 0;
            opacity: 0;
          }
          1% {
            opacity: 1;
          }
          50% {
            width: 100%;
          }
          100% {
            width: 100%;
            opacity: 1;
          }
        }

        .animate-typewriter {
          overflow: hidden;
          white-space: nowrap;
          animation: typewriter 4s ease-in-out;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
