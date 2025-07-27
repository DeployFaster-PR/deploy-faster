'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { SupportedCurrency, CurrencyInfo } from '@/lib/types';

interface CurrencyContextType {
  selectedCurrency: SupportedCurrency;
  setSelectedCurrency: (currency: SupportedCurrency) => void;
  formatPrice: (template: {
    pricing?: { ngn: number; usd: number; gbp: number };
    price?: number;
    currency?: string;
  }) => string;
  getAllCurrencies: () => CurrencyInfo[];
}

const CURRENCY_INFO: Record<SupportedCurrency, CurrencyInfo> = {
  NGN: {
    code: 'NGN',
    symbol: '₦',
    name: 'Nigerian Naira',
    flag: '🇳🇬',
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    flag: '🇺🇸',
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    flag: '🇬🇧',
  },
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

interface CurrencyProviderProps {
  children: ReactNode;
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [selectedCurrency, setSelectedCurrency] =
    useState<SupportedCurrency>('NGN');

  // Load saved currency preference from localStorage
  useEffect(() => {
    const savedCurrency = localStorage.getItem(
      'preferred-currency'
    ) as SupportedCurrency;
    if (savedCurrency && CURRENCY_INFO[savedCurrency]) {
      setSelectedCurrency(savedCurrency);
    }
  }, []);

  // Save currency preference to localStorage
  const handleCurrencyChange = (currency: SupportedCurrency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('preferred-currency', currency);
  };

  const formatPrice = (template: {
    pricing?: { ngn: number; usd: number; gbp: number };
    price?: number;
    currency?: string;
  }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const currencyInfo = CURRENCY_INFO[selectedCurrency];
    let price: number;

    // If new pricing structure exists, use it
    if (template.pricing) {
      switch (selectedCurrency) {
        case 'USD':
          price = template.pricing.usd;
          break;
        case 'GBP':
          price = template.pricing.gbp;
          break;
        case 'NGN':
        default:
          price = template.pricing.ngn;
          break;
      }
    } else {
      // Fallback to legacy pricing with rough conversion
      const basePrice = template.price || 0;
      switch (selectedCurrency) {
        case 'USD':
          price = Math.round(basePrice / 500); // Rough NGN to USD conversion (Custom)
          break;
        case 'GBP':
          price = Math.round(basePrice / 545.45); // Rough NGN to GBP conversion (Custom)
          break;
        case 'NGN':
        default:
          price = basePrice;
          break;
      }
    }

    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency: selectedCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const getAllCurrencies = () => Object.values(CURRENCY_INFO);

  const value: CurrencyContextType = {
    selectedCurrency,
    setSelectedCurrency: handleCurrencyChange,
    formatPrice,
    getAllCurrencies,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
