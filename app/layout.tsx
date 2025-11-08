import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CurrencyProvider } from '@/contexts/CurrencyContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Deploy Faster - Launch Your Business Website in Days, Not Months',
    template: '%s | Deploy Faster',
  },
  description:
    'Skip months of design and development. Deploy Faster offers professionally designed, conversion-optimized website templates for businesses of all sizes. Launch your professional website in days with our ready-to-use templates.',
  keywords: [
    'website templates',
    'business website templates',
    'fast website deployment',
    'professional website templates',
    'website templates marketplace',
    'business website launch',
    'responsive website templates',
    'conversion-optimized templates',
    'ready-to-use websites',
    'website development solutions',
    'small business websites',
    'enterprise website templates',
    'PrimeReserved',
    'deploy faster',
    'quick website launch',
    'website templates for businesses',
    'professional web design',
    'modern website templates',
  ],
  authors: [{ name: 'PrimeReserved', url: 'https://primereserved.com' }],
  creator: 'PrimeReserved',
  publisher: 'PrimeReserved',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://deployfaster.primereserved.com',
    siteName: 'Deploy Faster',
    title: 'Deploy Faster - Launch Your Business Website in Days, Not Months',
    description:
      'Skip months of design and development. Deploy Faster offers professionally designed, conversion-optimized website templates for businesses of all sizes. Launch your professional website in days.',
    images: [
      {
        url: 'https://res.cloudinary.com/dzd51q99i/image/upload/c_fill,w_1200,h_630/v1750354529/deployfaster/assets/Deployfaster.primereserved.com_logo_512_xwbzvj.png',
        width: 1200,
        height: 630,
        alt: 'Deploy Faster - Professional Website Templates Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deploy Faster - Launch Your Business Website in Days, Not Months',
    description:
      'Skip months of design and development. Deploy Faster offers professionally designed, conversion-optimized website templates for businesses of all sizes.',
    images: [
      'https://res.cloudinary.com/dzd51q99i/image/upload/c_fill,w_1200,h_630/v1750354529/deployfaster/assets/Deployfaster.primereserved.com_logo_512_xwbzvj.png',
    ],
  },
  alternates: {
    canonical: 'https://deployfaster.primereserved.com',
  },
  category: 'technology',
  verification: {
    // Add these when you set up analytics
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://res.cloudinary.com/dzd51q99i/image/upload/c_fill,w_180,h_180/v1750354529/deployfaster/assets/Deployfaster.primereserved.com_logo_512_xwbzvj.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://res.cloudinary.com/dzd51q99i/image/upload/c_fill,w_32,h_32/v1750354529/deployfaster/assets/Deployfaster.primereserved.com_logo_512_xwbzvj.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://res.cloudinary.com/dzd51q99i/image/upload/c_fill,w_16,h_16/v1750354529/deployfaster/assets/Deployfaster.primereserved.com_logo_512_xwbzvj.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />

        {/* Additional SEO meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Structured data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'PrimeReserved',
              url: 'https://primereserved.com',
              logo: 'https://res.cloudinary.com/dzd51q99i/image/upload/c_fill,w_512,h_512/v1750354529/deployfaster/assets/Deployfaster.primereserved.com_logo_512_xwbzvj.png',
              description:
                'Professional website template marketplace helping businesses launch faster',
              foundingDate: '2024',
              sameAs: [
                // Add your social media URLs here when available
                // "https://twitter.com/primereserved",
                // "https://linkedin.com/company/primereserved"
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                url: 'https://deployfaster.primereserved.com/contact',
              },
              makesOffer: {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Professional Website Templates',
                  description:
                    'Ready-to-use, conversion-optimized website templates for businesses',
                },
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Deploy Faster',
              description:
                'Professional website templates marketplace for fast business deployment',
              url: 'https://deployfaster.primereserved.com',
              publisher: {
                '@type': 'Organization',
                name: 'PrimeReserved',
                url: 'https://primereserved.com',
              },
              potentialAction: {
                '@type': 'SearchAction',
                target:
                  'https://deployfaster.primereserved.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
              mainEntity: {
                '@type': 'ItemList',
                name: 'Website Templates',
                description:
                  'Professional website templates for businesses of all sizes',
                numberOfItems: 50,
                itemListElement: {
                  '@type': 'ListItem',
                  name: 'Business Website Templates',
                },
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Deploy Faster',
              description:
                'Website template marketplace for rapid business deployment',
              url: 'https://deployfaster.primereserved.com',
              applicationCategory: 'WebApplication',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                category: 'Website Templates',
                businessFunction: 'http://purl.org/goodrelations/v1#Sell',
                itemOffered: {
                  '@type': 'Product',
                  name: 'Professional Website Templates',
                  description:
                    'Ready-to-deploy website templates for businesses',
                },
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} transition-colors duration-300`}
        suppressHydrationWarning={true}
      >
        <CurrencyProvider>
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 transition-all duration-500">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CurrencyProvider>
      </body>
    </html>
  );
}
