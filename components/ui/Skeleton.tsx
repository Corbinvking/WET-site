import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'skeleton',
        className
      )}
    />
  );
}

// ============================================
// STORY CARD SKELETONS
// ============================================

export function SkeletonStoryCard() {
  return (
    <div className="space-y-3">
      <Skeleton className="w-full aspect-video rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export function SkeletonStoryCardCompact() {
  return (
    <div className="flex gap-3 py-2">
      <Skeleton className="w-24 h-16 rounded flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}

export function SkeletonStoryCardLarge() {
  return (
    <div className="space-y-3">
      <Skeleton className="w-full aspect-[4/3] rounded-lg" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-2/3" />
    </div>
  );
}

// ============================================
// MARKET CARD SKELETONS
// ============================================

export function SkeletonMarketCard() {
  return (
    <div className="p-4 bg-bg-surface rounded-lg border border-border space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}

export function SkeletonMarketRow() {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-6 w-14 rounded" />
    </div>
  );
}

// ============================================
// HERO GRID SKELETONS
// ============================================

export function SkeletonHeroGrid() {
  return (
    <div className="grid grid-cols-12 gap-5">
      {/* Left Column */}
      <div className="col-span-12 lg:col-span-3 space-y-4">
        <SkeletonStoryCardLarge />
        <div className="space-y-3 pt-3 border-t border-border">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="space-y-3 pt-3 border-t border-border">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>

      {/* Center Column - Hero */}
      <div className="col-span-12 lg:col-span-6 order-first lg:order-none">
        <Skeleton className="w-full aspect-[16/9] rounded-lg mb-4" />
        <Skeleton className="h-8 w-full mb-3" />
        <Skeleton className="h-8 w-4/5 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
        
        {/* Sub-hero row */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="w-full aspect-[4/3] rounded" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div className="col-span-12 lg:col-span-3 space-y-4">
        <Skeleton className="w-full aspect-video rounded-lg" />
        <Skeleton className="h-4 w-3/4" />
        <div className="space-y-0">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonStoryCardCompact key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// SECTION SKELETONS
// ============================================

export function SkeletonSection({ rows = 3 }: { rows?: number }) {
  return (
    <div className="py-6 border-t border-border">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-0.5 h-5 rounded-full" />
        <Skeleton className="h-4 w-40" />
      </div>
      
      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Lead */}
        <div className="lg:col-span-2">
          <Skeleton className="w-full aspect-[16/10] rounded-lg mb-3" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        
        {/* List */}
        <div className="space-y-0">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="py-2.5 border-b border-border last:border-0">
              <Skeleton className="h-3.5 w-full mb-1.5" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonSectionThreeCol() {
  return (
    <div className="py-6 border-t border-border">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-0.5 h-5 rounded-full" />
        <Skeleton className="h-4 w-36" />
      </div>
      
      {/* 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[1, 2, 3].map((col) => (
          <div key={col} className="space-y-3">
            <Skeleton className="h-3 w-24 mb-2" />
            <Skeleton className="w-full aspect-[4/3] rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((row) => (
                <div key={row} className="py-2 border-b border-border last:border-0">
                  <Skeleton className="h-3 w-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonVideoCarousel() {
  return (
    <div className="py-6 border-t border-border">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-0.5 h-5 rounded-full" />
        <Skeleton className="h-4 w-44" />
      </div>
      
      {/* Carousel */}
      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex-shrink-0 w-56">
            <Skeleton className="w-full aspect-video rounded-lg mb-2" />
            <Skeleton className="h-3 w-16 mb-1" />
            <Skeleton className="h-3.5 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonMarketsGrid() {
  return (
    <div className="py-6 border-t border-border">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-0.5 h-5 rounded-full" />
        <Skeleton className="h-4 w-36" />
      </div>
      
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <SkeletonMarketCard key={i} />
        ))}
      </div>
    </div>
  );
}

export function SkeletonNewsletterCTA() {
  return (
    <div className="py-6 bg-bg-surface rounded-lg">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 px-4">
        <div className="text-center md:text-left">
          <Skeleton className="h-5 w-48 mb-2 mx-auto md:mx-0" />
          <Skeleton className="h-3 w-64 mx-auto md:mx-0" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-48 rounded-lg" />
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// ============================================
// CATEGORY PAGE SKELETONS
// ============================================

export function SkeletonCategoryPage() {
  return (
    <div className="py-4">
      {/* Breadcrumbs */}
      <Skeleton className="h-3 w-32 mb-3" />
      
      {/* Header */}
      <Skeleton className="h-8 w-48 mb-2" />
      <Skeleton className="h-4 w-96 mb-4" />
      
      {/* Sub-nav chips */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>
      
      {/* 3-column hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5">
          <Skeleton className="w-full aspect-[16/10] rounded-lg mb-3" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="py-2 border-b border-border">
                <Skeleton className="h-3.5 w-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4">
          <Skeleton className="w-full aspect-[4/3] rounded-lg mb-3" />
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-3 w-3/4 mb-4" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="py-2 border-b border-border">
                <Skeleton className="h-3.5 w-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <Skeleton className="w-full aspect-video rounded-lg mb-2" />
              <Skeleton className="h-3 w-16 mb-1" />
              <Skeleton className="h-3 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// FOOTER SKELETON
// ============================================

export function SkeletonFooter() {
  return (
    <div className="bg-bg-dark py-8">
      <div className="container-wet">
        {/* Search bar */}
        <div className="flex justify-center mb-6">
          <Skeleton className="h-12 w-full max-w-xl rounded-lg" />
        </div>
        
        {/* Link columns */}
        <div className="grid grid-cols-5 lg:grid-cols-10 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-16 mb-3" />
              {[1, 2, 3, 4, 5].map((j) => (
                <Skeleton key={j} className="h-2.5 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
