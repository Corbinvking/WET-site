'use client';

import Link from 'next/link';
import type { GlobalMarket, Platform } from '@/data/markets';
import { getPlatformCoverage, getPlatformListing } from '@/data/markets';
import type { Story } from '@/data/stories';
import { formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface DeskMarketCardProps {
  market: GlobalMarket;
  coverage?: Story[]; // Linked stories
  selectedPlatforms?: Platform[];
  variant?: 'default' | 'compact' | 'headline';
}

const coverageStyles: Record<string, { bg: string; text: string; label: string }> = {
  'cross-listed': { bg: 'bg-emerald-500', text: 'text-white', label: 'CROSS-LISTED' },
  'kalshi-only': { bg: 'bg-blue-500', text: 'text-white', label: 'KALSHI' },
  'polymarket-only': { bg: 'bg-purple-500', text: 'text-white', label: 'POLY' },
};

export function DeskMarketCard({
  market,
  coverage = [],
  selectedPlatforms = ['kalshi', 'polymarket'],
  variant = 'default',
}: DeskMarketCardProps) {
  const platformCoverage = getPlatformCoverage(market);
  const coverageStyle = coverageStyles[platformCoverage];
  const isCrossListed = platformCoverage === 'cross-listed';

  const kalshiListing = getPlatformListing(market, 'kalshi');
  const polyListing = getPlatformListing(market, 'polymarket');

  const primaryChange = kalshiListing?.change24h || polyListing?.change24h || 0;
  const primaryStory = coverage[0];

  // Headline variant - text-only list item
  if (variant === 'headline') {
    return (
      <Link
        href={`/market/${market.slug}`}
        className="block py-2 border-b border-border last:border-0 group"
      >
        <div className="flex items-start gap-2">
          <span className={cn(
            'flex-shrink-0 px-1 py-0.5 rounded text-[8px] font-bold uppercase',
            coverageStyle.bg,
            coverageStyle.text
          )}>
            {isCrossListed ? 'X' : platformCoverage === 'kalshi-only' ? 'K' : 'P'}
          </span>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-medium text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2">
              {market.title}
            </h4>
            <div className="flex items-center gap-2 mt-0.5 text-[10px] text-text-muted">
              <span className={cn(
                'font-medium',
                primaryChange >= 0 ? 'text-market-up' : 'text-market-down'
              )}>
                {primaryChange >= 0 ? '▲' : '▼'}{Math.abs(primaryChange).toFixed(1)}%
              </span>
              {isCrossListed && (
                <>
                  <span>K:{kalshiListing?.yesProbability}%</span>
                  <span>P:{polyListing?.yesProbability}%</span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default/Compact variants - news block style
  return (
    <div className="bg-bg-surface rounded-lg border border-border overflow-hidden card-hover group">
      {/* Image area with market overlay */}
      <div className="relative aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>

        {/* Status badge */}
        <div className="absolute top-2 left-2">
          <span className={cn(
            'px-1.5 py-0.5 rounded text-[9px] font-bold uppercase',
            coverageStyle.bg,
            coverageStyle.text
          )}>
            {coverageStyle.label}
          </span>
        </div>

        {/* Price pills - bottom overlay */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {kalshiListing && selectedPlatforms.includes('kalshi') && (
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/90 backdrop-blur-sm rounded text-xs">
                <span className="w-3.5 h-3.5 rounded bg-blue-500 text-white text-[8px] font-bold flex items-center justify-center">K</span>
                <span className="font-semibold text-text-primary">{kalshiListing.yesProbability}%</span>
              </div>
            )}
            {polyListing && selectedPlatforms.includes('polymarket') && (
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/90 backdrop-blur-sm rounded text-xs">
                <span className="w-3.5 h-3.5 rounded bg-purple-500 text-white text-[8px] font-bold flex items-center justify-center">P</span>
                <span className="font-semibold text-text-primary">{polyListing.yesProbability}%</span>
              </div>
            )}
          </div>

          {/* Change badge */}
          <div className={cn(
            'px-1.5 py-0.5 rounded text-[10px] font-bold',
            primaryChange >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          )}>
            {primaryChange >= 0 ? '▲' : '▼'}{Math.abs(primaryChange).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Category + Meta */}
        <div className="flex items-center gap-2 text-[10px] text-text-muted mb-1.5">
          <span className="uppercase font-medium">{market.category}</span>
          {market.expiryDate && (
            <>
              <span>•</span>
              <span>Exp {new Date(market.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </>
          )}
        </div>

        {/* Market Title as Headline */}
        <Link href={`/market/${market.slug}`}>
          <h3 className="text-sm font-semibold text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2 mb-2">
            {market.title}
          </h3>
        </Link>

        {/* Market Context / Anecdote */}
        {primaryStory ? (
          <p className="text-xs text-text-muted line-clamp-2 mb-2">
            <span className="font-medium text-text-secondary">Market angle:</span> {primaryStory.marketAngle}
          </p>
        ) : market.nextCatalyst ? (
          <p className="text-xs text-text-muted line-clamp-2 mb-2">
            <span className="font-medium text-text-secondary">Next catalyst:</span> {market.nextCatalyst.event} ({new Date(market.nextCatalyst.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
          </p>
        ) : (
          <p className="text-xs text-text-muted line-clamp-2 mb-2">
            Markets price {kalshiListing?.yesProbability || polyListing?.yesProbability}% probability. 
            Volume: ${formatNumber(market.combined.combinedVolume)}.
          </p>
        )}

        {/* Footer: Divergence + Quick Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            {isCrossListed && market.combined.divergence !== null && market.combined.divergence > 0 && (
              <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-medium">
                Δ{market.combined.divergence}pts
              </span>
            )}
            <span className="text-[10px] text-text-muted">
              ${formatNumber(market.combined.combinedVolume)} vol
            </span>
          </div>

          {primaryStory && (
            <Link 
              href={`/story/${primaryStory.slug}`}
              className="text-[10px] text-brand-primary hover:underline"
            >
              Read more →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
