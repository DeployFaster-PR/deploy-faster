// types/blog.ts
import { PortableTextBlock } from '@portabletext/types';

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  mainImage?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
  content: PortableTextBlock[]; // Portable Text content
  publishedAt: string;
  author: string;
  tags?: string[];
  featured?: boolean;
}

export interface BlogListItem {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  mainImage?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
  publishedAt: string;
  author: string;
  tags?: string[];
  featured?: boolean;
}
