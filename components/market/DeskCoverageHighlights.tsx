'use client';

import Link from 'next/link';
import type { Story } from '@/data/stories';
import type { GlobalMarket } from '@/data/markets';
import { cn } from '@/lib/utils';

interface DeskCoverageHighlightsProps {
  stories: Story[];
  markets: GlobalMarket[];
  deskSlug: string;
  deskName: string;
  limit?: number;
}

const labelStyles: Record<string, { bg: string; text: string }> = {
  News: { bg: 'bg-slate-100', text: 'text-slate-600' },
  Analysis: { bg: 'bg-amber-100', text: 'text-amber-700' },
  Explainer: { bg: 'bg-blue-100', text: 'text-blue-700' },
  Breaking: { bg: 'bg-red-100', text: 'text-red-700' },
  'Live Updates': { bg: 'bg-red-100', text: 'text-red-700' },
};

export function DeskCoverageHighlights({ 
  stories, 
  markets, 
  deskSlug, 
  deskName,
  limit = 6 
}: DeskCoverageHighlightsProps) {
  // Only show stories that have related markets
  const storiesWithMarkets = stories
    .filter(story => story.relatedMarketIds && story.relatedMarketIds.length > 0)
    .slice(0, limit);

  if (storiesWithMarkets.length === 0) return null;

  // Helper to get primary market for a story
  const getPrimaryMarket = (story: Story): GlobalMarket | undefined => {
    const marketId = story.relatedMarketIds[0];
    return markets.find(m => m.id === marketId);
  };

  // Format relative time
  const formatRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="border-t border-border pt-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-0.5 h-5 bg-brand-primary rounded-full" />
          <h2 className="text-sm font-bold text-text-primary uppercase tracking-wide">
            {deskName} Coverage Highlights
          </h2>
          <span className="text-xs text-text-muted">(Market-linked only)</span>
        </div>
        <Link
          href={`/category/${deskSlug}/coverage`}
          className="text-xs text-brand-primary hover:underline"
        >
          See all →
        </Link>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {storiesWithMarkets.map((story) => {
          const primaryMarket = getPrimaryMarket(story);
          const labelStyle = labelStyles[story.labels[0]] || labelStyles.News;
          const change = primaryMarket?.listings[0]?.change24h || 0;

          return (
            <Link
              key={story.id}
              href={`/story/${story.slug}`}
              className="block p-3 bg-bg-surface rounded-lg border border-border card-hover transition-all group"
            >
              {/* Label + Timestamp */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={cn(
                  'px-1.5 py-0.5 rounded text-[10px] font-medium',
                  labelStyle.bg,
                  labelStyle.text
                )}>
                  {story.labels[0]}
                </span>
                <span className="text-[10px] text-text-muted">
                  {formatRelativeTime(story.publishedAt)}
                </span>
              </div>

              {/* Headline */}
              <h3 className="text-sm font-medium text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2 mb-2">
                {story.title}
              </h3>

              {/* Primary Market Mini-Chip */}
              {primaryMarket && (
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-1.5">
                    {/* Platform badges */}
                    <div className="flex items-center gap-0.5">
                      {primaryMarket.listings.find(l => l.platform === 'kalshi') && (
                        <span className="w-4 h-4 rounded flex items-center justify-center text-[8px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
                          K
                        </span>
                      )}
                      {primaryMarket.listings.find(l => l.platform === 'polymarket') && (
                        <span className="w-4 h-4 rounded flex items-center justify-center text-[8px] font-bold bg-purple-100 text-purple-700 border border-purple-200">
                          P
                        </span>
                      )}
                    </div>
                    {/* Divergence if cross-listed */}
                    {primaryMarket.combined.divergence !== null && primaryMarket.combined.divergence > 0 && (
                      <span className="text-[10px] text-amber-600 font-medium">
                        Δ{primaryMarket.combined.divergence}pts
                      </span>
                    )}
                  </div>

                  {/* 24h Move Badge */}
                  <span className={cn(
                    'text-[10px] font-medium',
                    change >= 0 ? 'text-market-up' : 'text-market-down'
                  )}>
                    {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(1)}%
                  </span>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

