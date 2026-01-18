import Link from 'next/link';
import type { Story } from '@/data/stories';

interface StoryRowRailProps {
  story: Story;
}

// Format date helper
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function StoryRowRail({ story }: StoryRowRailProps) {
  return (
    <article className="group flex items-start gap-3">
      <Link href={`/story/${story.slug}`} className="flex-1 block">
        <h4 className="text-xs font-medium text-text-primary group-hover:underline decoration-1 underline-offset-2 leading-snug">
          {story.title}
        </h4>
        <p className="text-[11px] text-text-muted mt-0.5">{formatDate(story.publishedAt)}</p>
      </Link>
      {story.heroImage && (
        <Link href={`/story/${story.slug}`} className="flex-shrink-0 w-16 h-10 relative overflow-hidden rounded bg-bg-elevated">
          {/* Placeholder image */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-elevated to-bg-surface">
            <svg className="w-4 h-4 text-text-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </Link>
      )}
    </article>
  );
}
