import Link from 'next/link';
import { SectionBlock, FeatureListLayout } from './SectionBlock';
import { ListLinkRow } from '@/components/editorial';
import { stories } from '@/data/stories';
import { categories } from '@/data/categories';

interface DeskSpotlightProps {
  categorySlug?: string;
}

export function DeskSpotlight({ categorySlug = 'politics' }: DeskSpotlightProps) {
  const category = categories.find(c => c.slug === categorySlug) || categories[0];
  const categoryStories = stories.filter(s => s.category === categorySlug || s.category === 'geopolitics');
  const leadStory = categoryStories[0];
  const listStories = categoryStories.slice(1, 7);

  if (!leadStory) return null;

  return (
    <SectionBlock
      title={`Desk Spotlight: ${category.name}`}
      seeAllHref={`/category/${category.slug}`}
    >
      <FeatureListLayout
        leadContent={
          <article className="story-card group">
            {/* Large image */}
            <div className="story-image image-hover relative aspect-[16/10] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden mb-3">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              {/* Category tag */}
              <div className="absolute top-3 left-3">
                <span className="tag-analysis">{category.name}</span>
              </div>
            </div>
            
            {/* Headline */}
            <Link href={`/story/${leadStory.slug}`}>
              <h3 className="headline-large group-hover:text-brand-primary transition-colors mb-2">
                {leadStory.title}
              </h3>
            </Link>
            
            {/* Summary */}
            <p className="text-sm text-text-secondary line-clamp-3">
              {leadStory.summary}
            </p>
          </article>
        }
        listContent={
          <>
            {listStories.map((story) => (
              <ListLinkRow
                key={story.id}
                title={story.title}
                href={`/story/${story.slug}`}
              />
            ))}
            {listStories.length === 0 && (
              <p className="text-sm text-text-muted py-4">More {category.name.toLowerCase()} stories coming soon.</p>
            )}
          </>
        }
      />
    </SectionBlock>
  );
}

