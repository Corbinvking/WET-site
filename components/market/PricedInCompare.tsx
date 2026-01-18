interface PricedInCompareProps {
  pricedIn: string[];
  notPricedIn: string[];
}

export function PricedInCompare({ pricedIn, notPricedIn }: PricedInCompareProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Priced In Column */}
      <div className="p-3 bg-market-up/10 rounded border border-market-up/20">
        <h4 className="flex items-center gap-1.5 text-xs font-semibold text-market-up uppercase tracking-wide mb-2">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Priced In
        </h4>
        <ul className="space-y-1.5">
          {pricedIn.map((item, index) => (
            <li key={index} className="flex items-start gap-1.5 text-xs text-text-secondary">
              <span className="w-1 h-1 rounded-full bg-market-up mt-1.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Not Priced In Column */}
      <div className="p-3 bg-market-down/10 rounded border border-market-down/20">
        <h4 className="flex items-center gap-1.5 text-xs font-semibold text-market-down uppercase tracking-wide mb-2">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Not Priced In
        </h4>
        <ul className="space-y-1.5">
          {notPricedIn.map((item, index) => (
            <li key={index} className="flex items-start gap-1.5 text-xs text-text-secondary">
              <span className="w-1 h-1 rounded-full bg-market-down mt-1.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
