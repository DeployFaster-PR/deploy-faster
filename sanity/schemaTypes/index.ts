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
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'NGN',
      options: {
        list: [
          { title: 'Nigerian Naira', value: 'NGN' },
          { title: 'US Dollar', value: 'USD' },
          { title: 'Euro', value: 'EUR' },
        ],
      },
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
    },
    prepare(selection) {
      const { title, thumbnailUrl, category } = selection;
      return {
        title: title,
        subtitle: category,
        // For preview in Sanity Studio, you can show the URL or use it as media
        // media: thumbnailUrl,
      };
    },
  },
});

export default {
  types: [template, blog],
};
