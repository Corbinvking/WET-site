'use client';

import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { Market } from '@/data/markets';
import { formatNumber } from '@/lib/utils';

interface MarketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  markets: Market[];
  title?: string;
}

export function MarketDrawer({ isOpen, onClose, markets, title = 'Related Markets' }: MarketDrawerProps) {
  // Handle escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] lg:w-[480px] bg-bg-primary border-l border-border z-50 animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border bg-bg-secondary">
          <h2 className="text-lg font-semibold text-text-primary">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-text-muted hover:text-text-primary transition-colors"
            aria-label="Close drawer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {markets.length === 0 ? (
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-text-subtle mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-text-muted">No related markets</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {markets.map((market) => {
                const kalshiYes = market.platforms.kalshi?.yesPrice || 0;
                const polyYes = market.platforms.polymarket?.yesPrice || 0;
                const divergence = Math.abs(kalshiYes - polyYes) * 100;

                return (
                  <Link
                    key={market.id}
                    href={`/market/${market.slug}`}
                    onClick={onClose}
                    className="block p-4 hover:bg-bg-hover transition-colors"
                  >
                    {/* Market Title */}
                    <h3 className="text-sm font-medium text-text-primary mb-2 line-clamp-2">
                      {market.question}
                    </h3>

                    {/* Platform Comparison Row */}
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-text-muted">Kalshi</span>
                        <span className="px-2 py-0.5 bg-bg-elevated rounded text-sm font-medium text-text-primary">
                          {Math.round(kalshiYes * 100)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-text-muted">Poly</span>
                        <span className="px-2 py-0.5 bg-bg-elevated rounded text-sm font-medium text-text-primary">
                          {Math.round(polyYes * 100)}%
                        </span>
                      </div>
                      {divergence >= 3 && (
                        <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded">
                          {divergence.toFixed(0)}pt
                        </span>
                      )}
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span className={`font-medium ${market.change24h >= 0 ? 'text-market-up' : 'text-market-down'}`}>
                        {market.change24h >= 0 ? '▲' : '▼'} {Math.abs(market.change24h).toFixed(1)}%
                      </span>
                      <span>Vol: ${formatNumber(market.totalVolume)}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-bg-secondary">
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-bg-surface hover:bg-bg-hover border border-border text-text-secondary text-sm font-medium rounded transition-colors">
              Add to Watchlist
            </button>
            <Link
              href="/markets"
              onClick={onClose}
              className="flex-1 py-2 bg-brand hover:bg-brand-hover text-white text-sm font-medium rounded text-center transition-colors"
            >
              Browse All Markets
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}



