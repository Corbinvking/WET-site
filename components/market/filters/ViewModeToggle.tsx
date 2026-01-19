'use client';

import { cn } from '@/lib/utils';

export type ViewMode = 'global' | 'listings';

interface ViewModeToggleProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  return (
    <div className="inline-flex items-center bg-bg-surface rounded-lg border border-border p-0.5">
      <button
        onClick={() => onChange('global')}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all',
          value === 'global'
            ? 'bg-brand-primary text-white shadow-sm'
            : 'text-text-muted hover:text-text-primary hover:bg-bg-hover'
        )}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Global Markets</span>
      </button>
      <button
        onClick={() => onChange('listings')}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all',
          value === 'listings'
            ? 'bg-brand-primary text-white shadow-sm'
            : 'text-text-muted hover:text-text-primary hover:bg-bg-hover'
        )}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        <span>Platform Listings</span>
      </button>
    </div>
  );
}


