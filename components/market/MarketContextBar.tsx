'use client';

import Link from 'next/link';
import type { Market } from '@/data/markets';
import { formatNumber } from '@/lib/utils';

interface MarketContextBarProps {
  market: Market;
  variant?: 'default' | 'compact' | 'overlay';
  onViewMarkets?: () => void;
}

export function MarketContextBar({ market, variant = 'default', onViewMarkets }: MarketContextBarProps) {
  const kalshiYes = market.platforms.kalshi?.yesPrice || 0;
  const polyYes = market.platforms.polymarket?.yesPrice || 0;
  const divergence = Math.abs(kalshiYes - polyYes) * 100;
  const totalVolume = market.totalVolume;

  // Volume meter (5 dots)
  const volumeLevel = 
    totalVolume > 10000000 ? 5 :
    totalVolume > 5000000 ? 4 :
    totalVolume > 2000000 ? 3 :
    totalVolume > 500000 ? 2 : 1;

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1.5 text-xs">
        <span className="px-1 py-0.5 bg-bg-elevated rounded text-text-muted">
          K: {Math.round(kalshiYes * 100)}%
        </span>
        <span className="px-1 py-0.5 bg-bg-elevated rounded text-text-muted">
          P: {Math.round(polyYes * 100)}%
        </span>
        <span className={`font-medium ${market.change24h >= 0 ? 'text-market-up' : 'text-market-down'}`}>
          {market.change24h >= 0 ? '▲' : '▼'} {Math.abs(market.change24h).toFixed(1)}%
        </span>
      </div>
    );
  }

  if (variant === 'overlay') {
    return (
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/20">
        <span className="text-xs text-gray-400 font-medium truncate max-w-[150px]">
          {market.title}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 bg-white/10 rounded text-xs text-white">
            K: {Math.round(kalshiYes * 100)}%
          </span>
          <span className="px-1.5 py-0.5 bg-white/10 rounded text-xs text-white">
            P: {Math.round(polyYes * 100)}%
          </span>
          <span className={`text-xs font-medium ${market.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {market.change24h >= 0 ? '▲' : '▼'} {Math.abs(market.change24h).toFixed(1)}%
          </span>
        </div>
        {onViewMarkets && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onViewMarkets();
            }}
            className="ml-auto text-xs text-white/70 hover:text-white flex items-center gap-0.5"
          >
            View markets
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-2.5 bg-bg-surface rounded border border-border">
      {/* Market Title */}
      <Link 
        href={`/market/${market.slug}`}
        className="text-xs font-medium text-text-primary hover:underline truncate max-w-[200px]"
      >
        {market.title}
      </Link>

      {/* Divider */}
      <span className="hidden sm:block w-px h-3 bg-border" />

      {/* Platform Odds */}
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-1">
          <span className="text-xs text-text-muted">Kalshi</span>
          <span className="px-1.5 py-0.5 bg-bg-elevated rounded text-xs font-medium text-text-primary">
            {Math.round(kalshiYes * 100)}%
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-text-muted">Poly</span>
          <span className="px-1.5 py-0.5 bg-bg-elevated rounded text-xs font-medium text-text-primary">
            {Math.round(polyYes * 100)}%
          </span>
        </div>
      </div>

      {/* Divergence (if significant) */}
      {divergence >= 3 && (
        <span className="px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 rounded text-xs font-medium">
          {divergence.toFixed(0)}pt spread
        </span>
      )}

      {/* 24h Change */}
      <span className={`text-xs font-medium ${market.change24h >= 0 ? 'text-market-up' : 'text-market-down'}`}>
        {market.change24h >= 0 ? '▲' : '▼'} {Math.abs(market.change24h).toFixed(1)}%
      </span>

      {/* Volume Meter */}
      <div className="flex items-center gap-0.5" title={`Volume: $${formatNumber(totalVolume)}`}>
        {[1, 2, 3, 4, 5].map((level) => (
          <span
            key={level}
            className={`w-1 h-1 rounded-full ${
              level <= volumeLevel ? 'bg-market-neutral' : 'bg-bg-hover'
            }`}
          />
        ))}
      </div>

      {/* View Markets Button */}
      {onViewMarkets && (
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onViewMarkets();
          }}
          className="ml-auto text-xs text-text-muted hover:text-text-primary flex items-center gap-0.5 transition-colors"
        >
          View markets
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
