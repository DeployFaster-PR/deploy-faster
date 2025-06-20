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
    title: 'Modern Portfolio',
    slug: {
      _type: 'slug',
      current: 'modern-portfolio',
    },
    description:
      'A clean, modern portfolio template perfect for showcasing your work',
    longDescription: [
      {
        _type: 'block',
        _key: generateKey(),
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: 'This portfolio template features a minimalist design with smooth animations and responsive layout. Perfect for designers, developers, and creative professionals.',
          },
        ],
      },
    ],
    category: 'Portfolio',
    tags: ['modern', 'clean', 'responsive', 'portfolio'],
    price: 25000,
    currency: 'NGN',
    previewUrl: 'https://joshua-chris.com/',
    thumbnailImageUrl:
      'https://res.cloudinary.com/dzd51q99i/image/upload/v1750349719/deployfaster/portfolio-img-1_djf3ew.png',
    galleryImageUrls: [
      {
        _key: generateKey(),
        url: 'https://res.cloudinary.com/dzd51q99i/image/upload/v1750349719/deployfaster/portfolio-img-1_djf3ew.png',
        alt: 'Homepage view',
      },
      {
        _key: generateKey(),
        url: 'https://res.cloudinary.com/dzd51q99i/image/upload/v1750349719/deployfaster/portfolio-img-1_djf3ew.png',
        alt: 'Projects section',
      },
    ],
    features: [
      'Responsive Design',
      'Dark Mode',
      'Contact Form',
      'Project Gallery',
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    featured: true,
    createdAt: '2025-06-19T10:00:00Z',
  },
  {
    _type: 'template',
    title: 'E-commerce Store',
    slug: {
      _type: 'slug',
      current: 'ecommerce-store',
    },
    description:
      'Complete e-commerce solution with cart, checkout, and payment integration',
    longDescription: [
      {
        _type: 'block',
        _key: generateKey(),
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: 'Full-featured e-commerce template with product catalog, shopping cart, user authentication, and payment processing. Built for scalability and performance.',
          },
        ],
      },
    ],
    category: 'E-commerce',
    tags: ['ecommerce', 'shopping', 'payment', 'cart'],
    price: 50000,
    currency: 'NGN',
    previewUrl: 'https://amazon.com',
    thumbnailImageUrl:
      'https://res.cloudinary.com/dzd51q99i/image/upload/v1750349855/deployfaster/ecommerce_img_1_i6upfw.jpg',
    galleryImageUrls: [
      {
        _key: generateKey(),
        url: 'https://res.cloudinary.com/dzd51q99i/image/upload/v1750349855/deployfaster/ecommerce_img_1_i6upfw.jpg',
        alt: 'Product listing page',
      },
      {
        _key: generateKey(),
        url: 'https://res.cloudinary.com/dzd51q99i/image/upload/v1750349855/deployfaster/ecommerce_img_1_i6upfw.jpg',
        alt: 'Shopping cart view',
      },
    ],
    features: [
      'Product Catalog',
      'Shopping Cart',
      'User Authentication',
      'Payment Integration',
    ],
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'MongoDB'],
    featured: false,
    createdAt: '2025-06-19T11:00:00Z',
  },
  {
    _type: 'template',
    title: 'Real Estate Platform',
    slug: {
      _type: 'slug',
      current: 'real-estate-platform',
    },
    description:
      'Professional real estate website with property listings and search functionality',
    longDescription: [
      {
        _type: 'block',
        _key: generateKey(),
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: 'Comprehensive real estate platform featuring advanced property search, detailed listings, virtual tours, and agent management system. Perfect for real estate agencies and property developers.',
          },
        ],
      },
    ],
    category: 'Real Estate',
    tags: ['real estate', 'property', 'listings', 'search'],
    price: 75000,
    currency: 'NGN',
    previewUrl: 'https://houvincity.com/',
    thumbnailImageUrl:
      'https://res.cloudinary.com/dzd51q99i/image/upload/v1750349719/deployfaster/Real_Estate_Landing_Page_lcclea.png',
    galleryImageUrls: [
      {
        _key: generateKey(),
        url: 'https://res.cloudinary.com/dzd51q99i/image/upload/v1750349719/deployfaster/Real_Estate_Landing_Page_lcclea.png',
        alt: 'Property listings page',
      },
      {
        _key: generateKey(),
        url: 'https://res.cloudinary.com/dzd51q99i/image/upload/v1750349719/deployfaster/Real_Estate_Landing_Page_lcclea.png',
        alt: 'Property details view',
      },
    ],
    features: [
      'Property Search',
      'Virtual Tours',
      'Agent Dashboard',
      'Mortgage Calculator',
    ],
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    featured: true,
    createdAt: '2025-06-19T12:00:00Z',
  },
  {
    _type: 'template',
    title: 'Restaurant Menu App',
    slug: {
      _type: 'slug',
      current: 'restaurant-menu-app',
    },
    description:
      'Beautiful restaurant website with online ordering and reservation system',
    longDescription: [
      {
        _type: 'block',
        _key: generateKey(),
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: 'Elegant restaurant template featuring digital menu, online ordering system, table reservations, and customer reviews. Perfect for restaurants, cafes, and food businesses.',
          },
        ],
      },
    ],
    category: 'Restaurant',
    tags: ['restaurant', 'menu', 'ordering', 'reservations'],
    price: 40000,
    currency: 'NGN',
    previewUrl: 'https://mcdonalds.com',
    thumbnailImageUrl:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    galleryImageUrls: [
      {
        _key: generateKey(),
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
        alt: 'Restaurant interior',
      },
      {
        _key: generateKey(),
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
        alt: 'Menu display',
      },
    ],
    features: [
      'Digital Menu',
      'Online Ordering',
      'Table Reservations',
      'Customer Reviews',
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    featured: false,
    createdAt: '2025-06-19T13:00:00Z',
  },
  {
    _type: 'template',
    title: 'Creative Agency Hub',
    slug: {
      _type: 'slug',
      current: 'creative-agency-hub',
    },
    description:
      'Modern agency website showcasing services, portfolio, and team',
    longDescription: [
      {
        _type: 'block',
        _key: generateKey(),
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: 'Professional agency template with stunning animations, service showcases, team profiles, and project case studies. Ideal for creative agencies, design studios, and marketing firms.',
          },
        ],
      },
    ],
    category: 'Agency',
    tags: ['agency', 'creative', 'services', 'portfolio'],
    price: 60000,
    currency: 'NGN',
    previewUrl: 'https://dribbble.com',
    thumbnailImageUrl:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    galleryImageUrls: [
      {
        _key: generateKey(),
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
        alt: 'Agency workspace',
      },
      {
        _key: generateKey(),
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
        alt: 'Team collaboration',
      },
    ],
    features: [
      'Service Showcase',
      'Team Profiles',
      'Case Studies',
      'Contact Forms',
    ],
    technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'Sanity'],
    featured: true,
    createdAt: '2025-06-19T14:00:00Z',
  },
  {
    _type: 'template',
    title: 'Tech Blog Platform',
    slug: {
      _type: 'slug',
      current: 'tech-blog-platform',
    },
    description:
      'Modern blog platform with content management and SEO optimization',
    longDescription: [
      {
        _type: 'block',
        _key: generateKey(),
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: 'Feature-rich blog platform with markdown support, category filtering, search functionality, and newsletter integration. Perfect for tech bloggers, content creators, and publications.',
          },
        ],
      },
    ],
    category: 'Blog',
    tags: ['blog', 'content', 'seo', 'markdown'],
    price: 35000,
    currency: 'NGN',
    previewUrl: 'https://dev.to',
    thumbnailImageUrl:
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
    galleryImageUrls: [
      {
        _key: generateKey(),
        url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
        alt: 'Blog homepage',
      },
      {
        _key: generateKey(),
        url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
        alt: 'Article view',
      },
    ],
    features: [
      'Markdown Editor',
      'Category System',
      'Search',
      'Newsletter Integration',
    ],
    technologies: ['Next.js', 'MDX', 'Tailwind CSS', 'Vercel'],
    featured: false,
    createdAt: '2025-06-19T15:00:00Z',
  },
  {
    _type: 'template',
    title: 'SaaS Landing Page',
    slug: {
      _type: 'slug',
      current: 'saas-landing-page',
    },
    description:
      'Conversion-optimized SaaS landing page with pricing and features',
    longDescription: [
      {
        _type: 'block',
        _key: generateKey(),
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: 'High-converting SaaS landing page template with feature highlights, pricing tables, customer testimonials, and sign-up flows. Designed to maximize conversions and user acquisition.',
          },
        ],
      },
    ],
    category: 'SaaS',
    tags: ['saas', 'landing', 'conversion', 'pricing'],
    price: 45000,
    currency: 'NGN',
    previewUrl: 'https://stripe.com',
    thumbnailImageUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    galleryImageUrls: [
      {
        _key: generateKey(),
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        alt: 'SaaS dashboard',
      },
      {
        _key: generateKey(),
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        alt: 'Pricing section',
      },
    ],
    features: [
      'Pricing Tables',
      'Feature Showcase',
      'Testimonials',
      'CTA Optimization',
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Analytics'],
    featured: true,
    createdAt: '2025-06-19T16:00:00Z',
  },
  {
    _type: 'template',
    title: 'Business Corporate',
    slug: {
      _type: 'slug',
      current: 'business-corporate',
    },
    description: 'Professional corporate website for established businesses',
    longDescription: [
      {
        _type: 'block',
        _key: generateKey(),
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: 'Corporate website template featuring company information, services, leadership team, investor relations, and career opportunities. Perfect for established businesses and enterprises.',
          },
        ],
      },
    ],
    category: 'Business',
    tags: ['corporate', 'business', 'professional', 'enterprise'],
    price: 55000,
    currency: 'NGN',
    previewUrl: 'https://microsoft.com',
    thumbnailImageUrl:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    galleryImageUrls: [
      {
        _key: generateKey(),
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
        alt: 'Corporate building',
      },
      {
        _key: generateKey(),
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
        alt: 'Business meeting',
      },
    ],
    features: [
      'Company Profile',
      'Service Pages',
      'Team Directory',
      'Investor Relations',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'CMS'],
    featured: false,
    createdAt: '2025-06-19T17:00:00Z',
  },
  {
    _type: 'template',
    title: 'Fashion E-commerce',
    slug: {
      _type: 'slug',
      current: 'fashion-ecommerce',
    },
    description:
      'Trendy fashion store with product catalog and style recommendations',
    longDescription: [
      {
        _type: 'block',
        _key: generateKey(),
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: 'Stylish fashion e-commerce template with product filtering, size guides, wishlist functionality, and style recommendations. Perfect for fashion retailers and clothing brands.',
          },
        ],
      },
    ],
    category: 'E-commerce',
    tags: ['fashion', 'ecommerce', 'clothing', 'style'],
    price: 65000,
    currency: 'NGN',
    previewUrl: 'https://zara.com',
    thumbnailImageUrl:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    galleryImageUrls: [
      {
        _key: generateKey(),
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
        alt: 'Fashion store',
      },
      {
        _key: generateKey(),
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
        alt: 'Product gallery',
      },
    ],
    features: [
      'Product Filtering',
      'Size Guide',
      'Wishlist',
      'Style Recommendations',
    ],
    technologies: ['Next.js', 'Shopify', 'Tailwind CSS', 'Stripe'],
    featured: false,
    createdAt: '2025-06-19T18:00:00Z',
  },
  {
    _type: 'template',
    title: 'Fitness Gym Website',
    slug: {
      _type: 'slug',
      current: 'fitness-gym-website',
    },
    description:
      'Dynamic fitness website with class schedules and membership plans',
    longDescription: [
      {
        _type: 'block',
        _key: generateKey(),
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: 'Energetic fitness website template featuring class schedules, trainer profiles, membership plans, and workout tracking. Ideal for gyms, fitness studios, and personal trainers.',
          },
        ],
      },
    ],
    category: 'Business',
    tags: ['fitness', 'gym', 'health', 'membership'],
    price: 42000,
    currency: 'NGN',
    previewUrl: 'https://nike.com',
    thumbnailImageUrl:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    galleryImageUrls: [
      {
        _key: generateKey(),
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        alt: 'Gym equipment',
      },
      {
        _key: generateKey(),
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        alt: 'Fitness class',
      },
    ],
    features: [
      'Class Schedules',
      'Trainer Profiles',
      'Membership Plans',
      'Workout Tracking',
    ],
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'Payment Integration'],
    featured: true,
    createdAt: '2025-06-19T19:00:00Z',
  },
];

async function uploadTemplates() {
  for (const template of templates) {
    try {
      const result = await client.create(template);
      console.log('Created:', result.title);
    } catch (error) {
      console.error('Error creating template:', template.title, error);
    }
  }
  console.log('Upload completed!');
}

uploadTemplates();
