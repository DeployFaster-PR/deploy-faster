'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { client } from '@/lib/sanity';
import { templateBySlugQuery } from '@/lib/sanity-queries';
import { Template } from '@/lib/types';
import ContactForm from '@/components/ContactForm';
import {
  ExternalLink,
  Star,
  Check,
  Code,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Heart,
  Share2,
  X,
  Copy,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';

export default function TemplateDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        console.log('Fetching template with slug:', slug);
        const data = await client.fetch(templateBySlugQuery, { slug });
        console.log('Template data:', data);
        setTemplate(data);
      } catch (error) {
        console.error('Error fetching template:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchTemplate();
    }
  }, [slug]);

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getOptimizedImageUrl = (
    url: string,
    width: number,
    height?: number
  ) => {
    if (url.includes('cloudinary.com')) {
      const parts = url.split('/upload/');
      if (parts.length === 2) {
        const transformations = height
          ? `c_fill,w_${width},h_${height},q_auto,f_auto`
          : `w_${width},q_auto,f_auto`;
        return `${parts[0]}/upload/${transformations}/${parts[1]}`;
      }
    }
    return url;
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleCopyLink = async () => {
    const currentUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Failed to copy link:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  // Image navigation functions
  const nextImage = () => {
    if (!template) return;
    const images = [
      { url: template.thumbnailImageUrl, alt: template.title },
      ...(template.galleryImageUrls || []),
    ];
    setSelectedImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    if (!template) return;
    const images = [
      { url: template.thumbnailImageUrl, alt: template.title },
      ...(template.galleryImageUrls || []),
    ];
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [template]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading template...</p>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Template Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The template you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-apple-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Templates
          </Link>
        </div>
      </div>
    );
  }

  const images = [
    { url: template.thumbnailImageUrl, alt: template.title },
    ...(template.galleryImageUrls || []),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Templates
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image Container with Navigation Arrows */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl relative group">
              <div className="relative w-full aspect-[16/9] bg-gray-100">
                <Image
                  src={getOptimizedImageUrl(
                    images[selectedImageIndex].url,
                    800,
                    450
                  )}
                  alt={images[selectedImageIndex].alt || template.title}
                  fill
                  className="object-contain transition-opacity duration-500 ease-in-out"
                  priority={selectedImageIndex === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />

                {/* Navigation Arrows - Only show if more than 1 image */}
                {images.length > 1 && (
                  <>
                    {/* Left Arrow */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/17 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Right Arrow */}
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/17 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {selectedImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Image Gallery - Improved */}
            {images.length > 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative overflow-hidden rounded-xl transition-all duration-300 ease-in-out transform ${
                      selectedImageIndex === index
                        ? 'ring-2 ring-blue-500 shadow-lg scale-105'
                        : 'hover:scale-102 shadow-md hover:shadow-lg'
                    }`}
                  >
                    <div className="relative w-full aspect-[16/9] bg-gray-100">
                      <Image
                        src={getOptimizedImageUrl(image.url, 800, 450)}
                        alt={image.alt || `${template.title} ${index + 1}`}
                        fill
                        className="object-contain transition-opacity duration-300 ease-in-out"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 150px"
                      />
                    </div>
                    {/* Overlay for non-selected images */}
                    {selectedImageIndex !== index && (
                      <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 ease-in-out hover:bg-black/5" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-1 space-y-4 relative">
            {/* Header - Glass Box */}
            <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-5 shadow-deep-glass">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {template.title}
                    </h1>
                    {template.featured && (
                      <div className="bg-amber-100/80 text-amber-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 backdrop-blur-sm">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                    <span className="bg-blue-100/80 text-blue-700 px-3 py-1 rounded-full font-medium backdrop-blur-sm">
                      {template.category}
                    </span>
                    <span>
                      {new Date(template.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right mb-4">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {formatPrice(template.price, template.currency)}
                </div>
              </div>

              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                {template.description}
              </p>
            </div>

            {/* Tags - Glass Box */}
            <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-4 shadow-deep-glass">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100/80 text-gray-700 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Features - Glass Box */}
            {template.features && template.features.length > 0 && (
              <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-4 shadow-deep-glass">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Features
                </h3>
                <ul className="space-y-2">
                  {template.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-700 text-sm"
                    >
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies - Glass Box */}
            {template.technologies && template.technologies.length > 0 && (
              <div className="backdrop-blur-xl bg-white/60 border border-white/20 rounded-2xl p-5 shadow-xl">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {template.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-50/80 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 backdrop-blur-sm"
                    >
                      <Code className="w-3 h-3" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sticky Action Buttons */}
            <div className="sticky bottom-6 pt-6 pb-2">
              <div className="space-y-3">
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Get This Template
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-800 py-3 px-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 border border-white/20"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    onClick={handleShare}
                    className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-800 py-3 px-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 border border-white/20"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Long Description */}
        {template.longDescription && (
          <div className="mt-12 backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-6 sm:p-8 shadow-deep-glass">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              About This Template
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <PortableText value={template.longDescription} />
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Share Template
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <p className="text-gray-600 mb-4">
              Copy the link below to share this template:
            </p>

            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
              <input
                type="text"
                value={
                  typeof window !== 'undefined' ? window.location.href : ''
                }
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
              />
              <button
                onClick={handleCopyLink}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  copied
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Share this template with your friends and colleagues
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold">
                  {template.title} - Live Preview
                </h3>
                <a
                  href={template.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  Open in new tab
                </a>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={template.previewUrl}
                className="w-full h-full border-0"
                title={`${template.title} Preview`}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      <ContactForm
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        templateId={template._id}
        templateTitle={template.title}
        templatePrice={formatPrice(template.price, template.currency)}
        templateUrl={typeof window !== 'undefined' ? window.location.href : ''}
        templateFeatured={template.featured || false}
      />
    </div>
  );
}
