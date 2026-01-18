import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { stories } from '@/data/stories';
import { getMarketById } from '@/data/markets';
import { MarketContextBar, MarketAngleCallout, MarketCard, PricedInCompare, CatalystsList } from '@/components/market';

interface StoryPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return stories.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: StoryPageProps) {
  const story = stories.find((s) => s.slug === params.slug);
  if (!story) {
    return {};
  }
  return {
    title: `${story.title} | W.E.T.`,
    description: story.summary,
    openGraph: {
      title: `${story.title} | W.E.T.`,
      description: story.summary,
      images: [story.heroImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${story.title} | W.E.T.`,
      description: story.summary,
      images: [story.heroImage],
    },
  };
}

// Format date helper
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function StoryPage({ params }: StoryPageProps) {
  const story = stories.find((s) => s.slug === params.slug);

  if (!story) {
    notFound();
  }

  const primaryMarket = story.relatedMarketIds[0]
    ? getMarketById(story.relatedMarketIds[0])
    : null;

  const relatedMarkets = story.relatedMarketIds
    .slice(1)
    .map((id) => getMarketById(id))
    .filter(Boolean);

  // Split body into paragraphs
  const bodyParagraphs = story.body.split('\n\n').filter(p => p.trim());

  return (
    <div className="container-wet py-4">
      <article className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Story Content */}
        <div className="lg:col-span-2">
          {/* Breadcrumbs */}
          <nav className="text-xs text-text-muted mb-3">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-1.5">/</span>
            <Link href={`/category/${story.category}`} className="hover:underline capitalize">{story.category}</Link>
          </nav>

          {/* Headline */}
          <h1 className="text-xl md:text-2xl font-bold leading-tight text-text-primary mb-2">
            {story.title}
          </h1>

          {/* Byline & Date */}
          <div className="text-text-muted text-xs mb-4">
            By <span className="font-medium text-text-primary">{story.author}</span> · {formatDate(story.publishedAt)}
          </div>

          {/* Hero Image */}
          {story.heroImage && (
            <div className="relative aspect-video w-full overflow-hidden rounded bg-bg-surface mb-4">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-elevated to-bg-surface">
                <svg className="w-10 h-10 text-text-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          )}

          {/* Market Context Bar */}
          {primaryMarket && (
            <div className="mb-4">
              <MarketContextBar market={primaryMarket} />
            </div>
          )}

          {/* Market Angle Callout */}
          {story.marketAngle && (
            <div className="mb-4">
              <MarketAngleCallout angle={story.marketAngle} />
            </div>
          )}

          {/* Story Body */}
          <div className="prose prose-invert prose-sm max-w-none text-text-secondary leading-relaxed space-y-3 mb-6">
            {bodyParagraphs.map((paragraph, index) => (
              <p key={index} className="text-sm">{paragraph}</p>
            ))}
          </div>

          {/* Priced-in vs Not-priced-in */}
          {story.pricedIn && story.notPricedIn && (
            <div className="mb-6">
              <PricedInCompare pricedIn={story.pricedIn} notPricedIn={story.notPricedIn} />
            </div>
          )}

          {/* Catalysts List */}
          {story.catalysts && story.catalysts.length > 0 && (
            <div className="mb-6">
              <CatalystsList catalysts={story.catalysts} />
            </div>
          )}

          {/* Sources & Last Updated */}
          <div className="text-xs text-text-muted border-t border-border pt-3">
            <p className="mb-1">
              <strong className="text-text-primary">Sources:</strong>{' '}
              {story.sources.map((source, i) => (
                <span key={source.name}>
                  {source.url ? (
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                      {source.name}
                    </a>
                  ) : (
                    source.name
                  )}
                  {i < story.sources.length - 1 && ', '}
                </span>
              ))}
            </p>
            <p>Last updated: {formatDate(story.updatedAt || story.publishedAt)}</p>
          </div>
        </div>

        {/* Right Rail: Related Markets & Share */}
        <aside className="lg:col-span-1 space-y-4">
          {relatedMarkets.length > 0 && (
            <div className="bg-bg-surface p-3 rounded border border-border">
              <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wide mb-3">Related Markets</h3>
              <div className="space-y-3">
                {relatedMarkets.map((market) => (
                  market && <MarketCard key={market.slug} market={market} />
                ))}
              </div>
            </div>
          )}

          {/* Share Story */}
          <div className="bg-bg-surface p-3 rounded border border-border">
            <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wide mb-3">Share this story</h3>
            <div className="flex gap-2">
              <button className="p-2 rounded bg-bg-elevated hover:bg-bg-hover transition-colors">
                <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
              </button>
              <button className="p-2 rounded bg-bg-elevated hover:bg-bg-hover transition-colors">
                <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.37-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.1 5.4 7.5 3.5 4.07c-.36.62-.56 1.35-.56 2.13 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.81 3.44 4.2-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.08.55 1.71 2.14 2.95 4.03 2.98-1.48 1.16-3.35 1.85-5.38 1.85-.35 0-.69-.02-1.03-.06C3.17 20.06 5.38 20.75 7.5 20.75c9 0 13.94-7.46 13.94-13.94 0-.22 0-.44-.01-.66.96-.69 1.79-1.56 2.45-2.55z"></path></svg>
              </button>
              <button className="p-2 rounded bg-bg-elevated hover:bg-bg-hover transition-colors">
                <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              </button>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-bg-surface p-3 rounded border border-border">
            <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wide mb-1">Get market insights</h3>
            <p className="text-[11px] text-text-muted mb-3">Daily coverage of events moving prediction markets.</p>
            <button className="w-full bg-brand text-white py-1.5 rounded text-xs font-medium hover:bg-brand/90 transition-colors">
              Subscribe
            </button>
          </div>
        </aside>
      </article>
    </div>
  );
}
