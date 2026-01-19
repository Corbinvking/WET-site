'use client';

import { cn } from '@/lib/utils';

export type PlatformPresence = 'all' | 'cross-listed' | 'exclusive';

interface PlatformPresenceFilterProps {
  value: PlatformPresence;
  onChange: (value: PlatformPresence) => void;
}

const options: { value: PlatformPresence; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'cross-listed', label: 'Cross-listed' },
  { value: 'exclusive', label: 'Exclusive' },
];

export function PlatformPresenceFilter({ value, onChange }: PlatformPresenceFilterProps) {
  return (
    <div className="inline-flex items-center bg-bg-surface rounded-lg border border-border p-0.5">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
            value === option.value
              ? 'bg-brand-primary text-white shadow-sm'
              : 'text-text-muted hover:text-text-primary hover:bg-bg-hover'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

