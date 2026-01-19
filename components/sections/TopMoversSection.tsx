import Link from 'next/link';
import { SectionBlock, ThreeColumnLayout } from './SectionBlock';
import { ListLinkRow } from '@/components/editorial';
import { markets, getTopMovers, getHighestVolume } from '@/data/markets';
import { formatNumber } from '@/lib/utils';

export function TopMoversSection() {
  const topMovers = getTopMovers(6);
  const highestVolume = getHighestVolume(6);
  
  // Calculate divergence (difference between Kalshi and Polymarket prices)
  const divergence = markets
    .filter(m => m.platforms.kalshi && m.platforms.polymarket)
    .map(m => ({
      ...m,
      divergence: Math.abs(
        (m.platforms.kalshi?.yesPrice || 0) - (m.platforms.polymarket?.yesPrice || 0)
      ) * 100
    }))
    .sort((a, b) => b.divergence - a.divergence)
    .slice(0, 6);

  return (
    <SectionBlock
      title="Top Movers Today"
      seeAllHref="/markets"
      layout="threeCol"
    >
      <ThreeColumnLayout
        columns={[
          {
            title: '🔥 Biggest Movers',
            leadContent: topMovers[0] && (
              <Link href={`/market/${topMovers[0].slug}`} className="block group">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg overflow-hidden mb-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-3xl font-bold ${topMovers[0].change24h >= 0 ? 'text-market-up' : 'text-market-down'}`}>
                      {topMovers[0].change24h >= 0 ? '▲' : '▼'}{Math.abs(topMovers[0].change24h).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2">
                  {topMovers[0].title}
                </h4>
              </Link>
            ),
            listContent: (
              <>
                {topMovers.slice(1).map((market) => (
                  <ListLinkRow
                    key={market.id}
                    title={market.title}
                    href={`/market/${market.slug}`}
                    delta={market.change24h}
                  />
                ))}
              </>
            ),
          },
          {
            title: '📊 Biggest Divergence',
            leadContent: divergence[0] && (
              <Link href={`/market/${divergence[0].slug}`} className="block group">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg overflow-hidden mb-2 p-3">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-text-muted">K</span>
                      <span className="text-lg font-bold text-brand-primary">
                        {Math.round((divergence[0].platforms.kalshi?.yesPrice || 0) * 100)}%
                      </span>
                    </div>
                    <span className="text-xs text-text-muted">vs</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-text-muted">P</span>
                      <span className="text-lg font-bold text-brand-primary">
                        {Math.round((divergence[0].platforms.polymarket?.yesPrice || 0) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2">
                  {divergence[0].title}
                </h4>
              </Link>
            ),
            listContent: (
              <>
                {divergence.slice(1).map((market) => (
                  <Link
                    key={market.id}
                    href={`/market/${market.slug}`}
                    className="block py-2.5 group hover:bg-bg-hover/50 -mx-2 px-2 rounded transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm text-text-primary group-hover:text-brand-primary transition-colors line-clamp-1">
                        {market.title}
                      </span>
                      <span className="text-xs text-amber-600 font-semibold whitespace-nowrap">
                        Δ{market.divergence.toFixed(0)}%
                      </span>
                    </div>
                  </Link>
                ))}
              </>
            ),
          },
          {
            title: '💰 Highest Volume',
            leadContent: highestVolume[0] && (
              <Link href={`/market/${highestVolume[0].slug}`} className="block group">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden mb-2">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-brand-primary">
                      ${formatNumber(highestVolume[0].totalVolume)}
                    </span>
                    <span className="text-xs text-text-muted">24h Volume</span>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2">
                  {highestVolume[0].title}
                </h4>
              </Link>
            ),
            listContent: (
              <>
                {highestVolume.slice(1).map((market) => (
                  <Link
                    key={market.id}
                    href={`/market/${market.slug}`}
                    className="block py-2.5 group hover:bg-bg-hover/50 -mx-2 px-2 rounded transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm text-text-primary group-hover:text-brand-primary transition-colors line-clamp-1">
                        {market.title}
                      </span>
                      <span className="text-xs text-text-muted whitespace-nowrap">
                        ${formatNumber(market.totalVolume)}
                      </span>
                    </div>
                  </Link>
                ))}
              </>
            ),
          },
        ]}
      />
    </SectionBlock>
  );
}

