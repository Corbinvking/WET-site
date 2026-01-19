'use client';

interface EmptyMarketStateProps {
  onClearFilters?: () => void;
  searchTerm?: string;
}

export function EmptyMarketState({ onClearFilters, searchTerm }: EmptyMarketStateProps) {
  return (
    <div className="py-12 text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-bg-surface rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-text-primary mb-2">
        No markets found
      </h3>

      <p className="text-sm text-text-muted max-w-sm mx-auto mb-6">
        {searchTerm
          ? `No markets match "${searchTerm}" with your current filters.`
          : 'No markets match your current filter selection.'}
      </p>

      <div className="space-y-2">
        <p className="text-xs text-text-muted">Try:</p>
        <ul className="text-xs text-text-secondary space-y-1">
          <li>• Clear platform filters to see all markets</li>
          <li>• Select &quot;All&quot; category</li>
          {searchTerm && <li>• Use broader search keywords</li>}
        </ul>
      </div>

      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="mt-6 px-4 py-2 bg-brand-primary text-white text-sm font-medium rounded-lg hover:bg-brand-blue-dark transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}

