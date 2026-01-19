'use client';

import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

// Desk-specific subtopics (chips) that map to market catalysts/entities
const deskChips: Record<string, string[]> = {
  politics: ['Trump', 'Congress', 'SCOTUS', 'Immigration', 'Debates', 'Polling', 'Cabinet'],
  economy: ['CPI', 'Jobs Report', 'Fed', 'GDP', 'Interest Rates', 'Oil', 'Housing'],
  world: ['Ukraine', 'Middle East', 'China', 'Trade', 'NATO', 'Climate', 'Diplomacy'],
  elections: ['2026 Midterms', 'Polling', 'Senate', 'House', 'Governors', 'Primary'],
  crypto: ['Bitcoin', 'Ethereum', 'ETFs', 'Regulation', 'Exchanges', 'DeFi', 'Stablecoins'],
  tech: ['AI', 'Antitrust', 'Big Tech', 'Startups', 'Chips', 'Social Media'],
  sports: ['NFL', 'NBA', 'MLB', 'Playoffs', 'Futures', 'Injuries', 'Trades'],
  geopolitics: ['Diplomacy', 'Conflicts', 'Sanctions', 'Alliances', 'Trade Wars'],
};

interface DeskSubNavProps {
  categorySlug: string;
  activeChip?: string;
  className?: string;
}

export function DeskSubNav({ categorySlug, activeChip, className }: DeskSubNavProps) {
  const [selected, setSelected] = useState(activeChip || 'all');
  const chips = deskChips[categorySlug] || deskChips.politics;

  return (
    <div className={clsx('flex items-center gap-2 overflow-x-auto scrollbar-hide py-2', className)}>
      {/* All chip */}
      <button
        onClick={() => setSelected('all')}
        className={clsx(
          'flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full border transition-all',
          selected === 'all'
            ? 'bg-brand-primary text-white border-brand-primary'
            : 'bg-white text-text-secondary border-border hover:border-brand-primary hover:text-brand-primary'
        )}
      >
        All
      </button>

      {/* Category-specific chips */}
      {chips.map((chip) => {
        const chipSlug = chip.toLowerCase().replace(/\s+/g, '-');
        return (
          <button
            key={chip}
            onClick={() => setSelected(chipSlug)}
            className={clsx(
              'flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full border transition-all',
              selected === chipSlug
                ? 'bg-brand-primary text-white border-brand-primary'
                : 'bg-white text-text-secondary border-border hover:border-brand-primary hover:text-brand-primary'
            )}
          >
            {chip}
          </button>
        );
      })}
    </div>
  );
}

export { deskChips };

