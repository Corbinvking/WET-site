import { notFound } from 'next/navigation';
import Link from 'next/link';
import { markets, getMarketBySlug } from '@/data/markets';
import { stories } from '@/data/stories';
import { formatNumber } from '@/lib/utils';
import { StoryCardCompact } from '@/components/editorial';

interface MarketPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return markets.map((market) => ({
    slug: market.slug,
  }));
}

export async function generateMetadata({ params }: MarketPageProps) {
  const market = getMarketBySlug(params.slug);
  if (!market) {
    return {};
  }
  return {
    title: `${market.title} | W.E.T. Markets`,
    description: market.question,
  };
}

export default function MarketPage({ params }: MarketPageProps) {
  const market = getMarketBySlug(params.slug);

  if (!market) {
    notFound();
  }

  const kalshiData = market.platforms.kalshi;
  const polyData = market.platforms.polymarket;
  const divergence = Math.abs((kalshiData?.yesPrice || 0) - (polyData?.yesPrice || 0)) * 100;

  // Find related stories
  const relatedStories = stories.filter(story => 
    story.relatedMarketIds.includes(market.id)
  ).slice(0, 5);

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container-wet py-4">
        {/* Breadcrumbs */}
        <nav className="text-xs text-text-muted mb-3">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/markets" className="hover:underline">Markets</Link>
          <span className="mx-1.5">/</span>
          <span className="text-text-primary">{market.category}</span>
        </nav>

        {/* Market Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-bg-surface rounded text-[10px] text-text-muted uppercase tracking-wide">
              {market.category}
            </span>
            {divergence >= 3 && (
              <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded text-[10px] font-medium">
                {divergence.toFixed(0)}pt platform spread
              </span>
            )}
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-text-primary mb-2">
            {market.title}
          </h1>
          <p className="text-sm text-text-secondary">
            {market.question}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Platform Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Kalshi Card */}
              {kalshiData && (
                <div className="p-4 bg-bg-surface rounded border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-text-primary">Kalshi</h3>
                    <span className="px-2 py-0.5 bg-bg-elevated rounded text-[10px] text-text-muted">
                      ${formatNumber(kalshiData.volume)} volume
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-market-up">Yes</span>
                        <span className="text-sm font-bold text-market-up">
                          {Math.round(kalshiData.yesPrice * 100)}¢
                        </span>
                      </div>
                      <div className="w-full h-2 bg-bg-elevated rounded-full overflow-hidden">
                        <div
                          className="h-full bg-market-up rounded-full"
                          style={{ width: `${kalshiData.yesPrice * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-market-down">No</span>
                        <span className="text-sm font-bold text-market-down">
                          {Math.round(kalshiData.noPrice * 100)}¢
                        </span>
                      </div>
                      <div className="w-full h-2 bg-bg-elevated rounded-full overflow-hidden">
                        <div
                          className="h-full bg-market-down rounded-full"
                          style={{ width: `${kalshiData.noPrice * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://kalshi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-3 text-center py-1.5 bg-brand text-white rounded text-xs font-medium hover:bg-brand/90 transition-colors"
                  >
                    Trade on Kalshi →
                  </a>
                </div>
              )}

              {/* Polymarket Card */}
              {polyData && (
                <div className="p-4 bg-bg-surface rounded border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-text-primary">Polymarket</h3>
                    <span className="px-2 py-0.5 bg-bg-elevated rounded text-[10px] text-text-muted">
                      ${formatNumber(polyData.volume)} volume
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-market-up">Yes</span>
                        <span className="text-sm font-bold text-market-up">
                          {Math.round(polyData.yesPrice * 100)}¢
                        </span>
                      </div>
                      <div className="w-full h-2 bg-bg-elevated rounded-full overflow-hidden">
                        <div
                          className="h-full bg-market-up rounded-full"
                          style={{ width: `${polyData.yesPrice * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-market-down">No</span>
                        <span className="text-sm font-bold text-market-down">
                          {Math.round(polyData.noPrice * 100)}¢
                        </span>
                      </div>
                      <div className="w-full h-2 bg-bg-elevated rounded-full overflow-hidden">
                        <div
                          className="h-full bg-market-down rounded-full"
                          style={{ width: `${polyData.noPrice * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://polymarket.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-3 text-center py-1.5 bg-brand text-white rounded text-xs font-medium hover:bg-brand/90 transition-colors"
                  >
                    Trade on Polymarket →
                  </a>
                </div>
              )}
            </div>

            {/* Price Chart Placeholder */}
            <div className="p-4 bg-bg-surface rounded border border-border">
              <h3 className="text-sm font-semibold text-text-primary mb-3">Price History</h3>
              <div className="h-48 flex items-center justify-center bg-bg-elevated rounded">
                <div className="text-center">
                  <svg className="w-8 h-8 text-text-subtle mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                  <p className="text-xs text-text-muted">Price chart coming in Phase 2</p>
                </div>
              </div>
            </div>

            {/* Catalysts */}
            {market.catalysts && market.catalysts.length > 0 && (
              <div className="p-4 bg-bg-surface rounded border border-border">
                <h3 className="text-sm font-semibold text-text-primary mb-3">Upcoming Catalysts</h3>
                <ul className="space-y-2">
                  {market.catalysts.map((catalyst, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-text-secondary">
                      <svg className="w-3 h-3 text-market-neutral mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span><strong className="text-text-muted">{catalyst.date}:</strong> {catalyst.event}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            {/* Market Stats */}
            <div className="p-4 bg-bg-surface rounded border border-border">
              <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wide mb-3">Market Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">Total Volume</span>
                  <span className="text-xs font-medium text-text-primary">${formatNumber(market.totalVolume)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">24h Change</span>
                  <span className={`text-xs font-medium ${market.change24h >= 0 ? 'text-market-up' : 'text-market-down'}`}>
                    {market.change24h >= 0 ? '+' : ''}{market.change24h.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">Expiration</span>
                  <span className="text-xs font-medium text-text-primary">{market.expirationDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">Status</span>
                  <span className="text-xs font-medium text-text-primary capitalize">{market.status}</span>
                </div>
              </div>
            </div>

            {/* Related Stories */}
            {relatedStories.length > 0 && (
              <div className="p-4 bg-bg-surface rounded border border-border">
                <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wide mb-3">Related Coverage</h3>
                <div className="space-y-3">
                  {relatedStories.map((story) => (
                    <StoryCardCompact key={story.slug} story={story} />
                  ))}
                </div>
              </div>
            )}

            {/* Market Disclaimer */}
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
              <p className="text-[10px] text-yellow-400/90 leading-relaxed">
                <strong>Disclaimer:</strong> Prediction market prices reflect crowd-sourced probabilities, not guaranteed outcomes. 
                Always do your own research. Not financial advice.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
