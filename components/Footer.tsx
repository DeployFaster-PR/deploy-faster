'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Footer = () => {
  const pathname = usePathname();

  // Only show footer on template detail pages (assuming they follow pattern /template/[slug])
  const isTemplateDetailPage =
    pathname?.startsWith('/template/') || pathname?.includes('/templates/');

  if (!isTemplateDetailPage) return null;

  return (
    <footer className="bg-gray-50 border-t border-gray-200/50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-gray-600">
          <span>Made with ❤️ by</span>
          <Link
            href="https://primereserved.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            PrimeReserved: A Web Development Agency
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
