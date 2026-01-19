'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  globalMarkets, 
  getCrossListedMarkets, 
  getPlatformExclusiveMarkets,
  getMarketsByPlatform,
  getGlobalTopMovers, 
  getGlobalHighestVolume,
  getGlobalBiggestDivergence,
  getMarketStats,
  type GlobalMarket,
  type Platform,
} from '@/data/markets';
import { categories } from '@/data/categories';
import { formatNumber } from '@/lib/utils';
import {
  GlobalMarketCard,
  CatalystCalendarMini,
  PlatformOverviewPanel,
  MarketSortDropdown,
  sortGlobalMarkets,
  EmptyMarketState,
  PlatformPresenceFilter,
  PlatformSelectorChips,
  ExclusivitySubFilter,
  ViewModeToggle,
  type PlatformPresence,
  type ExclusivityOption,
  type ViewMode,
  type SortOption,
} from '@/components/market';

export default function MarketsPage() {
  // Filter state
  const [platformPresence, setPlatformPresence] = useState<PlatformPresence>('all');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['kalshi', 'polymarket']);
  const [exclusivityFilter, setExclusivityFilter] = useState<ExclusivityOption>('any');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>('relevance');
  const [viewMode, setViewMode] = useState<ViewMode>('global');
  const [searchTerm, setSearchTerm] = useState('');

  // Get market stats
  const stats = getMarketStats();

  // Filter markets based on current state
  const filteredMarkets = useMemo(() => {
    let result: GlobalMarket[] = [...globalMarkets];

    // Platform presence filter
    if (platformPresence === 'cross-listed') {
      result = getCrossListedMarkets();
    } else if (platformPresence === 'exclusive') {
      if (exclusivityFilter === 'kalshi') {
        result = getPlatformExclusiveMarkets('kalshi');
      } else if (exclusivityFilter === 'polymarket') {
        result = getPlatformExclusiveMarkets('polymarket');
      } else {
        result = getPlatformExclusiveMarkets();
      }
    }

    // Platform selector filter (for "all" presence mode)
    if (platformPresence === 'all') {
      if (selectedPlatforms.length === 1) {
        result = getMarketsByPlatform(selectedPlatforms[0]);
      }
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(m => m.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(m => 
        m.canonicalQuestion.toLowerCase().includes(term) ||
        m.title.toLowerCase().includes(term) ||
        m.category.toLowerCase().includes(term) ||
        m.tags.some(t => t.toLowerCase().includes(term))
      );
    }

    // Sort
    result = sortGlobalMarkets(result, sortOption);

    return result;
  }, [platformPresence, selectedPlatforms, exclusivityFilter, selectedCategory, searchTerm, sortOption]);

  // Featured market (top mover)
  const featuredMarket = getGlobalTopMovers(1)[0];
  const displayMarkets = filteredMarkets.filter(m => m.id !== featuredMarket?.id);

  // Lists for sidebar (respect filters)
  const topMovers = getGlobalTopMovers(5);
  const highestVolume = getGlobalHighestVolume(5);
  const biggestDivergence = getGlobalBiggestDivergence(5);

  // Reset all filters
  const handleClearFilters = () => {
    setPlatformPresence('all');
    setSelectedPlatforms(['kalshi', 'polymarket']);
    setExclusivityFilter('any');
    setSelectedCategory('all');
    setSortOption('relevance');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container-wet py-4">
        {/* Page Header */}
        <div className="mb-4 pb-4 border-b border-border">
          <h1 className="text-2xl font-bold text-text-primary mb-1">
            Markets Directory
          </h1>
          <p className="text-sm text-text-muted">
            Browse and compare prediction markets across platforms. Find cross-listed opportunities, track movers, and discover divergence.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative max-w-xl">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search markets by keyword, event, or question..."
              className="w-full pl-9 pr-4 py-2.5 bg-bg-surface border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Filter Row 1: Platform Presence + Platform Selector */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <PlatformPresenceFilter 
            value={platformPresence} 
            onChange={setPlatformPresence} 
          />
          
          <div className="w-px h-6 bg-border hidden sm:block" />
          
          <PlatformSelectorChips
            selected={selectedPlatforms}
            onChange={setSelectedPlatforms}
          />

          {/* Exclusivity sub-filter (shown when exclusive is selected) */}
          {platformPresence === 'exclusive' && (
            <>
              <div className="w-px h-6 bg-border hidden sm:block" />
              <ExclusivitySubFilter
                value={exclusivityFilter}
                onChange={setExclusivityFilter}
              />
            </>
          )}
        </div>

        {/* Filter Row 2: Category Chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              selectedCategory === 'all'
                ? 'bg-brand-primary text-white'
                : 'bg-bg-surface hover:bg-bg-hover text-text-muted border border-border'
            }`}
          >
            All Markets
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                selectedCategory === category.slug
                  ? 'bg-brand-primary text-white'
                  : 'bg-bg-surface hover:bg-bg-hover text-text-muted border border-border'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Filter Row 3: Sort + View Mode */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <MarketSortDropdown
            value={sortOption}
            onChange={setSortOption}
            selectedPlatforms={selectedPlatforms}
          />

          <ViewModeToggle
            value={viewMode}
            onChange={setViewMode}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Market List */}
          <div className="lg:col-span-8">
            {/* Featured Market (Lead) */}
            {featuredMarket && platformPresence !== 'exclusive' && selectedCategory === 'all' && !searchTerm && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-0.5 h-4 bg-brand-primary rounded-full" />
                  <h2 className="text-xs font-bold text-text-primary uppercase tracking-wide">
                    Featured Market
                  </h2>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded">
                    Top Mover
                  </span>
                </div>
                
                <Link
                  href={`/market/${featuredMarket.slug}`}
                  className="block p-4 bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg border border-blue-100 group hover:border-brand-primary transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Category + Coverage */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-medium text-brand-primary uppercase tracking-wide">
                          {featuredMarket.category}
                        </span>
                        {featuredMarket.combined.platformCount >= 2 && (
                          <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-bold uppercase rounded">
                            Cross-listed
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-bold text-text-primary group-hover:text-brand-primary transition-colors">
                        {featuredMarket.canonicalQuestion}
                      </h3>
                      
                      <p className="text-sm text-text-muted mt-1">
                        Expires: {featuredMarket.expiryDate ? new Date(featuredMarket.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      {/* Kalshi Price */}
                      {featuredMarket.listings.find(l => l.platform === 'kalshi') && (
                        <div className="text-center">
                          <span className="text-[10px] font-medium text-blue-600 block mb-1">Kalshi</span>
                          <span className="text-2xl font-bold text-brand-primary">
                            {featuredMarket.listings.find(l => l.platform === 'kalshi')?.yesProbability}%
                          </span>
                        </div>
                      )}
                      
                      {/* Polymarket Price */}
                      {featuredMarket.listings.find(l => l.platform === 'polymarket') && (
                        <div className="text-center">
                          <span className="text-[10px] font-medium text-purple-600 block mb-1">Polymarket</span>
                          <span className="text-2xl font-bold text-brand-primary">
                            {featuredMarket.listings.find(l => l.platform === 'polymarket')?.yesProbability}%
                          </span>
                        </div>
                      )}
                      
                      {/* 24h Change */}
                      <div className="text-center">
                        <span className="text-[10px] font-medium text-text-muted block mb-1">24h</span>
                        <span className={`text-2xl font-bold ${
                          (featuredMarket.listings[0]?.change24h || 0) >= 0 ? 'text-market-up' : 'text-market-down'
                        }`}>
                          {(featuredMarket.listings[0]?.change24h || 0) >= 0 ? '▲' : '▼'}
                          {Math.abs(featuredMarket.listings[0]?.change24h || 0).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Meta bar */}
                  <div className="mt-4 flex items-center gap-4 text-xs text-text-muted">
                    <span>Volume: ${formatNumber(featuredMarket.combined.combinedVolume)}</span>
                    <span>•</span>
                    <span>Liquidity: ${formatNumber(featuredMarket.combined.combinedLiquidity)}</span>
                    {featuredMarket.combined.divergence !== null && featuredMarket.combined.divergence > 0 && (
                      <>
                        <span>•</span>
                        <span className="text-amber-600 font-medium">Δ {featuredMarket.combined.divergence} pts</span>
                      </>
                    )}
                  </div>
                </Link>
              </div>
            )}

            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-text-muted">
                {displayMarkets.length} market{displayMarkets.length !== 1 ? 's' : ''} found
              </span>
              {(platformPresence !== 'all' || selectedCategory !== 'all' || searchTerm) && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-brand-primary hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Market Grid or Empty State */}
            {displayMarkets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayMarkets.map((market) => (
                  <GlobalMarketCard
                    key={market.id}
                    market={market}
                    selectedPlatforms={selectedPlatforms}
                    showVolume={true}
                    showCatalyst={true}
                  />
                ))}
              </div>
            ) : (
              <EmptyMarketState
                searchTerm={searchTerm}
                onClearFilters={handleClearFilters}
              />
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 space-y-5">
            {/* Platform Overview */}
            <PlatformOverviewPanel
              stats={stats}
              selectedPlatforms={selectedPlatforms}
            />

            {/* Top Movers */}
            <div className="bg-bg-surface rounded-lg border border-border overflow-hidden">
              <div className="bg-emerald-50 px-4 py-2.5 border-b border-emerald-100">
                <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
                  <span>🔥</span> Top Movers
                </h3>
              </div>
              <div className="divide-y divide-border">
                {topMovers.map((market) => {
                  const change = market.listings[0]?.change24h || 0;
                  return (
                    <Link
                      key={market.id}
                      href={`/market/${market.slug}`}
                      className="block px-4 py-3 hover:bg-bg-hover transition-colors group"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs text-text-secondary group-hover:text-brand-primary transition-colors line-clamp-2">
                          {market.title}
                        </span>
                        <span className={`text-xs font-bold whitespace-nowrap ${
                          change >= 0 ? 'text-market-up' : 'text-market-down'
                        }`}>
                          {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(1)}%
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Biggest Divergence */}
            <div className="bg-bg-surface rounded-lg border border-border overflow-hidden">
              <div className="bg-amber-50 px-4 py-2.5 border-b border-amber-100">
                <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1.5">
                  <span>📊</span> Biggest Divergence
                </h3>
                <p className="text-[10px] text-amber-600 mt-0.5">Price gaps between Kalshi & Polymarket</p>
              </div>
              <div className="divide-y divide-border">
                {biggestDivergence.map((market) => {
                  const kalshi = market.listings.find(l => l.platform === 'kalshi');
                  const poly = market.listings.find(l => l.platform === 'polymarket');
                  return (
                    <Link
                      key={market.id}
                      href={`/market/${market.slug}`}
                      className="block px-4 py-3 hover:bg-bg-hover transition-colors group"
                    >
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="text-xs text-text-secondary group-hover:text-brand-primary transition-colors line-clamp-1">
                          {market.title}
                        </span>
                        <span className="text-xs font-bold text-amber-600 whitespace-nowrap">
                          Δ{market.combined.divergence}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-text-muted">
                        <span>K: {kalshi?.yesProbability}%</span>
                        <span>vs</span>
                        <span>P: {poly?.yesProbability}%</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Highest Volume */}
            <div className="bg-bg-surface rounded-lg border border-border overflow-hidden">
              <div className="bg-blue-50 px-4 py-2.5 border-b border-blue-100">
                <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wide flex items-center gap-1.5">
                  <span>💰</span> Highest Volume
                </h3>
              </div>
              <div className="divide-y divide-border">
                {highestVolume.map((market) => (
                  <Link
                    key={market.id}
                    href={`/market/${market.slug}`}
                    className="block px-4 py-3 hover:bg-bg-hover transition-colors group"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs text-text-secondary group-hover:text-brand-primary transition-colors line-clamp-1">
                        {market.title}
                      </span>
                      <span className="text-xs font-semibold text-text-muted whitespace-nowrap">
                        ${formatNumber(market.combined.combinedVolume)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Catalyst Calendar */}
            <CatalystCalendarMini />
          </aside>
        </div>
      </div>
    </div>
  );
}
