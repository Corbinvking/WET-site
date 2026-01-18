import Link from 'next/link';
import { TagPill } from '@/components/ui';
import type { Story } from '@/data/stories';

interface StoryCardCompactProps {
  story: Story;
}

export function StoryCardCompact({ story }: StoryCardCompactProps) {
  return (
    <article className="group">
      <Link href={`/story/${story.slug}`} className="block">
        <div className="flex flex-wrap gap-1 mb-1">
          {story.labels.slice(0, 2).map((label) => (
            <TagPill key={label} label={label} />
          ))}
        </div>
        <h4 className="text-xs font-medium text-text-primary group-hover:underline decoration-1 underline-offset-2 leading-snug">
          {story.title}
        </h4>
      </Link>
    </article>
  );
}
