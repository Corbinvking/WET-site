'use client';

import Link from 'next/link';
import { cn, formatNumber } from '@/lib/utils';
import type { GlobalMarket } from '@/data/markets';
import type { Story } from '@/data/stories';

interface MarketDetailClientProps {
  market: GlobalMarket;
  relatedStories: Story[];
}

export default function MarketDetailClient({ market, relatedStories }: MarketDetailClientProps) {
  const kListing = market.listings.find(l => l.platform === 'kalshi');
  const pListing = market.listings.find(l => l.platform === 'polymarket');
  const isCrossListed = market.combined.platformCount >= 2;
  const primaryListing = kListing || pListing;

  // Calculate blended probability
  const blendedYes = isCrossListed && kListing && pListing
    ? Math.round((kListing.yesProbability! + pListing.yesProbability!) / 2)
    : primaryListing?.yesProbability || 50;

  // Mock research data
  const research = {
    summary: `The market is currently pricing a ${blendedYes}% probability of this outcome. ${isCrossListed ? `Cross-platform analysis shows a ${market.combined.divergence}-point divergence between Kalshi (${kListing?.yesProbability}%) and Polymarket (${pListing?.yesProbability}%), suggesting potential arbitrage or differing trader sentiment.` : ''} Key catalysts ahead could shift these odds significantly.`,
    yesCase: {
      thesis: 'Evidence suggests conditions are aligning for a positive resolution.',
      points: [
        'Historical precedent strongly supports this outcome under similar circumstances',
        'Key stakeholders have publicly signaled intent consistent with YES',
        'Recent data releases have moved the probability higher',
        'Market momentum and volume patterns indicate accumulation on YES side',
      ],
      conviction: 'Medium-High',
    },
    noCase: {
      thesis: 'Significant headwinds remain that could prevent the specified outcome.',
      points: [
        'Structural barriers make resolution within the timeframe challenging',
        'Competing priorities may delay or prevent action',
        'Historical base rates suggest skepticism is warranted',
        'Key decision-makers have expressed reservations publicly',
      ],
      conviction: 'Medium',
    },
    risks: [
      'Resolution criteria interpretation may differ from trader expectations',
      'Low liquidity periods could impact exit pricing',
      'External macro events could invalidate current thesis',
      'Platform-specific rule differences on edge cases',
    ],
    sources: [
      { title: 'Official Government Statement', publisher: 'Federal Reserve', date: '2026-01-15', type: 'Primary' },
      { title: 'Fed Policy Analysis: January Outlook', publisher: 'Reuters', date: '2026-01-14', type: 'Analysis' },
      { title: 'Rate Cut Probability Models', publisher: 'CME FedWatch', date: '2026-01-18', type: 'Data' },
      { title: 'Expert Commentary: FOMC Preview', publisher: 'Bloomberg', date: '2026-01-16', type: 'Commentary' },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
        
        {/* ===== HEADER ===== */}
        <header className="mb-8">
          <nav className="text-[11px] text-slate-400 mb-4">
            <Link href="/" className="hover:text-slate-600">Home</Link>
            <span className="mx-1.5">›</span>
            <Link href="/markets" className="hover:text-slate-600">Markets</Link>
            <span className="mx-1.5">›</span>
            <Link href={`/category/${market.category}`} className="hover:text-slate-600 capitalize">{market.category}</Link>
          </nav>

          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                  {market.category}
                </span>
                <span className="text-slate-300">|</span>
                <span className={cn(
                  'text-[10px] font-medium uppercase tracking-wider',
                  isCrossListed ? 'text-blue-600' : 'text-slate-500'
                )}>
                  {isCrossListed ? 'Cross-Listed' : kListing ? 'Kalshi' : 'Polymarket'}
                </span>
                {market.status === 'active' && (
                  <>
                    <span className="text-slate-300">|</span>
                    <span className="text-[10px] font-medium text-green-600 uppercase tracking-wider">Active</span>
                  </>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-serif font-medium text-slate-900 leading-tight mb-3">
                {market.canonicalQuestion}
              </h1>
              <div className="flex items-center gap-4 text-[11px] text-slate-400">
                <span>Updated {new Date(primaryListing?.updatedAt || Date.now()).toLocaleDateString()}</span>
                {market.expiryDate && (
                  <>
                    <span className="text-slate-300">•</span>
                    <span>Expires {new Date(market.expiryDate).toLocaleDateString()}</span>
                  </>
                )}
                <span className="text-slate-300">•</span>
                <span>${formatNumber(market.combined.combinedVolume)} volume</span>
              </div>
            </div>
          </div>
        </header>

        {/* ===== PROBABILITY DISPLAY ===== */}
        <section className="mb-10">
          <div className="grid grid-cols-2 gap-0 border border-slate-200 rounded-lg overflow-hidden">
            {/* YES Side */}
            <div className="p-6 bg-gradient-to-br from-slate-50 to-white border-r border-slate-200">
              <div className="text-center">
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">Yes</div>
                <div className="text-5xl md:text-6xl font-light text-slate-900 mb-2">
                  {blendedYes}<span className="text-2xl">%</span>
                </div>
                {isCrossListed && kListing && pListing && (
                  <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500">
                    <span>K: {kListing.yesProbability}%</span>
                    <span className="text-slate-300">|</span>
                    <span>P: {pListing.yesProbability}%</span>
                  </div>
                )}
                {primaryListing?.change24h !== null && primaryListing?.change24h !== undefined && (
                  <div className={cn(
                    'inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded text-[10px] font-medium',
                    primaryListing.change24h >= 0 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-red-50 text-red-700'
                  )}>
                    {primaryListing.change24h >= 0 ? '↑' : '↓'} {Math.abs(primaryListing.change24h).toFixed(1)}% 24h
                  </div>
                )}
              </div>
            </div>

            {/* NO Side */}
            <div className="p-6 bg-gradient-to-bl from-slate-50 to-white">
              <div className="text-center">
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">No</div>
                <div className="text-5xl md:text-6xl font-light text-slate-900 mb-2">
                  {100 - blendedYes}<span className="text-2xl">%</span>
                </div>
                {isCrossListed && kListing && pListing && (
                  <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500">
                    <span>K: {kListing.noProbability}%</span>
                    <span className="text-slate-300">|</span>
                    <span>P: {pListing.noProbability}%</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Divergence Note */}
          {isCrossListed && market.combined.divergence && market.combined.divergence > 0 && (
            <div className="mt-3 text-center text-[11px] text-slate-500">
              <span className="text-blue-600 font-medium">{market.combined.divergence}pt divergence</span>
              {' — '}
              {(kListing?.yesProbability || 0) > (pListing?.yesProbability || 0) 
                ? 'Kalshi traders more bullish'
                : 'Polymarket traders more bullish'
              }
            </div>
          )}
        </section>

        {/* ===== MAIN CONTENT GRID ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          
          {/* LEFT: Research (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Summary */}
            <section>
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100">
                W.E.T. Analysis
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {research.summary}
              </p>
            </section>

            {/* YES vs NO Cases */}
            <section className="grid md:grid-cols-2 gap-6">
              {/* YES Case */}
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Case for Yes</h3>
                  <span className="text-[10px] text-slate-400">Conviction: {research.yesCase.conviction}</span>
                </div>
                <p className="text-sm text-slate-600 italic mb-3">{research.yesCase.thesis}</p>
                <ul className="space-y-2">
                  {research.yesCase.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-slate-600">
                      <span className="text-slate-300 mt-1 flex-shrink-0">—</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* NO Case */}
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Case for No</h3>
                  <span className="text-[10px] text-slate-400">Conviction: {research.noCase.conviction}</span>
                </div>
                <p className="text-sm text-slate-600 italic mb-3">{research.noCase.thesis}</p>
                <ul className="space-y-2">
                  {research.noCase.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-slate-600">
                      <span className="text-slate-300 mt-1 flex-shrink-0">—</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Key Risks */}
            <section>
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100">
                Key Risks
              </h2>
              <ul className="space-y-2">
                {research.risks.map((risk, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] text-slate-600">
                    <span className="text-amber-500 mt-0.5 flex-shrink-0">⚠</span>
                    {risk}
                  </li>
                ))}
              </ul>
            </section>

            {/* Timeline */}
            {market.catalysts.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100">
                  Upcoming Catalysts
                </h2>
                <div className="space-y-2">
                  {market.catalysts.map((catalyst, i) => {
                    const isNext = market.nextCatalyst?.date === catalyst.date;
                    return (
                      <div 
                        key={i} 
                        className={cn(
                          'flex items-center gap-4 py-2 px-3 rounded',
                          isNext && 'bg-blue-50'
                        )}
                      >
                        <span className="text-[11px] text-slate-400 w-20 flex-shrink-0">
                          {new Date(catalyst.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        <span className="text-[13px] text-slate-700">{catalyst.event}</span>
                        {isNext && (
                          <span className="text-[9px] font-semibold text-blue-600 uppercase tracking-wider">Next</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT: Sources & Meta (1/3) */}
          <aside className="space-y-6">
            {/* Resolution */}
            <section>
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100">
                Resolution
              </h2>
              <div className="space-y-2 text-[13px] text-slate-600">
                <p><span className="text-slate-400">Yes if:</span> Outcome occurs before expiration</p>
                <p><span className="text-slate-400">No if:</span> Outcome does not occur by expiration</p>
                {market.expiryDate && (
                  <p><span className="text-slate-400">Deadline:</span> {new Date(market.expiryDate).toLocaleDateString()}</p>
                )}
              </div>
            </section>

            {/* Sources */}
            <section>
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100">
                Sources
              </h2>
              <div className="space-y-3">
                {research.sources.map((source, i) => (
                  <div key={i} className="group">
                    <p className="text-[13px] text-slate-700 group-hover:text-blue-600 cursor-pointer">
                      {source.title}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {source.publisher} · {source.date} · <span className="text-slate-300">{source.type}</span>
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Market Stats */}
            <section>
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100">
                Market Data
              </h2>
              <div className="space-y-2 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Combined Volume</span>
                  <span className="text-slate-700">${formatNumber(market.combined.combinedVolume)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Liquidity</span>
                  <span className="text-slate-700">${formatNumber(market.combined.combinedLiquidity)}</span>
                </div>
                {isCrossListed && market.combined.divergence && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Divergence</span>
                    <span className="text-blue-600">{market.combined.divergence} pts</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Platforms</span>
                  <span className="text-slate-700">{market.combined.platformCount}</span>
                </div>
              </div>
            </section>

            {/* Related Coverage */}
            {relatedStories.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100">
                  Related Coverage
                </h2>
                <div className="space-y-3">
                  {relatedStories.slice(0, 3).map((story) => (
                    <Link 
                      key={story.slug}
                      href={`/story/${story.slug}`}
                      className="block group"
                    >
                      <p className="text-[13px] text-slate-700 group-hover:text-blue-600 line-clamp-2">
                        {story.title}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {story.storyType} · {new Date(story.publishedAt).toLocaleDateString()}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>

        {/* ===== TRADE BUTTONS (Bottom Row) ===== */}
        <section className="border-t border-slate-200 pt-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Trade This Market</h2>
            <span className="text-[11px] text-slate-400">
              Prices reflect implied probability. Not financial advice.
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Kalshi Row */}
            {kListing && (
              <a
                href={kListing.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">K</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">Kalshi</div>
                    <div className="text-[11px] text-slate-400">${formatNumber(kListing.volume || 0)} volume</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-[10px] text-slate-400 uppercase">Yes</div>
                    <div className="text-lg font-medium text-slate-900">{kListing.yesProbability}¢</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-slate-400 uppercase">No</div>
                    <div className="text-lg font-medium text-slate-900">{kListing.noProbability}¢</div>
                  </div>
                  <span className="text-blue-600 text-sm font-medium group-hover:translate-x-0.5 transition-transform">
                    Trade →
                  </span>
                </div>
              </a>
            )}

            {/* Polymarket Row */}
            {pListing && (
              <a
                href={pListing.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50/50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">P</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">Polymarket</div>
                    <div className="text-[11px] text-slate-400">${formatNumber(pListing.volume || 0)} volume</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-[10px] text-slate-400 uppercase">Yes</div>
                    <div className="text-lg font-medium text-slate-900">{pListing.yesProbability}¢</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-slate-400 uppercase">No</div>
                    <div className="text-lg font-medium text-slate-900">{pListing.noProbability}¢</div>
                  </div>
                  <span className="text-purple-600 text-sm font-medium group-hover:translate-x-0.5 transition-transform">
                    Trade →
                  </span>
                </div>
              </a>
            )}
          </div>

          {/* Arbitrage hint for cross-listed */}
          {isCrossListed && market.combined.divergence && market.combined.divergence > 2 && kListing && pListing && (
            <div className="mt-4 text-center">
              <p className="text-[11px] text-slate-500">
                <span className="text-blue-600 font-medium">Divergence opportunity:</span>
                {' '}
                {(kListing.yesProbability || 0) < (pListing.yesProbability || 0) 
                  ? `Buy YES on Kalshi at ${kListing.yesProbability}¢, sell on Polymarket at ${pListing.yesProbability}¢`
                  : `Buy YES on Polymarket at ${pListing.yesProbability}¢, sell on Kalshi at ${kListing.yesProbability}¢`
                }
              </p>
            </div>
          )}
        </section>

        {/* Disclaimer */}
        <footer className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-[10px] text-slate-400 leading-relaxed max-w-3xl">
            <strong>Disclaimer:</strong> W.E.T. provides market analysis for informational purposes only. 
            Prediction market prices reflect crowd-sourced probabilities and are not guarantees of outcomes. 
            Trading involves risk. Always conduct your own research before making trading decisions.
          </p>
        </footer>
      </div>
    </div>
  );
}
