import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Deploy Faster - Premium Website Templates by PrimeReserved',
    template: '%s | Deploy Faster',
  },
  description:
    'Discover our collection of professionally designed, responsive website templates. Perfect for businesses, portfolios, and personal projects. Built with modern technologies for fast deployment.',
  keywords: [
    'website templates',
    'premium templates',
    'responsive design',
    'business templates',
    'portfolio templates',
    'modern web design',
    'fast deployment',
    'professional websites',
    'PrimeReserved',
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
    title: 'Deploy Faster - Premium Website Templates by PrimeReserved',
    description:
      'Discover our collection of professionally designed, responsive website templates. Perfect for businesses, portfolios, and personal projects.',
    images: [
      {
        url: 'https://res.cloudinary.com/dzd51q99i/image/upload/c_fill,w_1200,h_630/v1750354529/deployfaster/assets/Deployfaster.primereserved.com_logo_512_xwbzvj.png',
        width: 1200,
        height: 630,
        alt: 'Deploy Faster - Premium Website Templates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deploy Faster - Premium Website Templates by PrimeReserved',
    description:
      'Discover our collection of professionally designed, responsive website templates. Perfect for businesses, portfolios, and personal projects.',
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
              logo: 'https://deployfaster.primereserved.com/logo.png',
              sameAs: [
                // Add your social media URLs here
                // "https://twitter.com/primereserved",
                // "https://linkedin.com/company/primereserved"
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                url: 'https://primereserved.com/contact',
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
              description: 'Premium website templates for fast deployment',
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
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} transition-colors duration-300`}
        suppressHydrationWarning={true}
      >
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 transition-all duration-500">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
