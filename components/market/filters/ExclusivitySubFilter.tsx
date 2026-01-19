'use client';

import { cn } from '@/lib/utils';
import type { Platform } from '@/data/markets';

export type ExclusivityOption = 'any' | Platform;

interface ExclusivitySubFilterProps {
  value: ExclusivityOption;
  onChange: (value: ExclusivityOption) => void;
}

const options: { value: ExclusivityOption; label: string }[] = [
  { value: 'any', label: 'Any Platform' },
  { value: 'kalshi', label: 'Kalshi Only' },
  { value: 'polymarket', label: 'Polymarket Only' },
];

export function ExclusivitySubFilter({ value, onChange }: ExclusivitySubFilterProps) {
  return (
    <div className="inline-flex items-center gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'px-2.5 py-1 text-[11px] font-medium rounded border transition-all',
            value === option.value
              ? 'bg-amber-100 border-amber-300 text-amber-800'
              : 'bg-bg-surface border-border text-text-muted hover:border-text-muted'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

