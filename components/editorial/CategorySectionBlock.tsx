import Link from 'next/link';
import { StoryCardStandard, StoryCardCompact } from '@/components/editorial';
import type { Category } from '@/data/categories';
import type { Story } from '@/data/stories';

interface CategorySectionBlockProps {
  category: Category;
  stories: Story[];
}

export function CategorySectionBlock({ category, stories }: CategorySectionBlockProps) {
  const featuredStory = stories[0];
  const compactStories = stories.slice(1, 4);

  if (stories.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border pt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-text-primary uppercase tracking-wide">
          <Link href={`/category/${category.slug}`} className="hover:text-brand transition-colors">
            {category.name}
          </Link>
        </h2>
        <Link href={`/category/${category.slug}`} className="text-brand text-xs font-medium hover:underline">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredStory && (
          <div className="md:col-span-1 lg:col-span-1">
            <StoryCardStandard story={featuredStory} showMarketContext={false} />
          </div>
        )}
        {compactStories.map((story) => (
          <div key={story.slug} className="md:col-span-1 lg:col-span-1">
            <StoryCardCompact story={story} />
          </div>
        ))}
      </div>
    </section>
  );
}
