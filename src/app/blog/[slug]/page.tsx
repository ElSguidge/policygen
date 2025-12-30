import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPost, getRecentPosts } from '@/lib/blog-data';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found | SafeDocGen Blog',
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://safedocgen.app/blog/${slug}`,
      siteName: 'SafeDocGen',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const recentPosts = getRecentPosts(3).filter((p) => p.slug !== slug);

  // Convert markdown content to HTML
  const htmlContent = convertMarkdownToHtml(post.content);

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `https://safedocgen.app/og-image.png`,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://safedocgen.app',
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://safedocgen.app/blog/${slug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SafeDocGen',
      url: 'https://safedocgen.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://safedocgen.app/logo.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-semibold tracking-tight">SafeDocGen</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
              <Link href="/#documents" className="hover:text-gray-900 transition-colors">Documents</Link>
              <Link href="/blog" className="text-gray-900 font-medium">Blog</Link>
              <Link href="/#faq" className="hover:text-gray-900 transition-colors">FAQ</Link>
            </nav>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="bg-gradient-to-r from-blue-50 to-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,6 15,12 9,18"/>
              </svg>
              <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
              <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,6 15,12 9,18"/>
              </svg>
              <span className="text-gray-700 truncate max-w-xs">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-gray-400 flex items-center gap-1">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between py-6 border-y border-gray-200 bg-gradient-to-r from-gray-50 to-white -mx-6 px-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{post.author}</div>
                  <div className="text-sm text-gray-500">{post.authorRole}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Published</div>
                <time className="text-sm font-medium text-gray-700" dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div
            className="article-content max-w-none [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-gray-900 [&_h1]:mt-10 [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:text-gray-600 [&_li]:mb-2 [&_li]:leading-relaxed [&_strong]:text-gray-900 [&_strong]:font-semibold [&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-blue-800"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500 font-medium mr-1">Tags:</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* CTA Box */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-gradient-to-br from-blue-50 via-blue-50 to-white border border-blue-100 rounded-2xl p-8 text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="14,2 14,8 20,8" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Need This Document for Your Business?
            </h3>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Generate a professional, legally compliant {post.category.toLowerCase()} document in minutes with our free generator.
            </p>
            <Link
              href="/#documents"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              Generate Free Document
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="12,5 19,12 12,19" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </section>

        {/* Related Posts */}
        {recentPosts.length > 0 && (
          <section className="bg-gradient-to-b from-gray-50 to-white py-16">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
                <h2 className="text-2xl font-semibold text-gray-900">More Articles</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group block bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                        {relatedPost.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="py-12 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-lg font-semibold">SafeDocGen</span>
              </div>
              <p className="text-sm text-gray-500 text-center md:text-right">
                Expert guides for legal document compliance.<br className="hidden md:block" />
                Generate professional documents free at SafeDocGen.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

// Simple markdown to HTML converter
function convertMarkdownToHtml(markdown: string): string {
  let html = markdown;

  // Convert headers
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');

  // Convert bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Convert italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Convert unordered lists
  html = html.replace(/^- (.*$)/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

  // Convert ordered lists
  html = html.replace(/^\d+\. (.*$)/gm, '<li>$1</li>');

  // Convert paragraphs
  const lines = html.split('\n');
  const result: string[] = [];
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      result.push('');
      continue;
    }
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<li') || trimmed.startsWith('</')) {
      result.push(line);
      inList = trimmed.startsWith('<ul') || trimmed.startsWith('<li');
    } else if (!inList && !trimmed.startsWith('<')) {
      result.push(`<p>${trimmed}</p>`);
    } else {
      result.push(line);
    }
  }

  return result.join('\n');
}
