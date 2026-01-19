'use client';

import { cn } from '@/lib/utils';
import type { Platform } from '@/data/markets';

interface PlatformSelectorChipsProps {
  selected: Platform[];
  onChange: (platforms: Platform[]) => void;
}

const platforms: { value: Platform; label: string; shortLabel: string }[] = [
  { value: 'kalshi', label: 'Kalshi', shortLabel: 'K' },
  { value: 'polymarket', label: 'Polymarket', shortLabel: 'P' },
];

export function PlatformSelectorChips({ selected, onChange }: PlatformSelectorChipsProps) {
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
              'inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border transition-all',
              isSelected
                ? 'bg-brand-primary/10 border-brand-primary text-brand-primary'
                : 'bg-bg-surface border-border text-text-muted hover:border-text-muted'
            )}
          >
            <span
              className={cn(
                'w-4 h-4 rounded-sm flex items-center justify-center text-[10px] font-bold',
                isSelected
                  ? 'bg-brand-primary text-white'
                  : 'bg-bg-hover text-text-muted'
              )}
            >
              {platform.shortLabel}
            </span>
            <span className="hidden sm:inline">{platform.label}</span>
          </button>
        );
      })}
    </div>
  );
}

