import Link from 'next/link';
import type { Market } from '@/data/markets';

interface DivergenceModuleProps {
  markets: Market[];
  viewAllLink?: string;
}

export function DivergenceModule({ 
  markets, 
  viewAllLink = '/markets?filter=divergence' 
}: DivergenceModuleProps) {
  // Calculate divergence for each market
  const marketsWithDivergence = markets
    .filter(m => m.platforms.kalshi && m.platforms.polymarket)
    .map(m => ({
      ...m,
      divergence: Math.abs(
        (m.platforms.kalshi?.yesPrice || 0) - (m.platforms.polymarket?.yesPrice || 0)
      ) * 100,
    }))
    .sort((a, b) => b.divergence - a.divergence)
    .slice(0, 5);

  return (
    <div className="bg-bg-surface rounded overflow-hidden border border-border">
      <div className="bg-bg-elevated px-3 py-2 flex items-center justify-between">
        <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wide">
          Biggest Divergence
        </h3>
        <Link 
          href={viewAllLink}
          className="text-xs text-text-muted hover:text-text-primary transition-colors"
        >
          View all →
        </Link>
      </div>
      
      <div className="divide-y divide-border">
        {marketsWithDivergence.map((market) => (
          <Link
            key={market.id}
            href={`/market/${market.slug}`}
            className="block px-3 py-2 hover:bg-bg-hover transition-colors group"
          >
            <div className="flex items-start justify-between gap-2 mb-0.5">
              <span className="text-xs text-text-secondary group-hover:text-text-primary line-clamp-2 flex-1">
                {market.title}
              </span>
              <span className="px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded whitespace-nowrap">
                {market.divergence.toFixed(0)}pt
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-text-muted">
                Kalshi: <span className="text-text-secondary">{Math.round((market.platforms.kalshi?.yesPrice || 0) * 100)}%</span>
              </span>
              <span className="text-text-muted">
                Poly: <span className="text-text-secondary">{Math.round((market.platforms.polymarket?.yesPrice || 0) * 100)}%</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
