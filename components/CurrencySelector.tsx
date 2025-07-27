'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

interface CurrencySelectorProps {
  className?: string;
  compact?: boolean;
}

export default function CurrencySelector({
  className = '',
  compact = false,
}: CurrencySelectorProps) {
  const { selectedCurrency, setSelectedCurrency, getAllCurrencies } =
    useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currencies = getAllCurrencies();
  const currentCurrencyInfo = currencies.find(
    (c) => c.code === selectedCurrency
  )!;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCurrencySelect = (currencyCode: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSelectedCurrency(currencyCode as any);
    setIsOpen(false);
  };

  if (compact) {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/90 transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
        >
          <span className="text-base">{currentCurrencyInfo.flag}</span>
          <span className="hidden sm:inline">{currentCurrencyInfo.code}</span>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden min-w-[180px]">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => handleCurrencySelect(currency.code)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between ${
                  selectedCurrency === currency.code
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{currency.flag}</span>
                  <div>
                    <div className="font-medium">{currency.code}</div>
                    <div className="text-xs text-gray-500">{currency.name}</div>
                  </div>
                </div>
                {selectedCurrency === currency.code && (
                  <Check className="w-4 h-4 text-blue-600" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Full version
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200 min-w-[160px]"
      >
        <span className="text-xl">{currentCurrencyInfo.flag}</span>
        <div className="flex-1 text-left">
          <div className="font-semibold text-gray-900">
            {currentCurrencyInfo.code}
          </div>
          <div className="text-xs text-gray-500">
            {currentCurrencyInfo.name}
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
          {currencies.map((currency) => (
            <button
              key={currency.code}
              onClick={() => handleCurrencySelect(currency.code)}
              className={`w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between ${
                selectedCurrency === currency.code
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{currency.flag}</span>
                <div>
                  <div className="font-semibold">{currency.code}</div>
                  <div className="text-sm text-gray-500">{currency.name}</div>
                </div>
              </div>
              {selectedCurrency === currency.code && (
                <Check className="w-5 h-5 text-blue-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
