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
  maxCoverage?: number;
}

const platformBadgeStyles: Record<Platform, { bg: string; text: string; border: string }> = {
  kalshi: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  polymarket: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
};

const coverageStyles: Record<string, { bg: string; text: string; label: string }> = {
  'cross-listed': { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'CROSS-LISTED' },
  'kalshi-only': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'KALSHI ONLY' },
  'polymarket-only': { bg: 'bg-purple-100', text: 'text-purple-700', label: 'POLY ONLY' },
};

const labelStyles: Record<string, { bg: string; text: string }> = {
  News: { bg: 'bg-slate-100', text: 'text-slate-600' },
  Analysis: { bg: 'bg-amber-100', text: 'text-amber-700' },
  Explainer: { bg: 'bg-blue-100', text: 'text-blue-700' },
  Breaking: { bg: 'bg-red-100', text: 'text-red-700' },
  'Live Updates': { bg: 'bg-red-100', text: 'text-red-700' },
};

export function DeskMarketCard({
  market,
  coverage = [],
  selectedPlatforms = ['kalshi', 'polymarket'],
  maxCoverage = 2,
}: DeskMarketCardProps) {
  const platformCoverage = getPlatformCoverage(market);
  const coverageStyle = coverageStyles[platformCoverage];
  const isCrossListed = platformCoverage === 'cross-listed';

  const kalshiListing = getPlatformListing(market, 'kalshi');
  const polyListing = getPlatformListing(market, 'polymarket');

  const showKalshi = selectedPlatforms.includes('kalshi') && kalshiListing;
  const showPoly = selectedPlatforms.includes('polymarket') && polyListing;

  const primaryChange = kalshiListing?.change24h || polyListing?.change24h || 0;
  const displayCoverage = coverage.slice(0, maxCoverage);

  // Format relative time
  const formatRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-bg-surface rounded-lg border border-border card-hover transition-all overflow-hidden">
      {/* Main Market Link */}
      <Link
        href={`/market/${market.slug}`}
        className="block p-4 group"
      >
        {/* Header: Coverage/Presence Row */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 min-w-0">
            {/* Category */}
            <span className="px-1.5 py-0.5 bg-bg-elevated rounded text-[10px] text-text-muted uppercase tracking-wide flex-shrink-0">
              {market.category}
            </span>
            
            {/* Status Badge */}
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

        {/* Market Question */}
        <h3 className="text-sm font-semibold text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2 mb-3">
          {market.canonicalQuestion}
        </h3>

        {/* Pricing Row - Side by side bars */}
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
                  <p className="text-[10px] text-text-muted mt-1.5 italic">Not listed on Polymarket</p>
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
                  <p className="text-[10px] text-text-muted mt-1.5 italic">Not listed on Kalshi</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Meta Row */}
        <div className="flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-2">
            {/* 24h Change */}
            <span className={cn(
              'font-medium',
              primaryChange >= 0 ? 'text-market-up' : 'text-market-down'
            )}>
              {primaryChange >= 0 ? '▲' : '▼'} {Math.abs(primaryChange).toFixed(1)}%
            </span>
            
            {/* Volume */}
            <span className="text-text-muted">
              Vol: ${formatNumber(market.combined.combinedVolume)}
            </span>

            {/* Divergence */}
            {isCrossListed && market.combined.divergence !== null && market.combined.divergence > 0 && (
              <span className="text-amber-600 font-medium">
                Δ{market.combined.divergence}pts
              </span>
            )}
          </div>

          {/* Expiry */}
          {market.expiryDate && (
            <span className="text-text-muted">
              {new Date(market.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>

        {/* Next Catalyst */}
        {market.nextCatalyst && (
          <div className="mt-2 pt-2 border-t border-border">
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-brand-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-[10px] text-text-muted truncate">
                <span className="font-medium">
                  {new Date(market.nextCatalyst.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}:
                </span>{' '}
                {market.nextCatalyst.event}
              </span>
            </div>
          </div>
        )}
      </Link>

      {/* Attached Coverage Section */}
      {displayCoverage.length > 0 && (
        <div className="border-t border-border bg-bg-elevated/50">
          <div className="px-4 py-2">
            <div className="flex items-center gap-1.5 mb-2">
              <svg className="w-3 h-3 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
              </svg>
              <span className="text-[9px] font-bold text-text-muted uppercase tracking-wide">Coverage</span>
            </div>

            <div className="space-y-2">
              {displayCoverage.map((story) => {
                const labelStyle = labelStyles[story.labels[0]] || labelStyles.News;
                return (
                  <Link
                    key={story.id}
                    href={`/story/${story.slug}`}
                    className="block group/story"
                  >
                    <div className="flex items-start gap-2">
                      <span className={cn(
                        'flex-shrink-0 px-1.5 py-0.5 rounded text-[9px] font-medium',
                        labelStyle.bg,
                        labelStyle.text
                      )}>
                        {story.labels[0]}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs text-text-primary group-hover/story:text-brand-primary transition-colors line-clamp-1">
                          {story.title}
                        </h4>
                        <span className="text-[10px] text-text-muted">
                          {formatRelativeTime(story.publishedAt)}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {coverage.length > maxCoverage && (
              <Link
                href={`/market/${market.slug}#coverage`}
                className="block mt-2 text-[10px] text-brand-primary hover:underline"
              >
                + {coverage.length - maxCoverage} more coverage
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

