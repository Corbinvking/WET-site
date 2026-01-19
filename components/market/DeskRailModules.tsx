'use client';

import Link from 'next/link';
import type { GlobalMarket } from '@/data/markets';
import { formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

// ============================================
// Desk-Scoped Top Movers
// ============================================

interface DeskTopMoversProps {
  markets: GlobalMarket[];
  deskSlug: string;
  limit?: number;
}

export function DeskTopMovers({ markets, deskSlug, limit = 5 }: DeskTopMoversProps) {
  const topMovers = [...markets]
    .sort((a, b) => {
      const aChange = Math.max(...a.listings.map(l => Math.abs(l.change24h || 0)));
      const bChange = Math.max(...b.listings.map(l => Math.abs(l.change24h || 0)));
      return bChange - aChange;
    })
    .slice(0, limit);

  if (topMovers.length === 0) return null;

  return (
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
                <span className={cn(
                  'text-xs font-bold whitespace-nowrap',
                  change >= 0 ? 'text-market-up' : 'text-market-down'
                )}>
                  {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(1)}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="px-4 py-2 border-t border-border">
        <Link
          href={`/markets?category=${deskSlug}&sort=change-24h`}
          className="text-[10px] text-brand-primary hover:underline"
        >
          View all movers →
        </Link>
      </div>
    </div>
  );
}

// ============================================
// Desk-Scoped Divergence
// ============================================

interface DeskDivergenceProps {
  markets: GlobalMarket[];
  deskSlug: string;
  limit?: number;
}

export function DeskDivergence({ markets, deskSlug, limit = 5 }: DeskDivergenceProps) {
  const divergentMarkets = markets
    .filter(m => m.combined.platformCount >= 2 && m.combined.divergence !== null)
    .sort((a, b) => (b.combined.divergence || 0) - (a.combined.divergence || 0))
    .slice(0, limit);

  if (divergentMarkets.length === 0) return null;

  return (
    <div className="bg-bg-surface rounded-lg border border-border overflow-hidden">
      <div className="bg-amber-50 px-4 py-2.5 border-b border-amber-100">
        <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1.5">
          <span>📊</span> Biggest Divergence
        </h3>
        <p className="text-[10px] text-amber-600 mt-0.5">Cross-listed price gaps</p>
      </div>
      <div className="divide-y divide-border">
        {divergentMarkets.map((market) => {
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
      <div className="px-4 py-2 border-t border-border">
        <Link
          href={`/markets?category=${deskSlug}&sort=divergence`}
          className="text-[10px] text-brand-primary hover:underline"
        >
          View all divergence →
        </Link>
      </div>
    </div>
  );
}

// ============================================
// Desk-Scoped Highest Volume
// ============================================

interface DeskVolumeProps {
  markets: GlobalMarket[];
  deskSlug: string;
  limit?: number;
}

export function DeskVolume({ markets, deskSlug, limit = 5 }: DeskVolumeProps) {
  const highVolume = [...markets]
    .sort((a, b) => b.combined.combinedVolume - a.combined.combinedVolume)
    .slice(0, limit);

  if (highVolume.length === 0) return null;

  return (
    <div className="bg-bg-surface rounded-lg border border-border overflow-hidden">
      <div className="bg-blue-50 px-4 py-2.5 border-b border-blue-100">
        <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wide flex items-center gap-1.5">
          <span>💰</span> Highest Volume
        </h3>
      </div>
      <div className="divide-y divide-border">
        {highVolume.map((market) => (
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
      <div className="px-4 py-2 border-t border-border">
        <Link
          href={`/markets?category=${deskSlug}&sort=volume-combined`}
          className="text-[10px] text-brand-primary hover:underline"
        >
          View all by volume →
        </Link>
      </div>
    </div>
  );
}

// ============================================
// Desk Go Deeper Card
// ============================================

interface DeskGoDeeperwProps {
  deskSlug: string;
  deskName: string;
  explainerTitle?: string;
}

export function DeskGoDeeper({ deskSlug, deskName, explainerTitle }: DeskGoDeeperwProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg p-4 border border-blue-100">
      <h3 className="text-xs font-bold text-text-primary uppercase tracking-wide mb-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Go Deeper
      </h3>
      <Link href={`/explainers/${deskSlug}`} className="block group">
        <div className="relative aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200 rounded overflow-hidden mb-2">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-slate-400">Explainer</span>
          </div>
        </div>
        <h4 className="text-sm font-medium text-text-primary group-hover:text-brand-primary transition-colors">
          {explainerTitle || `How to Read ${deskName} Markets`}
        </h4>
        <p className="text-xs text-text-muted mt-1">
          A beginner&apos;s guide to understanding prediction markets in {deskName.toLowerCase()}.
        </p>
      </Link>
    </div>
  );
}

// ============================================
// Desk Newsletter CTA
// ============================================

interface DeskNewsletterCTAProps {
  deskName: string;
}

export function DeskNewsletterCTA({ deskName }: DeskNewsletterCTAProps) {
  return (
    <div className="p-4 bg-bg-surface rounded-lg border border-border">
      <h3 className="text-xs font-bold text-text-primary uppercase tracking-wide mb-2">
        {deskName} Daily Brief
      </h3>
      <p className="text-[11px] text-text-muted mb-3">
        Get {deskName.toLowerCase()} market insights delivered to your inbox.
      </p>
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full px-3 py-2 bg-white border border-border rounded text-xs mb-2 focus:outline-none focus:border-brand-primary"
      />
      <button className="w-full btn-primary py-2 rounded text-xs font-semibold">
        Subscribe Free
      </button>
    </div>
  );
}


