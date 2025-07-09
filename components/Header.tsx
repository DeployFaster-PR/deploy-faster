'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import logo from './../public/deployfasterLogo.png';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import { MessageCircle } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt="Deploy Faster Logo"
                className={`transition-all duration-300 ${
                  scrolled ? 'h-12' : 'h-14'
                }`}
                width={scrolled ? 60 : 80}
                height={scrolled ? 48 : 64}
              />
            </Link>

            {/* Navigation and Contact */}
            <div className="flex items-center space-x-6">
              <Link
                href="/blog"
                className={`font-medium transition-colors hover:text-blue-600 ${
                  scrolled ? 'text-gray-900' : 'text-gray-800'
                }`}
              >
                Blog
              </Link>

              <button
                onClick={() => setIsContactOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contact Form Modal */}
      <ContactForm
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
};

export default Header;
