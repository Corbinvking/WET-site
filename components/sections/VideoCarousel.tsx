'use client';

import { useRef } from 'react';
import { SectionBlock } from './SectionBlock';
import { VideoCard } from '@/components/editorial';

const videos = [
  { id: '1', title: 'Morning Market Brief: Fed Decision Preview', runtime: '8:42', category: 'Daily Brief' },
  { id: '2', title: 'What Trump\'s Greenland Comments Mean for Markets', runtime: '12:15', category: 'Analysis' },
  { id: '3', title: 'Crypto Markets Weekly Recap', runtime: '15:30', category: 'Weekly' },
  { id: '4', title: 'Election Market Deep Dive: 2026 Midterms', runtime: '22:10', category: 'Deep Dive' },
  { id: '5', title: 'Understanding Polymarket Liquidity', runtime: '6:45', category: 'Explainer' },
  { id: '6', title: 'Sports Betting Markets: NFL Conference Championships', runtime: '10:20', category: 'Sports' },
  { id: '7', title: 'Economic Indicators: What to Watch This Week', runtime: '7:55', category: 'Weekly' },
  { id: '8', title: 'Breaking Down the Bitcoin ETF Inflows', runtime: '11:30', category: 'Crypto' },
];

export function VideoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 240; // Roughly one card width
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <SectionBlock
      title="Watch: Market Briefings"
      subtitle="Video analysis and commentary"
      seeAllHref="/watch"
      layout="carousel"
    >
      {/* Scroll buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 shadow-lg rounded-full flex items-center justify-center text-text-muted hover:text-brand-primary transition-colors -ml-4 hidden md:flex"
        aria-label="Scroll left"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 shadow-lg rounded-full flex items-center justify-center text-text-muted hover:text-brand-primary transition-colors -mr-4 hidden md:flex"
        aria-label="Scroll right"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Video cards */}
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          title={video.title}
          href={`/watch/${video.id}`}
          runtime={video.runtime}
          category={video.category}
        />
      ))}
    </SectionBlock>
  );
}

