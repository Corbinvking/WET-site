export interface Market {
  id: string;
  title: string;
  slug: string;
  category: string;
  question: string;
  expirationDate: string;
  platforms: {
    kalshi?: {
      yesPrice: number;
      noPrice: number;
      volume: number;
      liquidity: number;
    };
    polymarket?: {
      yesPrice: number;
      noPrice: number;
      volume: number;
      liquidity: number;
    };
  };
  change24h: number;
  totalVolume: number;
  drivers: string[];
  catalysts: {
    date: string;
    event: string;
  }[];
  status: 'active' | 'resolved' | 'pending';
}

export const markets: Market[] = [
  {
    id: 'fed-rate-jan-2026',
    title: 'Fed Rate Cut January 2026',
    slug: 'fed-rate-cut-january-2026',
    category: 'economy',
    question: 'Will the Federal Reserve cut rates at the January 2026 FOMC meeting?',
    expirationDate: '2026-01-29',
    platforms: {
      kalshi: { yesPrice: 0.32, noPrice: 0.68, volume: 2450000, liquidity: 890000 },
      polymarket: { yesPrice: 0.35, noPrice: 0.65, volume: 1820000, liquidity: 720000 },
    },
    change24h: 3.2,
    totalVolume: 4270000,
    drivers: ['CPI data', 'Employment report', 'Fed commentary', 'GDP growth'],
    catalysts: [
      { date: '2026-01-15', event: 'CPI Report Release' },
      { date: '2026-01-24', event: 'GDP Q4 Advance Estimate' },
      { date: '2026-01-29', event: 'FOMC Decision' },
    ],
    status: 'active',
  },
  {
    id: 'trump-executive-orders',
    title: 'Trump Executive Orders Week 1',
    slug: 'trump-executive-orders-week-1',
    category: 'politics',
    question: 'Will Trump sign more than 50 executive orders in his first week?',
    expirationDate: '2026-01-27',
    platforms: {
      kalshi: { yesPrice: 0.78, noPrice: 0.22, volume: 1890000, liquidity: 560000 },
      polymarket: { yesPrice: 0.82, noPrice: 0.18, volume: 3240000, liquidity: 890000 },
    },
    change24h: 5.1,
    totalVolume: 5130000,
    drivers: ['Cabinet confirmations', 'Legislative priorities', 'Policy announcements'],
    catalysts: [
      { date: '2026-01-20', event: 'Inauguration Day' },
      { date: '2026-01-27', event: 'First Week Ends' },
    ],
    status: 'active',
  },
  {
    id: 'bitcoin-100k-q1',
    title: 'Bitcoin $100K Q1 2026',
    slug: 'bitcoin-100k-q1-2026',
    category: 'crypto',
    question: 'Will Bitcoin reach $100,000 before April 1, 2026?',
    expirationDate: '2026-03-31',
    platforms: {
      kalshi: { yesPrice: 0.45, noPrice: 0.55, volume: 5670000, liquidity: 1200000 },
      polymarket: { yesPrice: 0.48, noPrice: 0.52, volume: 8920000, liquidity: 2100000 },
    },
    change24h: -2.3,
    totalVolume: 14590000,
    drivers: ['ETF inflows', 'Halving aftermath', 'Macro liquidity', 'Institutional adoption'],
    catalysts: [
      { date: '2026-02-15', event: 'Grayscale ETF Deadline' },
      { date: '2026-03-15', event: 'FOMC Meeting' },
    ],
    status: 'active',
  },
  {
    id: 'greenland-acquisition',
    title: 'US Greenland Acquisition',
    slug: 'us-greenland-acquisition-2026',
    category: 'geopolitics',
    question: 'Will the US formally begin Greenland acquisition negotiations in 2026?',
    expirationDate: '2026-12-31',
    platforms: {
      kalshi: { yesPrice: 0.15, noPrice: 0.85, volume: 890000, liquidity: 340000 },
      polymarket: { yesPrice: 0.12, noPrice: 0.88, volume: 1240000, liquidity: 450000 },
    },
    change24h: 8.5,
    totalVolume: 2130000,
    drivers: ['Trump statements', 'Denmark response', 'NATO dynamics', 'Arctic strategy'],
    catalysts: [
      { date: '2026-02-01', event: 'State Dept Briefing' },
      { date: '2026-06-15', event: 'NATO Summit' },
    ],
    status: 'active',
  },
  {
    id: 'ai-regulation-2026',
    title: 'Federal AI Regulation 2026',
    slug: 'federal-ai-regulation-2026',
    category: 'tech',
    question: 'Will Congress pass comprehensive AI regulation in 2026?',
    expirationDate: '2026-12-31',
    platforms: {
      kalshi: { yesPrice: 0.22, noPrice: 0.78, volume: 670000, liquidity: 210000 },
      polymarket: { yesPrice: 0.18, noPrice: 0.82, volume: 520000, liquidity: 180000 },
    },
    change24h: -1.2,
    totalVolume: 1190000,
    drivers: ['Tech lobbying', 'EU AI Act spillover', 'Election year politics', 'Safety incidents'],
    catalysts: [
      { date: '2026-03-01', event: 'Senate AI Caucus Hearing' },
      { date: '2026-07-15', event: 'House Tech Committee Vote' },
    ],
    status: 'active',
  },
  {
    id: 'ukraine-ceasefire-h1',
    title: 'Ukraine Ceasefire H1 2026',
    slug: 'ukraine-ceasefire-h1-2026',
    category: 'geopolitics',
    question: 'Will a formal ceasefire be declared in Ukraine before July 1, 2026?',
    expirationDate: '2026-06-30',
    platforms: {
      kalshi: { yesPrice: 0.28, noPrice: 0.72, volume: 1450000, liquidity: 520000 },
      polymarket: { yesPrice: 0.31, noPrice: 0.69, volume: 2180000, liquidity: 780000 },
    },
    change24h: 4.7,
    totalVolume: 3630000,
    drivers: ['Trump mediation', 'EU pressure', 'Russian economy', 'Military stalemate'],
    catalysts: [
      { date: '2026-02-24', event: '3-Year Anniversary' },
      { date: '2026-05-09', event: 'Victory Day Russia' },
    ],
    status: 'active',
  },
  {
    id: 'superbowl-2026-winner',
    title: 'Super Bowl LX Winner',
    slug: 'super-bowl-lx-winner',
    category: 'sports',
    question: 'Which team will win Super Bowl LX?',
    expirationDate: '2026-02-08',
    platforms: {
      kalshi: { yesPrice: 0.35, noPrice: 0.65, volume: 8900000, liquidity: 3200000 },
      polymarket: { yesPrice: 0.38, noPrice: 0.62, volume: 12400000, liquidity: 4500000 },
    },
    change24h: 1.8,
    totalVolume: 21300000,
    drivers: ['Playoff performance', 'Injuries', 'Coaching', 'Weather conditions'],
    catalysts: [
      { date: '2026-01-18', event: 'Divisional Round' },
      { date: '2026-01-25', event: 'Conference Championships' },
      { date: '2026-02-08', event: 'Super Bowl LX' },
    ],
    status: 'active',
  },
  {
    id: 'inflation-under-3',
    title: 'Inflation Under 3% by June',
    slug: 'inflation-under-3-percent-june-2026',
    category: 'economy',
    question: 'Will US CPI year-over-year fall below 3% by June 2026?',
    expirationDate: '2026-06-15',
    platforms: {
      kalshi: { yesPrice: 0.58, noPrice: 0.42, volume: 1890000, liquidity: 670000 },
      polymarket: { yesPrice: 0.62, noPrice: 0.38, volume: 2340000, liquidity: 890000 },
    },
    change24h: -0.8,
    totalVolume: 4230000,
    drivers: ['Housing costs', 'Energy prices', 'Wage growth', 'Supply chains'],
    catalysts: [
      { date: '2026-02-12', event: 'January CPI' },
      { date: '2026-03-12', event: 'February CPI' },
      { date: '2026-06-11', event: 'May CPI' },
    ],
    status: 'active',
  },
  {
    id: 'scotus-term-major-ruling',
    title: 'SCOTUS Major Administrative Ruling',
    slug: 'scotus-administrative-ruling-2026',
    category: 'politics',
    question: 'Will SCOTUS issue a major ruling limiting agency authority in 2026 term?',
    expirationDate: '2026-06-30',
    platforms: {
      kalshi: { yesPrice: 0.71, noPrice: 0.29, volume: 560000, liquidity: 180000 },
      polymarket: { yesPrice: 0.68, noPrice: 0.32, volume: 420000, liquidity: 150000 },
    },
    change24h: 2.1,
    totalVolume: 980000,
    drivers: ['Chevron doctrine', 'Conservative majority', 'Pending cases', 'Agency overreach claims'],
    catalysts: [
      { date: '2026-04-15', event: 'Oral Arguments End' },
      { date: '2026-06-30', event: 'Term Ends' },
    ],
    status: 'active',
  },
  {
    id: 'china-taiwan-military-action',
    title: 'China Taiwan Military Action 2026',
    slug: 'china-taiwan-military-action-2026',
    category: 'geopolitics',
    question: 'Will China take military action against Taiwan in 2026?',
    expirationDate: '2026-12-31',
    platforms: {
      kalshi: { yesPrice: 0.08, noPrice: 0.92, volume: 2340000, liquidity: 890000 },
      polymarket: { yesPrice: 0.06, noPrice: 0.94, volume: 1890000, liquidity: 720000 },
    },
    change24h: 0.5,
    totalVolume: 4230000,
    drivers: ['US-China relations', 'Taiwan elections', 'Military exercises', 'Economic ties'],
    catalysts: [
      { date: '2026-05-20', event: 'Taiwan Inauguration' },
      { date: '2026-10-01', event: 'PRC National Day' },
    ],
    status: 'active',
  },
  {
    id: 'tariffs-eu-retaliation',
    title: 'EU Tariff Retaliation',
    slug: 'eu-tariff-retaliation-2026',
    category: 'economy',
    question: 'Will the EU impose retaliatory tariffs on US goods in Q1 2026?',
    expirationDate: '2026-03-31',
    platforms: {
      kalshi: { yesPrice: 0.52, noPrice: 0.48, volume: 780000, liquidity: 290000 },
      polymarket: { yesPrice: 0.55, noPrice: 0.45, volume: 920000, liquidity: 340000 },
    },
    change24h: 6.2,
    totalVolume: 1700000,
    drivers: ['Trump tariff threats', 'EU Commission response', 'Trade negotiations', 'WTO rulings'],
    catalysts: [
      { date: '2026-01-25', event: 'Davos Summit' },
      { date: '2026-02-15', event: 'EU Trade Council' },
    ],
    status: 'active',
  },
  {
    id: 'climate-legislation-2026',
    title: 'Climate Legislation Rollback',
    slug: 'climate-legislation-rollback-2026',
    category: 'climate',
    question: 'Will Congress roll back major IRA climate provisions in 2026?',
    expirationDate: '2026-12-31',
    platforms: {
      kalshi: { yesPrice: 0.38, noPrice: 0.62, volume: 340000, liquidity: 120000 },
      polymarket: { yesPrice: 0.42, noPrice: 0.58, volume: 280000, liquidity: 95000 },
    },
    change24h: 1.5,
    totalVolume: 620000,
    drivers: ['GOP priorities', 'Energy industry lobbying', 'Budget reconciliation', 'State resistance'],
    catalysts: [
      { date: '2026-03-01', event: 'Budget Proposal' },
      { date: '2026-09-30', event: 'Fiscal Year End' },
    ],
    status: 'active',
  },
];

export const getMarketBySlug = (slug: string): Market | undefined => {
  return markets.find(m => m.slug === slug);
};

export const getMarketById = (id: string): Market | undefined => {
  return markets.find(m => m.id === id);
};

export const getMarketsByCategory = (category: string): Market[] => {
  return markets.filter(m => m.category === category);
};

export const getTopMovers = (limit: number = 5): Market[] => {
  return [...markets]
    .sort((a, b) => Math.abs(b.change24h) - Math.abs(a.change24h))
    .slice(0, limit);
};

export const getHighestVolume = (limit: number = 5): Market[] => {
  return [...markets]
    .sort((a, b) => b.totalVolume - a.totalVolume)
    .slice(0, limit);
};

export const getBiggestDivergence = (limit: number = 5): Market[] => {
  return [...markets]
    .filter(m => m.platforms.kalshi && m.platforms.polymarket)
    .map(m => ({
      ...m,
      divergence: Math.abs(
        (m.platforms.kalshi?.yesPrice || 0) - (m.platforms.polymarket?.yesPrice || 0)
      ),
    }))
    .sort((a, b) => b.divergence - a.divergence)
    .slice(0, limit);
};


