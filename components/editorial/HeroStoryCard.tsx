import Link from 'next/link';
import { TagPill } from '@/components/ui';
import type { Story } from '@/data/stories';
import { getMarketById } from '@/data/markets';

interface HeroStoryCardProps {
  story: Story;
  showMarketContext?: boolean;
}

export function HeroStoryCard({ story, showMarketContext = true }: HeroStoryCardProps) {
  const primaryMarket = story.relatedMarketIds[0]
    ? getMarketById(story.relatedMarketIds[0])
    : null;

  return (
    <article className="group relative">
      {/* Hero Image Container */}
      <div className="relative aspect-[16/10] lg:aspect-[16/9] overflow-hidden rounded-lg bg-bg-elevated">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

        {/* Placeholder image */}
        <div className="absolute inset-0 bg-gradient-to-br from-bg-elevated to-bg-surface">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-12 h-12 text-text-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
          {/* Labels */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {story.labels.map((label) => (
              <TagPill key={label} label={label} />
            ))}
          </div>

          {/* Headline - This is the main clickable area */}
          <Link href={`/story/${story.slug}`} className="block group-hover:underline decoration-1 underline-offset-2">
            <h2 className="text-lg lg:text-xl font-bold text-white mb-2 leading-snug">
              {story.title}
            </h2>
          </Link>

          {/* Summary */}
          <p className="text-sm text-gray-200 line-clamp-2 mb-3">
            {story.summary}
          </p>

          {/* Market Context Bar */}
          {showMarketContext && primaryMarket && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/20">
              <span className="text-xs text-gray-400 font-medium truncate max-w-[150px]">
                {primaryMarket.title}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 bg-white/10 rounded text-xs text-white">
                  K: {Math.round((primaryMarket.platforms.kalshi?.yesPrice || 0) * 100)}%
                </span>
                <span className="px-1.5 py-0.5 bg-white/10 rounded text-xs text-white">
                  P: {Math.round((primaryMarket.platforms.polymarket?.yesPrice || 0) * 100)}%
                </span>
                <span className={`text-xs font-medium ${primaryMarket.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {primaryMarket.change24h >= 0 ? '▲' : '▼'} {Math.abs(primaryMarket.change24h).toFixed(1)}%
                </span>
              </div>
              {/* Separate link - not nested */}
              <Link
                href={`/market/${primaryMarket.slug}`}
                className="ml-auto text-xs text-white/70 hover:text-white flex items-center gap-0.5 relative z-30"
              >
                View markets
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Stretched link overlay for entire card (except the market link) */}
      <Link 
        href={`/story/${story.slug}`} 
        className="absolute inset-0 z-10"
        aria-label={`Read more about ${story.title}`}
      >
        <span className="sr-only">Read article</span>
      </Link>
    </article>
  );
}
