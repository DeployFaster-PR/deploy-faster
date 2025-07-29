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

async function debugTemplates() {
  try {
    console.log('🔍 Fetching all templates from Sanity...\n');

    // Fetch all templates
    const templates = await client.fetch(`*[_type == "template"] {
      _id,
      title,
      pricing,
      price,
      currency,
      category
    }`);

    console.log(`Found ${templates.length} template(s):\n`);

    templates.forEach((template, index) => {
      console.log(`Template ${index + 1}:`);
      console.log(`  ID: ${template._id}`);
      console.log(`  Title: ${template.title}`);
      console.log(`  Category: ${template.category}`);
      console.log(`  New Pricing Structure:`, template.pricing);
      console.log(`  Legacy Price: ${template.price}`);
      console.log(`  Legacy Currency: ${template.currency}`);
      console.log('---');
    });

    // Test the specific oil & gas template
    const oilGasTemplate =
      await client.fetch(`*[_type == "template" && title match "*Oil*Gas*"][0] {
      _id,
      title,
      pricing,
      price,
      currency
    }`);

    if (oilGasTemplate) {
      console.log('\n🛢️ Oil & Gas Template Details:');
      console.log(
        'Full pricing object:',
        JSON.stringify(oilGasTemplate.pricing, null, 2)
      );
      console.log('NGN Price:', oilGasTemplate.pricing?.ngn);
      console.log('USD Price:', oilGasTemplate.pricing?.usd);
      console.log('GBP Price:', oilGasTemplate.pricing?.gbp);
    } else {
      console.log('\n❌ Oil & Gas template not found!');
    }
  } catch (error) {
    console.error('❌ Error fetching templates:', error);
  }
}

debugTemplates();
