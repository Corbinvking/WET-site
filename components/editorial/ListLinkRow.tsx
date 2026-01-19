import Link from 'next/link';
import clsx from 'clsx';

interface ListLinkRowProps {
  title: string;
  href: string;
  delta?: number;
  timestamp?: string;
  className?: string;
}

export function ListLinkRow({ title, href, delta, timestamp, className }: ListLinkRowProps) {
  return (
    <Link
      href={href}
      className={clsx(
        'block py-2.5 group hover:bg-bg-hover/50 -mx-2 px-2 rounded transition-colors',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
          {title}
        </span>
        
        {delta !== undefined && (
          <span
            className={clsx(
              'flex-shrink-0 text-xs font-semibold flex items-center gap-0.5',
              delta >= 0 ? 'text-market-up' : 'text-market-down'
            )}
          >
            {delta >= 0 ? '▲' : '▼'}
            {Math.abs(delta).toFixed(1)}%
          </span>
        )}
      </div>
      
      {timestamp && (
        <span className="text-[10px] text-text-muted mt-1 block">
          {timestamp}
        </span>
      )}
    </Link>
  );
}


