import Link from 'next/link';
import type { Market } from '@/data/markets';

interface MarketsMovingModuleProps {
  title?: string;
  markets: Market[];
  viewAllLink?: string;
}

export function MarketsMovingModule({ 
  title = 'Top Movers', 
  markets, 
  viewAllLink = '/markets?filter=movers' 
}: MarketsMovingModuleProps) {
  return (
    <div className="bg-bg-surface rounded overflow-hidden border border-border">
      <div className="bg-bg-elevated px-3 py-2 flex items-center justify-between">
        <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wide">
          {title}
        </h3>
        <Link 
          href={viewAllLink}
          className="text-xs text-text-muted hover:text-text-primary transition-colors"
        >
          View all →
        </Link>
      </div>
      
      <div className="divide-y divide-border">
        {markets.map((market) => (
          <Link
            key={market.id}
            href={`/market/${market.slug}`}
            className="block px-3 py-2 hover:bg-bg-hover transition-colors group"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs text-text-secondary group-hover:text-text-primary line-clamp-2 flex-1">
                {market.title}
              </span>
              <span className={`text-xs font-semibold whitespace-nowrap ${
                market.change24h >= 0 ? 'text-market-up' : 'text-market-down'
              }`}>
                {market.change24h >= 0 ? '▲' : '▼'} {Math.abs(market.change24h).toFixed(1)}%
              </span>
            </div>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-text-muted">
              <span>K: {Math.round((market.platforms.kalshi?.yesPrice || 0) * 100)}%</span>
              <span>P: {Math.round((market.platforms.polymarket?.yesPrice || 0) * 100)}%</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
