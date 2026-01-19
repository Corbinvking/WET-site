'use client';

import { cn } from '@/lib/utils';

export type PlatformPresence = 'all' | 'cross-listed' | 'exclusive';

interface PlatformPresenceFilterProps {
  value: PlatformPresence;
  onChange: (value: PlatformPresence) => void;
  compact?: boolean;
}

const options: { value: PlatformPresence; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'cross-listed', label: 'Cross-listed' },
  { value: 'exclusive', label: 'Exclusive' },
];

export function PlatformPresenceFilter({ value, onChange, compact = false }: PlatformPresenceFilterProps) {
  return (
    <div className={cn(
      'inline-flex items-center rounded-lg',
      compact ? 'gap-1' : 'bg-bg-surface border border-border p-0.5'
    )}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'font-medium rounded-md transition-all',
            compact ? 'px-1.5 py-0.5 text-[10px]' : 'px-3 py-1.5 text-xs',
            value === option.value
              ? compact 
                ? 'bg-brand-primary/10 text-brand-primary'
                : 'bg-brand-primary text-white shadow-sm'
              : 'text-text-muted hover:text-text-primary hover:bg-bg-hover'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

