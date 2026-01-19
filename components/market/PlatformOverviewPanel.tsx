import { formatNumber } from '@/lib/utils';
import type { Platform } from '@/data/markets';

interface MarketStats {
  totalMarkets: number;
  crossListedCount: number;
  kalshiOnlyCount: number;
  polymarketOnlyCount: number;
  totalVolume: number;
  totalLiquidity: number;
  avgDivergence: number;
}

interface PlatformOverviewPanelProps {
  stats: MarketStats;
  selectedPlatforms?: Platform[];
}

export function PlatformOverviewPanel({
  stats,
  selectedPlatforms = ['kalshi', 'polymarket'],
}: PlatformOverviewPanelProps) {
  const showKalshi = selectedPlatforms.includes('kalshi');
  const showPoly = selectedPlatforms.includes('polymarket');

  return (
    <div className="p-4 bg-bg-surface rounded-lg border border-border">
      <h3 className="text-xs font-bold text-text-primary uppercase tracking-wide mb-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Platform Overview
      </h3>

      <div className="space-y-2.5">
        {/* Total Markets */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-text-muted">Total Markets</span>
          <span className="text-sm font-semibold text-brand-primary">{stats.totalMarkets}</span>
        </div>

        <div className="border-t border-border pt-2.5">
          {/* Cross-Listed Count */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-text-muted">Cross-listed</span>
            </div>
            <span className="text-sm font-medium text-text-primary">{stats.crossListedCount}</span>
          </div>

          {/* Kalshi Only */}
          {showKalshi && (
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-xs text-text-muted">Kalshi Only</span>
              </div>
              <span className="text-sm font-medium text-text-primary">{stats.kalshiOnlyCount}</span>
            </div>
          )}

          {/* Polymarket Only */}
          {showPoly && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-xs text-text-muted">Polymarket Only</span>
              </div>
              <span className="text-sm font-medium text-text-primary">{stats.polymarketOnlyCount}</span>
            </div>
          )}
        </div>

        <div className="border-t border-border pt-2.5">
          {/* Combined Volume */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-text-muted">Combined Volume</span>
            <span className="text-sm font-semibold text-text-primary">
              ${formatNumber(stats.totalVolume)}
            </span>
          </div>

          {/* Combined Liquidity */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-text-muted">Total Liquidity</span>
            <span className="text-sm font-medium text-text-primary">
              ${formatNumber(stats.totalLiquidity)}
            </span>
          </div>

          {/* Average Divergence */}
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-muted">Avg. Divergence</span>
            <span className="text-sm font-semibold text-amber-600">
              {stats.avgDivergence.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Platform Legend */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
              K
            </span>
            <span className="text-[10px] text-text-muted">Kalshi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold bg-purple-100 text-purple-700 border border-purple-200">
              P
            </span>
            <span className="text-[10px] text-text-muted">Polymarket</span>
          </div>
        </div>
      </div>
    </div>
  );
}


