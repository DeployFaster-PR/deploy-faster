// app/blog/page.tsx
'use client';

import { client, urlFor } from '@/lib/sanity';
import { BlogListItem } from '@/types/blog';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

const POSTS_PER_PAGE = 6;

async function getBlogPosts(
  offset: number = 0,
  limit: number = POSTS_PER_PAGE
): Promise<BlogListItem[]> {
  const query = `
    *[_type == "blog"] | order(publishedAt desc) [${offset}...${offset + limit}] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      author,
      tags,
      featured
    }
  `;

  return await client.fetch(query);
}

async function getTotalPostCount(): Promise<number> {
  const query = `count(*[_type == "blog"])`;
  return await client.fetch(query);
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  // Load initial posts
  useEffect(() => {
    const loadInitialPosts = async () => {
      setLoading(true);
      try {
        const [initialPosts, total] = await Promise.all([
          getBlogPosts(0, POSTS_PER_PAGE),
          getTotalPostCount(),
        ]);
        setPosts(initialPosts);
        setTotalPosts(total);
        setOffset(POSTS_PER_PAGE);
        setHasMore(
          initialPosts.length === POSTS_PER_PAGE && total > POSTS_PER_PAGE
        );
      } catch (error) {
        console.error('Error loading initial posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialPosts();
  }, []);

  // Load more posts
  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newPosts = await getBlogPosts(offset, POSTS_PER_PAGE);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setOffset((prevOffset) => prevOffset + POSTS_PER_PAGE);
      setHasMore(
        newPosts.length === POSTS_PER_PAGE &&
          offset + newPosts.length < totalPosts
      );
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, offset, totalPosts]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePosts]);

  const featuredPosts = posts.filter((post) => post.featured);
  const regularPosts = posts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">DeployFaster - Blog Articles</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Latest insights on web development, design trends, and deployment
            strategies.
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Featured Posts
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <FeaturedBlogCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {featuredPosts.length > 0 ? 'Latest Posts' : 'All Posts'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 text-gray-600">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              Loading more posts...
            </div>
          </div>
        )}

        {/* No More Posts Message */}
        {!hasMore && posts.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">
              You&#39;ve reached the end! No more articles to load.
            </p>
          </div>
        )}

        {/* No Posts Message */}
        {posts.length === 0 && !loading && (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No blog posts available yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function FeaturedBlogCard({ post }: { post: BlogListItem }) {
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(600).height(400).url()
    : null;

  return (
    <Link href={`/blog/${post.slug.current}`}>
      <article className="glass-card rounded-apple-lg overflow-hidden hover:shadow-card-hover transition-all duration-300 group">
        {imageUrl && (
          <div className="relative h-64 overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <time className="text-sm text-gray-500">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="text-sm text-gray-500">by {post.author}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
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
      </article>
    </Link>
  );
}

function BlogCard({ post }: { post: BlogListItem }) {
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(400).height(250).url()
    : null;

  return (
    <Link href={`/blog/${post.slug.current}`}>
      <article className="glass-card rounded-apple-lg overflow-hidden hover:shadow-card-hover transition-all duration-300 group">
        {imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-3">
            <time className="text-sm text-gray-500">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            <span className="text-sm text-gray-500">by {post.author}</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
