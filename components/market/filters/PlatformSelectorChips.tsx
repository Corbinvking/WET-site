'use client';

import { cn } from '@/lib/utils';
import type { Platform } from '@/data/markets';

interface PlatformSelectorChipsProps {
  selected: Platform[];
  onChange: (platforms: Platform[]) => void;
  compact?: boolean;
}

const platforms: { value: Platform; label: string; shortLabel: string }[] = [
  { value: 'kalshi', label: 'Kalshi', shortLabel: 'K' },
  { value: 'polymarket', label: 'Polymarket', shortLabel: 'P' },
];

export function PlatformSelectorChips({ selected, onChange, compact = false }: PlatformSelectorChipsProps) {
  const togglePlatform = (platform: Platform) => {
    if (selected.includes(platform)) {
      // Don't allow deselecting all platforms
      if (selected.length > 1) {
        onChange(selected.filter(p => p !== platform));
      }
    } else {
      onChange([...selected, platform]);
    }
  };

  return (
    <div className="inline-flex items-center gap-1">
      {platforms.map((platform) => {
        const isSelected = selected.includes(platform.value);
        return (
          <button
            key={platform.value}
            onClick={() => togglePlatform(platform.value)}
            className={cn(
              'inline-flex items-center font-medium rounded-md transition-all',
              compact 
                ? 'gap-1 px-1.5 py-0.5 text-[10px]' 
                : 'gap-1.5 px-2.5 py-1.5 text-xs border',
              isSelected
                ? compact
                  ? 'text-brand-primary'
                  : 'bg-brand-primary/10 border-brand-primary text-brand-primary'
                : compact
                  ? 'text-text-muted hover:text-brand-primary'
                  : 'bg-bg-surface border-border text-text-muted hover:border-text-muted'
            )}
          >
            <span
              className={cn(
                'rounded-sm flex items-center justify-center font-bold',
                compact ? 'w-3 h-3 text-[8px]' : 'w-4 h-4 text-[10px]',
                isSelected
                  ? 'bg-brand-primary text-white'
                  : 'bg-bg-hover text-text-muted'
              )}
            >
              {platform.shortLabel}
            </span>
            {!compact && <span className="hidden sm:inline">{platform.label}</span>}
          </button>
        );
      })}
    </div>
  );
}

