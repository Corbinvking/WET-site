'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { Platform } from '@/data/markets';

export type SortOption = 
  | 'relevance'
  | 'change-24h'
  | 'newest'
  | 'expiring-soonest'
  | 'volume-combined'
  | 'volume-kalshi'
  | 'volume-polymarket'
  | 'yes-highest'
  | 'yes-lowest'
  | 'divergence'
  | 'divergence-k-higher'
  | 'divergence-p-higher';

interface SortGroup {
  label: string;
  options: { value: SortOption; label: string; platform?: Platform }[];
}

const sortGroups: SortGroup[] = [
  {
    label: 'Relevance',
    options: [
      { value: 'relevance', label: 'Relevance' },
    ],
  },
  {
    label: 'Activity',
    options: [
      { value: 'change-24h', label: '24h Change' },
      { value: 'newest', label: 'Newest Listings' },
      { value: 'expiring-soonest', label: 'Expiring Soonest' },
    ],
  },
  {
    label: 'Volume',
    options: [
      { value: 'volume-combined', label: 'Combined Volume' },
      { value: 'volume-kalshi', label: 'Kalshi Volume', platform: 'kalshi' },
      { value: 'volume-polymarket', label: 'Polymarket Volume', platform: 'polymarket' },
    ],
  },
  {
    label: 'Pricing',
    options: [
      { value: 'yes-highest', label: 'Highest Yes%' },
      { value: 'yes-lowest', label: 'Lowest Yes%' },
    ],
  },
  {
    label: 'Cross-Platform',
    options: [
      { value: 'divergence', label: 'Divergence' },
      { value: 'divergence-k-higher', label: 'Kalshi > Polymarket' },
      { value: 'divergence-p-higher', label: 'Polymarket > Kalshi' },
    ],
  },
];

interface MarketSortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  selectedPlatforms?: Platform[];
}

export function MarketSortDropdown({
  value,
  onChange,
  selectedPlatforms = ['kalshi', 'polymarket'],
}: MarketSortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get current sort label
  const getCurrentLabel = () => {
    for (const group of sortGroups) {
      const option = group.options.find(o => o.value === value);
      if (option) return option.label;
    }
    return 'Relevance';
  };

  // Check if option should be disabled based on selected platforms
  const isOptionDisabled = (option: { value: SortOption; platform?: Platform }) => {
    if (!option.platform) return false;
    return !selectedPlatforms.includes(option.platform);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-bg-surface border border-border rounded-lg text-xs text-text-primary hover:border-brand-primary transition-colors"
      >
        <span className="text-text-muted">Sort:</span>
        <span className="font-medium">{getCurrentLabel()}</span>
        <svg
          className={cn('w-3.5 h-3.5 text-text-muted transition-transform', isOpen && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 mt-1 w-56 bg-bg-elevated border border-border rounded-lg shadow-lg overflow-hidden">
          {sortGroups.map((group, groupIndex) => (
            <div key={group.label}>
              {groupIndex > 0 && <div className="border-t border-border" />}
              <div className="px-3 py-1.5 bg-bg-surface">
                <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">
                  {group.label}
                </span>
              </div>
              {group.options.map((option) => {
                const disabled = isOptionDisabled(option);
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      if (!disabled) {
                        onChange(option.value);
                        setIsOpen(false);
                      }
                    }}
                    disabled={disabled}
                    className={cn(
                      'w-full px-3 py-2 text-left text-xs transition-colors flex items-center justify-between',
                      value === option.value
                        ? 'bg-brand-primary/10 text-brand-primary font-medium'
                        : disabled
                        ? 'text-text-subtle cursor-not-allowed'
                        : 'text-text-primary hover:bg-bg-hover'
                    )}
                  >
                    <span>{option.label}</span>
                    {option.platform && (
                      <span className={cn(
                        'w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold',
                        option.platform === 'kalshi' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                      )}>
                        {option.platform === 'kalshi' ? 'K' : 'P'}
                      </span>
                    )}
                    {value === option.value && (
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Sort function implementation
export function sortGlobalMarkets<T extends { 
  combined: { combinedVolume: number; divergence: number | null };
  listings: Array<{ platform: string; yesProbability: number | null; volume: number | null; change24h: number | null }>;
  expiryDate: string | null;
}>(markets: T[], sortOption: SortOption): T[] {
  const sorted = [...markets];

  switch (sortOption) {
    case 'relevance':
      // Default order (no sort)
      return sorted;

    case 'change-24h':
      return sorted.sort((a, b) => {
        const aChange = Math.max(...a.listings.map(l => Math.abs(l.change24h || 0)));
        const bChange = Math.max(...b.listings.map(l => Math.abs(l.change24h || 0)));
        return bChange - aChange;
      });

    case 'newest':
      // Sort by most recently updated (would need updatedAt field, using reverse order as proxy)
      return sorted.reverse();

    case 'expiring-soonest':
      return sorted
        .filter(m => m.expiryDate)
        .sort((a, b) => new Date(a.expiryDate!).getTime() - new Date(b.expiryDate!).getTime());

    case 'volume-combined':
      return sorted.sort((a, b) => b.combined.combinedVolume - a.combined.combinedVolume);

    case 'volume-kalshi':
      return sorted.sort((a, b) => {
        const aVol = a.listings.find(l => l.platform === 'kalshi')?.volume || 0;
        const bVol = b.listings.find(l => l.platform === 'kalshi')?.volume || 0;
        return bVol - aVol;
      });

    case 'volume-polymarket':
      return sorted.sort((a, b) => {
        const aVol = a.listings.find(l => l.platform === 'polymarket')?.volume || 0;
        const bVol = b.listings.find(l => l.platform === 'polymarket')?.volume || 0;
        return bVol - aVol;
      });

    case 'yes-highest':
      return sorted.sort((a, b) => {
        const aYes = Math.max(...a.listings.map(l => l.yesProbability || 0));
        const bYes = Math.max(...b.listings.map(l => l.yesProbability || 0));
        return bYes - aYes;
      });

    case 'yes-lowest':
      return sorted.sort((a, b) => {
        const aYes = Math.min(...a.listings.filter(l => l.yesProbability !== null).map(l => l.yesProbability!));
        const bYes = Math.min(...b.listings.filter(l => l.yesProbability !== null).map(l => l.yesProbability!));
        return aYes - bYes;
      });

    case 'divergence':
      return sorted
        .filter(m => m.combined.divergence !== null)
        .sort((a, b) => (b.combined.divergence || 0) - (a.combined.divergence || 0));

    case 'divergence-k-higher':
      return sorted
        .filter(m => {
          const kYes = m.listings.find(l => l.platform === 'kalshi')?.yesProbability;
          const pYes = m.listings.find(l => l.platform === 'polymarket')?.yesProbability;
          return kYes !== null && pYes !== null && kYes! > pYes!;
        })
        .sort((a, b) => (b.combined.divergence || 0) - (a.combined.divergence || 0));

    case 'divergence-p-higher':
      return sorted
        .filter(m => {
          const kYes = m.listings.find(l => l.platform === 'kalshi')?.yesProbability;
          const pYes = m.listings.find(l => l.platform === 'polymarket')?.yesProbability;
          return kYes !== null && pYes !== null && pYes! > kYes!;
        })
        .sort((a, b) => (b.combined.divergence || 0) - (a.combined.divergence || 0));

    default:
      return sorted;
  }
}

