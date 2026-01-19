'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn, formatNumber } from '@/lib/utils';
import type { GlobalMarket } from '@/data/markets';

interface MarketListTableProps {
  markets: GlobalMarket[];
  title?: string;
  showHeader?: boolean;
}

export function MarketListTable({ markets, title, showHeader = true }: MarketListTableProps) {
  const [hoveredMarket, setHoveredMarket] = useState<string | null>(null);

  // Generate a market context/anecdote
  const getMarketContext = (market: GlobalMarket): string => {
    const kListing = market.listings.find(l => l.platform === 'kalshi');
    const pListing = market.listings.find(l => l.platform === 'polymarket');
    
    const contexts: string[] = [];
    
    // Cross-listed insight
    if (market.combined.platformCount >= 2 && market.combined.divergence) {
      if (kListing && pListing) {
        const higher = kListing.yesProbability! > pListing.yesProbability! ? 'Kalshi' : 'Polymarket';
        contexts.push(`${higher} traders are ${market.combined.divergence}pts more bullish on this outcome.`);
      }
    }
    
    // Volume insight
    if (market.combined.combinedVolume > 1000000) {
      contexts.push(`High-volume market with $${formatNumber(market.combined.combinedVolume)} in total trading activity.`);
    }
    
    // Catalyst insight
    if (market.nextCatalyst) {
      const catalystDate = new Date(market.nextCatalyst.date);
      const daysUntil = Math.ceil((catalystDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      if (daysUntil > 0 && daysUntil <= 7) {
        contexts.push(`Key catalyst in ${daysUntil} day${daysUntil > 1 ? 's' : ''}: ${market.nextCatalyst.event}.`);
      }
    }
    
    // Movement insight
    const maxChange = Math.max(...market.listings.map(l => Math.abs(l.change24h || 0)));
    if (maxChange >= 3) {
      contexts.push(`Significant 24h movement suggests active trader interest.`);
    }
    
    // Driver insight
    if (market.drivers.length > 0) {
      contexts.push(`Key drivers: ${market.drivers.slice(0, 2).join(', ')}.`);
    }
    
    return contexts.length > 0 
      ? contexts[0] 
      : `Markets are pricing ${market.listings[0]?.yesProbability || 50}% odds for this outcome.`;
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-white">
      {/* Header */}
      {showHeader && (
        <div className="flex items-center justify-between px-4 py-3 bg-bg-surface border-b border-border">
          <h3 className="text-sm font-bold text-text-primary">
            {title || 'All Markets'}
          </h3>
          <div className="flex items-center gap-4 text-[10px] text-text-muted font-medium uppercase tracking-wide">
            <span className="w-16 text-right">Yes</span>
            <span className="w-16 text-right">No</span>
            <span className="w-20 text-right">Volume</span>
          </div>
        </div>
      )}

      {/* Market rows */}
      <div className="divide-y divide-border">
        {markets.map((market) => {
          const kListing = market.listings.find(l => l.platform === 'kalshi');
          const pListing = market.listings.find(l => l.platform === 'polymarket');
          const primaryListing = kListing || pListing;
          const isHovered = hoveredMarket === market.id;

          return (
            <div
              key={market.id}
              className="relative group"
              onMouseEnter={() => setHoveredMarket(market.id)}
              onMouseLeave={() => setHoveredMarket(null)}
            >
              <Link
                href={`/market/${market.slug}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-bg-hover transition-colors"
              >
                {/* Market thumbnail */}
                <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {market.combined.platformCount >= 2 ? (
                    <div className="flex -space-x-1">
                      <span className="w-5 h-5 rounded bg-blue-500 text-white text-[8px] font-bold flex items-center justify-center">K</span>
                      <span className="w-5 h-5 rounded bg-purple-500 text-white text-[8px] font-bold flex items-center justify-center">P</span>
                    </div>
                  ) : (
                    <span className={cn(
                      'w-6 h-6 rounded text-white text-[10px] font-bold flex items-center justify-center',
                      kListing ? 'bg-blue-500' : 'bg-purple-500'
                    )}>
                      {kListing ? 'K' : 'P'}
                    </span>
                  )}
                </div>

                {/* Market question */}
                <div className="flex-1 min-w-0 pr-4">
                  <h4 className="text-sm font-medium text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2">
                    {market.canonicalQuestion}
                  </h4>
                  {/* Platform indicator row */}
                  <div className="flex items-center gap-2 mt-1">
                    {kListing && (
                      <span className="text-[9px] text-blue-600 font-medium">Kalshi</span>
                    )}
                    {kListing && pListing && (
                      <span className="text-[9px] text-text-subtle">·</span>
                    )}
                    {pListing && (
                      <span className="text-[9px] text-purple-600 font-medium">Polymarket</span>
                    )}
                    {market.combined.divergence && market.combined.divergence > 0 && (
                      <>
                        <span className="text-[9px] text-text-subtle">·</span>
                        <span className="text-[9px] text-amber-600 font-medium">Δ{market.combined.divergence}pts</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Pricing columns */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  {/* Yes price */}
                  <div className="w-16 text-right">
                    <span className="text-sm font-bold text-market-up">
                      {primaryListing?.yesProbability ? `${primaryListing.yesProbability}¢` : '—'}
                    </span>
                    {primaryListing?.change24h && primaryListing.change24h !== 0 && (
                      <div className={cn(
                        'text-[10px] font-medium',
                        primaryListing.change24h >= 0 ? 'text-market-up' : 'text-market-down'
                      )}>
                        {primaryListing.change24h >= 0 ? '+' : ''}{primaryListing.change24h.toFixed(1)}
                      </div>
                    )}
                  </div>

                  {/* No price */}
                  <div className="w-16 text-right">
                    <span className="text-sm font-bold text-market-down">
                      {primaryListing?.noProbability ? `${primaryListing.noProbability}¢` : '—'}
                    </span>
                  </div>

                  {/* Volume */}
                  <div className="w-20 text-right">
                    <span className="text-xs text-text-muted">
                      ${formatNumber(market.combined.combinedVolume)}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Hover tooltip */}
              {isHovered && (
                <div className="absolute z-50 left-16 top-full mt-1 w-80 p-3 bg-slate-900 text-white rounded-lg shadow-xl">
                  <div className="absolute -top-1.5 left-8 w-3 h-3 bg-slate-900 rotate-45" />
                  <p className="text-xs leading-relaxed">
                    {getMarketContext(market)}
                  </p>
                  {market.nextCatalyst && (
                    <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-slate-700">
                      <svg className="w-3 h-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-[10px] text-slate-300">
                        Next: {market.nextCatalyst.event} ({new Date(market.nextCatalyst.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {markets.length > 0 && (
        <div className="px-4 py-2 bg-bg-surface border-t border-border">
          <span className="text-[10px] text-text-muted">
            Showing {markets.length} market{markets.length !== 1 ? 's' : ''} · 
            Prices shown as probability (¢ = % chance)
          </span>
        </div>
      )}
    </div>
  );
}


