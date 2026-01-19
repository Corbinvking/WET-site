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
  badge?: string;
  variant?: 'large' | 'compact';
}

export function FeaturedMarketHero({ 
  market, 
  featuredStory, 
  badge = 'Featured',
  variant = 'large'
}: FeaturedMarketHeroProps) {
  const coverage = getPlatformCoverage(market);
  const isCrossListed = coverage === 'cross-listed';
  
  const kalshiListing = getPlatformListing(market, 'kalshi');
  const polyListing = getPlatformListing(market, 'polymarket');
  
  const primaryChange = kalshiListing?.change24h || polyListing?.change24h || 0;

  // Compact variant for secondary featured markets
  if (variant === 'compact') {
    return (
      <Link
        href={`/market/${market.slug}`}
        className="block bg-bg-surface rounded-lg border border-border overflow-hidden card-hover group"
      >
        {/* Image placeholder with market context overlay */}
        <div className="relative aspect-[16/9] bg-gradient-to-br from-blue-100 via-slate-100 to-purple-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex items-center gap-1">
            <span className="px-1.5 py-0.5 bg-brand-primary text-white text-[9px] font-bold uppercase rounded">
              {badge}
            </span>
            {isCrossListed && (
              <span className="px-1.5 py-0.5 bg-emerald-500 text-white text-[9px] font-bold uppercase rounded">
                Cross-Listed
              </span>
            )}
          </div>

          {/* Price overlay */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <div className="flex items-end justify-between">
              <div className="flex items-center gap-3">
                {kalshiListing && (
                  <div className="text-center">
                    <span className="text-[9px] text-blue-300 font-medium block">K</span>
                    <span className="text-lg font-bold text-white">{kalshiListing.yesProbability}%</span>
                  </div>
                )}
                {polyListing && (
                  <div className="text-center">
                    <span className="text-[9px] text-purple-300 font-medium block">P</span>
                    <span className="text-lg font-bold text-white">{polyListing.yesProbability}%</span>
                  </div>
                )}
              </div>
              <span className={cn(
                'text-sm font-bold',
                primaryChange >= 0 ? 'text-green-400' : 'text-red-400'
              )}>
                {primaryChange >= 0 ? '▲' : '▼'}{Math.abs(primaryChange).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="text-sm font-semibold text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2 mb-1">
            {market.title}
          </h3>
          {featuredStory && (
            <p className="text-xs text-text-muted line-clamp-2">
              {featuredStory.marketAngle}
            </p>
          )}
        </div>
      </Link>
    );
  }

  // Large variant - lead featured market (more news-like)
  return (
    <div className="bg-bg-surface rounded-lg border border-border overflow-hidden card-hover">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
        {/* Left: Image/Visual (2 cols) */}
        <div className="md:col-span-2 relative aspect-[4/3] md:aspect-auto bg-gradient-to-br from-blue-100 via-slate-100 to-purple-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2 py-0.5 bg-brand-primary text-white text-[10px] font-bold uppercase rounded">
              {badge}
            </span>
            {isCrossListed && (
              <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold uppercase rounded">
                Cross-Listed
              </span>
            )}
          </div>

          {/* Price pills overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
            {kalshiListing && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-white/90 backdrop-blur-sm rounded shadow-sm">
                <span className="w-4 h-4 rounded bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center">K</span>
                <span className="text-sm font-bold text-text-primary">{kalshiListing.yesProbability}%</span>
              </div>
            )}
            {polyListing && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-white/90 backdrop-blur-sm rounded shadow-sm">
                <span className="w-4 h-4 rounded bg-purple-500 text-white text-[9px] font-bold flex items-center justify-center">P</span>
                <span className="text-sm font-bold text-text-primary">{polyListing.yesProbability}%</span>
              </div>
            )}
            {isCrossListed && market.combined.divergence !== null && market.combined.divergence > 0 && (
              <div className="px-2 py-1 bg-amber-100 rounded text-amber-700 text-xs font-medium">
                Δ{market.combined.divergence}pts
              </div>
            )}
          </div>
        </div>

        {/* Right: Content (3 cols) */}
        <div className="md:col-span-3 p-4 flex flex-col">
          {/* Category + Meta */}
          <div className="flex items-center gap-2 text-[10px] text-text-muted mb-2">
            <span className="uppercase font-medium">{market.category}</span>
            <span>•</span>
            <span className={cn(
              'font-medium',
              primaryChange >= 0 ? 'text-market-up' : 'text-market-down'
            )}>
              {primaryChange >= 0 ? '▲' : '▼'} {Math.abs(primaryChange).toFixed(1)}% today
            </span>
            <span>•</span>
            <span>Vol: ${formatNumber(market.combined.combinedVolume)}</span>
          </div>

          {/* Market Question as Headline */}
          <Link href={`/market/${market.slug}`} className="group">
            <h2 className="text-lg md:text-xl font-bold text-text-primary group-hover:text-brand-primary transition-colors mb-2">
              {market.canonicalQuestion}
            </h2>
          </Link>

          {/* Market Angle / Context */}
          {featuredStory ? (
            <div className="flex-1">
              <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                {featuredStory.marketAngle}
              </p>
              <Link 
                href={`/story/${featuredStory.slug}`}
                className="inline-flex items-center gap-1 text-xs text-brand-primary hover:underline"
              >
                <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-[9px] font-medium">
                  {featuredStory.labels[0]}
                </span>
                Read full analysis →
              </Link>
            </div>
          ) : (
            <p className="text-sm text-text-muted flex-1">
              Markets price {kalshiListing?.yesProbability || polyListing?.yesProbability}% odds. 
              {market.nextCatalyst && ` Next catalyst: ${market.nextCatalyst.event}.`}
            </p>
          )}

          {/* Footer: Expiry + CTA */}
          <div className="flex items-center justify-between pt-3 mt-auto border-t border-border">
            <div className="flex items-center gap-3 text-xs text-text-muted">
              {market.expiryDate && (
                <span>Expires {new Date(market.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              )}
              {market.nextCatalyst && (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {new Date(market.nextCatalyst.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              )}
            </div>
            <Link 
              href={`/market/${market.slug}`}
              className="text-xs font-medium text-brand-primary hover:underline"
            >
              View market →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
