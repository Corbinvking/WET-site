interface MarketAngleCalloutProps {
  angle: string;
}

export function MarketAngleCallout({ angle }: MarketAngleCalloutProps) {
  return (
    <div className="relative p-3 bg-market-neutral-bg border-l-2 border-market-neutral rounded-r">
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0">
          <svg 
            className="w-4 h-4 text-market-neutral" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
            />
          </svg>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-market-neutral uppercase tracking-wide mb-0.5">
            Market Angle
          </h4>
          <p className="text-xs text-text-primary leading-relaxed">
            {angle}
          </p>
        </div>
      </div>
    </div>
  );
}
