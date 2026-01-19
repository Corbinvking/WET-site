import Link from 'next/link';
import { SectionBlock, FeatureListLayout } from './SectionBlock';
import { ListLinkRow } from '@/components/editorial';
import { stories } from '@/data/stories';
import { markets, getTopMovers } from '@/data/markets';

export function WhatMarketNoticed() {
  const featuredStory = stories[1]; // Second story as feature
  const topMovers = getTopMovers(8);

  return (
    <SectionBlock
      title="What the Market Noticed"
      subtitle="Stories that moved prediction markets"
      seeAllHref="/markets?filter=movers"
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
              {/* Label */}
              <div className="absolute top-3 left-3">
                <span className="tag-analysis">Market Mover</span>
              </div>
            </div>
            
            {/* Headline */}
            <Link href={`/story/${featuredStory.slug}`}>
              <h3 className="headline-large group-hover:text-brand-primary transition-colors mb-2">
                {featuredStory.title}
              </h3>
            </Link>
            
            {/* Summary */}
            <p className="text-sm text-text-secondary line-clamp-2">
              {featuredStory.summary}
            </p>
            
            {/* Market angle */}
            <div className="mt-3 p-2 bg-blue-50 rounded border-l-2 border-brand-primary">
              <p className="text-xs text-brand-primary font-medium">
                {featuredStory.marketAngle}
              </p>
            </div>
          </article>
        }
        listContent={
          <>
            {topMovers.map((market) => (
              <ListLinkRow
                key={market.id}
                title={market.title}
                href={`/market/${market.slug}`}
                delta={market.change24h}
              />
            ))}
          </>
        }
      />
    </SectionBlock>
  );
}

