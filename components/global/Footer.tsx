import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/categories';

const footerLinks = {
  markets: [
    { label: 'All Markets', href: '/markets' },
    { label: 'Top Movers', href: '/markets?filter=movers' },
    { label: 'Divergence', href: '/markets?filter=divergence' },
    { label: 'Highest Volume', href: '/markets?filter=volume' },
    { label: 'Expiring Soon', href: '/markets?filter=expiring' },
    { label: 'New Markets', href: '/markets?filter=new' },
  ],
  politics: [
    { label: 'All Politics', href: '/category/politics' },
    { label: 'Trump', href: '/category/politics?topic=trump' },
    { label: 'Congress', href: '/category/politics?topic=congress' },
    { label: 'SCOTUS', href: '/category/politics?topic=scotus' },
    { label: 'Immigration', href: '/category/politics?topic=immigration' },
  ],
  economy: [
    { label: 'All Economy', href: '/category/economy' },
    { label: 'Fed', href: '/category/economy?topic=fed' },
    { label: 'CPI/Inflation', href: '/category/economy?topic=cpi' },
    { label: 'Jobs', href: '/category/economy?topic=jobs' },
    { label: 'Interest Rates', href: '/category/economy?topic=rates' },
  ],
  world: [
    { label: 'All World', href: '/category/world' },
    { label: 'Ukraine', href: '/category/world?topic=ukraine' },
    { label: 'Middle East', href: '/category/world?topic=middle-east' },
    { label: 'China', href: '/category/world?topic=china' },
    { label: 'Trade', href: '/category/world?topic=trade' },
  ],
  elections: [
    { label: 'All Elections', href: '/category/elections' },
    { label: '2026 Midterms', href: '/category/elections?topic=midterms' },
    { label: 'Senate', href: '/category/elections?topic=senate' },
    { label: 'House', href: '/category/elections?topic=house' },
    { label: 'Polling', href: '/category/elections?topic=polling' },
  ],
  crypto: [
    { label: 'All Crypto', href: '/category/crypto' },
    { label: 'Bitcoin', href: '/category/crypto?topic=bitcoin' },
    { label: 'Ethereum', href: '/category/crypto?topic=ethereum' },
    { label: 'ETFs', href: '/category/crypto?topic=etfs' },
    { label: 'Regulation', href: '/category/crypto?topic=regulation' },
  ],
  tech: [
    { label: 'All Tech', href: '/category/tech' },
    { label: 'AI', href: '/category/tech?topic=ai' },
    { label: 'Big Tech', href: '/category/tech?topic=big-tech' },
    { label: 'Antitrust', href: '/category/tech?topic=antitrust' },
    { label: 'Startups', href: '/category/tech?topic=startups' },
  ],
  sports: [
    { label: 'All Sports', href: '/category/sports' },
    { label: 'NFL', href: '/category/sports?topic=nfl' },
    { label: 'NBA', href: '/category/sports?topic=nba' },
    { label: 'MLB', href: '/category/sports?topic=mlb' },
    { label: 'Futures', href: '/category/sports?topic=futures' },
  ],
  watch: [
    { label: 'All Videos', href: '/watch' },
    { label: 'Daily Brief', href: '/watch?series=daily-brief' },
    { label: 'Deep Dives', href: '/watch?series=deep-dives' },
    { label: 'Explainers', href: '/watch?series=explainers' },
    { label: 'Podcasts', href: '/listen' },
  ],
  about: [
    { label: 'About W.E.T.', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
    { label: 'Newsletter', href: '/subscribe' },
    { label: 'Disclaimer', href: '/disclaimer' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-bg-dark text-text-inverse border-t border-slate-800">
      {/* Subtle blue gradient line at top */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50" />
      
      {/* Search Bar Section */}
      <div className="container-wet py-5 border-b border-slate-800">
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search W.E.T. for markets, stories, and more..."
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Footer Links Grid - 10 Columns */}
      <div className="container-wet py-8 lg:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-5 lg:gap-4">
          {/* Markets */}
          <div>
            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-3">
              Markets
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.markets.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[11px] text-slate-400 hover:text-brand-primary transition-colors leading-tight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Politics */}
          <div>
            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-3">
              Politics
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.politics.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[11px] text-slate-400 hover:text-brand-primary transition-colors leading-tight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Economy */}
          <div>
            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-3">
              Economy
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.economy.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[11px] text-slate-400 hover:text-brand-primary transition-colors leading-tight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* World */}
          <div>
            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-3">
              World
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.world.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[11px] text-slate-400 hover:text-brand-primary transition-colors leading-tight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Elections */}
          <div>
            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-3">
              Elections
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.elections.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[11px] text-slate-400 hover:text-brand-primary transition-colors leading-tight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Crypto */}
          <div>
            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-3">
              Crypto
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.crypto.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[11px] text-slate-400 hover:text-brand-primary transition-colors leading-tight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div>
            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-3">
              Tech
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.tech.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[11px] text-slate-400 hover:text-brand-primary transition-colors leading-tight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sports */}
          <div>
            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-3">
              Sports
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.sports.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[11px] text-slate-400 hover:text-brand-primary transition-colors leading-tight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Watch/Listen */}
          <div>
            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-3">
              Watch
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.watch.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[11px] text-slate-400 hover:text-brand-primary transition-colors leading-tight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-3">
              About
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[11px] text-slate-400 hover:text-brand-primary transition-colors leading-tight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Logo & Social Row */}
      <div className="container-wet py-5 border-t border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="W.E.T."
                width={40}
                height={40}
                className="object-contain"
              />
            </Link>
            <div>
              <p className="text-xs font-semibold text-white">World Event Trading</p>
              <p className="text-[10px] text-slate-500">The newsroom for prediction market traders</p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-1">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon p-2 text-slate-400 hover:text-brand-primary rounded-full hover:bg-slate-800 transition-all"
              aria-label="Twitter"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon p-2 text-slate-400 hover:text-brand-primary rounded-full hover:bg-slate-800 transition-all"
              aria-label="Discord"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon p-2 text-slate-400 hover:text-brand-primary rounded-full hover:bg-slate-800 transition-all"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon p-2 text-slate-400 hover:text-brand-primary rounded-full hover:bg-slate-800 transition-all"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="mailto:hello@wet.news"
              className="social-icon p-2 text-slate-400 hover:text-brand-primary rounded-full hover:bg-slate-800 transition-all"
              aria-label="Email"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Utility Bar */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="container-wet py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500">
            {/* Copyright */}
            <p>
              © {new Date().getFullYear()} W.E.T. World Event Trading. All rights reserved.
            </p>
            
            {/* Utility Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <Link href="/terms" className="hover:text-brand-primary transition-colors">
                Terms of Service
              </Link>
              <span className="hidden sm:inline">•</span>
              <Link href="/privacy" className="hover:text-brand-primary transition-colors">
                Privacy Policy
              </Link>
              <span className="hidden sm:inline">•</span>
              <Link href="/accessibility" className="hover:text-brand-primary transition-colors">
                Accessibility
              </Link>
              <span className="hidden sm:inline">•</span>
              <Link href="/contact" className="hover:text-brand-primary transition-colors">
                Contact Us
              </Link>
              <span className="hidden sm:inline">•</span>
              <Link href="/ad-choices" className="hover:text-brand-primary transition-colors">
                Ad Choices
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="flex items-center gap-1 text-center sm:text-right">
              <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
              Data for informational purposes only. Not financial advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
