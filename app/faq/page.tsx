import Link from 'next/link';

export const metadata = {
  title: 'FAQ | W.E.T.',
  description: 'Frequently asked questions about W.E.T. and prediction market trading.',
};

const faqs = [
  {
    question: 'What is W.E.T.?',
    answer: 'W.E.T. (World Event Trading) is a newsroom built specifically for prediction market traders. We provide market-native coverage of world events, connecting every story to the prediction markets that trade on its outcome.',
  },
  {
    question: 'What are prediction markets?',
    answer: 'Prediction markets are platforms where people can trade on the outcomes of future events. Participants buy and sell contracts based on their beliefs about what will happen, with prices reflecting the crowd\'s collective probability estimate.',
  },
  {
    question: 'What platforms do you cover?',
    answer: 'We currently cover Kalshi (a CFTC-regulated US exchange) and Polymarket (a crypto-based prediction market). We compare odds across both platforms to help traders identify divergences and opportunities.',
  },
  {
    question: 'What does "priced in" mean?',
    answer: 'When something is "priced in," it means the market has already incorporated that information or expectation into the current odds. If a piece of news doesn\'t move the market, it was likely already priced in.',
  },
  {
    question: 'What is a market divergence?',
    answer: 'A divergence occurs when the same event has different odds on different platforms (e.g., Kalshi shows 40% while Polymarket shows 35%). This could indicate an arbitrage opportunity or reflect platform-specific information or liquidity differences.',
  },
  {
    question: 'How do I trade on prediction markets?',
    answer: 'To trade on Kalshi, you need to create an account and verify your identity (US residents only). Polymarket uses cryptocurrency and is accessible to users in many jurisdictions. We recommend doing your own research on each platform\'s requirements and risks.',
  },
  {
    question: 'Is this financial advice?',
    answer: 'No. W.E.T. provides information and analysis for educational purposes only. We are not financial advisors, and nothing on this site should be construed as financial advice. Prediction market trading involves risk, and you should only trade with money you can afford to lose.',
  },
  {
    question: 'How do I subscribe?',
    answer: 'Click the "Subscribe" button in the header or any subscription box on the site. Free subscribers get access to daily headlines and community content. Premium subscribers get additional features including detailed analysis and alerts.',
  },
  {
    question: 'How can I contact you?',
    answer: 'You can reach us through our contact page or via social media. We welcome feedback, story tips, and partnership inquiries.',
  },
  {
    question: 'Do you have a community?',
    answer: 'Yes! We have an active community on Discord where traders discuss markets, share insights, and get early access to new features. Subscribe to get access.',
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container-wet py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-text-muted">
              Everything you need to know about W.E.T. and prediction markets.
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="p-6 bg-bg-surface rounded-lg border border-border"
              >
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  {faq.question}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Still have questions? */}
          <div className="mt-12 text-center p-8 bg-bg-surface rounded-lg border border-border">
            <h2 className="text-xl font-semibold text-text-primary mb-3">
              Still have questions?
            </h2>
            <p className="text-text-muted mb-6">
              We&apos;re here to help. Reach out and we&apos;ll get back to you as soon as possible.
            </p>
            <Link 
              href="/contact"
              className="inline-block px-6 py-2.5 bg-brand hover:bg-brand-hover text-white font-medium rounded transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}



