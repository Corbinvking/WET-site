import Link from 'next/link';
import { globalMarkets, getGlobalTopMovers, getGlobalHighestVolume, getCrossListedMarkets, type GlobalMarket } from '@/data/markets';
import { cn, formatNumber } from '@/lib/utils';
import {
  TopMoversSection,
  ExplainersSection,
  MarketsPreview,
  NewsletterCTA,
} from '@/components/sections';

// Helper to get primary listing data
function getMarketOdds(market: GlobalMarket) {
  const kListing = market.listings.find(l => l.platform === 'kalshi');
  const pListing = market.listings.find(l => l.platform === 'polymarket');
  const isCrossListed = market.combined.platformCount >= 2;
  const primary = kListing || pListing;
  
  return {
    yes: primary?.yesProbability || 50,
    no: primary?.noProbability || 50,
    change: primary?.change24h || 0,
    kYes: kListing?.yesProbability,
    pYes: pListing?.yesProbability,
    isCrossListed,
    divergence: market.combined.divergence,
    volume: market.combined.combinedVolume,
  };
}

// Hero Market Card - Large featured market
function HeroMarketCard({ market }: { market: GlobalMarket }) {
  const odds = getMarketOdds(market);
  
  return (
    <article className="relative">
      {/* Image placeholder */}
      <div className="relative aspect-[16/9] bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden mb-3">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-light text-white/20">{odds.yes}%</span>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2 py-0.5 bg-brand-primary text-white text-[10px] font-bold uppercase rounded">
            {market.category}
          </span>
          {odds.isCrossListed && (
            <span className="px-2 py-0.5 bg-white/20 text-white text-[10px] font-medium rounded">
              Cross-Listed
            </span>
          )}
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-sm font-semibold rounded">
            {odds.yes}% YES
          </span>
          {odds.change !== 0 && (
            <span className={cn(
              'px-2 py-1 rounded text-sm font-medium',
              odds.change >= 0 ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
            )}>
              {odds.change >= 0 ? '↑' : '↓'}{Math.abs(odds.change).toFixed(1)}%
            </span>
          )}
        </div>
      </div>
      
      {/* Headline */}
      <Link href={`/market/${market.slug}`} className="group block">
        <h2 className="text-xl md:text-2xl font-bold text-text-primary leading-tight mb-2 group-hover:text-brand-primary transition-colors">
          {market.canonicalQuestion}
        </h2>
      </Link>
      
      {/* Market context */}
      <div className="flex items-center gap-3 text-xs text-text-muted">
        {odds.isCrossListed && odds.kYes && odds.pYes && (
          <>
            <span>K: {odds.kYes}%</span>
            <span className="text-slate-300">|</span>
            <span>P: {odds.pYes}%</span>
            {odds.divergence && odds.divergence > 0 && (
              <>
                <span className="text-slate-300">|</span>
                <span className="text-brand-primary font-medium">Δ{odds.divergence}pts</span>
              </>
            )}
          </>
        )}
        <span className="text-slate-300">•</span>
        <span>${formatNumber(odds.volume)} vol</span>
        {market.nextCatalyst && (
          <>
            <span className="text-slate-300">•</span>
            <span>Next: {market.nextCatalyst.event}</span>
          </>
        )}
      </div>
    </article>
  );
}

// Large Market Card with image
function LargeMarketCard({ market }: { market: GlobalMarket }) {
  const odds = getMarketOdds(market);
  
  return (
    <article className="group">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg overflow-hidden mb-2">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-light text-slate-400">{odds.yes}%</span>
        </div>
        <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 text-white text-[9px] font-medium uppercase rounded">
          {market.category}
        </span>
        {odds.change !== 0 && (
          <span className={cn(
            'absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-medium',
            odds.change >= 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          )}>
            {odds.change >= 0 ? '↑' : '↓'}{Math.abs(odds.change).toFixed(1)}%
          </span>
        )}
      </div>
      <Link href={`/market/${market.slug}`}>
        <h3 className="text-sm font-semibold text-text-primary leading-snug group-hover:text-brand-primary transition-colors line-clamp-3">
          {market.canonicalQuestion}
        </h3>
      </Link>
    </article>
  );
}

// Medium Market Card - text focused
function MediumMarketCard({ market }: { market: GlobalMarket }) {
  const odds = getMarketOdds(market);
  
  return (
    <article className="group border-b border-border pb-3 mb-3 last:border-0 last:pb-0 last:mb-0">
      <Link href={`/market/${market.slug}`} className="block">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-medium text-text-primary group-hover:text-brand-primary transition-colors leading-snug flex-1">
            {market.title}
          </h3>
          <div className="flex-shrink-0 text-right">
            <div className="text-sm font-bold text-text-primary">{odds.yes}%</div>
            {odds.change !== 0 && (
              <div className={cn(
                'text-[10px] font-medium',
                odds.change >= 0 ? 'text-green-600' : 'text-red-600'
              )}>
                {odds.change >= 0 ? '↑' : '↓'}{Math.abs(odds.change).toFixed(1)}%
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

// Compact Market Card with thumbnail
function CompactMarketCard({ market }: { market: GlobalMarket }) {
  const odds = getMarketOdds(market);
  
  return (
    <article className="group flex gap-3 mb-4 last:mb-0">
      <div className="flex-shrink-0 w-20 h-14 bg-gradient-to-br from-slate-200 to-slate-300 rounded overflow-hidden flex items-center justify-center">
        <span className="text-lg font-semibold text-slate-400">{odds.yes}%</span>
      </div>
      <div className="flex-1 min-w-0">
        <Link href={`/market/${market.slug}`}>
          <h4 className="text-xs font-medium text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
            {market.title}
          </h4>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-text-muted capitalize">{market.category}</span>
          {odds.change !== 0 && (
            <span className={cn(
              'text-[10px] font-medium',
              odds.change >= 0 ? 'text-green-600' : 'text-red-600'
            )}>
              {odds.change >= 0 ? '↑' : '↓'}{Math.abs(odds.change).toFixed(1)}%
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

// Small Market Row for sub-hero area
function SmallMarketCard({ market }: { market: GlobalMarket }) {
  const odds = getMarketOdds(market);
  
  return (
    <article className="group">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-300 rounded overflow-hidden mb-2">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-light text-slate-400">{odds.yes}%</span>
        </div>
        {market.nextCatalyst && (
          <div className="absolute top-1.5 left-1.5 flex items-center gap-1 px-1.5 py-0.5 bg-brand-primary text-white text-[8px] font-bold uppercase rounded">
            <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
            {market.nextCatalyst.event.slice(0, 15)}...
          </div>
        )}
      </div>
      <Link href={`/market/${market.slug}`}>
        <h4 className="text-xs font-semibold text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
          {market.title}
        </h4>
      </Link>
    </article>
  );
}

function VideoPlaceholder() {
  return (
    <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden mb-3 group cursor-pointer">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 bg-brand-primary/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  // Sort markets by volume and activity for homepage
  const topByVolume = getGlobalHighestVolume(15);
  const topMovers = getGlobalTopMovers(10);
  const crossListed = getCrossListedMarkets();
  
  // Organize markets for layout
  const heroMarket = topByVolume[0];
  const leftColumnMarkets = topMovers.slice(0, 4);
  const subHeroMarkets = crossListed.slice(0, 3);
  const rightRailMarkets = topByVolume.slice(1, 7);
  
  return (
    <div className="bg-white min-h-screen">
      {/* HERO SECTION - Above the fold */}
      <div className="container-wet py-4">
        {/* Main Grid - CNN Style 3 Column Layout */}
        <div className="grid grid-cols-12 gap-5">
          
          {/* LEFT COLUMN - Top Movers */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wide">Top Movers</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            {leftColumnMarkets.map((market, index) => (
              <div key={market.id}>
                {index === 0 ? (
                  <LargeMarketCard market={market} />
                ) : (
                  <MediumMarketCard market={market} />
                )}
              </div>
            ))}
          </div>

          {/* CENTER COLUMN - Hero Market */}
          <div className="col-span-12 lg:col-span-6 order-first lg:order-none">
            <HeroMarketCard market={heroMarket} />
            
            {/* Sub-hero markets - Cross-listed spotlight */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wide">Cross-Listed Markets</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {subHeroMarkets.map((market) => (
                  <SmallMarketCard key={market.id} market={market} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Highest Volume */}
          <div className="col-span-12 lg:col-span-3">
            {/* Video placeholder */}
            <div className="mb-6">
              <VideoPlaceholder />
              <h3 className="text-sm font-bold text-text-primary mb-1">
                Today&apos;s Market Highlights
              </h3>
              <p className="text-xs text-text-muted">
                Quick overview of the day&apos;s biggest moves and opportunities
              </p>
            </div>

            {/* Highest Volume Markets */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wide">Highest Volume</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              {rightRailMarkets.map((market) => (
                <CompactMarketCard key={market.id} market={market} />
              ))}
            </div>

            {/* Expiring Soon */}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wide flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Expiring Soon
                </span>
              </div>
              {globalMarkets
                .filter(m => m.expiryDate)
                .sort((a, b) => new Date(a.expiryDate!).getTime() - new Date(b.expiryDate!).getTime())
                .slice(0, 3)
                .map((market) => (
                  <CompactMarketCard key={market.id} market={market} />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* BELOW THE FOLD SECTIONS */}
      <div className="container-wet">
        {/* Section: Category Highlights */}
        <section className="py-8 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-brand-primary rounded-full" />
              <h2 className="text-lg font-bold text-text-primary">Markets by Category</h2>
            </div>
            <Link href="/markets" className="text-xs text-brand-primary font-medium hover:underline">
              View All Markets →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['politics', 'economy', 'crypto', 'tech', 'sports', 'world'].map((category) => {
              const categoryMarkets = globalMarkets.filter(m => m.category.toLowerCase() === category);
              const topMarket = categoryMarkets.sort((a, b) => b.combined.combinedVolume - a.combined.combinedVolume)[0];
              
              if (!topMarket) return null;
              
              const odds = getMarketOdds(topMarket);
              
              return (
                <Link 
                  key={category}
                  href={`/category/${category}`}
                  className="group p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <div className="text-[10px] font-bold text-text-muted uppercase tracking-wide mb-2">
                    {category}
                  </div>
                  <div className="text-2xl font-light text-text-primary mb-1">
                    {odds.yes}%
                  </div>
                  <div className="text-xs text-text-secondary line-clamp-2 group-hover:text-brand-primary transition-colors">
                    {topMarket.title}
                  </div>
                  <div className="text-[10px] text-text-muted mt-2">
                    {categoryMarkets.length} markets
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Section: Top Movers Today */}
        <TopMoversSection />

        {/* Section: Market Explainers */}
        <ExplainersSection />

        {/* Section: Markets Directory Preview */}
        <MarketsPreview />

        {/* Section: Newsletter CTA */}
        <NewsletterCTA />
      </div>
    </div>
  );
}
