import Link from 'next/link';
import { markets, getTopMovers, getHighestVolume } from '@/data/markets';
import { categories } from '@/data/categories';
import { formatNumber } from '@/lib/utils';
import { MarketCard, CatalystCalendarMini } from '@/components/market';

export const metadata = {
  title: 'Markets Directory | W.E.T.',
  description: 'Browse all prediction markets across politics, economy, crypto, sports, and more.',
};

// Calculate divergence between platforms
function getDivergentMarkets(limit: number = 5) {
  return markets
    .filter(m => m.platforms.kalshi && m.platforms.polymarket)
    .map(m => ({
      ...m,
      divergence: Math.abs(
        (m.platforms.kalshi?.yesPrice || 0) - (m.platforms.polymarket?.yesPrice || 0)
      ) * 100
    }))
    .sort((a, b) => b.divergence - a.divergence)
    .slice(0, limit);
}

export default function MarketsPage() {
  const allMarkets = markets;
  const topMovers = getTopMovers(5);
  const highestVolume = getHighestVolume(5);
  const divergentMarkets = getDivergentMarkets(5);
  
  // Featured market (biggest mover or highest volume)
  const featuredMarket = topMovers[0];
  const remainingMarkets = allMarkets.filter(m => m.id !== featuredMarket?.id);

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container-wet py-4">
        {/* Page Header */}
        <div className="mb-4 pb-4 border-b border-border">
          <h1 className="text-2xl font-bold text-text-primary mb-1">
            Markets Directory
          </h1>
          <p className="text-sm text-text-muted">
            Browse prediction markets across Kalshi and Polymarket. Compare prices, track movers, and find opportunities.
          </p>
        </div>

        {/* Search Bar (UI only) */}
        <div className="mb-4">
          <div className="relative max-w-lg">
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
              placeholder="Search markets by keyword, event, or question..."
              className="w-full pl-9 pr-4 py-2.5 bg-bg-surface border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          <button className="px-3 py-1.5 bg-brand-primary text-white text-xs font-medium rounded-full">
            All Markets
          </button>
          {categories.slice(0, 6).map((category) => (
            <button
              key={category.id}
              className="px-3 py-1.5 bg-bg-surface hover:bg-bg-hover text-text-muted text-xs font-medium rounded-full border border-border transition-colors"
            >
              {category.name}
            </button>
          ))}
          <div className="w-px bg-border mx-1 my-1" />
          <button className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200 transition-colors">
            🔥 Top Movers
          </button>
          <button className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-medium rounded-full border border-amber-200 transition-colors">
            📊 Divergence
          </button>
          <button className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium rounded-full border border-blue-200 transition-colors">
            💰 Volume
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Market List */}
          <div className="lg:col-span-8">
            {/* Featured Market (Lead) */}
            {featuredMarket && (
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
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-[10px] font-medium text-brand-primary uppercase tracking-wide">
                        {featuredMarket.category}
                      </span>
                      <h3 className="text-lg font-bold text-text-primary group-hover:text-brand-primary transition-colors mt-1">
                        {featuredMarket.question}
                      </h3>
                      <p className="text-sm text-text-muted mt-1">
                        Expires: {new Date(featuredMarket.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      {/* Kalshi Price */}
                      <div className="text-center">
                        <span className="text-[10px] font-medium text-text-muted block mb-1">Kalshi</span>
                        <span className="text-2xl font-bold text-brand-primary">
                          {Math.round((featuredMarket.platforms.kalshi?.yesPrice || 0) * 100)}%
                        </span>
                      </div>
                      
                      {/* Polymarket Price */}
                      <div className="text-center">
                        <span className="text-[10px] font-medium text-text-muted block mb-1">Polymarket</span>
                        <span className="text-2xl font-bold text-brand-primary">
                          {Math.round((featuredMarket.platforms.polymarket?.yesPrice || 0) * 100)}%
                        </span>
                      </div>
                      
                      {/* 24h Change */}
                      <div className="text-center">
                        <span className="text-[10px] font-medium text-text-muted block mb-1">24h</span>
                        <span className={`text-2xl font-bold ${featuredMarket.change24h >= 0 ? 'text-market-up' : 'text-market-down'}`}>
                          {featuredMarket.change24h >= 0 ? '▲' : '▼'}{Math.abs(featuredMarket.change24h).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Volume bar */}
                  <div className="mt-4 flex items-center gap-4 text-xs text-text-muted">
                    <span>Volume: ${formatNumber(featuredMarket.totalVolume)}</span>
                    <span>•</span>
                    <span>Liquidity: ${formatNumber((featuredMarket.platforms.kalshi?.liquidity || 0) + (featuredMarket.platforms.polymarket?.liquidity || 0))}</span>
                  </div>
                </Link>
              </div>
            )}

            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-text-muted">
                {remainingMarkets.length} markets
              </span>
              <select className="px-3 py-1.5 bg-bg-surface border border-border rounded-lg text-xs text-text-muted focus:outline-none focus:border-brand-primary">
                <option>Sort by: Relevance</option>
                <option>Sort by: Volume (High to Low)</option>
                <option>Sort by: 24h Change</option>
                <option>Sort by: Expiration (Soonest)</option>
                <option>Sort by: Divergence</option>
              </select>
            </div>

            {/* Market Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {remainingMarkets.map((market) => (
                <MarketCard 
                  key={market.id} 
                  market={market} 
                  showVolume={true}
                  showCatalysts={true}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 space-y-5">
            {/* Quick Stats */}
            <div className="p-4 bg-bg-surface rounded-lg border border-border">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wide mb-3">
                Platform Overview
              </h3>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">Total Markets</span>
                  <span className="text-sm font-semibold text-text-primary">{allMarkets.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">Combined Volume</span>
                  <span className="text-sm font-semibold text-text-primary">
                    ${formatNumber(allMarkets.reduce((sum, m) => sum + m.totalVolume, 0))}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">Active Categories</span>
                  <span className="text-sm font-semibold text-text-primary">{categories.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">Avg. Divergence</span>
                  <span className="text-sm font-semibold text-amber-600">
                    {(divergentMarkets.reduce((sum, m) => sum + m.divergence, 0) / divergentMarkets.length).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Top Movers */}
            <div className="bg-bg-surface rounded-lg border border-border overflow-hidden">
              <div className="bg-emerald-50 px-4 py-2.5 border-b border-emerald-100">
                <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
                  <span>🔥</span> Top Movers
                </h3>
              </div>
              <div className="divide-y divide-border">
                {topMovers.map((market) => (
                  <Link
                    key={market.id}
                    href={`/market/${market.slug}`}
                    className="block px-4 py-3 hover:bg-bg-hover transition-colors group"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs text-text-secondary group-hover:text-brand-primary transition-colors line-clamp-2">{market.title}</span>
                      <span className={`text-xs font-bold whitespace-nowrap ${
                        market.change24h >= 0 ? 'text-market-up' : 'text-market-down'
                      }`}>
                        {market.change24h >= 0 ? '▲' : '▼'} {Math.abs(market.change24h).toFixed(1)}%
                      </span>
                    </div>
                  </Link>
                ))}
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
                {divergentMarkets.map((market) => (
                  <Link
                    key={market.id}
                    href={`/market/${market.slug}`}
                    className="block px-4 py-3 hover:bg-bg-hover transition-colors group"
                  >
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <span className="text-xs text-text-secondary group-hover:text-brand-primary transition-colors line-clamp-1">{market.title}</span>
                      <span className="text-xs font-bold text-amber-600 whitespace-nowrap">
                        Δ{market.divergence.toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-text-muted">
                      <span>K: {Math.round((market.platforms.kalshi?.yesPrice || 0) * 100)}%</span>
                      <span>vs</span>
                      <span>P: {Math.round((market.platforms.polymarket?.yesPrice || 0) * 100)}%</span>
                    </div>
                  </Link>
                ))}
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
                      <span className="text-xs text-text-secondary group-hover:text-brand-primary transition-colors line-clamp-1">{market.title}</span>
                      <span className="text-xs font-semibold text-text-muted whitespace-nowrap">
                        ${formatNumber(market.totalVolume)}
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
