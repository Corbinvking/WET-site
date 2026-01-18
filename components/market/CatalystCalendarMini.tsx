import Link from 'next/link';
import type { Market } from '@/data/markets';

interface CatalystCalendarMiniProps {
  markets: Market[];
}

interface Catalyst {
  date: string;
  event: string;
  marketTitle: string;
  marketSlug: string;
}

export function CatalystCalendarMini({ markets }: CatalystCalendarMiniProps) {
  // Collect all catalysts from all markets
  const allCatalysts: Catalyst[] = markets
    .flatMap(market => 
      market.catalysts.map(catalyst => ({
        date: catalyst.date,
        event: catalyst.event,
        marketTitle: market.title,
        marketSlug: market.slug,
      }))
    )
    .filter(c => new Date(c.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6);

  return (
    <div className="bg-bg-surface rounded overflow-hidden border border-border">
      <div className="bg-bg-elevated px-3 py-2">
        <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wide">
          Upcoming Catalysts
        </h3>
      </div>
      
      <div className="divide-y divide-border">
        {allCatalysts.map((catalyst, index) => (
          <Link
            key={`${catalyst.marketSlug}-${index}`}
            href={`/market/${catalyst.marketSlug}`}
            className="block px-3 py-2 hover:bg-bg-hover transition-colors group"
          >
            <div className="flex items-start gap-2">
              {/* Date Box */}
              <div className="flex-shrink-0 w-10 text-center">
                <div className="text-xs text-text-muted uppercase">
                  {new Date(catalyst.date).toLocaleDateString('en-US', { month: 'short' })}
                </div>
                <div className="text-sm font-bold text-text-primary">
                  {new Date(catalyst.date).getDate()}
                </div>
              </div>
              
              {/* Event Info */}
              <div className="flex-1 min-w-0">
                <div className="text-xs text-text-primary group-hover:underline line-clamp-1">
                  {catalyst.event}
                </div>
                <div className="text-xs text-text-muted line-clamp-1 mt-0.5">
                  {catalyst.marketTitle}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
