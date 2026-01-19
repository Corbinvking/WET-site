import Link from 'next/link';
import { SectionBlock } from './SectionBlock';

const explainers = [
  {
    title: 'How to Read Prediction Markets: A Beginner\'s Guide',
    slug: 'how-to-read-prediction-markets',
    category: 'Explainer',
    summary: 'Understanding probability, liquidity, and what market prices really mean for future events.',
  },
  {
    title: 'Kalshi vs Polymarket: Platform Comparison & When Prices Diverge',
    slug: 'kalshi-vs-polymarket-comparison',
    category: 'Analysis',
    summary: 'Why the same question can have different prices on different platforms, and how to spot opportunity.',
  },
];

export function ExplainersSection() {
  return (
    <SectionBlock
      title="Market Explainers"
      subtitle="Understand how prediction markets work"
      seeAllHref="/explainers"
      layout="twoUp"
    >
      {explainers.map((explainer) => (
        <Link
          key={explainer.slug}
          href={`/story/${explainer.slug}`}
          className="group"
        >
          <article className="relative">
            {/* Large image placeholder */}
            <div className="story-image image-hover relative aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden mb-3">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              
              {/* Category tag */}
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded ${
                  explainer.category === 'Explainer' 
                    ? 'bg-brand-gold text-white' 
                    : 'bg-brand-primary text-white'
                }`}>
                  {explainer.category}
                </span>
              </div>
            </div>
            
            {/* Headline */}
            <h3 className="headline-medium group-hover:text-brand-primary transition-colors mb-2">
              {explainer.title}
            </h3>
            
            {/* Summary */}
            <p className="text-sm text-text-secondary line-clamp-2">
              {explainer.summary}
            </p>
          </article>
        </Link>
      ))}
    </SectionBlock>
  );
}

