'use client';

import Link from 'next/link';
import type { Market } from '@/data/markets';
import { formatNumber } from '@/lib/utils';

interface MarketCardProps {
  market: Market;
  showVolume?: boolean;
  showCatalysts?: boolean;
}

export function MarketCard({ market, showVolume = false, showCatalysts = false }: MarketCardProps) {
  const kalshiYes = market.platforms.kalshi?.yesPrice || 0;
  const polyYes = market.platforms.polymarket?.yesPrice || 0;
  const divergence = Math.abs(kalshiYes - polyYes) * 100;

  return (
    <Link
      href={`/market/${market.slug}`}
      className="block p-3 bg-bg-surface rounded border border-border hover:border-border-hover hover:bg-bg-hover transition-colors group"
    >
      {/* Category Badge */}
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="px-1.5 py-0.5 bg-bg-elevated rounded text-[10px] text-text-muted uppercase tracking-wide">
          {market.category}
        </span>
        {divergence >= 3 && (
          <span className="px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 rounded text-[10px] font-medium">
            {divergence.toFixed(0)}pt spread
          </span>
        )}
      </div>

      {/* Market Title */}
      <h4 className="text-xs font-semibold text-text-primary group-hover:text-brand transition-colors line-clamp-2 mb-2">
        {market.title}
      </h4>

      {/* Platform Odds Grid */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="p-1.5 bg-bg-elevated rounded">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] text-text-muted">Kalshi</span>
            <span className="text-xs font-semibold text-text-primary">
              {Math.round(kalshiYes * 100)}%
            </span>
          </div>
          <div className="w-full h-1 bg-bg-hover rounded-full overflow-hidden">
            <div
              className="h-full bg-market-neutral rounded-full"
              style={{ width: `${kalshiYes * 100}%` }}
            />
          </div>
        </div>
        <div className="p-1.5 bg-bg-elevated rounded">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] text-text-muted">Polymarket</span>
            <span className="text-xs font-semibold text-text-primary">
              {Math.round(polyYes * 100)}%
            </span>
          </div>
          <div className="w-full h-1 bg-bg-hover rounded-full overflow-hidden">
            <div
              className="h-full bg-market-neutral rounded-full"
              style={{ width: `${polyYes * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium ${market.change24h >= 0 ? 'text-market-up' : 'text-market-down'}`}>
            {market.change24h >= 0 ? '▲' : '▼'} {Math.abs(market.change24h).toFixed(1)}%
          </span>
          {showVolume && (
            <span className="text-[10px] text-text-muted">
              Vol: ${formatNumber(market.totalVolume)}
            </span>
          )}
        </div>
        <span className="text-[10px] text-text-muted">
          {market.expirationDate}
        </span>
      </div>

      {/* Catalysts Preview */}
      {showCatalysts && market.catalysts && market.catalysts.length > 0 && (
        <div className="mt-2 pt-2 border-t border-border">
          <div className="flex items-center gap-1 mb-1">
            <svg className="w-3 h-3 text-market-neutral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-[10px] font-medium text-text-muted uppercase tracking-wide">Next catalyst</span>
          </div>
          <p className="text-[11px] text-text-secondary line-clamp-1">
            <span className="text-text-muted">{market.catalysts[0].date}:</span> {market.catalysts[0].event}
          </p>
        </div>
      )}
    </Link>
  );
}
