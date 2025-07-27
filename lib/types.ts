// lib/types.ts
import { PortableTextBlock } from '@portabletext/types';

export interface GalleryImage {
  url: string;
  alt?: string;
}

export interface TemplatePricing {
  ngn: number;
  usd: number;
  gbp: number;
}

export interface Template {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: PortableTextBlock[];
  category: string;
  tags: string[];
  price: number;
  currency: string;
  // New multi-currency pricing (optional for backward compatibility)
  pricing?: TemplatePricing;
  previewUrl: string;
  thumbnailImageUrl: string;
  galleryImageUrls?: GalleryImage[];
  features?: string[];
  technologies?: string[];
  featured: boolean;
  createdAt: string;
}

export interface TemplateFilters {
  category?: string;
  tags?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  search?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  launchTimeline: string;
  message: string;
  templateId: string;
  templateTitle: string;
  templatePrice: string;
  templateUrl: string;
  templateFeatured: boolean;
}

export type SupportedCurrency = 'NGN' | 'USD' | 'GBP';

export interface CurrencyInfo {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  flag: string;
}
