import React from 'react';
import clsx from 'clsx';

interface TagPillProps {
  label: string;
  variant?: 'default' | 'breaking' | 'live' | 'analysis';
  className?: string;
}

export function TagPill({ label, variant = 'default', className }: TagPillProps) {
  const baseClasses = "inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide";
  
  const variantClasses = {
    default: "bg-bg-surface text-text-secondary",
    breaking: "bg-brand-red text-white",
    live: "bg-brand-red text-white",
    analysis: "bg-text-primary text-white",
  };

  // Auto-detect variant from label
  const autoVariant = 
    label.toLowerCase().includes('breaking') ? 'breaking' :
    label.toLowerCase().includes('live') ? 'live' :
    label.toLowerCase().includes('analysis') ? 'analysis' :
    variant;

  return (
    <span className={clsx(baseClasses, variantClasses[autoVariant], className)}>
      {autoVariant === 'live' && (
        <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse" />
      )}
      {label}
    </span>
  );
}
