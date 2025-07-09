// upload-blogs.js
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const blogPosts = [
  {
    title:
      'From Idea to Launch: How to Build Your Business Website in 3 Days (Not 3 Months)',
    slug: 'idea-to-launch-3-days',
    excerpt:
      'Stop waiting months for your website. Learn how successful businesses are launching professional websites in days using proven, pre-built solutions and strategic shortcuts.',
    content: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Every day you don't have a website is a day you're losing customers to competitors who do. The harsh reality? Traditional web development takes 3-6 months and costs $15,000-$50,000. But what if I told you there's a better way?",
          },
        ],
      },
      {
        _type: 'block',
        _key: 'problem',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Traditional Website Development Trap',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'problem-content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Here\'s what typically happens when businesses try to build a website the "traditional" way:',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'problem-list',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• Research and planning: 2-4 weeks\n• Design mockups and revisions: 4-8 weeks\n• Development and coding: 6-12 weeks\n• Testing and quality assurance: 2-4 weeks\n• Launch and deployment: 1-2 weeks',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'problem-impact',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "By the time your website is live, you've lost 3-6 months of potential revenue. For a business generating $10,000/month, that's $30,000-$60,000 in lost opportunity cost alone.",
          },
        ],
      },
      {
        _type: 'block',
        _key: 'solution',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Deploy Faster Method: 3 Days to Launch',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'solution-intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Smart businesses are skipping the lengthy development process by using pre-built professional websites that can be customized and launched in days. Here's the proven 3-day framework:",
          },
        ],
      },
      {
        _type: 'block',
        _key: 'day1',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Day 1: Choose and Customize',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'day1-content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Select a professionally built website that matches your industry and brand. Replace placeholder content with your copy, images, and branding. Our websites are designed for quick customization – no coding required.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'day2',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Day 2: Optimize and Test',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'day2-content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Fine-tune your content for conversions. Test all functionality, forms, and user flows. Optimize for mobile and ensure fast loading speeds. All our websites come pre-optimized for SEO and performance.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'day3',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Day 3: Launch and Scale',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'day3-content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Deploy your website to production. Set up analytics, connect payment systems, and configure lead capture forms. Start driving traffic and generating leads immediately.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'benefits',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Why Pre-Built Professional Websites Work Better Than Custom Development',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'benefits-content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Pre-built professional websites aren't just faster – they're often better. Here's why:",
          },
        ],
      },
      {
        _type: 'block',
        _key: 'benefits-list',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• ',
          },
          {
            _type: 'span',
            text: 'Expert craftsmanship:',
            marks: ['strong'],
          },
          {
            _type: 'span',
            text: ' Each website is custom-built from scratch by professional developers and designers\n• ',
          },
          {
            _type: 'span',
            text: 'Research-backed designs:',
            marks: ['strong'],
          },
          {
            _type: 'span',
            text: ' Extensive market research and user testing completed before you even see them\n• ',
          },
          {
            _type: 'span',
            text: 'Built-in best practices:',
            marks: ['strong'],
          },
          {
            _type: 'span',
            text: ' SEO optimization, mobile responsiveness, and fast loading speeds are standard\n• ',
          },
          {
            _type: 'span',
            text: 'Cost-effective:',
            marks: ['strong'],
          },
          {
            _type: 'span',
            text: ' 95% less expensive than custom development\n• ',
          },
          {
            _type: 'span',
            text: 'Battle-tested functionality:',
            marks: ['strong'],
          },
          {
            _type: 'span',
            text: ' Every component has been refined through real-world testing and optimization',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'cta',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Ready to Launch Your Website This Week?',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'cta-content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Stop waiting for the perfect custom solution. Browse our collection of professionally built websites and launch your business in 3 days. Every website comes with full documentation, support, and a 30-day money-back guarantee.',
          },
        ],
      },
    ],
    author: 'PrimeReserved',
    publishedAt: new Date('2024-12-15').toISOString(),
    tags: [
      'Website Development',
      'Business Growth',
      'Quick Launch',
      'Professional Websites',
    ],
    featured: true,
  },
  {
    title:
      'Why Your Competitors Are Launching Websites 10x Faster (And How to Catch Up)',
    slug: 'competitors-launching-faster',
    excerpt:
      'Discover the secret weapon successful businesses use to launch professional websites in days while their competitors wait months. The competitive advantage is real.',
    content: [
      {
        _type: 'block',
        _key: 'hook',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "While you're still waiting for your web developer to finish your site, your competitors just launched theirs. And they're already capturing customers you should be getting. Here's how they're doing it.",
          },
        ],
      },
      {
        _type: 'block',
        _key: 'reality',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The New Reality: Speed Wins',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'reality-content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "In today's digital economy, speed isn't just an advantage – it's survival. Companies that can adapt and launch faster are capturing market share while slower competitors struggle to keep up.",
          },
        ],
      },
      {
        _type: 'block',
        _key: 'stats',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Consider these statistics:',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'stats-list',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "• 88% of online consumers will not return to a site after a bad experience\n• 57% of users will abandon a website if it takes more than 3 seconds to load\n• Businesses with professional websites are 3x more likely to be trusted by customers\n• 75% of consumers judge a company's credibility based on website design",
          },
        ],
      },
      {
        _type: 'block',
        _key: 'secret',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Secret: Pre-Built Professional Websites vs. Custom Development',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'secret-content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Smart businesses have discovered that pre-built professional websites offer everything custom development promises – professional design, mobile optimization, fast loading speeds, and conversion-focused layouts – but in a fraction of the time. These aren't cookie-cutter templates; they're fully custom websites built from scratch by expert developers and designers.",
          },
        ],
      },
      {
        _type: 'block',
        _key: 'comparison',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Custom Development vs. Pre-Built Professional Websites',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'comparison-table',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Custom Development:\n• Timeline: 3-6 months\n• Cost: $15,000-$50,000\n• Risk: High (untested designs)\n• Maintenance: Ongoing developer dependency\n• Updates: Expensive and time-consuming\n\nPre-Built Professional Websites:\n• Timeline: 1-3 days\n• Cost: $49-$299\n• Risk: Low (research-backed designs)\n• Maintenance: Self-manageable\n• Updates: Instant and affordable',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'case-study',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Real Success Stories',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'case-study-content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'TechStart Solutions needed to launch their SaaS platform website. Instead of waiting 4 months for custom development, they chose a pre-built professional website from Deploy Faster. Result: Launched in 2 days, generated first customer within a week, and saved $35,000 in development costs.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'case-study-2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Local restaurant chain needed websites for 5 new locations. Using pre-built professional sites, they launched all 5 locations in one week for less than the cost of one custom site. Online orders increased 300% within the first month.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'action',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'How to Catch Up and Get Ahead',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'action-steps',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '1. ',
          },
          {
            _type: 'span',
            text: 'Stop waiting for perfect:',
            marks: ['strong'],
          },
          {
            _type: 'span',
            text: ' Launch with a professionally built website now rather than waiting for a perfect custom solution later\n\n2. ',
          },
          {
            _type: 'span',
            text: 'Choose industry-specific:',
            marks: ['strong'],
          },
          {
            _type: 'span',
            text: ' Select professionally built websites designed for your specific industry and target audience\n\n3. ',
          },
          {
            _type: 'span',
            text: 'Focus on conversion:',
            marks: ['strong'],
          },
          {
            _type: 'span',
            text: ' Prioritize websites with proven conversion elements like clear CTAs, social proof, and mobile optimization\n\n4. ',
          },
          {
            _type: 'span',
            text: 'Launch and iterate:',
            marks: ['strong'],
          },
          {
            _type: 'span',
            text: ' Get online quickly, then improve based on real user data and feedback',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'urgency',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Cost of Waiting',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'urgency-content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Every day without a professional website costs you customers. While you're perfecting your custom solution, competitors are capturing market share with professionally built websites. The question isn't whether you should launch faster – it's whether you can afford not to.",
          },
        ],
      },
      {
        _type: 'block',
        _key: 'final-cta',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Browse our collection of conversion-optimized, professionally built websites and join the businesses that launch faster, compete better, and win more customers.',
          },
        ],
      },
    ],
    author: 'PrimeReserved',
    publishedAt: new Date('2024-12-10').toISOString(),
    tags: ['Competition', 'Business Strategy', 'Speed', 'Market Advantage'],
    featured: true,
  },
  {
    title:
      'The $50,000 Website Myth: Why Pre-Built Professional Websites Deliver Better ROI Than Custom Development',
    slug: '50k-website-myth',
    excerpt:
      "Custom websites cost 100x more but don't deliver 100x better results. Here's the data-driven truth about website ROI and why smart businesses choose pre-built professional solutions.",
    content: [
      {
        _type: 'block',
        _key: 'myth-intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '"You need a custom website to stand out." "Pre-built sites look cheap." "Only custom development can deliver what you need." These myths are costing businesses millions in unnecessary expenses and months of lost revenue.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'myth-title',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Great Website Expense Myth',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'myth-content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "The web development industry wants you to believe that expensive equals better. Here's what they don't tell you: 90% of business websites use the same core features, layouts, and functionality patterns. You're paying custom prices for cookie-cutter solutions.",
          },
        ],
      },
      {
        _type: 'block',
        _key: 'real-costs',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'The Real Cost of Custom Development',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'cost-breakdown',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Let's break down what you're actually paying for:",
          },
        ],
      },
      {
        _type: 'block',
        _key: 'cost-list',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• Initial development: $15,000-$50,000\n• Project management overhead: 30-40% of total cost\n• Revisions and changes: $150-$300 per hour\n• Ongoing maintenance: $2,000-$5,000 per year\n• Updates and security patches: $500-$1,500 per month\n• Bug fixes and troubleshooting: $1,000-$3,000 per incident',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'hidden-costs',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Hidden costs include:',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'hidden-list',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• Opportunity cost of 3-6 month delay\n• Developer dependency for simple changes\n• Hosting and infrastructure complexity\n• Third-party integrations and licensing\n• Training team members on custom systems',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'template-advantage',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Pre-Built Professional Website Advantage: Better ROI, Faster Results',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'template-benefits',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Pre-built professional websites aren't just cheaper – they're smarter business investments. Here's why:",
          },
        ],
      },
      {
        _type: 'block',
        _key: 'proven-designs',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '1. Research-Backed, Conversion-Optimized Designs',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'proven-content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Our websites are based on extensive market research and user testing that has already been completed. They incorporate best practices for user experience, conversion optimization, and mobile responsiveness that have been refined through real-world testing across thousands of businesses.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'instant-launch',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '2. Instant Market Entry',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'instant-content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Launch in days, not months. Start generating leads, sales, and revenue immediately. A business earning $10,000/month loses $30,000-$60,000 in opportunity cost waiting for custom development.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'maintenance',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '3. Predictable, Low Maintenance',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'maintenance-content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Pre-built professional websites are built on stable, well-documented frameworks. Updates are straightforward, security is handled by proven systems, and changes can be made without developer dependency.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'roi-calculation',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: "ROI Calculation: The Numbers Don't Lie",
          },
        ],
      },
      {
        _type: 'block',
        _key: 'roi-example',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Let's calculate the real ROI for a typical business:",
          },
        ],
      },
      {
        _type: 'block',
        _key: 'custom-roi',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Custom Development ROI:\n• Investment: $35,000 (development + 6 months opportunity cost)\n• Time to launch: 6 months\n• Ongoing costs: $4,000/year\n• Break-even: 18-24 months',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'template-roi',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Pre-Built Professional Website ROI:\n• Investment: $199 (website + setup)\n• Time to launch: 3 days\n• Ongoing costs: $200/year\n• Break-even: 1-2 weeks',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'success-metrics',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'What Really Matters: Performance Metrics',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'metrics-content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Your website's success isn't measured by how much you spent on it, but by how well it performs:",
          },
        ],
      },
      {
        _type: 'block',
        _key: 'metrics-list',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• Conversion rate: Pre-built professional websites often outperform custom sites\n• Loading speed: Optimized for performance from day one\n• Mobile responsiveness: Built-in and tested across devices\n• SEO performance: Includes best practices from launch\n• User experience: Based on research-backed design patterns',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'smart-choice',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Smart Business Choice',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'smart-content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Smart businesses don't waste money on expensive custom solutions when pre-built professional websites deliver better results faster. They invest the savings in marketing, product development, and customer acquisition – activities that actually grow revenue.",
          },
        ],
      },
      {
        _type: 'block',
        _key: 'action-cta',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Stop falling for the expensive website myth. Choose a pre-built professional website, launch faster, and invest your savings in growing your business. Browse our collection of conversion-optimized websites and see the difference smart businesses are making.',
          },
        ],
      },
    ],
    author: 'PrimeReserved',
    publishedAt: new Date('2024-12-05').toISOString(),
    tags: [
      'ROI',
      'Cost Analysis',
      'Business Strategy',
      'Professional Websites',
    ],
    featured: false,
  },
];

async function uploadBlogs() {
  console.log('🚀 Starting blog upload...');

  try {
    for (let i = 0; i < blogPosts.length; i++) {
      const post = blogPosts[i];
      console.log(
        `📝 Uploading blog ${i + 1}/${blogPosts.length}: ${post.title}`
      );

      const doc = {
        _type: 'blog',
        title: post.title,
        slug: {
          _type: 'slug',
          current: post.slug,
        },
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        publishedAt: post.publishedAt,
        tags: post.tags,
        featured: post.featured,
      };

      const result = await client.create(doc);
      console.log(`✅ Successfully uploaded: ${result.title}`);
    }

    console.log('🎉 All blogs uploaded successfully!');
    console.log('📝 Next steps:');
    console.log('1. Go to your Sanity Studio');
    console.log('2. Navigate to the Blog section');
    console.log('3. Add main images to each blog post');
    console.log('4. Publish the posts');
  } catch (error) {
    console.error('❌ Error uploading blogs:', error);
  }
}

uploadBlogs();
