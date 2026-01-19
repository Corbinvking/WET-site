import Link from 'next/link';
import { SectionBlock } from './SectionBlock';
import { markets } from '@/data/markets';

export function MarketsPreview() {
  const previewMarkets = markets.slice(0, 8);

  return (
    <SectionBlock
      title="Markets Directory"
      subtitle="Browse all prediction markets"
      seeAllHref="/markets"
      seeAllLabel="View All Markets"
      layout="marketsGrid"
    >
      {previewMarkets.map((market) => (
        <Link
          key={market.id}
          href={`/market/${market.slug}`}
          className="card-hover block p-3 bg-bg-surface rounded-lg group"
        >
          {/* Category */}
          <span className="text-[10px] font-medium text-brand-primary uppercase tracking-wide">
            {market.category}
          </span>
          
          {/* Title */}
          <h4 className="text-xs font-medium text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2 mt-1 mb-2">
            {market.title}
          </h4>
          
          {/* Prices */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {market.platforms.kalshi && (
                <span className="text-[10px] font-semibold text-text-muted">
                  K: {Math.round(market.platforms.kalshi.yesPrice * 100)}%
                </span>
              )}
              {market.platforms.polymarket && (
                <span className="text-[10px] font-semibold text-text-muted">
                  P: {Math.round(market.platforms.polymarket.yesPrice * 100)}%
                </span>
              )}
            </div>
            
            {/* Delta */}
            <span className={`text-[10px] font-bold ${
              market.change24h >= 0 ? 'text-market-up' : 'text-market-down'
            }`}>
              {market.change24h >= 0 ? '▲' : '▼'}{Math.abs(market.change24h).toFixed(1)}%
            </span>
          </div>
        </Link>
      ))}
    </SectionBlock>
  );
}


