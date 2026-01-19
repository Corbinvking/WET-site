// ============================================
// Category & Desk Configuration Types
// ============================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

export type HeroRule = 'preferCrossListed' | 'preferVolume' | 'preferMovers';

export type RailModule = 
  | 'topMovers' 
  | 'divergence' 
  | 'volume' 
  | 'calendar' 
  | 'goDeeper' 
  | 'briefCTA';

export interface DeskConfig {
  deskSlug: string;
  title: string;
  description: string;
  chipTags: string[];
  heroRule: HeroRule;
  railModules: RailModule[];
  // Optional desk-specific settings
  accentColor?: string;
  explainerTitle?: string;
}

// ============================================
// Category Data
// ============================================

export const categories: Category[] = [
  {
    id: 'politics',
    name: 'Politics',
    slug: 'politics',
    description: 'US and global political markets, elections, policy outcomes',
    color: '#dc2626',
  },
  {
    id: 'economy',
    name: 'Economy',
    slug: 'economy',
    description: 'Fed decisions, inflation, employment, GDP forecasts',
    color: '#2563eb',
  },
  {
    id: 'geopolitics',
    name: 'World',
    slug: 'world',
    description: 'International relations, conflicts, global events',
    color: '#7c3aed',
  },
  {
    id: 'elections',
    name: 'Elections',
    slug: 'elections',
    description: 'US and international election markets',
    color: '#dc2626',
  },
  {
    id: 'crypto',
    name: 'Crypto',
    slug: 'crypto',
    description: 'Bitcoin, Ethereum, crypto regulation, DeFi',
    color: '#f59e0b',
  },
  {
    id: 'tech',
    name: 'Tech',
    slug: 'tech',
    description: 'Technology companies, AI, regulation, innovation',
    color: '#06b6d4',
  },
  {
    id: 'sports',
    name: 'Sports',
    slug: 'sports',
    description: 'Major sporting events and championships',
    color: '#22c55e',
  },
  {
    id: 'climate',
    name: 'Climate & Science',
    slug: 'climate',
    description: 'Climate policy, scientific breakthroughs, energy',
    color: '#10b981',
  },
  {
    id: 'culture',
    name: 'Culture',
    slug: 'culture',
    description: 'Entertainment, media, social trends, celebrity',
    color: '#ec4899',
  },
  {
    id: 'mentions',
    name: 'Mentions',
    slug: 'mentions',
    description: 'Company and entity mentions across markets',
    color: '#8b5cf6',
  },
  {
    id: 'earnings',
    name: 'Earnings',
    slug: 'earnings',
    description: 'Quarterly earnings, revenue beats, guidance',
    color: '#0ea5e9',
  },
  {
    id: 'finances',
    name: 'Finances',
    slug: 'finances',
    description: 'Banking, fintech, financial regulation',
    color: '#14b8a6',
  },
  {
    id: 'health',
    name: 'Health',
    slug: 'health',
    description: 'Healthcare policy, FDA approvals, pharma',
    color: '#ef4444',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    slug: 'entertainment',
    description: 'Movies, TV, streaming, awards, box office',
    color: '#f97316',
  },
];

// ============================================
// Desk Configurations (per-tab settings)
// ============================================

export const deskConfigs: Record<string, DeskConfig> = {
  politics: {
    deskSlug: 'politics',
    title: 'Politics',
    description: 'US and global political markets — executive orders, legislation, appointments',
    chipTags: ['All', 'Trump', 'Congress', 'SCOTUS', 'Immigration', 'Debates', 'Polling', 'Cabinet'],
    heroRule: 'preferCrossListed',
    railModules: ['topMovers', 'divergence', 'calendar', 'goDeeper', 'briefCTA'],
    explainerTitle: 'How to Read Politics Markets',
  },
  economy: {
    deskSlug: 'economy',
    title: 'Economy',
    description: 'Fed decisions, inflation data, employment reports, GDP forecasts',
    chipTags: ['All', 'Fed', 'CPI', 'Jobs', 'GDP', 'Rates', 'Oil', 'Housing', 'Tariffs'],
    heroRule: 'preferCrossListed',
    railModules: ['topMovers', 'divergence', 'calendar', 'goDeeper', 'briefCTA'],
    explainerTitle: 'How to Read Macro Markets',
  },
  world: {
    deskSlug: 'world',
    title: 'World',
    description: 'International relations, geopolitical conflicts, diplomatic developments',
    chipTags: ['All', 'Ukraine', 'Middle East', 'China', 'Trade', 'NATO', 'Arctic', 'Diplomacy'],
    heroRule: 'preferCrossListed',
    railModules: ['topMovers', 'divergence', 'calendar', 'goDeeper', 'briefCTA'],
    explainerTitle: 'How to Read Geopolitics Markets',
  },
  elections: {
    deskSlug: 'elections',
    title: 'Elections',
    description: 'US and international election markets, polling, primary outcomes',
    chipTags: ['All', '2026 Midterms', 'Senate', 'House', 'Governors', 'Polling', 'Primary'],
    heroRule: 'preferVolume',
    railModules: ['topMovers', 'volume', 'calendar', 'goDeeper', 'briefCTA'],
    explainerTitle: 'How to Read Election Markets',
  },
  crypto: {
    deskSlug: 'crypto',
    title: 'Crypto',
    description: 'Bitcoin, Ethereum, ETF approvals, regulatory developments, DeFi',
    chipTags: ['All', 'BTC', 'ETH', 'ETFs', 'Regulation', 'Exchanges', 'Stablecoins', 'DeFi'],
    heroRule: 'preferCrossListed',
    railModules: ['topMovers', 'divergence', 'volume', 'calendar', 'goDeeper'],
    explainerTitle: 'How to Read Crypto Markets',
  },
  tech: {
    deskSlug: 'tech',
    title: 'Tech',
    description: 'AI regulation, antitrust, big tech policy, innovation milestones',
    chipTags: ['All', 'AI', 'Antitrust', 'Big Tech', 'Startups', 'Chips', 'Social Media'],
    heroRule: 'preferMovers',
    railModules: ['topMovers', 'divergence', 'calendar', 'goDeeper', 'briefCTA'],
    explainerTitle: 'How to Read Tech Markets',
  },
  sports: {
    deskSlug: 'sports',
    title: 'Sports',
    description: 'NFL, NBA, MLB playoffs, championship futures, key matchups',
    chipTags: ['All', 'NFL', 'NBA', 'MLB', 'Playoffs', 'Futures', 'Injuries', 'Trades'],
    heroRule: 'preferVolume',
    railModules: ['topMovers', 'volume', 'calendar', 'goDeeper'],
    explainerTitle: 'How to Read Sports Markets',
  },
  climate: {
    deskSlug: 'climate',
    title: 'Climate & Science',
    description: 'Climate policy, IRA provisions, energy markets, scientific milestones',
    chipTags: ['All', 'Policy', 'Energy', 'Legislation', 'Research', 'Carbon', 'Renewables'],
    heroRule: 'preferCrossListed',
    railModules: ['topMovers', 'calendar', 'goDeeper', 'briefCTA'],
    explainerTitle: 'How to Read Climate Markets',
  },
  geopolitics: {
    deskSlug: 'geopolitics',
    title: 'Geopolitics',
    description: 'Global conflicts, international diplomacy, sanctions, alliances',
    chipTags: ['All', 'Conflicts', 'Sanctions', 'Alliances', 'Trade Wars', 'Diplomacy'],
    heroRule: 'preferCrossListed',
    railModules: ['topMovers', 'divergence', 'calendar', 'goDeeper'],
    explainerTitle: 'How to Read Geopolitics Markets',
  },
  culture: {
    deskSlug: 'culture',
    title: 'Culture',
    description: 'Entertainment, media, social trends, celebrity culture markets',
    chipTags: ['All', 'Awards', 'Celebrity', 'Social Media', 'Viral', 'Trends', 'Memes'],
    heroRule: 'preferVolume',
    railModules: ['topMovers', 'volume', 'calendar', 'goDeeper'],
    explainerTitle: 'How to Read Culture Markets',
  },
  mentions: {
    deskSlug: 'mentions',
    title: 'Mentions',
    description: 'Track company and entity mentions across prediction markets',
    chipTags: ['All', 'Companies', 'People', 'Products', 'Brands', 'Trending'],
    heroRule: 'preferMovers',
    railModules: ['topMovers', 'volume', 'goDeeper'],
    explainerTitle: 'How Mention Tracking Works',
  },
  earnings: {
    deskSlug: 'earnings',
    title: 'Earnings',
    description: 'Quarterly earnings reports, revenue beats/misses, guidance',
    chipTags: ['All', 'Tech', 'Finance', 'Retail', 'Healthcare', 'Energy', 'Beats', 'Misses'],
    heroRule: 'preferCrossListed',
    railModules: ['topMovers', 'calendar', 'volume', 'goDeeper', 'briefCTA'],
    explainerTitle: 'How to Trade Earnings Markets',
  },
  finances: {
    deskSlug: 'finances',
    title: 'Finances',
    description: 'Banking, fintech, financial regulation, market structure',
    chipTags: ['All', 'Banks', 'Fintech', 'Regulation', 'M&A', 'IPOs', 'Rates'],
    heroRule: 'preferCrossListed',
    railModules: ['topMovers', 'divergence', 'calendar', 'goDeeper'],
    explainerTitle: 'How to Read Finance Markets',
  },
  health: {
    deskSlug: 'health',
    title: 'Health',
    description: 'Healthcare policy, FDA approvals, drug trials, pandemic tracking',
    chipTags: ['All', 'FDA', 'Pharma', 'Policy', 'Trials', 'Vaccines', 'Insurance'],
    heroRule: 'preferCrossListed',
    railModules: ['topMovers', 'calendar', 'goDeeper', 'briefCTA'],
    explainerTitle: 'How to Read Health Markets',
  },
  entertainment: {
    deskSlug: 'entertainment',
    title: 'Entertainment',
    description: 'Movies, TV, streaming wars, awards predictions, box office',
    chipTags: ['All', 'Oscars', 'Emmys', 'Box Office', 'Streaming', 'Music', 'Gaming'],
    heroRule: 'preferVolume',
    railModules: ['topMovers', 'volume', 'calendar', 'goDeeper'],
    explainerTitle: 'How to Read Entertainment Markets',
  },
};

// ============================================
// Helper Functions
// ============================================

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(c => c.slug === slug);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(c => c.id === id);
};

export const getDeskConfig = (slug: string): DeskConfig | undefined => {
  return deskConfigs[slug];
};

// Get desk config with fallback to default politics config
export const getDeskConfigOrDefault = (slug: string): DeskConfig => {
  return deskConfigs[slug] || deskConfigs.politics;
};
