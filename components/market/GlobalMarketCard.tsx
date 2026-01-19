'use client';

import Link from 'next/link';
import type { GlobalMarket, Platform } from '@/data/markets';
import { getPlatformCoverage, getPlatformListing } from '@/data/markets';
import { formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface GlobalMarketCardProps {
  market: GlobalMarket;
  showVolume?: boolean;
  showCatalyst?: boolean;
  selectedPlatforms?: Platform[];
}

const platformBadgeStyles: Record<Platform, { bg: string; text: string; border: string }> = {
  kalshi: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  polymarket: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
};

const coverageStyles: Record<string, { bg: string; text: string; label: string }> = {
  'cross-listed': { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'CROSS-LISTED' },
  'kalshi-only': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'KALSHI ONLY' },
  'polymarket-only': { bg: 'bg-purple-100', text: 'text-purple-700', label: 'POLYMARKET ONLY' },
};

export function GlobalMarketCard({
  market,
  showVolume = true,
  showCatalyst = true,
  selectedPlatforms = ['kalshi', 'polymarket'],
}: GlobalMarketCardProps) {
  const coverage = getPlatformCoverage(market);
  const coverageStyle = coverageStyles[coverage];
  const isCrossListed = coverage === 'cross-listed';

  const kalshiListing = getPlatformListing(market, 'kalshi');
  const polyListing = getPlatformListing(market, 'polymarket');

  // Determine which platforms to show based on selection and availability
  const showKalshi = selectedPlatforms.includes('kalshi') && kalshiListing;
  const showPoly = selectedPlatforms.includes('polymarket') && polyListing;

  // Get the primary change value
  const primaryChange = kalshiListing?.change24h || polyListing?.change24h || 0;

  return (
    <Link
      href={`/market/${market.slug}`}
      className="block p-3 bg-bg-surface rounded-lg border border-border card-hover transition-all group"
    >
      {/* Header: Category + Status + Platform Badges */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {/* Category Tag */}
          <span className="px-1.5 py-0.5 bg-bg-elevated rounded text-[10px] text-text-muted uppercase tracking-wide flex-shrink-0">
            {market.category}
          </span>
          
          {/* Coverage Status Badge */}
          <span className={cn(
            'px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide flex-shrink-0',
            coverageStyle.bg,
            coverageStyle.text
          )}>
            {coverageStyle.label}
          </span>
        </div>

        {/* Platform Badges */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          {kalshiListing && (
            <span className={cn(
              'w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold border',
              selectedPlatforms.includes('kalshi')
                ? `${platformBadgeStyles.kalshi.bg} ${platformBadgeStyles.kalshi.text} ${platformBadgeStyles.kalshi.border}`
                : 'bg-bg-surface text-text-subtle border-border'
            )}>
              K
            </span>
          )}
          {polyListing && (
            <span className={cn(
              'w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold border',
              selectedPlatforms.includes('polymarket')
                ? `${platformBadgeStyles.polymarket.bg} ${platformBadgeStyles.polymarket.text} ${platformBadgeStyles.polymarket.border}`
                : 'bg-bg-surface text-text-subtle border-border'
            )}>
              P
            </span>
          )}
        </div>
      </div>

      {/* Market Title */}
      <h4 className="text-sm font-semibold text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2 mb-3">
        {market.canonicalQuestion}
      </h4>

      {/* Platform Comparison Panel */}
      {isCrossListed && showKalshi && showPoly ? (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {/* Kalshi */}
          <div className="p-2 bg-bg-elevated rounded border border-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-medium text-blue-600">Kalshi</span>
              <span className="text-sm font-bold text-text-primary">
                {kalshiListing?.yesProbability ?? '—'}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-bg-hover rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${kalshiListing?.yesProbability ?? 0}%` }}
              />
            </div>
          </div>

          {/* Polymarket */}
          <div className="p-2 bg-bg-elevated rounded border border-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-medium text-purple-600">Polymarket</span>
              <span className="text-sm font-bold text-text-primary">
                {polyListing?.yesProbability ?? '—'}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-bg-hover rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full transition-all"
                style={{ width: `${polyListing?.yesProbability ?? 0}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Single Platform View */
        <div className="mb-3">
          {showKalshi && kalshiListing && (
            <div className="p-2 bg-bg-elevated rounded border border-border">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-medium text-blue-600">Kalshi</span>
                <span className="text-sm font-bold text-text-primary">
                  {kalshiListing.yesProbability ?? '—'}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-bg-hover rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${kalshiListing.yesProbability ?? 0}%` }}
                />
              </div>
              {!polyListing && (
                <p className="text-[10px] text-text-muted mt-1.5 italic">
                  Not listed on Polymarket
                </p>
              )}
            </div>
          )}
          {showPoly && polyListing && !showKalshi && (
            <div className="p-2 bg-bg-elevated rounded border border-border">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-medium text-purple-600">Polymarket</span>
                <span className="text-sm font-bold text-text-primary">
                  {polyListing.yesProbability ?? '—'}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-bg-hover rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full transition-all"
                  style={{ width: `${polyListing.yesProbability ?? 0}%` }}
                />
              </div>
              {!kalshiListing && (
                <p className="text-[10px] text-text-muted mt-1.5 italic">
                  Not listed on Kalshi
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Divergence Badge (for cross-listed) */}
      {isCrossListed && market.combined.divergence !== null && market.combined.divergence > 0 && (
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-medium">
            <span>Δ</span>
            <span>{market.combined.divergence} pts</span>
          </span>
        </div>
      )}

      {/* Meta Row */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center gap-2 text-[10px]">
          {/* 24h Change */}
          <span className={cn(
            'font-medium',
            primaryChange >= 0 ? 'text-market-up' : 'text-market-down'
          )}>
            {primaryChange >= 0 ? '▲' : '▼'} {Math.abs(primaryChange).toFixed(1)}%
          </span>
          
          {/* Volume */}
          {showVolume && (
            <span className="text-text-muted">
              Vol: ${formatNumber(market.combined.combinedVolume)}
            </span>
          )}
        </div>

        {/* Expiry Date */}
        {market.expiryDate && (
          <span className="text-[10px] text-text-muted">
            {new Date(market.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        )}
      </div>

      {/* Catalyst Preview */}
      {showCatalyst && market.nextCatalyst && (
        <div className="mt-2 pt-2 border-t border-border">
          <div className="flex items-center gap-1 mb-0.5">
            <svg className="w-3 h-3 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-[9px] font-medium text-text-muted uppercase tracking-wide">Next Catalyst</span>
          </div>
          <p className="text-[11px] text-text-secondary line-clamp-1">
            <span className="text-text-muted">
              {new Date(market.nextCatalyst.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}:
            </span>{' '}
            {market.nextCatalyst.event}
          </p>
        </div>
      )}
    </Link>
  );
}

