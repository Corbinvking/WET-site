export const metadata = {
  title: 'Contact | W.E.T.',
  description: 'Get in touch with the W.E.T. team.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container-wet py-12 lg:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              Contact Us
            </h1>
            <p className="text-text-muted">
              Have a question, feedback, or story tip? We&apos;d love to hear from you.
            </p>
          </div>

          {/* Contact Form (UI only) */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-brand transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-brand transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                className="w-full px-4 py-3 bg-bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-brand transition-colors"
              >
                <option value="">Select a topic...</option>
                <option value="general">General Inquiry</option>
                <option value="feedback">Feedback</option>
                <option value="story-tip">Story Tip</option>
                <option value="partnership">Partnership</option>
                <option value="bug-report">Bug Report</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-3 bg-bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-brand transition-colors resize-none"
                placeholder="Tell us what's on your mind..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand hover:bg-brand-hover text-white font-medium rounded-lg transition-colors"
            >
              Send Message
            </button>
          </form>

          {/* Alternative Contact */}
          <div className="mt-12 p-6 bg-bg-surface rounded-lg border border-border">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Other Ways to Reach Us
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="text-text-muted">@WETnewsroom</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                <span className="text-text-muted">discord.gg/wetnewsroom</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-text-muted">hello@wet.news</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



