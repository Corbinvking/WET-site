'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Category, DeskConfig } from '@/data/categories';
import { categories } from '@/data/categories';
import { stories } from '@/data/stories';
import { 
  globalMarkets, 
  type GlobalMarket,
  type Platform,
} from '@/data/markets';
import {
  DeskMarketCard,
  FeaturedMarketHero,
  CatalystCalendarMini,
  MarketSortDropdown,
  sortGlobalMarkets,
  EmptyMarketState,
  PlatformPresenceFilter,
  PlatformSelectorChips,
  DeskTopMovers,
  DeskDivergence,
  DeskVolume,
  DeskGoDeeper,
  DeskNewsletterCTA,
  DeskCoverageHighlights,
  type PlatformPresence,
  type SortOption,
} from '@/components/market';
import { cn } from '@/lib/utils';

interface DeskPageClientProps {
  slug: string;
  category: Category;
  deskConfig: DeskConfig;
}

export default function DeskPageClient({ slug, category, deskConfig }: DeskPageClientProps) {
  // Filter state
  const [platformPresence, setPlatformPresence] = useState<PlatformPresence>('all');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['kalshi', 'polymarket']);
  const [selectedChip, setSelectedChip] = useState<string>('All');
  const [sortOption, setSortOption] = useState<SortOption>('relevance');

  // Get markets for this desk (category)
  const deskMarkets = useMemo(() => {
    // Map category slugs to market categories
    const categoryMappings: Record<string, string[]> = {
      politics: ['politics'],
      economy: ['economy'],
      world: ['geopolitics', 'world'],
      geopolitics: ['geopolitics'],
      elections: ['elections', 'politics'],
      crypto: ['crypto'],
      tech: ['tech'],
      sports: ['sports'],
      climate: ['climate'],
    };

    const targetCategories = categoryMappings[slug] || [slug];
    return globalMarkets.filter(m => 
      targetCategories.includes(m.category.toLowerCase())
    );
  }, [slug]);

  // Get stories for this desk (with market links)
  const deskStories = useMemo(() => {
    return stories.filter(story => {
      // Check if story category matches
      const matchesCategory = story.category === slug || 
        (slug === 'world' && story.category === 'geopolitics') ||
        (slug === 'politics' && story.category === 'geopolitics');
      
      // Must have related markets
      const hasMarketLinks = story.relatedMarketIds && story.relatedMarketIds.length > 0;
      
      return matchesCategory && hasMarketLinks;
    });
  }, [slug]);

  // Get coverage for each market
  const getMarketCoverage = (marketId: string) => {
    return deskStories.filter(story => 
      story.relatedMarketIds.includes(marketId)
    ).slice(0, 2);
  };

  // Filter and sort markets
  const filteredMarkets = useMemo(() => {
    let result = [...deskMarkets];

    // Platform presence filter
    if (platformPresence === 'cross-listed') {
      result = result.filter(m => m.combined.platformCount >= 2);
    } else if (platformPresence === 'exclusive') {
      result = result.filter(m => m.combined.platformCount === 1);
    }

    // Platform selector filter
    if (selectedPlatforms.length === 1) {
      result = result.filter(m => 
        m.listings.some(l => l.platform === selectedPlatforms[0])
      );
    }

    // Chip/tag filter
    if (selectedChip !== 'All') {
      const chipLower = selectedChip.toLowerCase();
      result = result.filter(m => 
        m.tags.some(tag => tag.toLowerCase().includes(chipLower)) ||
        m.title.toLowerCase().includes(chipLower) ||
        m.canonicalQuestion.toLowerCase().includes(chipLower)
      );
    }

    // Sort
    result = sortGlobalMarkets(result, sortOption);

    return result;
  }, [deskMarkets, platformPresence, selectedPlatforms, selectedChip, sortOption]);

  // Select hero market(s) based on deskConfig.heroRule
  const heroMarkets = useMemo(() => {
    const crossListed = deskMarkets.filter(m => m.combined.platformCount >= 2);
    
    switch (deskConfig.heroRule) {
      case 'preferCrossListed':
        // Prefer cross-listed, sorted by volume
        if (crossListed.length > 0) {
          return crossListed
            .sort((a, b) => b.combined.combinedVolume - a.combined.combinedVolume)
            .slice(0, 2);
        }
        // Fallback to highest volume
        return [...deskMarkets]
          .sort((a, b) => b.combined.combinedVolume - a.combined.combinedVolume)
          .slice(0, 2);

      case 'preferVolume':
        return [...deskMarkets]
          .sort((a, b) => b.combined.combinedVolume - a.combined.combinedVolume)
          .slice(0, 2);

      case 'preferMovers':
        return [...deskMarkets]
          .sort((a, b) => {
            const aChange = Math.max(...a.listings.map(l => Math.abs(l.change24h || 0)));
            const bChange = Math.max(...b.listings.map(l => Math.abs(l.change24h || 0)));
            return bChange - aChange;
          })
          .slice(0, 2);

      default:
        return crossListed.slice(0, 2);
    }
  }, [deskMarkets, deskConfig.heroRule]);

  // Markets to display (excluding hero)
  const heroIds = heroMarkets.map(m => m.id);
  const displayMarkets = filteredMarkets.filter(m => !heroIds.includes(m.id));

  // Get featured story for hero
  const getFeaturedStoryForMarket = (market: GlobalMarket) => {
    return deskStories.find(story => 
      story.relatedMarketIds.includes(market.id) && story.featured
    ) || deskStories.find(story => 
      story.relatedMarketIds.includes(market.id)
    );
  };

  // Reset filters
  const handleClearFilters = () => {
    setPlatformPresence('all');
    setSelectedPlatforms(['kalshi', 'polymarket']);
    setSelectedChip('All');
    setSortOption('relevance');
  };

  // Determine hero badge text
  const getHeroBadge = (market: GlobalMarket, index: number) => {
    if (market.combined.platformCount >= 2) return 'Cross-Listed';
    if (deskConfig.heroRule === 'preferVolume') return 'Highest Volume';
    if (deskConfig.heroRule === 'preferMovers') return 'Top Mover';
    return index === 0 ? 'Featured' : 'Trending';
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container-wet py-4">
        {/* Breadcrumbs */}
        <nav className="text-xs text-text-muted mb-3">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-1.5">/</span>
          <span className="text-text-primary">{category.name}</span>
        </nav>

        {/* ===== DESK HEADER ===== */}
        <div className="mb-4 pb-4 border-b border-border">
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-1">
            {deskConfig.title}
          </h1>
          <p className="text-sm text-text-muted">
            {deskConfig.description}
          </p>
        </div>

        {/* ===== FILTER ROW 1: Chips (Market Tags) ===== */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-2 mb-3">
          {deskConfig.chipTags.map((chip) => (
            <button
              key={chip}
              onClick={() => setSelectedChip(chip)}
              className={cn(
                'flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full border transition-all',
                selectedChip === chip
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'bg-white text-text-secondary border-border hover:border-brand-primary hover:text-brand-primary'
              )}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* ===== FILTER ROW 2: Platform Presence + Sort ===== */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <PlatformPresenceFilter 
              value={platformPresence} 
              onChange={setPlatformPresence} 
            />
            <div className="w-px h-6 bg-border hidden sm:block" />
            <PlatformSelectorChips
              selected={selectedPlatforms}
              onChange={setSelectedPlatforms}
            />
          </div>
          
          <MarketSortDropdown
            value={sortOption}
            onChange={setSortOption}
            selectedPlatforms={selectedPlatforms}
          />
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left/Main: Market Feed (70%) */}
          <main className="lg:col-span-8">
            {/* Hero Zone: Featured Cross-Listed Markets */}
            {heroMarkets.length > 0 && platformPresence !== 'exclusive' && selectedChip === 'All' && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-0.5 h-5 bg-brand-primary rounded-full" />
                  <h2 className="text-xs font-bold text-text-primary uppercase tracking-wide">
                    Featured {category.name} Markets
                  </h2>
                </div>

                <div className="space-y-4">
                  {heroMarkets.map((market, index) => (
                    <FeaturedMarketHero
                      key={market.id}
                      market={market}
                      featuredStory={getFeaturedStoryForMarket(market)}
                      badge={getHeroBadge(market, index)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-text-muted">
                {displayMarkets.length} market{displayMarkets.length !== 1 ? 's' : ''} in {category.name}
              </span>
              {(platformPresence !== 'all' || selectedChip !== 'All') && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-brand-primary hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Market Feed with Attached Coverage */}
            {displayMarkets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayMarkets.map((market) => (
                  <DeskMarketCard
                    key={market.id}
                    market={market}
                    coverage={getMarketCoverage(market.id)}
                    selectedPlatforms={selectedPlatforms}
                  />
                ))}
              </div>
            ) : (
              <EmptyMarketState
                searchTerm={selectedChip !== 'All' ? selectedChip : undefined}
                onClearFilters={handleClearFilters}
              />
            )}

            {/* Load More (placeholder for pagination) */}
            {displayMarkets.length >= 6 && (
              <div className="mt-6 text-center">
                <button className="px-6 py-2 bg-bg-surface border border-border rounded-lg text-sm font-medium text-text-secondary hover:border-brand-primary hover:text-brand-primary transition-colors">
                  Load more markets
                </button>
              </div>
            )}

            {/* ===== BELOW THE FOLD: Coverage Highlights ===== */}
            {deskStories.length > 0 && (
              <div className="mt-8">
                <DeskCoverageHighlights
                  stories={deskStories}
                  markets={deskMarkets}
                  deskSlug={slug}
                  deskName={category.name}
                />
              </div>
            )}
          </main>

          {/* Right Rail: Trader Modules (30%) */}
          <aside className="lg:col-span-4 space-y-5">
            {/* Top Movers */}
            {deskConfig.railModules.includes('topMovers') && (
              <DeskTopMovers 
                markets={deskMarkets} 
                deskSlug={slug} 
              />
            )}

            {/* Biggest Divergence */}
            {deskConfig.railModules.includes('divergence') && (
              <DeskDivergence 
                markets={deskMarkets} 
                deskSlug={slug} 
              />
            )}

            {/* Highest Volume */}
            {deskConfig.railModules.includes('volume') && (
              <DeskVolume 
                markets={deskMarkets} 
                deskSlug={slug} 
              />
            )}

            {/* Catalyst Calendar */}
            {deskConfig.railModules.includes('calendar') && (
              <CatalystCalendarMini />
            )}

            {/* Go Deeper */}
            {deskConfig.railModules.includes('goDeeper') && (
              <DeskGoDeeper 
                deskSlug={slug} 
                deskName={category.name}
                explainerTitle={deskConfig.explainerTitle}
              />
            )}

            {/* Newsletter CTA */}
            {deskConfig.railModules.includes('briefCTA') && (
              <DeskNewsletterCTA deskName={category.name} />
            )}

            {/* Related Desks */}
            <div className="p-4 bg-bg-surface rounded-lg border border-border">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wide mb-3">
                Related Desks
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories
                  .filter(c => c.slug !== category.slug)
                  .slice(0, 5)
                  .map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="px-2.5 py-1 bg-white border border-border rounded text-xs text-text-secondary hover:text-brand-primary hover:border-brand-primary transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

