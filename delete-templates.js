import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-06-19',
});

async function deleteAllTemplates() {
  try {
    console.log('Fetching all templates...');

    // Fetch all template documents
    const templates = await client.fetch('*[_type == "template"]');

    if (templates.length === 0) {
      console.log('No templates found to delete.');
      return;
    }

    console.log(`Found ${templates.length} templates to delete.`);

    // Create an array of template IDs
    const templateIds = templates.map((template) => template._id);

    // Delete all templates in batch
    console.log('Deleting templates...');

    for (const id of templateIds) {
      try {
        await client.delete(id);
        console.log(`✓ Deleted template with ID: ${id}`);
      } catch (error) {
        console.error(
          `✗ Failed to delete template with ID: ${id}`,
          error.message
        );
      }
    }

    console.log('✅ Bulk deletion completed!');

    // Verify deletion
    const remainingTemplates = await client.fetch('*[_type == "template"]');
    console.log(`Remaining templates: ${remainingTemplates.length}`);
  } catch (error) {
    console.error('❌ Error during bulk deletion:', error);
  }
}

// Alternative function to delete specific templates by slug or title
async function deleteTemplatesByFilter(filterQuery) {
  try {
    console.log(`Fetching templates with filter: ${filterQuery}`);

    const templates = await client.fetch(filterQuery);

    if (templates.length === 0) {
      console.log('No templates found matching the filter.');
      return;
    }

    console.log(`Found ${templates.length} templates to delete.`);

    for (const template of templates) {
      try {
        await client.delete(template._id);
        console.log(
          `✓ Deleted template: ${template.title} (ID: ${template._id})`
        );
      } catch (error) {
        console.error(
          `✗ Failed to delete template: ${template.title}`,
          error.message
        );
      }
    }

    console.log('✅ Filtered deletion completed!');
  } catch (error) {
    console.error('❌ Error during filtered deletion:', error);
  }
}

// Configuration - Choose your deletion method
const DELETION_CONFIG = {
  method: 'slugs', // Options: 'all', 'slugs', 'categories', 'tags', 'featured', 'custom'

  // For 'slugs' method - specify which templates to delete by slug
  slugs: [
    'modern-portfolio',
    'ecommerce-store',
    'real-estate-platform',
    'restaurant-menu-app',
    'creative-agency-hub',
    'tech-blog-platform',
    'saas-landing-page',
    'business-corporate',
    'fashion-ecommerce',
    'fitness-gym-website',
  ],

  // For 'categories' method - specify categories to delete
  categories: ['Portfolio', 'E-commerce'],

  // For 'tags' method - specify tags (will delete templates that have ANY of these tags)
  tags: ['modern', 'ecommerce'],

  // For 'featured' method - delete only featured templates
  featured: true,

  // For 'custom' method - write your own GROQ query
  customQuery: '*[_type == "template" && price > 50000]',
};

async function deleteTemplatesByConfig() {
  const { method } = DELETION_CONFIG;

  try {
    let query;
    let description;

    switch (method) {
      case 'all':
        query = '*[_type == "template"]';
        description = 'ALL templates';
        break;

      case 'slugs':
        const slugList = DELETION_CONFIG.slugs
          .map((slug) => `"${slug}"`)
          .join(', ');
        query = `*[_type == "template" && slug.current in [${slugList}]]`;
        description = `templates with slugs: ${DELETION_CONFIG.slugs.join(', ')}`;
        break;

      case 'categories':
        const categoryList = DELETION_CONFIG.categories
          .map((cat) => `"${cat}"`)
          .join(', ');
        query = `*[_type == "template" && category in [${categoryList}]]`;
        description = `templates in categories: ${DELETION_CONFIG.categories.join(', ')}`;
        break;

      case 'tags':
        const tagConditions = DELETION_CONFIG.tags
          .map((tag) => `"${tag}" in tags`)
          .join(' || ');
        query = `*[_type == "template" && (${tagConditions})]`;
        description = `templates with tags: ${DELETION_CONFIG.tags.join(', ')}`;
        break;

      case 'featured':
        query = `*[_type == "template" && featured == ${DELETION_CONFIG.featured}]`;
        description = `${DELETION_CONFIG.featured ? 'featured' : 'non-featured'} templates`;
        break;

      case 'custom':
        query = DELETION_CONFIG.customQuery;
        description = 'templates matching custom query';
        break;

      default:
        throw new Error(`Unknown deletion method: ${method}`);
    }

    console.log(`🎯 Target: ${description}`);
    console.log(`📝 Query: ${query}`);
    console.log('');

    const templates = await client.fetch(query);

    if (templates.length === 0) {
      console.log('✅ No templates found matching the criteria.');
      return;
    }

    console.log(`📋 Found ${templates.length} templates to delete:`);
    templates.forEach((template, index) => {
      console.log(
        `  ${index + 1}. ${template.title} (${template.slug.current})`
      );
    });
    console.log('');

    console.log('🚨 WARNING: This will delete the above templates!');
    console.log('Press Ctrl+C to cancel, or wait 5 seconds to proceed...');

    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log('🗑️ Starting deletion...');
    console.log('');

    for (const template of templates) {
      try {
        await client.delete(template._id);
        console.log(`✅ Deleted: ${template.title} (${template.slug.current})`);
      } catch (error) {
        console.error(
          `❌ Failed to delete: ${template.title} - ${error.message}`
        );
      }
    }

    console.log('');
    console.log('🎉 Deletion completed!');

    // Verify deletion
    const remainingTargets = await client.fetch(query);
    const allTemplates = await client.fetch('*[_type == "template"]');
    console.log(`📊 Remaining targeted templates: ${remainingTargets.length}`);
    console.log(`📊 Total templates remaining: ${allTemplates.length}`);
  } catch (error) {
    console.error('💥 Error during deletion:', error);
  }
}

// Run the configured deletion
deleteTemplatesByConfig();
