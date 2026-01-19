'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Short {
  id: string;
  title: string;
  slug: string;
  thumbnailUrl?: string;
  duration: string;
  category: string;
  views?: number;
}

// Mock shorts data - would come from API/CMS
const mockShorts: Short[] = [
  {
    id: 'short-1',
    title: 'Markets react to Fed decision preview',
    slug: 'fed-decision-preview',
    duration: '0:58',
    category: 'Economy',
    views: 124000,
  },
  {
    id: 'short-2',
    title: 'Trump executive orders: What traders need to know',
    slug: 'trump-executive-orders-explainer',
    duration: '1:24',
    category: 'Politics',
    views: 89000,
  },
  {
    id: 'short-3',
    title: 'Bitcoin price action: Key levels to watch',
    slug: 'bitcoin-key-levels',
    duration: '0:45',
    category: 'Crypto',
    views: 156000,
  },
  {
    id: 'short-4',
    title: 'EU tariffs explained in 60 seconds',
    slug: 'eu-tariffs-explainer',
    duration: '1:02',
    category: 'Economy',
    views: 67000,
  },
  {
    id: 'short-5',
    title: 'Super Bowl odds breakdown',
    slug: 'super-bowl-odds',
    duration: '1:15',
    category: 'Sports',
    views: 203000,
  },
  {
    id: 'short-6',
    title: 'Greenland acquisition: Market implications',
    slug: 'greenland-market-impact',
    duration: '0:52',
    category: 'Geopolitics',
    views: 78000,
  },
  {
    id: 'short-7',
    title: 'AI regulation odds shifting fast',
    slug: 'ai-regulation-odds',
    duration: '0:38',
    category: 'Tech',
    views: 91000,
  },
  {
    id: 'short-8',
    title: 'Ukraine ceasefire probability update',
    slug: 'ukraine-ceasefire-update',
    duration: '1:08',
    category: 'World',
    views: 112000,
  },
];

export function ShortsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="py-8 border-t border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-brand-primary rounded-full" />
          <h2 className="text-sm font-bold text-text-primary uppercase tracking-wide">
            W.E.T. Shorts
          </h2>
        </div>
        <Link 
          href="/shorts" 
          className="text-xs text-brand-primary font-medium hover:underline"
        >
          View All →
        </Link>
      </div>

      {/* Carousel Container */}
      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className={cn(
            'absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all duration-200',
            canScrollLeft 
              ? 'opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110' 
              : 'opacity-0 pointer-events-none'
          )}
          aria-label="Scroll left"
        >
          <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className={cn(
            'absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all duration-200',
            canScrollRight 
              ? 'opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110' 
              : 'opacity-0 pointer-events-none'
          )}
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4"
        >
          {mockShorts.map((short) => (
            <ShortCard key={short.id} short={short} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ShortCard({ short }: { short: Short }) {
  return (
    <Link
      href={`/shorts/${short.slug}`}
      className="group flex-shrink-0 w-[200px] relative"
    >
      {/* Vertical Video Thumbnail */}
      <div className="relative aspect-[9/16] bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden">
        {/* Placeholder gradient - would be replaced with actual thumbnail */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <span className="px-1.5 py-0.5 bg-brand-primary text-white text-[9px] font-bold uppercase rounded">
            {short.category}
          </span>
        </div>

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          {/* Title */}
          <h3 className="text-white text-sm font-semibold leading-tight line-clamp-3 mb-2 group-hover:text-brand-blue-light transition-colors">
            {short.title}
          </h3>
          
          {/* Duration */}
          <div className="flex items-center gap-1.5 text-white/80">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium">{short.duration}</span>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
}


