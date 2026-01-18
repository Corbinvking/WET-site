interface CatalystsListProps {
  catalysts: string[];
}

export function CatalystsList({ catalysts }: CatalystsListProps) {
  return (
    <div className="p-3 bg-bg-surface rounded border border-border">
      <h4 className="flex items-center gap-1.5 text-xs font-semibold text-text-primary uppercase tracking-wide mb-2">
        <svg className="w-3 h-3 text-market-neutral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Catalysts to Watch
      </h4>
      <ul className="space-y-1.5">
        {catalysts.map((catalyst, index) => (
          <li key={index} className="flex items-start gap-1.5 text-xs text-text-secondary">
            <svg className="w-3 h-3 text-market-neutral mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {catalyst}
          </li>
        ))}
      </ul>
    </div>
  );
}
