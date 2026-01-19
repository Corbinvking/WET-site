import Link from 'next/link';
import { stories } from '@/data/stories';
import { getMarketById } from '@/data/markets';

// Story card components for different sizes
function HeroStory({ story }: { story: typeof stories[0] }) {
  const market = story.relatedMarketIds[0] ? getMarketById(story.relatedMarketIds[0]) : null;
  
  return (
    <article className="story-card relative">
      {/* Large Hero Image */}
      <div className="story-image image-hover relative aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden mb-3">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        {/* Label overlay - now blue for analysis */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="tag-analysis">{story.labels[0] || 'Analysis'}</span>
        </div>
      </div>
      
      {/* Headline */}
      <Link href={`/story/${story.slug}`} className="group block">
        <h2 className="headline-hero mb-2 group-hover:text-brand-primary">
          {story.title}
        </h2>
      </Link>
      
      {/* Summary */}
      <p className="text-sm text-text-secondary leading-relaxed mb-3">
        {story.summary}
      </p>
      
      {/* Market Context - with hover effects */}
      {market && (
        <div className="flex items-center gap-3 text-xs border-t border-border pt-3">
          <Link href={`/market/${market.slug}`} className="text-text-muted font-medium hover:text-brand-primary transition-colors">
            {market.title}
          </Link>
          <div className="flex items-center gap-2">
            <span className="market-pill px-2 py-1 bg-blue-50 text-brand-primary rounded font-semibold">
              K: {Math.round((market.platforms.kalshi?.yesPrice || 0) * 100)}%
            </span>
            <span className="market-pill px-2 py-1 bg-blue-50 text-brand-primary rounded font-semibold">
              P: {Math.round((market.platforms.polymarket?.yesPrice || 0) * 100)}%
            </span>
            <span className={`font-bold flex items-center gap-0.5 ${market.change24h >= 0 ? 'text-market-up' : 'text-market-down'}`}>
              {market.change24h >= 0 ? (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M7 14l5-5 5 5H7z"/></svg>
              ) : (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>
              )}
              {Math.abs(market.change24h).toFixed(1)}%
            </span>
          </div>
        </div>
      )}
    </article>
  );
}

function LargeStoryCard({ story }: { story: typeof stories[0] }) {
  return (
    <article className="story-card group">
      <div className="story-image thumb-hover relative aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden mb-2">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      <Link href={`/story/${story.slug}`}>
        <h3 className="headline-large group-hover:text-brand-primary">
          {story.title}
        </h3>
      </Link>
    </article>
  );
}

function MediumStoryCard({ story }: { story: typeof stories[0] }) {
  return (
    <article className="group border-b border-border pb-3 mb-3 last:border-0 last:pb-0 last:mb-0">
      <Link href={`/story/${story.slug}`} className="block">
        <h3 className="headline-medium group-hover:text-brand-primary mb-1">
          {story.title}
        </h3>
      </Link>
      <p className="text-xs text-text-muted line-clamp-2">
        {story.summary}
      </p>
    </article>
  );
}

function StoryWithThumb({ story }: { story: typeof stories[0] }) {
  return (
    <article className="group flex gap-3 mb-4 last:mb-0">
      {/* Thumbnail */}
      <div className="thumb-hover flex-shrink-0 w-24 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      <div className="flex-1">
        <Link href={`/story/${story.slug}`}>
          <h4 className="headline-compact group-hover:text-brand-primary line-clamp-3">
            {story.title}
          </h4>
        </Link>
      </div>
    </article>
  );
}

function VideoPlaceholder() {
  return (
    <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden mb-3 group cursor-pointer">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="play-button w-14 h-14 bg-brand-primary/90 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      {/* Subtle blue gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

export default function Home() {
  // Organize stories for different sections
  const heroStory = stories[0];
  const leftColumnStories = stories.slice(1, 4);
  const subHeroStories = stories.slice(4, 7);
  const rightRailStories = stories.slice(7, 12);

  return (
    <div className="bg-white min-h-screen">
      <div className="container-wet py-4">
        {/* Main Grid - CNN Style 3 Column Layout */}
        <div className="grid grid-cols-12 gap-5">
          
          {/* LEFT COLUMN - Large stories with images */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            {leftColumnStories.map((story, index) => (
              <div key={story.slug}>
                {index === 0 ? (
                  <LargeStoryCard story={story} />
                ) : (
                  <MediumStoryCard story={story} />
                )}
              </div>
            ))}
          </div>

          {/* CENTER COLUMN - Hero Story */}
          <div className="col-span-12 lg:col-span-6 order-first lg:order-none">
            <HeroStory story={heroStory} />
            
            {/* Sub-hero stories in a row */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
              {subHeroStories.map((story) => (
                <article key={story.slug} className="story-card group">
                  <div className="thumb-hover relative aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded overflow-hidden mb-2">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    {/* Live indicator - keep red for urgency */}
                    {story.labels.includes('Live Updates') && (
                      <div className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 bg-brand-red text-white text-[9px] font-bold uppercase rounded-sm z-10">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        Live
                      </div>
                    )}
                  </div>
                  <Link href={`/story/${story.slug}`}>
                    <h4 className="text-xs font-semibold text-text-primary group-hover:text-brand-primary transition-colors line-clamp-3 leading-snug">
                      {story.title}
                    </h4>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - Catch up rail */}
          <div className="col-span-12 lg:col-span-3">
            {/* Video/Watch Section */}
            <div className="mb-6">
              <VideoPlaceholder />
              <h3 className="text-sm font-bold text-text-primary mb-1">
                Catch up on today&apos;s headlines
              </h3>
            </div>

            {/* Story list with thumbnails */}
            <div className="space-y-0">
              {rightRailStories.map((story) => (
                <StoryWithThumb key={story.slug} story={story} />
              ))}
            </div>

            {/* Podcast/Audio Section - with subtle gold accent */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wide flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z"/>
                  </svg>
                  Podcast
                </span>
              </div>
              {stories.slice(5, 7).map((story) => (
                <StoryWithThumb key={story.slug} story={story} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
