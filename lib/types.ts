// lib/types.ts
import { PortableTextBlock } from '@portabletext/types';

export interface GalleryImage {
  url: string;
  alt?: string;
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
