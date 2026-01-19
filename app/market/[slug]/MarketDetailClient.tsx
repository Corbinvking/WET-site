'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn, formatNumber } from '@/lib/utils';
import type { GlobalMarket } from '@/data/markets';
import type { Story } from '@/data/stories';

interface MarketDetailClientProps {
  market: GlobalMarket;
  relatedStories: Story[];
}

export default function MarketDetailClient({ market, relatedStories }: MarketDetailClientProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<'kalshi' | 'polymarket'>(
    market.listings[0]?.platform || 'kalshi'
  );

  const kListing = market.listings.find(l => l.platform === 'kalshi');
  const pListing = market.listings.find(l => l.platform === 'polymarket');
  const isCrossListed = market.combined.platformCount >= 2;

  // Generate mock research data (would come from API in production)
  const research = {
    tldr: [
      `Markets currently price ${market.listings[0]?.yesProbability || 50}% odds for YES.`,
      `${isCrossListed ? `Cross-listed on Kalshi and Polymarket with ${market.combined.divergence}pt divergence.` : `Exclusive to ${kListing ? 'Kalshi' : 'Polymarket'}.`}`,
      `Total trading volume: $${formatNumber(market.combined.combinedVolume)}.`,
      market.nextCatalyst ? `Next catalyst: ${market.nextCatalyst.event} on ${new Date(market.nextCatalyst.date).toLocaleDateString()}.` : 'No imminent catalysts scheduled.',
    ],
    yesCase: [
      'Historical precedent suggests favorable conditions',
      'Key stakeholders have signaled support',
      'Market momentum has been trending higher',
      'Technical indicators align with bullish thesis',
    ],
    noCase: [
      'Significant headwinds remain unresolved',
      'Competing priorities may delay or prevent outcome',
      'Historical base rates suggest caution',
      'Key decision-makers have expressed skepticism',
    ],
    risks: [
      'Resolution criteria may be interpreted differently than expected',
      'Liquidity constraints could impact exit timing',
      'External events could invalidate current thesis',
      'Platform-specific rules may differ on edge cases',
    ],
    whoDisagrees: [
      { name: 'Contrarian Analysts', reason: 'Point to overlooked historical parallels' },
      { name: 'Institutional Traders', reason: 'Believe market is mispricing tail risks' },
    ],
  };

  // Generate mock sources
  const sources = [
    { id: '1', title: 'Official Statement on Matter', publisher: 'Government Agency', type: 'PRIMARY', publishedAt: '2026-01-15' },
    { id: '2', title: 'Analysis: What the Data Shows', publisher: 'Reuters', type: 'REPORTING', publishedAt: '2026-01-14' },
    { id: '3', title: 'Expert Commentary on Implications', publisher: 'Bloomberg', type: 'COMMENTARY', publishedAt: '2026-01-13' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Trade Bar (sticky at bottom on mobile) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-border p-3 z-50">
        <div className="flex items-center gap-2">
          {kListing && (
            <a
              href={kListing.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 bg-blue-600 text-white text-center text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Trade on Kalshi
            </a>
          )}
          {pListing && (
            <a
              href={pListing.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 bg-purple-600 text-white text-center text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Trade on Polymarket
            </a>
          )}
        </div>
      </div>

      <div className="container-wet py-4 pb-24 lg:pb-4">
        {/* Breadcrumbs */}
        <nav className="text-[10px] text-text-muted mb-3">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-1">/</span>
          <Link href={`/category/${market.category}`} className="hover:underline capitalize">{market.category}</Link>
          <span className="mx-1">/</span>
          <span className="text-text-primary">Market</span>
        </nav>

        {/* ===== MARKET HEADER ===== */}
        <header className="mb-6 pb-4 border-b border-border">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-brand-primary/10 text-brand-primary text-[10px] font-semibold uppercase rounded">
              {market.category}
            </span>
            {isCrossListed ? (
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold rounded">
                CROSS-LISTED
              </span>
            ) : kListing ? (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-semibold rounded">
                KALSHI ONLY
              </span>
            ) : (
              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-semibold rounded">
                POLYMARKET ONLY
              </span>
            )}
            {market.status === 'active' && (
              <span className="px-2 py-0.5 bg-market-up/10 text-market-up text-[10px] font-semibold rounded">
                ACTIVE
              </span>
            )}
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-text-primary mb-2">
            {market.canonicalQuestion}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-text-muted">
            <span>Last updated: {new Date(market.listings[0]?.updatedAt || Date.now()).toLocaleString()}</span>
            {market.expiryDate && (
              <span>Expires: {new Date(market.expiryDate).toLocaleDateString()}</span>
            )}
            <span>Sources: {sources.length}</span>
          </div>

          {/* Consensus Chip */}
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg">
            <span className="text-xs text-text-muted">Market Consensus:</span>
            <span className="text-lg font-bold text-text-primary">
              {market.listings[0]?.yesProbability || 50}% YES
            </span>
            {market.listings[0]?.change24h !== null && (
              <span className={cn(
                'text-xs font-medium',
                (market.listings[0]?.change24h || 0) >= 0 ? 'text-market-up' : 'text-market-down'
              )}>
                {(market.listings[0]?.change24h || 0) >= 0 ? '▲' : '▼'}
                {Math.abs(market.listings[0]?.change24h || 0).toFixed(1)}%
              </span>
            )}
          </div>
        </header>

        {/* ===== MAIN LAYOUT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: Research Content (65-70%) */}
          <main className="lg:col-span-8 space-y-6">
            
            {/* Platform Comparison (Mobile) */}
            <div className="lg:hidden">
              <PlatformComparisonCard 
                market={market} 
                kListing={kListing} 
                pListing={pListing}
                compact
              />
            </div>

            {/* ===== RULES & RESOLUTION ===== */}
            <section className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-sm font-bold text-amber-900 mb-2">Rules & Resolution</h2>
                  <div className="space-y-2 text-xs text-amber-800">
                    <p><strong>Resolves YES if:</strong> The specified outcome occurs before the expiration date.</p>
                    <p><strong>Resolves NO if:</strong> The outcome does not occur or cannot be confirmed by expiration.</p>
                    <p><strong>Verified by:</strong> Official sources and/or trusted data providers.</p>
                    {market.expiryDate && (
                      <p><strong>Resolution window:</strong> {new Date(market.expiryDate).toLocaleDateString()}</p>
                    )}
                  </div>
                  <div className="flex gap-2 mt-3">
                    {kListing && (
                      <a 
                        href={kListing.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] text-amber-700 hover:text-amber-900 underline"
                      >
                        View Kalshi rules →
                      </a>
                    )}
                    {pListing && (
                      <a 
                        href={pListing.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] text-amber-700 hover:text-amber-900 underline"
                      >
                        View Polymarket rules →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* ===== TL;DR / QUICK CONTEXT ===== */}
            <section className="p-4 bg-bg-surface border border-border rounded-lg">
              <h2 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Quick Context
              </h2>
              <ul className="space-y-2">
                {research.tldr.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                    <span className="text-brand-primary">•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </section>

            {/* ===== TIMELINE & CATALYSTS ===== */}
            {market.catalysts.length > 0 && (
              <section className="p-4 bg-bg-surface border border-border rounded-lg">
                <h2 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Timeline & Catalysts
                </h2>
                <div className="relative pl-4 border-l-2 border-brand-primary/30 space-y-4">
                  {market.catalysts.map((catalyst, i) => {
                    const isNext = market.nextCatalyst?.date === catalyst.date;
                    return (
                      <div key={i} className="relative">
                        <div className={cn(
                          'absolute -left-[21px] w-4 h-4 rounded-full border-2',
                          isNext 
                            ? 'bg-brand-primary border-brand-primary' 
                            : 'bg-white border-brand-primary/30'
                        )} />
                        <div className={cn(
                          'p-2 rounded',
                          isNext && 'bg-brand-primary/5 border border-brand-primary/20'
                        )}>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-medium text-text-muted">
                              {new Date(catalyst.date).toLocaleDateString()}
                            </span>
                            {isNext && (
                              <span className="px-1.5 py-0.5 bg-brand-primary text-white text-[8px] font-bold rounded">
                                NEXT
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-text-primary mt-0.5">{catalyst.event}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ===== SCENARIO ANALYSIS (YES vs NO) ===== */}
            <section>
              <h2 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Scenario Analysis
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {/* YES Case */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">✓</span>
                    <h3 className="text-sm font-bold text-green-800">Case for YES</h3>
                  </div>
                  <ul className="space-y-2">
                    {research.yesCase.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-green-700">
                        <span className="text-green-500 mt-0.5">▸</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* NO Case */}
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">✗</span>
                    <h3 className="text-sm font-bold text-red-800">Case for NO</h3>
                  </div>
                  <ul className="space-y-2">
                    {research.noCase.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-red-700">
                        <span className="text-red-500 mt-0.5">▸</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* ===== KEY RISKS ===== */}
            <section className="p-4 bg-slate-100 border border-slate-200 rounded-lg">
              <h2 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Key Risks to Consider
              </h2>
              <ul className="space-y-2">
                {research.risks.map((risk, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                    <span className="text-orange-500">⚠</span>
                    {risk}
                  </li>
                ))}
              </ul>
            </section>

            {/* ===== WHO DISAGREES ===== */}
            <section className="p-4 bg-bg-surface border border-border rounded-lg">
              <h2 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Who Disagrees
              </h2>
              <div className="space-y-3">
                {research.whoDisagrees.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 bg-purple-50 rounded">
                    <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-700 text-xs font-bold">{item.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-purple-800">{item.name}</p>
                      <p className="text-[11px] text-purple-700">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ===== SOURCES ===== */}
            <section className="p-4 bg-bg-surface border border-border rounded-lg">
              <h2 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Sources & Evidence
              </h2>
              <div className="space-y-2">
                {sources.map((source) => (
                  <div key={source.id} className="flex items-start justify-between p-2 hover:bg-bg-hover rounded transition-colors">
                    <div className="flex-1">
                      <p className="text-xs font-medium text-text-primary">{source.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-text-muted">{source.publisher}</span>
                        <span className="text-[10px] text-text-subtle">•</span>
                        <span className="text-[10px] text-text-muted">{source.publishedAt}</span>
                        <span className={cn(
                          'px-1.5 py-0.5 text-[8px] font-medium rounded',
                          source.type === 'PRIMARY' && 'bg-blue-100 text-blue-700',
                          source.type === 'REPORTING' && 'bg-green-100 text-green-700',
                          source.type === 'COMMENTARY' && 'bg-slate-100 text-slate-700',
                        )}>
                          {source.type}
                        </span>
                      </div>
                    </div>
                    <button className="text-[10px] text-brand-primary hover:underline">View →</button>
                  </div>
                ))}
              </div>
            </section>

            {/* ===== RELATED COVERAGE ===== */}
            {relatedStories.length > 0 && (
              <section className="p-4 bg-bg-surface border border-border rounded-lg">
                <h2 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Related W.E.T. Coverage
                </h2>
                <div className="space-y-2">
                  {relatedStories.map((story) => (
                    <Link 
                      key={story.slug}
                      href={`/story/${story.slug}`}
                      className="flex items-start gap-3 p-2 hover:bg-bg-hover rounded transition-colors group"
                    >
                      <span className={cn(
                        'px-1.5 py-0.5 text-[8px] font-semibold rounded flex-shrink-0',
                        story.storyType === 'breaking' && 'bg-brand-red text-white',
                        story.storyType === 'analysis' && 'bg-blue-100 text-blue-700',
                        story.storyType === 'explainer' && 'bg-purple-100 text-purple-700',
                      )}>
                        {story.storyType?.toUpperCase() || 'NEWS'}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-text-primary group-hover:text-brand-primary transition-colors">
                          {story.title}
                        </p>
                        {story.marketAngle && (
                          <p className="text-[10px] text-text-muted mt-0.5 line-clamp-1">{story.marketAngle}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* RIGHT: Trade Panel (30-35%) - Sticky */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-20 space-y-4">
              <PlatformComparisonCard 
                market={market} 
                kListing={kListing} 
                pListing={pListing}
              />

              {/* Watchlist Placeholder (Phase 2) */}
              <div className="p-4 bg-slate-100 border border-slate-200 rounded-lg opacity-60">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="text-xs font-semibold text-slate-500">Watchlist & Alerts</span>
                </div>
                <p className="text-[10px] text-slate-400">Coming in Phase 2</p>
                <button className="mt-2 w-full py-1.5 border border-slate-300 rounded text-[10px] text-slate-400 cursor-not-allowed">
                  + Add to Watchlist
                </button>
              </div>

              {/* Disclaimer */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-[9px] text-amber-700 leading-relaxed">
                  <strong>Disclaimer:</strong> Prediction market prices reflect crowd-sourced probabilities, not guaranteed outcomes. 
                  W.E.T. does not provide financial advice. Always do your own research before trading.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// Platform Comparison Card Component
function PlatformComparisonCard({ 
  market, 
  kListing, 
  pListing,
  compact = false
}: { 
  market: GlobalMarket;
  kListing?: GlobalMarket['listings'][0];
  pListing?: GlobalMarket['listings'][0];
  compact?: boolean;
}) {
  const isCrossListed = market.combined.platformCount >= 2;

  return (
    <div className={cn(
      'bg-white border border-border rounded-lg overflow-hidden',
      !compact && 'shadow-lg'
    )}>
      {/* Header */}
      <div className="px-4 py-3 bg-slate-900 text-white">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold">Trade This Market</span>
          {isCrossListed && market.combined.divergence && market.combined.divergence > 0 && (
            <span className="px-2 py-0.5 bg-amber-500 text-amber-900 text-[10px] font-bold rounded">
              Δ{market.combined.divergence}pts
            </span>
          )}
        </div>
      </div>

      {/* Platform Cards */}
      <div className="p-4 space-y-3">
        {/* Kalshi */}
        {kListing && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-800">Kalshi</span>
              <span className="text-[10px] text-blue-600">${formatNumber(kListing.volume || 0)} vol</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="text-center p-2 bg-white rounded">
                <div className="text-[10px] text-text-muted">YES</div>
                <div className="text-lg font-bold text-market-up">{kListing.yesProbability}¢</div>
              </div>
              <div className="text-center p-2 bg-white rounded">
                <div className="text-[10px] text-text-muted">NO</div>
                <div className="text-lg font-bold text-market-down">{kListing.noProbability}¢</div>
              </div>
            </div>
            <a
              href={kListing.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2 bg-blue-600 text-white text-center text-xs font-semibold rounded hover:bg-blue-700 transition-colors"
            >
              Trade on Kalshi →
            </a>
          </div>
        )}

        {/* Polymarket */}
        {pListing && (
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-purple-800">Polymarket</span>
              <span className="text-[10px] text-purple-600">${formatNumber(pListing.volume || 0)} vol</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="text-center p-2 bg-white rounded">
                <div className="text-[10px] text-text-muted">YES</div>
                <div className="text-lg font-bold text-market-up">{pListing.yesProbability}¢</div>
              </div>
              <div className="text-center p-2 bg-white rounded">
                <div className="text-[10px] text-text-muted">NO</div>
                <div className="text-lg font-bold text-market-down">{pListing.noProbability}¢</div>
              </div>
            </div>
            <a
              href={pListing.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2 bg-purple-600 text-white text-center text-xs font-semibold rounded hover:bg-purple-700 transition-colors"
            >
              Trade on Polymarket →
            </a>
          </div>
        )}

        {/* Divergence Callout */}
        {isCrossListed && kListing && pListing && market.combined.divergence && market.combined.divergence > 0 && (
          <div className="p-2 bg-amber-50 border border-amber-200 rounded text-center">
            <p className="text-[10px] text-amber-800">
              {(kListing.yesProbability || 0) > (pListing.yesProbability || 0) 
                ? `Cheaper YES on Polymarket (${pListing.yesProbability}¢ vs ${kListing.yesProbability}¢)`
                : `Cheaper YES on Kalshi (${kListing.yesProbability}¢ vs ${pListing.yesProbability}¢)`
              }
            </p>
          </div>
        )}

        {/* Market Stats */}
        <div className="pt-3 border-t border-border">
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="flex justify-between">
              <span className="text-text-muted">Combined Vol</span>
              <span className="font-medium text-text-primary">${formatNumber(market.combined.combinedVolume)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Liquidity</span>
              <span className="font-medium text-text-primary">${formatNumber(market.combined.combinedLiquidity)}</span>
            </div>
            {market.expiryDate && (
              <div className="flex justify-between col-span-2">
                <span className="text-text-muted">Expires</span>
                <span className="font-medium text-text-primary">
                  {new Date(market.expiryDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

