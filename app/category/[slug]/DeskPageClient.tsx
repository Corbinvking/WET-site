'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Category, DeskConfig } from '@/data/categories';
import { stories } from '@/data/stories';
import { 
  globalMarkets, 
  type GlobalMarket,
  type Platform,
} from '@/data/markets';
import {
  DeskMarketCard,
  FeaturedMarketHero,
  MarketSortDropdown,
  sortGlobalMarkets,
  EmptyMarketState,
  PlatformPresenceFilter,
  PlatformSelectorChips,
  DeskTopMovers,
  DeskDivergence,
  DeskVolume,
  type PlatformPresence,
  type SortOption,
} from '@/components/market';
import { cn, formatNumber } from '@/lib/utils';

interface DeskPageClientProps {
  slug: string;
  category: Category;
  deskConfig: DeskConfig;
}

export default function DeskPageClient({ slug, category, deskConfig }: DeskPageClientProps) {
  // Filter state
  const [platformPresence, setPlatformPresence] = useState<PlatformPresence>('all');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['kalshi', 'polymarket']);
  const [selectedChip, setSelectedChip] = useState<string>('All');
  const [sortOption, setSortOption] = useState<SortOption>('relevance');
  const [showFilters, setShowFilters] = useState(false);

  // Get markets for this desk (category)
  const deskMarkets = useMemo(() => {
    const categoryMappings: Record<string, string[]> = {
      politics: ['politics'],
      economy: ['economy'],
      world: ['geopolitics', 'world'],
      geopolitics: ['geopolitics'],
      elections: ['elections', 'politics'],
      crypto: ['crypto'],
      tech: ['tech'],
      sports: ['sports'],
      climate: ['climate'],
      culture: ['culture'],
      mentions: ['mentions'],
      earnings: ['earnings'],
      finances: ['finances'],
      health: ['health'],
      entertainment: ['entertainment'],
    };

    const targetCategories = categoryMappings[slug] || [slug];
    return globalMarkets.filter(m => 
      targetCategories.includes(m.category.toLowerCase())
    );
  }, [slug]);

  // Get stories for this desk
  const deskStories = useMemo(() => {
    return stories.filter(story => {
      const matchesCategory = story.category === slug || 
        (slug === 'world' && story.category === 'geopolitics') ||
        (slug === 'politics' && story.category === 'geopolitics');
      const hasMarketLinks = story.relatedMarketIds && story.relatedMarketIds.length > 0;
      return matchesCategory && hasMarketLinks;
    });
  }, [slug]);

  // Filter and sort markets
  const filteredMarkets = useMemo(() => {
    let result = [...deskMarkets];

    if (platformPresence === 'cross-listed') {
      result = result.filter(m => m.combined.platformCount >= 2);
    } else if (platformPresence === 'exclusive') {
      result = result.filter(m => m.combined.platformCount === 1);
    }

    if (selectedPlatforms.length === 1) {
      result = result.filter(m => 
        m.listings.some(l => l.platform === selectedPlatforms[0])
      );
    }

    if (selectedChip !== 'All') {
      const chipLower = selectedChip.toLowerCase();
      result = result.filter(m => 
        m.tags.some(tag => tag.toLowerCase().includes(chipLower)) ||
        m.title.toLowerCase().includes(chipLower) ||
        m.canonicalQuestion.toLowerCase().includes(chipLower)
      );
    }

    result = sortGlobalMarkets(result, sortOption);
    return result;
  }, [deskMarkets, platformPresence, selectedPlatforms, selectedChip, sortOption]);

  // Hero market
  const heroMarket = useMemo(() => {
    const crossListed = deskMarkets.filter(m => m.combined.platformCount >= 2);
    
    switch (deskConfig.heroRule) {
      case 'preferCrossListed':
        return crossListed.sort((a, b) => b.combined.combinedVolume - a.combined.combinedVolume)[0] 
          || deskMarkets.sort((a, b) => b.combined.combinedVolume - a.combined.combinedVolume)[0];
      case 'preferVolume':
        return [...deskMarkets].sort((a, b) => b.combined.combinedVolume - a.combined.combinedVolume)[0];
      case 'preferMovers':
        return [...deskMarkets].sort((a, b) => {
          const aChange = Math.max(...a.listings.map(l => Math.abs(l.change24h || 0)));
          const bChange = Math.max(...b.listings.map(l => Math.abs(l.change24h || 0)));
          return bChange - aChange;
        })[0];
      default:
        return crossListed[0] || deskMarkets[0];
    }
  }, [deskMarkets, deskConfig.heroRule]);

  // Secondary featured markets
  const secondaryMarkets = useMemo(() => {
    return filteredMarkets.filter(m => m.id !== heroMarket?.id).slice(0, 2);
  }, [filteredMarkets, heroMarket]);

  // Grid markets (after hero + secondary)
  const gridMarkets = useMemo(() => {
    const excludeIds = [heroMarket?.id, ...secondaryMarkets.map(m => m.id)].filter(Boolean);
    return filteredMarkets.filter(m => !excludeIds.includes(m.id));
  }, [filteredMarkets, heroMarket, secondaryMarkets]);

  // Get featured story for a market
  const getFeaturedStory = (market: GlobalMarket) => {
    return deskStories.find(story => 
      story.relatedMarketIds.includes(market.id)
    );
  };

  // Reset filters
  const handleClearFilters = () => {
    setPlatformPresence('all');
    setSelectedPlatforms(['kalshi', 'polymarket']);
    setSelectedChip('All');
    setSortOption('relevance');
  };

  // Stats
  const totalVolume = deskMarkets.reduce((sum, m) => sum + m.combined.combinedVolume, 0);
  const crossListedCount = deskMarkets.filter(m => m.combined.platformCount >= 2).length;

  return (
    <div className="min-h-screen bg-white">
      <div className="container-wet">
        {/* ===== COMPACT HEADER BAR ===== */}
        <div className="flex items-center justify-between py-3 border-b border-border">
          {/* Left: Breadcrumb + Title */}
          <div className="flex items-center gap-3">
            <nav className="text-[10px] text-text-muted hidden sm:block">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-1">/</span>
            </nav>
            <h1 className="text-sm md:text-base font-bold text-text-primary">
              {deskConfig.title}
            </h1>
            <span className="hidden md:inline text-[10px] text-text-muted">
              {deskMarkets.length} markets · ${formatNumber(totalVolume)} vol
            </span>
          </div>

          {/* Right: Quick filters + Sort */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-text-muted hover:text-brand-primary transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
            <MarketSortDropdown
              value={sortOption}
              onChange={setSortOption}
              selectedPlatforms={selectedPlatforms}
              compact
            />
          </div>
        </div>

        {/* ===== CHIP TAGS (compact inline) ===== */}
        <div className="flex items-center gap-1.5 py-2 overflow-x-auto scrollbar-hide border-b border-border">
          {deskConfig.chipTags.map((chip) => (
            <button
              key={chip}
              onClick={() => setSelectedChip(chip)}
              className={cn(
                'flex-shrink-0 px-2 py-0.5 text-[10px] font-medium rounded-full transition-all',
                selectedChip === chip
                  ? 'bg-brand-primary text-white'
                  : 'text-text-muted hover:text-brand-primary'
              )}
            >
              {chip}
            </button>
          ))}
          <div className="w-px h-3 bg-border mx-1" />
          <span className="text-[10px] text-text-muted flex-shrink-0">
            {crossListedCount} cross-listed
          </span>
        </div>

        {/* ===== EXPANDABLE FILTERS ===== */}
        {showFilters && (
          <div className="flex items-center gap-3 py-2 border-b border-border bg-bg-surface -mx-4 px-4 md:mx-0 md:px-0 md:rounded-lg md:my-2 md:p-3">
            <PlatformPresenceFilter 
              value={platformPresence} 
              onChange={setPlatformPresence}
              compact
            />
            <div className="w-px h-4 bg-border" />
            <PlatformSelectorChips
              selected={selectedPlatforms}
              onChange={setSelectedPlatforms}
              compact
            />
            {(platformPresence !== 'all' || selectedChip !== 'All') && (
              <>
                <div className="w-px h-4 bg-border" />
                <button
                  onClick={handleClearFilters}
                  className="text-[10px] text-brand-primary hover:underline"
                >
                  Clear
                </button>
              </>
            )}
          </div>
        )}

        {/* ===== MAIN CONTENT GRID ===== */}
        <div className="grid grid-cols-12 gap-5 py-4">
          
          {/* LEFT COLUMN: Lead story style */}
          <div className="col-span-12 lg:col-span-3 space-y-3">
            {heroMarket && (
              <article className="group">
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded mb-2 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  {/* Price overlay */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1">
                    {heroMarket.listings.map(l => (
                      <span key={l.platform} className="px-1.5 py-0.5 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold text-text-primary">
                        {l.platform === 'kalshi' ? 'K' : 'P'}: {l.yesProbability}%
                      </span>
                    ))}
                  </div>
                </div>
                <Link href={`/market/${heroMarket.slug}`}>
                  <h2 className="text-base font-bold text-text-primary group-hover:text-brand-primary transition-colors line-clamp-3 mb-1">
                    {heroMarket.canonicalQuestion}
                  </h2>
                </Link>
                {getFeaturedStory(heroMarket) && (
                  <p className="text-xs text-text-muted line-clamp-2">
                    {getFeaturedStory(heroMarket)?.marketAngle}
                  </p>
                )}
              </article>
            )}

            {/* Secondary headlines */}
            {secondaryMarkets.map((market) => (
              <article key={market.id} className="group border-t border-border pt-3">
                <Link href={`/market/${market.slug}`}>
                  <h3 className="text-sm font-semibold text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2 mb-1">
                    {market.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 text-[10px] text-text-muted">
                  {market.listings[0] && (
                    <span className="font-medium">{market.listings[0].yesProbability}%</span>
                  )}
                  {market.listings[0]?.change24h && (
                    <span className={market.listings[0].change24h >= 0 ? 'text-market-up' : 'text-market-down'}>
                      {market.listings[0].change24h >= 0 ? '▲' : '▼'}{Math.abs(market.listings[0].change24h).toFixed(1)}%
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* CENTER COLUMN: Hero story */}
          <div className="col-span-12 lg:col-span-6 order-first lg:order-none">
            {heroMarket && (
              <article className="group relative">
                <div className="aspect-[16/9] bg-gradient-to-br from-blue-100 via-slate-100 to-purple-100 rounded-lg mb-3 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 bg-brand-primary text-white text-[10px] font-bold uppercase rounded">
                      {heroMarket.combined.platformCount >= 2 ? 'Cross-Listed' : 'Featured'}
                    </span>
                  </div>

                  {/* Price bar at bottom */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <div className="flex items-end justify-between">
                      <div className="flex items-center gap-3">
                        {heroMarket.listings.map(l => (
                          <div key={l.platform} className="text-center">
                            <span className="text-[9px] text-blue-200 font-medium block">{l.platform === 'kalshi' ? 'Kalshi' : 'Poly'}</span>
                            <span className="text-xl font-bold text-white">{l.yesProbability}%</span>
                          </div>
                        ))}
                        {heroMarket.combined.divergence && heroMarket.combined.divergence > 0 && (
                          <span className="px-2 py-0.5 bg-amber-400/90 text-amber-900 text-[10px] font-bold rounded">
                            Δ{heroMarket.combined.divergence}pts
                          </span>
                        )}
                      </div>
                      {heroMarket.listings[0]?.change24h !== null && (
                        <span className={cn(
                          'text-sm font-bold',
                          (heroMarket.listings[0]?.change24h || 0) >= 0 ? 'text-green-400' : 'text-red-400'
                        )}>
                          {(heroMarket.listings[0]?.change24h || 0) >= 0 ? '▲' : '▼'}
                          {Math.abs(heroMarket.listings[0]?.change24h || 0).toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <Link href={`/market/${heroMarket.slug}`}>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary group-hover:text-brand-primary transition-colors mb-2">
                    {heroMarket.canonicalQuestion}
                  </h2>
                </Link>
                
                {getFeaturedStory(heroMarket) ? (
                  <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                    {getFeaturedStory(heroMarket)?.marketAngle}
                  </p>
                ) : (
                  <p className="text-sm text-text-muted mb-3">
                    Markets price {heroMarket.listings[0]?.yesProbability}% odds.
                    {heroMarket.nextCatalyst && ` Next catalyst: ${heroMarket.nextCatalyst.event}.`}
                  </p>
                )}

                {/* Meta bar */}
                <div className="flex items-center gap-3 text-[10px] text-text-muted border-t border-border pt-3">
                  <span>${formatNumber(heroMarket.combined.combinedVolume)} volume</span>
                  {heroMarket.expiryDate && (
                    <span>Expires {new Date(heroMarket.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  )}
                  {heroMarket.nextCatalyst && (
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {new Date(heroMarket.nextCatalyst.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
              </article>
            )}

            {/* Below hero: 3-column grid of compact markets */}
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
              {gridMarkets.slice(0, 3).map((market) => (
                <article key={market.id} className="group">
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded mb-2 relative overflow-hidden">
                    <div className="absolute bottom-1 left-1">
                      <span className="px-1 py-0.5 bg-white/90 backdrop-blur-sm rounded text-[9px] font-bold text-text-primary">
                        {market.listings[0]?.yesProbability}%
                      </span>
                    </div>
                  </div>
                  <Link href={`/market/${market.slug}`}>
                    <h4 className="text-[11px] font-semibold text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2">
                      {market.title}
                    </h4>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Catch-up rail */}
          <aside className="col-span-12 lg:col-span-3">
            {/* Video/Feature placeholder */}
            <div className="aspect-video bg-slate-900 rounded-lg mb-3 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center">
                <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xs font-bold text-text-primary mb-3">Top {category.name} Markets</h3>

            {/* Market list */}
            <div className="space-y-0">
              {filteredMarkets.slice(0, 6).map((market) => (
                <article key={market.id} className="group flex gap-2 py-2 border-b border-border last:border-0">
                  <div className="w-16 h-12 flex-shrink-0 bg-slate-100 rounded overflow-hidden relative">
                    <div className="absolute bottom-0.5 left-0.5">
                      <span className="px-1 py-0.5 bg-white/90 rounded text-[8px] font-bold">
                        {market.listings[0]?.yesProbability}%
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/market/${market.slug}`}>
                      <h4 className="text-[11px] font-medium text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2">
                        {market.title}
                      </h4>
                    </Link>
                    {market.listings[0]?.change24h !== null && (
                      <span className={cn(
                        'text-[10px] font-medium',
                        (market.listings[0]?.change24h || 0) >= 0 ? 'text-market-up' : 'text-market-down'
                      )}>
                        {(market.listings[0]?.change24h || 0) >= 0 ? '▲' : '▼'}{Math.abs(market.listings[0]?.change24h || 0).toFixed(1)}%
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Quick stats */}
            <div className="mt-4 p-3 bg-bg-surface rounded-lg">
              <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-wide mb-2">Desk Stats</h4>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-text-muted">Total Markets</span>
                  <span className="font-medium text-text-primary">{deskMarkets.length}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-text-muted">Cross-Listed</span>
                  <span className="font-medium text-text-primary">{crossListedCount}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-text-muted">Total Volume</span>
                  <span className="font-medium text-text-primary">${formatNumber(totalVolume)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* ===== BELOW THE FOLD: More Markets Grid ===== */}
        {gridMarkets.length > 3 && (
          <section className="border-t border-border py-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-0.5 h-4 bg-brand-primary rounded-full" />
              <h2 className="text-xs font-bold text-text-primary uppercase tracking-wide">
                More {category.name} Markets
              </h2>
              <span className="text-[10px] text-text-muted">
                {gridMarkets.length - 3} more
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {gridMarkets.slice(3, 13).map((market) => (
                <DeskMarketCard
                  key={market.id}
                  market={market}
                  coverage={[]}
                  selectedPlatforms={selectedPlatforms}
                  variant="compact"
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {filteredMarkets.length === 0 && (
          <EmptyMarketState onClearFilters={handleClearFilters} />
        )}
      </div>
    </div>
  );
}
