import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories, getCategoryBySlug } from '@/data/categories';
import { stories } from '@/data/stories';
import { markets } from '@/data/markets';
import { StoryCardStandard, StoryCardCompact } from '@/components/editorial';
import { MarketCard } from '@/components/market';

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);
  if (!category) {
    return {};
  }
  return {
    title: `${category.name} News | W.E.T.`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const categoryStories = stories.filter(story => story.category === category.slug);
  const categoryMarkets = markets.filter(market => market.category === category.slug);
  
  const featuredStory = categoryStories[0];
  const remainingStories = categoryStories.slice(1);

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container-wet py-4">
        {/* Breadcrumbs */}
        <nav className="text-xs text-text-muted mb-3">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-1.5">/</span>
          <span className="text-text-primary">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-5 pb-4 border-b border-border">
          <h1 className="text-xl md:text-2xl font-bold text-text-primary mb-1">
            {category.name}
          </h1>
          <p className="text-sm text-text-muted">
            {category.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main Content: Stories */}
          <div className="lg:col-span-2">
            {/* Featured Story */}
            {featuredStory && (
              <div className="mb-5">
                <StoryCardStandard story={featuredStory} showMarketContext={true} />
              </div>
            )}

            {/* Story Grid */}
            {remainingStories.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {remainingStories.map((story) => (
                  <StoryCardCompact key={story.slug} story={story} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {categoryStories.length === 0 && (
              <div className="py-12 text-center">
                <svg className="w-10 h-10 text-text-subtle mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h3 className="text-sm font-medium text-text-primary mb-1">No stories yet</h3>
                <p className="text-xs text-text-muted">Check back soon for {category.name.toLowerCase()} coverage.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            {/* Category Markets */}
            {categoryMarkets.length > 0 && (
              <div className="bg-bg-surface rounded border border-border overflow-hidden">
                <div className="bg-bg-elevated px-3 py-2 flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wide">
                    {category.name} Markets
                  </h3>
                  <Link href="/markets" className="text-[10px] text-brand hover:underline">
                    View All
                  </Link>
                </div>
                <div className="p-3 space-y-3">
                  {categoryMarkets.slice(0, 4).map((market) => (
                    <MarketCard key={market.id} market={market} />
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter Signup */}
            <div className="p-3 bg-bg-surface rounded border border-border">
              <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wide mb-1">
                Stay Updated
              </h3>
              <p className="text-[11px] text-text-muted mb-3">
                Get {category.name.toLowerCase()} market insights delivered daily.
              </p>
              <button className="w-full bg-brand text-white py-1.5 rounded text-xs font-medium hover:bg-brand/90 transition-colors">
                Subscribe
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
