// lib/sanity-queries.ts

// Query for getting all templates
export const templatesQuery = `*[_type == "template"] | order(featured desc, createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  category,
  tags,
  pricing,
  price,
  currency,
  previewUrl,
  thumbnailImageUrl,
  galleryImageUrls,
  features,
  technologies,
  featured,
  createdAt
}`;

// Query for getting a single template by slug
export const templateBySlugQuery = `*[_type == "template" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  description,
  longDescription,
  category,
  tags,
  pricing,
  price,
  currency,
  previewUrl,
  thumbnailImageUrl,
  galleryImageUrls,
  features,
  technologies,
  featured,
  createdAt
}`;

// Query for getting featured templates
export const featuredTemplatesQuery = `*[_type == "template" && featured == true] | order(createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  category,
  tags,
  pricing,
  price,
  currency,
  previewUrl,
  thumbnailImageUrl,
  features,
  technologies,
  featured,
  createdAt
}`;

// Query for getting templates by category
export const templatesByCategoryQuery = `*[_type == "template" && category == $category] | order(createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  category,
  tags,
  pricing,
  price,
  currency,
  previewUrl,
  thumbnailImageUrl,
  features,
  technologies,
  featured,
  createdAt
}`;

// Query for getting unique categories
export const categoriesQuery = `*[_type == "template"] | order(category asc) {
  category
} | [].category | unique`;

// Query for getting unique tags
export const tagsQuery = `*[_type == "template"] {
  tags
} | [].tags[] | unique | order(@)`;
