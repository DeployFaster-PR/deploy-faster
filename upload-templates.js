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

// Helper function to generate unique keys
function generateKey() {
  return Math.random().toString(36).substr(2, 9);
}

const templates = [
  {
    _type: 'template',
    title: 'Oil & Gas Website',
    slug: {
      _type: 'slug',
      current: 'oil-gas-website',
    },
    description:
      'A clean, responsive website template built for oil and gas companies, featuring service overviews, project portfolios, and contact-ready design.',
    longDescription: [
      {
        _type: 'block',
        _key: generateKey(),
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: 'Crafted for businesses in the energy sector, this professional oil and gas website template offers a strong digital presence with an emphasis on trust, capability, and accessibility. With sleek layouts, service-focused sections, and industry-relevant visuals, it helps companies showcase their operations, expertise, and contact channels effectively.',
          },
        ],
      },
      {
        _type: 'block',
        _key: generateKey(),
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: "Built with responsive design and performance in mind, it's perfect for refineries, energy consultants, drilling firms, and related enterprises seeking a modern, professional online identity.",
          },
        ],
      },
    ],
    category: 'Energy & Industrial',
    tags: [
      'oil and gas',
      'energy',
      'industrial website',
      'corporate',
      'exploration',
      'drilling',
      'petroleum',
      'refinery',
      'business template',
    ],
    // Updated pricing structure with multiple currencies
    pricing: {
      ngn: 300000,
      usd: 800,
      gbp: 733,
    },
    previewUrl: 'http://deployfasteroilandgas.vercel.app/',
    thumbnailImageUrl:
      'https://res.cloudinary.com/dfwty72r9/image/upload/v1753823047/Screenshot_358_erkppk.png',
    galleryImageUrls: [
      {
        _key: generateKey(),
        url: 'https://res.cloudinary.com/dfwty72r9/image/upload/v1753823047/Screenshot_358_erkppk.png',
        alt: 'Oil & Gas Website Homepage',
      },
      {
        _key: generateKey(),
        url: 'https://res.cloudinary.com/dfwty72r9/image/upload/v1753823047/Screenshot_358_erkppk.png',
        alt: 'Services and Portfolio Section',
      },
    ],
    features: [
      'Industry-Focused Layouts',
      'Project Portfolio Display',
      'Contact-Driven Design',
      'Mobile-Responsive & SEO-Optimized',
      'Service Overview Sections',
      'Professional Corporate Design',
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    featured: true,
    createdAt: new Date().toISOString(),
  },
];

async function uploadTemplates() {
  console.log('Starting template upload...');

  for (const template of templates) {
    try {
      const result = await client.create(template);
      console.log(`✅ Successfully created: ${result.title}`);
      console.log(`   Document ID: ${result._id}`);
      console.log(
        `   Pricing: ₦${result.pricing.ngn} | $${result.pricing.usd} | £${result.pricing.gbp}`
      );
    } catch (error) {
      console.error(`❌ Error creating template: ${template.title}`);
      console.error('Error details:', error);
    }
  }

  console.log('\n🎉 Upload completed!');
}

// Run the upload
uploadTemplates().catch(console.error);
