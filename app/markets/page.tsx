import Link from 'next/link';
import { markets, getTopMovers, getHighestVolume } from '@/data/markets';
import { categories } from '@/data/categories';
import { formatNumber } from '@/lib/utils';
import { MarketCard } from '@/components/market';

export const metadata = {
  title: 'Markets Directory | W.E.T.',
  description: 'Browse all prediction markets across politics, economy, crypto, sports, and more.',
};

export default function MarketsPage() {
  const allMarkets = markets;
  const topMovers = getTopMovers(5);
  const highestVolume = getHighestVolume(5);

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container-wet py-4">
        {/* Page Header */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-text-primary mb-1">
            Markets Directory
          </h1>
          <p className="text-xs text-text-muted">
            Browse prediction markets across Kalshi and Polymarket
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
              placeholder="Search markets..."
              className="w-full pl-9 pr-4 py-2 bg-bg-surface border border-border rounded text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <button className="px-2.5 py-1 bg-brand text-white text-xs font-medium rounded-full">
            All Markets
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className="px-2.5 py-1 bg-bg-surface hover:bg-bg-hover text-text-muted text-xs font-medium rounded-full border border-border transition-colors"
            >
              {category.name}
            </button>
          ))}
          <div className="w-px bg-border mx-1" />
          <button className="px-2.5 py-1 bg-bg-surface hover:bg-bg-hover text-text-muted text-xs font-medium rounded-full border border-border transition-colors">
            Top Movers
          </button>
          <button className="px-2.5 py-1 bg-bg-surface hover:bg-bg-hover text-text-muted text-xs font-medium rounded-full border border-border transition-colors">
            Highest Volume
          </button>
          <button className="px-2.5 py-1 bg-bg-surface hover:bg-bg-hover text-text-muted text-xs font-medium rounded-full border border-border transition-colors">
            Divergence
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Market List */}
          <div className="lg:col-span-8">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-text-muted">
                {allMarkets.length} markets
              </span>
              <select className="px-2 py-1 bg-bg-surface border border-border rounded text-xs text-text-muted focus:outline-none focus:border-brand-blue">
                <option>Sort by: Relevance</option>
                <option>Sort by: Volume</option>
                <option>Sort by: 24h Change</option>
                <option>Sort by: Expiration</option>
              </select>
            </div>

            {/* Market Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {allMarkets.map((market) => (
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
          <aside className="lg:col-span-4 space-y-4">
            {/* Quick Stats */}
            <div className="p-3 bg-bg-surface rounded border border-border">
              <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wide mb-3">
                Platform Overview
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">Total Markets</span>
                  <span className="text-xs font-medium text-text-primary">{allMarkets.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">Combined Volume</span>
                  <span className="text-xs font-medium text-text-primary">
                    ${formatNumber(allMarkets.reduce((sum, m) => sum + m.totalVolume, 0))}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted">Active Categories</span>
                  <span className="text-xs font-medium text-text-primary">{categories.length}</span>
                </div>
              </div>
            </div>

            {/* Top Movers */}
            <div className="bg-bg-surface rounded border border-border overflow-hidden">
              <div className="bg-bg-elevated px-3 py-2">
                <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wide">
                  🔥 Top Movers
                </h3>
              </div>
              <div className="divide-y divide-border">
                {topMovers.map((market) => (
                  <Link
                    key={market.id}
                    href={`/market/${market.slug}`}
                    className="block px-3 py-2 hover:bg-bg-hover transition-colors"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs text-text-secondary line-clamp-1">{market.title}</span>
                      <span className={`text-xs font-semibold whitespace-nowrap ${
                        market.change24h >= 0 ? 'text-market-up' : 'text-market-down'
                      }`}>
                        {market.change24h >= 0 ? '▲' : '▼'} {Math.abs(market.change24h).toFixed(1)}%
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Highest Volume */}
            <div className="bg-bg-surface rounded border border-border overflow-hidden">
              <div className="bg-bg-elevated px-3 py-2">
                <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wide">
                  📊 Highest Volume
                </h3>
              </div>
              <div className="divide-y divide-border">
                {highestVolume.map((market) => (
                  <Link
                    key={market.id}
                    href={`/market/${market.slug}`}
                    className="block px-3 py-2 hover:bg-bg-hover transition-colors"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs text-text-secondary line-clamp-1">{market.title}</span>
                      <span className="text-xs text-text-muted whitespace-nowrap">
                        ${formatNumber(market.totalVolume)}
                      </span>
                    </div>
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
