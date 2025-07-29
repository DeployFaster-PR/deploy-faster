import { defineField, defineType } from 'sanity';
import blog from './blog';

const template = defineType({
  name: 'template',
  title: 'Template',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Portfolio', value: 'Portfolio' },
          { title: 'E-commerce', value: 'E-commerce' },
          { title: 'Business', value: 'Business' },
          { title: 'Restaurant', value: 'Restaurant' },
          { title: 'Agency', value: 'Agency' },
          { title: 'Blog', value: 'Blog' },
          { title: 'SaaS', value: 'SaaS' },
          { title: 'Real Estate', value: 'Real Estate' },
          { title: 'Energy & Industrial', value: 'Energy & Industrial' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    // Updated pricing structure to support multiple currencies
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        defineField({
          name: 'ngn',
          title: 'Price in Nigerian Naira (NGN)',
          type: 'number',
          validation: (Rule) => Rule.required().positive(),
        }),
        defineField({
          name: 'usd',
          title: 'Price in US Dollars (USD)',
          type: 'number',
          validation: (Rule) => Rule.required().positive(),
        }),
        defineField({
          name: 'gbp',
          title: 'Price in British Pounds (GBP)',
          type: 'number',
          validation: (Rule) => Rule.required().positive(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    // Keep legacy fields for backward compatibility (you can remove these later)
    defineField({
      name: 'price',
      title: 'Legacy Price (Deprecated)',
      type: 'number',
      hidden: true, // Hide from studio UI
    }),
    defineField({
      name: 'currency',
      title: 'Legacy Currency (Deprecated)',
      type: 'string',
      hidden: true, // Hide from studio UI
    }),
    defineField({
      name: 'previewUrl',
      title: 'Preview URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnailImageUrl',
      title: 'Thumbnail Image URL',
      type: 'url',
      description: 'Cloudinary URL for the main thumbnail image',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'galleryImageUrls',
      title: 'Gallery Image URLs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'url',
              title: 'Image URL',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['http', 'https'],
                }),
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Alternative text for accessibility',
            },
          ],
          preview: {
            select: {
              title: 'alt',
              subtitle: 'url',
            },
          },
        },
      ],
      description: 'Additional images for the template gallery',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      thumbnailUrl: 'thumbnailImageUrl',
      category: 'category',
      pricing: 'pricing',
    },
    prepare(selection) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { title, thumbnailUrl, category, pricing } = selection;
      return {
        title: title,
        subtitle: `${category} - ₦${pricing?.ngn || 0} | $${pricing?.usd || 0} | £${pricing?.gbp || 0}`,
      };
    },
  },
});

// TypeScript interface for the Template type
export interface Template {
  _id: string;
  title: string;
  slug: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  longDescription?: any[];
  category: string;
  tags: string[];
  pricing?: {
    ngn: number;
    usd: number;
    gbp: number;
  };
  price?: number;
  currency?: string;
  previewUrl: string;
  thumbnailImageUrl: string;
  galleryImageUrls?: {
    url: string;
    alt?: string;
  }[];
  features?: string[];
  technologies?: string[];
  featured: boolean;
  createdAt: string;
}

export default {
  types: [template, blog],
};
