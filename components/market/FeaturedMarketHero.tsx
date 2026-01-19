'use client';

import Link from 'next/link';
import type { GlobalMarket } from '@/data/markets';
import { getPlatformCoverage, getPlatformListing } from '@/data/markets';
import type { Story } from '@/data/stories';
import { formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface FeaturedMarketHeroProps {
  market: GlobalMarket;
  featuredStory?: Story;
  badge?: string; // e.g., "Cross-Listed", "Top Mover", "Highest Volume"
}

export function FeaturedMarketHero({ market, featuredStory, badge = 'Featured' }: FeaturedMarketHeroProps) {
  const coverage = getPlatformCoverage(market);
  const isCrossListed = coverage === 'cross-listed';
  
  const kalshiListing = getPlatformListing(market, 'kalshi');
  const polyListing = getPlatformListing(market, 'polymarket');
  
  const primaryChange = kalshiListing?.change24h || polyListing?.change24h || 0;

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl border border-blue-100 overflow-hidden">
      <Link
        href={`/market/${market.slug}`}
        className="block p-5 group"
      >
        {/* Header Row */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-brand-primary text-white text-[10px] font-bold uppercase rounded">
              {badge}
            </span>
            <span className="px-2 py-0.5 bg-bg-surface text-text-muted text-[10px] font-medium uppercase rounded border border-border">
              {market.category}
            </span>
            {isCrossListed && (
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded">
                Cross-Listed
              </span>
            )}
          </div>

          {/* Platform Badges */}
          <div className="flex items-center gap-1">
            {kalshiListing && (
              <span className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
                K
              </span>
            )}
            {polyListing && (
              <span className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200">
                P
              </span>
            )}
          </div>
        </div>

        {/* Market Question */}
        <h2 className="text-xl md:text-2xl font-bold text-text-primary group-hover:text-brand-primary transition-colors mb-4">
          {market.canonicalQuestion}
        </h2>

        {/* Platform Comparison - Large Format */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Kalshi */}
          {kalshiListing && (
            <div className="p-4 bg-white rounded-lg border border-blue-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Kalshi</span>
                <span className="text-[10px] text-text-muted">Yes%</span>
              </div>
              <div className="text-3xl font-bold text-text-primary mb-2">
                {kalshiListing.yesProbability}%
              </div>
              <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${kalshiListing.yesProbability}%` }}
                />
              </div>
            </div>
          )}

          {/* Polymarket */}
          {polyListing && (
            <div className="p-4 bg-white rounded-lg border border-purple-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">Polymarket</span>
                <span className="text-[10px] text-text-muted">Yes%</span>
              </div>
              <div className="text-3xl font-bold text-text-primary mb-2">
                {polyListing.yesProbability}%
              </div>
              <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full transition-all"
                  style={{ width: `${polyListing.yesProbability}%` }}
                />
              </div>
            </div>
          )}

          {/* Stats Card */}
          <div className="p-4 bg-white rounded-lg border border-border shadow-sm">
            <div className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2">24h Activity</div>
            <div className={cn(
              'text-2xl font-bold mb-2',
              primaryChange >= 0 ? 'text-market-up' : 'text-market-down'
            )}>
              {primaryChange >= 0 ? '▲' : '▼'} {Math.abs(primaryChange).toFixed(1)}%
            </div>
            <div className="space-y-1 text-xs text-text-muted">
              <div className="flex justify-between">
                <span>Volume</span>
                <span className="font-medium text-text-primary">${formatNumber(market.combined.combinedVolume)}</span>
              </div>
              <div className="flex justify-between">
                <span>Liquidity</span>
                <span className="font-medium text-text-primary">${formatNumber(market.combined.combinedLiquidity)}</span>
              </div>
              {market.combined.divergence !== null && market.combined.divergence > 0 && (
                <div className="flex justify-between">
                  <span>Divergence</span>
                  <span className="font-medium text-amber-600">Δ {market.combined.divergence} pts</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Meta Row */}
        <div className="flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center gap-4">
            {market.expiryDate && (
              <span>
                Expires: {new Date(market.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            )}
            {market.nextCatalyst && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Next: {market.nextCatalyst.event}
              </span>
            )}
          </div>
          
          <span className="text-brand-primary font-medium group-hover:underline">
            Open Market →
          </span>
        </div>
      </Link>

      {/* Featured Story - Market Angle Teaser */}
      {featuredStory && (
        <div className="border-t border-blue-100 bg-white/50 px-5 py-3">
          <Link
            href={`/story/${featuredStory.slug}`}
            className="flex items-start gap-3 group/story"
          >
            <span className="flex-shrink-0 px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold uppercase rounded">
              {featuredStory.labels[0] || 'Analysis'}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-text-primary group-hover/story:text-brand-primary transition-colors line-clamp-1">
                {featuredStory.title}
              </h4>
              <p className="text-xs text-text-muted line-clamp-1 mt-0.5">
                <span className="font-medium text-text-secondary">Market Angle:</span> {featuredStory.marketAngle}
              </p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

