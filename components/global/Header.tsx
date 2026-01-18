'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/categories';

const navItems = [
  { label: 'All Markets', href: '/markets', isHighlight: true },
  ...categories.slice(0, 7).map(cat => ({
    label: cat.name,
    href: `/category/${cat.slug}`,
  })),
  { label: 'More', href: '#', hasDropdown: true },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container-wet">
        <nav className="flex items-center justify-between h-12">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 -ml-1.5 text-text-muted hover:text-brand-primary transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo.png"
                alt="W.E.T."
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Center: Main Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center">
            <ul className="flex items-center">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      'isHighlight' in item && item.isHighlight
                        ? 'text-brand-primary hover:text-brand-primary/80 font-semibold'
                        : 'text-text-primary hover:text-brand-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Watch, Listen, Search, Subscribe, Sign In */}
          <div className="flex items-center gap-1">
            {/* Watch with Live Indicator - keep red for live */}
            <Link
              href="/watch"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-text-primary hover:text-brand-primary transition-colors"
            >
              <span className="relative flex items-center gap-1.5">
                <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-brand-red bg-red-50 px-1 rounded">LIVE</span>
              </span>
              Watch
            </Link>

            {/* Listen */}
            <Link
              href="/listen"
              className="hidden md:flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-text-primary hover:text-brand-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 0112.728 0" />
              </svg>
              Listen
            </Link>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-text-muted hover:text-brand-primary transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Subscribe - Blue accent */}
            <Link
              href="/subscribe"
              className="hidden sm:block px-3 py-1.5 text-xs font-bold text-white bg-brand-primary rounded hover:bg-brand-primary/90 transition-colors"
            >
              Subscribe
            </Link>

            {/* Sign In */}
            <Link
              href="/signin"
              className="hidden sm:block px-3 py-1.5 text-xs font-medium text-text-primary border border-border rounded hover:border-brand-primary hover:text-brand-primary transition-colors"
            >
              Sign In
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Menu (Overlay) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 lg:hidden">
          <div className="flex justify-between items-center h-12 border-b border-border px-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="W.E.T."
                width={40}
                height={40}
                className="object-contain"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-text-muted hover:text-brand-primary transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col p-4 space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 py-2 text-base font-medium transition-colors ${
                    'isHighlight' in item && item.isHighlight
                      ? 'text-brand-primary font-semibold'
                      : 'text-text-primary hover:text-brand-primary'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-start justify-center pt-20 px-4" onClick={() => setSearchOpen(false)}>
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-4 glow-accent" onClick={e => e.stopPropagation()}>
            <div className="flex items-center border-2 border-brand-primary rounded-lg px-4 py-3">
              <svg className="w-5 h-5 text-brand-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search W.E.T. for stories, markets, topics..."
                className="flex-1 bg-transparent outline-none text-text-primary placeholder-text-muted text-lg"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-text-muted hover:text-brand-primary transition-colors ml-2"
                aria-label="Close search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
