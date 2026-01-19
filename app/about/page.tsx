import Link from 'next/link';

export const metadata = {
  title: 'About | W.E.T.',
  description: 'Learn about W.E.T. - World Event Trading, the newsroom built for prediction market traders.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container-wet py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              About <span className="text-brand">W.E.T.</span>
            </h1>
            <p className="text-xl text-text-muted">
              World Event Trading
            </p>
          </div>

          {/* Mission */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Our Mission
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              W.E.T. is building the best information brokerage experience for prediction market traders. 
              We combine the editorial clarity of traditional newsrooms with the market-native thinking 
              that serious traders demand.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Every story we publish is framed through the lens of prediction markets. What&apos;s priced in? 
              What isn&apos;t? What are the catalysts? Where do platforms diverge? These are the questions 
              that matter to our readers.
            </p>
          </section>

          {/* What We Do */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              What We Do
            </h2>
            <div className="grid gap-6">
              <div className="p-6 bg-bg-surface rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Market-Native Coverage
                </h3>
                <p className="text-text-muted">
                  We don&apos;t just report news—we connect every story to the prediction markets 
                  that trade on its outcome. Odds, volume, divergence, and catalysts are 
                  front and center.
                </p>
              </div>
              <div className="p-6 bg-bg-surface rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Platform Comparison
                </h3>
                <p className="text-text-muted">
                  We aggregate data from Kalshi and Polymarket, highlighting divergences 
                  that may indicate arbitrage opportunities or platform-specific information.
                </p>
              </div>
              <div className="p-6 bg-bg-surface rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Catalyst Tracking
                </h3>
                <p className="text-text-muted">
                  Every market has catalysts—events that will move the odds. We track 
                  upcoming catalysts and help you understand what to watch for.
                </p>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Our Values
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-text-primary">Clarity over complexity.</span>
                  <span className="text-text-muted"> We make market-relevant information easy to scan and understand.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-text-primary">Markets as truth.</span>
                  <span className="text-text-muted"> We believe prediction markets offer valuable signals about future events.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-text-primary">Trader-first design.</span>
                  <span className="text-text-muted"> Every feature is built with active traders in mind.</span>
                </div>
              </li>
            </ul>
          </section>

          {/* CTA */}
          <section className="text-center p-8 bg-brand/10 border border-brand/20 rounded-lg">
            <h2 className="text-2xl font-bold text-text-primary mb-3">
              Join the Community
            </h2>
            <p className="text-text-muted mb-6">
              Stay informed with daily market-native coverage delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-2.5 bg-brand hover:bg-brand-hover text-white font-medium rounded transition-colors">
                Subscribe Now
              </button>
              <Link 
                href="/contact"
                className="px-6 py-2.5 bg-bg-surface hover:bg-bg-hover border border-border text-text-primary font-medium rounded transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}



