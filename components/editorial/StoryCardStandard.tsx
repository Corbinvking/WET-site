import Link from 'next/link';
import { TagPill } from '@/components/ui';
import type { Story } from '@/data/stories';
import { getMarketById } from '@/data/markets';
import { MarketContextBar } from '@/components/market';

interface StoryCardStandardProps {
  story: Story;
  showMarketContext?: boolean;
}

export function StoryCardStandard({ story, showMarketContext = true }: StoryCardStandardProps) {
  const primaryMarket = story.relatedMarketIds[0]
    ? getMarketById(story.relatedMarketIds[0])
    : null;

  return (
    <article className="group">
      <Link href={`/story/${story.slug}`} className="block">
        <div className="relative aspect-video w-full overflow-hidden rounded bg-bg-elevated mb-3">
          {/* Placeholder image */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-elevated to-bg-surface">
            <svg className="w-10 h-10 text-text-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-1.5">
          {story.labels.map((label) => (
            <TagPill key={label} label={label} />
          ))}
        </div>
        <h3 className="text-sm font-semibold text-text-primary group-hover:underline decoration-1 underline-offset-2 leading-snug mb-1.5">
          {story.title}
        </h3>
        <p className="text-text-muted text-xs line-clamp-2">
          {story.summary}
        </p>
      </Link>
      {showMarketContext && primaryMarket && (
        <div className="mt-3">
          <MarketContextBar market={primaryMarket} variant="compact" />
        </div>
      )}
    </article>
  );
}
