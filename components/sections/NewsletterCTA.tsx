'use client';

import { useState } from 'react';
import { SectionBlock } from './SectionBlock';

export function NewsletterCTA() {
  const [email, setEmail] = useState('');

  return (
    <SectionBlock
      title="Daily Market Brief"
      noBorder
      layout="ctaBand"
      className="bg-gradient-to-r from-blue-50 to-slate-50 -mx-4 px-4 md:-mx-8 md:px-8 rounded-lg"
    >
      <div className="text-center md:text-left">
        <h3 className="text-lg font-bold text-text-primary mb-1">
          Get the daily market brief
        </h3>
        <p className="text-sm text-text-secondary">
          Prediction market insights delivered to your inbox. No spam, ever.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2.5 bg-white border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all w-full sm:w-64"
        />
        <button className="btn-primary px-6 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap">
          Subscribe Free
        </button>
      </div>
      
      <p className="text-[11px] text-text-muted text-center md:text-left">
        Join 10,000+ traders. Unsubscribe anytime.
      </p>
    </SectionBlock>
  );
}


