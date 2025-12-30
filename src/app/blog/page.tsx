import { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts, getFeaturedPosts, getAllCategories } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Legal Document Blog - Expert Guides & Compliance Tips',
  description: 'In-depth articles on privacy policies, terms of service, SWMS, GDPR compliance, and more. Expert guidance for creating legally compliant business documents.',
  keywords: ['privacy policy guide', 'terms of service', 'GDPR compliance', 'CCPA', 'legal documents', 'SWMS', 'business compliance'],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Legal Document Blog | SafeDocGen',
    description: 'Expert guides and articles on legal documents, privacy compliance, and business protection.',
    type: 'website',
    url: 'https://safedocgen.app/blog',
    siteName: 'SafeDocGen',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legal Document Blog | SafeDocGen',
    description: 'Expert guides and articles on legal documents, privacy compliance, and business protection.',
  },
};

export default function BlogPage() {
  const featuredPosts = getFeaturedPosts();
  const categories = getAllCategories();

  return (
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

      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-sm text-blue-700 font-medium mb-6">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Expert Guides & Resources
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6">
            Legal Document Insights
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Expert guides, compliance tips, and in-depth articles to help you understand and create professional legal documents for your business.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-gray-500 font-medium mr-2">Topics:</span>
            {categories.map((category, index) => {
              const colors = [
                'bg-blue-50 text-blue-700 hover:bg-blue-100',
                'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
                'bg-purple-50 text-purple-700 hover:bg-purple-100',
                'bg-amber-50 text-amber-700 hover:bg-amber-100',
                'bg-rose-50 text-rose-700 hover:bg-rose-100',
                'bg-cyan-50 text-cyan-700 hover:bg-cyan-100',
              ];
              return (
                <span
                  key={category}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer ${colors[index % colors.length]}`}
                >
                  {category}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
              <h2 className="text-2xl font-semibold text-gray-900">Featured Articles</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300"
                >
                  <div className={`h-2 ${index === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-emerald-500 to-emerald-600'}`}></div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                        Featured
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12,6 12,12 16,14"/>
                        </svg>
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-emerald-500 rounded-full"></div>
            <h2 className="text-2xl font-semibold text-gray-900">All Articles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => {
              const categoryColors: Record<string, string> = {
                'Privacy': 'bg-blue-50 text-blue-700',
                'Safety': 'bg-amber-50 text-amber-700',
                'Legal': 'bg-purple-50 text-purple-700',
                'Compliance': 'bg-emerald-50 text-emerald-700',
                'E-commerce': 'bg-rose-50 text-rose-700',
                'Software': 'bg-cyan-50 text-cyan-700',
              };
              const colorClass = categoryColors[post.category] || 'bg-gray-100 text-gray-600';

              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${colorClass}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                      </svg>
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <time className="text-xs text-gray-400" dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    <span className="text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center">
                      Read more
                      <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="12,5 19,12 12,19" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
            Ready to Create Your Documents?
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            Use our free generator to create professional, legally compliant documents in minutes.
          </p>
          <Link
            href="/#documents"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            Generate Documents Free
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="12,5 19,12 12,19" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

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
  );
}
