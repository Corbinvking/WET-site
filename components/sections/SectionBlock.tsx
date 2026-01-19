import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

export type SectionLayout = 'featureList' | 'threeCol' | 'twoUp' | 'carousel' | 'marketsGrid' | 'ctaBand';

interface SectionBlockProps {
  title: string;
  subtitle?: string;
  seeAllHref?: string;
  seeAllLabel?: string;
  layout?: SectionLayout;
  className?: string;
  children: React.ReactNode;
  noBorder?: boolean;
}

export function SectionBlock({
  title,
  subtitle,
  seeAllHref,
  seeAllLabel = 'See All',
  layout = 'featureList',
  className,
  children,
  noBorder = false,
}: SectionBlockProps) {
  const layoutClasses: Record<SectionLayout, string> = {
    featureList: 'grid grid-cols-1 lg:grid-cols-3 gap-5',
    threeCol: 'grid grid-cols-1 md:grid-cols-3 gap-5',
    twoUp: 'grid grid-cols-1 md:grid-cols-2 gap-5',
    carousel: 'flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4',
    marketsGrid: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3',
    ctaBand: 'flex flex-col md:flex-row items-center justify-center gap-4',
  };

  return (
    <section className={clsx('py-6', !noBorder && 'border-t border-border', className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Left accent bar */}
          <div className="w-0.5 h-5 bg-brand-primary rounded-full" />
          
          <div>
            <h2 className="text-xs font-bold text-text-primary uppercase tracking-wide">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[11px] text-text-muted mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        {seeAllHref && (
          <Link
            href={seeAllHref}
            className="text-[11px] font-medium text-brand-primary hover:underline transition-colors"
          >
            {seeAllLabel} →
          </Link>
        )}
      </div>

      {/* Content with layout */}
      <div className={layoutClasses[layout]}>
        {children}
      </div>
    </section>
  );
}

// Sub-components for specific section layouts

interface FeatureListProps {
  leadContent: React.ReactNode;
  listContent: React.ReactNode;
}

export function FeatureListLayout({ leadContent, listContent }: FeatureListProps) {
  return (
    <>
      {/* Lead item - 2 columns on large screens */}
      <div className="lg:col-span-2">
        {leadContent}
      </div>
      
      {/* List items - 1 column */}
      <div className="divide-y divide-border">
        {listContent}
      </div>
    </>
  );
}

interface ThreeColumnProps {
  columns: {
    title: string;
    leadContent?: React.ReactNode;
    listContent: React.ReactNode;
  }[];
}

export function ThreeColumnLayout({ columns }: ThreeColumnProps) {
  return (
    <>
      {columns.map((col, index) => (
        <div key={index} className="space-y-3">
          <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-wide border-b border-border pb-2">
            {col.title}
          </h3>
          {col.leadContent && <div className="mb-3">{col.leadContent}</div>}
          <div className="divide-y divide-border">
            {col.listContent}
          </div>
        </div>
      ))}
    </>
  );
}

export default SectionBlock;

