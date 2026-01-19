import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories, getCategoryBySlug } from '@/data/categories';
import { stories } from '@/data/stories';
import { markets } from '@/data/markets';
import { StoryCardStandard, StoryCardCompact, VideoCard, ListLinkRow } from '@/components/editorial';
import { MarketCard } from '@/components/market';
import { DeskSubNav, SectionBlock } from '@/components/sections';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    return {};
  }
  return {
    title: `${category.name} News | W.E.T.`,
    description: category.description,
  };
}

// Mock video data for the desk
const deskVideos = [
  { id: '1', title: 'Market Analysis: Key Events This Week', runtime: '8:42', category: 'Analysis' },
  { id: '2', title: 'Breaking Down the Latest Developments', runtime: '12:15', category: 'Explainer' },
  { id: '3', title: 'Expert Panel Discussion', runtime: '15:30', category: 'Panel' },
];

// Mock series data
const deskSeries = [
  { title: 'Deep Dive', slug: 'deep-dive', count: 12 },
  { title: 'Weekly Recap', slug: 'weekly-recap', count: 24 },
  { title: 'Market Watch', slug: 'market-watch', count: 18 },
  { title: 'Expert Takes', slug: 'expert-takes', count: 8 },
];

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  // Filter stories for this category (also include geopolitics for world/politics)
  const categoryStories = stories.filter(story => 
    story.category === category.slug || 
    (category.slug === 'world' && story.category === 'geopolitics') ||
    (category.slug === 'politics' && story.category === 'geopolitics')
  );
  const categoryMarkets = markets.filter(market => market.category === category.slug);
  
  // Organize stories
  const leadStory = categoryStories[0];
  const analysisStories = categoryStories.filter(s => s.labels.includes('Analysis')).slice(0, 4);
  const remainingStories = categoryStories.slice(1, 8);
  const moreStories = categoryStories.slice(8);

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container-wet py-4">
        {/* Breadcrumbs */}
        <nav className="text-xs text-text-muted mb-3">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-1.5">/</span>
          <span className="text-text-primary">{category.name}</span>
        </nav>

        {/* ===== TOP ZONE ===== */}
        {/* Category Header */}
        <div className="mb-4 pb-4 border-b border-border">
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-1">
            {category.name}
          </h1>
          <p className="text-sm text-text-muted">
            {category.description}
          </p>
        </div>

        {/* Sub-nav Chips */}
        <DeskSubNav categorySlug={category.slug} className="mb-6" />

        {/* 3-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
          
          {/* Column A: Latest Headlines */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-0.5 h-4 bg-brand-primary rounded-full" />
              <h2 className="text-xs font-bold text-text-primary uppercase tracking-wide">
                Latest Headlines
              </h2>
            </div>
            
            {/* Lead Story */}
            {leadStory && (
              <article className="group mb-4">
                <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden mb-3">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="tag-analysis">{leadStory.labels[0] || category.name}</span>
                  </div>
                </div>
                <Link href={`/story/${leadStory.slug}`}>
                  <h3 className="headline-large group-hover:text-brand-primary transition-colors mb-2">
                    {leadStory.title}
                  </h3>
                </Link>
                <p className="text-sm text-text-secondary line-clamp-2">
                  {leadStory.summary}
                </p>
              </article>
            )}
            
            {/* Supporting headlines list */}
            <div className="divide-y divide-border">
              {remainingStories.slice(0, 5).map((story) => (
                <ListLinkRow
                  key={story.id}
                  title={story.title}
                  href={`/story/${story.slug}`}
                />
              ))}
            </div>
          </div>

          {/* Column B: Analysis */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-0.5 h-4 bg-brand-gold rounded-full" />
              <h2 className="text-xs font-bold text-text-primary uppercase tracking-wide">
                Analysis
              </h2>
            </div>
            
            {/* Analysis lead card */}
            {analysisStories[0] && (
              <article className="group mb-4">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg overflow-hidden mb-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-10 h-10 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 bg-brand-gold text-white text-[10px] font-bold uppercase rounded">
                      Analysis
                    </span>
                  </div>
                </div>
                <Link href={`/story/${analysisStories[0].slug}`}>
                  <h3 className="headline-medium group-hover:text-brand-primary transition-colors mb-1">
                    {analysisStories[0].title}
                  </h3>
                </Link>
                <p className="text-xs text-text-muted line-clamp-2">
                  {analysisStories[0].summary}
                </p>
              </article>
            )}
            
            {/* More analysis links */}
            <div className="divide-y divide-border">
              {analysisStories.slice(1).map((story) => (
                <ListLinkRow
                  key={story.id}
                  title={story.title}
                  href={`/story/${story.slug}`}
                />
              ))}
            </div>
          </div>

          {/* Column C: Latest Videos */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-0.5 h-4 bg-brand-red rounded-full" />
              <h2 className="text-xs font-bold text-text-primary uppercase tracking-wide">
                Watch
              </h2>
            </div>
            
            <div className="space-y-3">
              {deskVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  title={video.title}
                  href={`/watch/${video.id}`}
                  runtime={video.runtime}
                  category={video.category}
                  className="w-full"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ===== MID ZONE: Series Strip ===== */}
        <div className="border-y border-border py-4 mb-8">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wide flex-shrink-0">
              Series:
            </span>
            {deskSeries.map((series) => (
              <Link
                key={series.slug}
                href={`/category/${category.slug}/series/${series.slug}`}
                className="flex-shrink-0 px-3 py-2 bg-bg-surface hover:bg-bg-hover rounded-lg transition-colors group"
              >
                <span className="text-xs font-medium text-text-primary group-hover:text-brand-primary transition-colors">
                  {series.title}
                </span>
                <span className="text-[10px] text-text-muted ml-1">
                  ({series.count})
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* ===== LOWER ZONE ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: More News + Markets */}
          <div className="lg:col-span-2">
            {/* More News List */}
            <SectionBlock
              title={`More ${category.name} News`}
              seeAllHref={`/category/${category.slug}/all`}
              noBorder
            >
              <div className="lg:col-span-3">
                {moreStories.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {moreStories.map((story) => (
                      <StoryCardCompact key={story.slug} story={story} />
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-sm text-text-muted">
                      More {category.name.toLowerCase()} stories coming soon.
                    </p>
                  </div>
                )}
              </div>
            </SectionBlock>
            
            {/* Category Markets */}
            {categoryMarkets.length > 0 && (
              <SectionBlock
                title={`${category.name} Markets`}
                seeAllHref={`/markets?category=${category.slug}`}
              >
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categoryMarkets.slice(0, 6).map((market) => (
                    <MarketCard key={market.id} market={market} showVolume={true} />
                  ))}
                </div>
              </SectionBlock>
            )}
          </div>

          {/* Right: Go Deeper + Newsletter */}
          <aside className="space-y-6">
            {/* Go Deeper Card */}
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg p-4 border border-blue-100">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wide mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Go Deeper
              </h3>
              <div className="space-y-3">
                <Link href={`/explainers/${category.slug}`} className="block group">
                  <div className="relative aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200 rounded overflow-hidden mb-2">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-slate-400">Explainer</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-text-primary group-hover:text-brand-primary transition-colors">
                    How to Read {category.name} Markets
                  </h4>
                  <p className="text-xs text-text-muted mt-1">
                    A beginner&apos;s guide to understanding prediction markets in {category.name.toLowerCase()}.
                  </p>
                </Link>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="p-4 bg-bg-surface rounded-lg border border-border">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wide mb-2">
                {category.name} Daily Brief
              </h3>
              <p className="text-[11px] text-text-muted mb-3">
                Get {category.name.toLowerCase()} market insights delivered to your inbox.
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-white border border-border rounded text-xs mb-2 focus:outline-none focus:border-brand-primary"
              />
              <button className="w-full btn-primary py-2 rounded text-xs font-semibold">
                Subscribe Free
              </button>
            </div>

            {/* Related Categories */}
            <div className="p-4 bg-bg-surface rounded-lg border border-border">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wide mb-3">
                Related Desks
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories
                  .filter(c => c.slug !== category.slug)
                  .slice(0, 5)
                  .map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="px-2.5 py-1 bg-white border border-border rounded text-xs text-text-secondary hover:text-brand-primary hover:border-brand-primary transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
