'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/categories';

// Main visible nav items (6 categories + Event Calendar)
const navItems = [
  { label: 'All Markets', href: '/markets', isHighlight: true },
  ...categories.slice(0, 6).map(cat => ({
    label: cat.name,
    href: `/category/${cat.slug}`,
  })),
  { label: 'Event Calendar', href: '/calendar', isHighlight: false },
];

// Dropdown items for "More" (includes Sports + other categories)
const moreItems = [
  { label: 'Sports', href: '/category/sports' },
  { label: 'Culture', href: '/category/culture' },
  { label: 'Climate & Science', href: '/category/climate' },
  { label: 'Mentions', href: '/category/mentions' },
  { label: 'Earnings', href: '/category/earnings' },
  { label: 'Finances', href: '/category/finances' },
  { label: 'Health', href: '/category/health' },
  { label: 'Entertainment', href: '/category/entertainment' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            
            {/* Logo + Branding */}
            <Link href="/" className="flex items-center gap-2 group transition-all duration-200 hover:opacity-80">
              <Image
                src="/logo.png"
                alt="W.E.T."
                width={36}
                height={36}
                className="object-contain transition-transform duration-200 group-hover:scale-105"
                priority
              />
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-sm font-bold text-text-primary tracking-tight group-hover:text-brand-primary transition-colors duration-200">
                  W.E.T.
                </span>
                <span className="text-[9px] font-medium text-text-muted tracking-wide uppercase group-hover:text-brand-primary/70 transition-colors duration-200">
                  World Event Trading
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Main Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center">
            <ul className="flex items-center">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`nav-link px-2 py-1.5 text-xs font-medium ${
                      'isHighlight' in item && item.isHighlight
                        ? 'text-brand-primary font-semibold'
                        : 'text-text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              
              {/* More Dropdown */}
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className="nav-link px-2 py-1.5 text-xs font-medium text-text-primary flex items-center gap-0.5"
                >
                  More
                  <svg 
                    className={`w-3 h-3 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                {moreDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-border py-1 z-50">
                    {moreItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-3 py-2 text-xs font-medium text-text-primary hover:bg-bg-hover hover:text-brand-primary transition-colors"
                        onClick={() => setMoreDropdownOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* Right: Watch, Listen, Search, Subscribe, Sign In */}
          <div className="flex items-center gap-0.5">
            {/* Watch with Live Indicator - keep red for live */}
            <Link
              href="/watch"
              className="hidden md:flex items-center gap-1 px-2 py-1 text-xs font-medium text-text-primary hover:text-brand-primary transition-colors"
            >
              <span className="relative flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
                <span className="text-[9px] font-bold text-brand-red bg-red-50 px-0.5 rounded">LIVE</span>
              </span>
              Watch
            </Link>

            {/* Listen */}
            <Link
              href="/listen"
              className="hidden md:flex items-center gap-0.5 px-2 py-1 text-xs font-medium text-text-primary hover:text-brand-primary transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 0112.728 0" />
              </svg>
              Listen
            </Link>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 text-text-muted hover:text-brand-primary transition-colors"
              aria-label="Search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Subscribe - Blue accent with shimmer */}
            <Link
              href="/subscribe"
              className="btn-primary hidden sm:block px-2.5 py-1 text-[11px] font-bold rounded"
            >
              Subscribe
            </Link>

            {/* Sign In - with border glow on hover */}
            <Link
              href="/signin"
              className="card-hover hidden sm:block px-2 py-1 text-[11px] font-medium text-text-primary rounded"
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
                width={36}
                height={36}
                className="object-contain"
              />
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold text-text-primary tracking-tight">
                  W.E.T.
                </span>
                <span className="text-[9px] font-medium text-text-muted tracking-wide uppercase">
                  World Event Trading
                </span>
              </div>
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
            
            {/* More section */}
            <li className="pt-2 mt-2 border-t border-border">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wide">More Categories</span>
            </li>
            {moreItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 py-2 text-base font-medium text-text-primary hover:text-brand-primary transition-colors"
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
