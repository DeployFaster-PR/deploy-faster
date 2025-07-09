// app/blog/[slug]/page.tsx
import { client, urlFor } from '@/lib/sanity';
import { BlogPost } from '@/types/blog';
import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const query = `
    *[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      content,
      publishedAt,
      author,
      tags,
      featured
    }
  `;

  return await client.fetch(query, { slug });
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : null;

  return {
    title: `${post.title} - Deploy Faster Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://deployfaster.primereserved.com/blog/${post.slug.current}`,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(800).height(500).url()
    : null;

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="glass-card rounded-apple-lg overflow-hidden">
          {imageUrl && (
            <div className="relative h-64 md:h-96 overflow-hidden">
              <Image
                src={imageUrl}
                alt={post.mainImage?.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-8">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
              <time>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>by {post.author}</span>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:hover:text-blue-800 prose-strong:text-gray-900 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-6">
              <PortableText
                value={post.content}
                components={{
                  types: {
                    image: ({ value }) => {
                      const imageUrl = urlFor(value)
                        .width(800)
                        .height(500)
                        .url();
                      return (
                        <figure className="my-8">
                          <Image
                            src={imageUrl}
                            alt={value.alt || ''}
                            width={800}
                            height={500}
                            className="rounded-apple-lg shadow-card"
                          />
                          {value.alt && (
                            <figcaption className="text-center text-sm text-gray-600 mt-2">
                              {value.alt}
                            </figcaption>
                          )}
                        </figure>
                      );
                    },
                  },
                  marks: {
                    link: ({ value, children }) => (
                      <a
                        href={value.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {children}
                      </a>
                    ),
                  },
                }}
              />
            </div>
          </div>
        </article>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="glass-card rounded-apple-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Deploy Faster?
            </h3>
            <p className="text-gray-600 mb-6">
              Explore our premium templates and start building your next project
              today.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-apple font-medium hover:bg-blue-700 transition-colors"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
