import { Template } from '@/lib/types';
import { ExternalLink, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface TemplateCardProps {
  template: Template;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group animate-slide-up">
      <div className="bg-white rounded-apple-xl overflow-hidden hover:shadow-md transition-shadow duration-300 shadow-sm border border-gray-100">
        <div className="relative overflow-hidden">
          <Image
            src={
              template.thumbnailImageUrl ||
              'https://res.cloudinary.com/dzd51q99i/image/upload/c_fill,w_800,h_600/v1750354529/deployfaster/assets/Deployfaster.primereserved.com_logo_512_xwbzvj.png'
            }
            alt={template.title}
            width={400}
            height={300}
            className="w-full h-64 object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Featured Badge */}
          {template.featured && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 text-amber-600 shadow-sm">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm">
            {template.category}
          </div>
        </div>

        <div className="p-4">
          {/* Price and Title Row */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 flex-1 mr-3">
              {template.title}
            </h3>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent whitespace-nowrap">
              {formatPrice(template.price, template.currency)}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {template.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {template.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-50 border border-gray-200 rounded-full px-3 py-1 text-blue-600 font-medium"
              >
                {tag}
              </span>
            ))}
            {template.tags.length > 3 && (
              <span className="text-xs text-gray-500 font-medium">
                +{template.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Link
              href={`/template/${template.slug}`}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-apple text-center text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View Details
            </Link>
            <a
              href={template.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-50 hover:bg-gray-100 border border-gray-200 p-3 rounded-apple transition-all duration-200 flex items-center justify-center group"
              title="Live Preview"
            >
              <ExternalLink className="w-4 h-4 text-gray-700 group-hover:text-blue-600 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
