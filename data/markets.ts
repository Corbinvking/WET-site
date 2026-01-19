// ============================================
// Platform & GlobalMarket Types
// ============================================

export type Platform = 'kalshi' | 'polymarket';

export interface PlatformListing {
  platform: Platform;
  platformMarketId: string;
  url: string;
  yesProbability: number | null;
  noProbability: number | null;
  volume: number | null;
  liquidity: number | null;
  change24h: number | null;
  updatedAt: string;
}

export interface GlobalMarket {
  id: string;
  canonicalQuestion: string;
  title: string; // Short display title
  slug: string;
  category: string;
  tags: string[];
  expiryDate: string | null;
  nextCatalyst: { date: string; event: string } | null;
  catalysts: { date: string; event: string }[];
  listings: PlatformListing[];
  combined: {
    platformCount: number;
    combinedVolume: number;
    combinedLiquidity: number;
    divergence: number | null;
    dominantPlatform: Platform | null;
  };
  drivers: string[];
  status: 'active' | 'resolved' | 'pending';
}

// Legacy Market interface for backwards compatibility
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

// ============================================
// GlobalMarket Mock Data
// ============================================

export const globalMarkets: GlobalMarket[] = [
  {
    id: 'fed-rate-jan-2026',
    title: 'Fed Rate Cut January 2026',
    canonicalQuestion: 'Will the Federal Reserve cut rates at the January 2026 FOMC meeting?',
    slug: 'fed-rate-cut-january-2026',
    category: 'economy',
    tags: ['federal-reserve', 'interest-rates', 'fomc', 'monetary-policy'],
    expiryDate: '2026-01-29',
    nextCatalyst: { date: '2026-01-15', event: 'CPI Report Release' },
    catalysts: [
      { date: '2026-01-15', event: 'CPI Report Release' },
      { date: '2026-01-24', event: 'GDP Q4 Advance Estimate' },
      { date: '2026-01-29', event: 'FOMC Decision' },
    ],
    listings: [
      {
        platform: 'kalshi',
        platformMarketId: 'KXFEDRATE-26JAN',
        url: 'https://kalshi.com/markets/fed-rate-jan-2026',
        yesProbability: 32,
        noProbability: 68,
        volume: 2450000,
        liquidity: 890000,
        change24h: 3.2,
        updatedAt: '2026-01-18T12:00:00Z',
      },
      {
        platform: 'polymarket',
        platformMarketId: 'fed-rate-cut-jan-2026',
        url: 'https://polymarket.com/event/fed-rate-jan-2026',
        yesProbability: 35,
        noProbability: 65,
        volume: 1820000,
        liquidity: 720000,
        change24h: 2.8,
        updatedAt: '2026-01-18T12:00:00Z',
      },
    ],
    combined: {
      platformCount: 2,
      combinedVolume: 4270000,
      combinedLiquidity: 1610000,
      divergence: 3,
      dominantPlatform: 'kalshi',
    },
    drivers: ['CPI data', 'Employment report', 'Fed commentary', 'GDP growth'],
    status: 'active',
  },
  {
    id: 'trump-executive-orders',
    title: 'Trump Executive Orders Week 1',
    canonicalQuestion: 'Will Trump sign more than 50 executive orders in his first week?',
    slug: 'trump-executive-orders-week-1',
    category: 'politics',
    tags: ['trump', 'executive-orders', 'administration', 'policy'],
    expiryDate: '2026-01-27',
    nextCatalyst: { date: '2026-01-20', event: 'Inauguration Day' },
    catalysts: [
      { date: '2026-01-20', event: 'Inauguration Day' },
      { date: '2026-01-27', event: 'First Week Ends' },
    ],
    listings: [
      {
        platform: 'kalshi',
        platformMarketId: 'KXTRUMP-EO-50',
        url: 'https://kalshi.com/markets/trump-eo-week1',
        yesProbability: 78,
        noProbability: 22,
        volume: 1890000,
        liquidity: 560000,
        change24h: 5.1,
        updatedAt: '2026-01-18T12:00:00Z',
      },
      {
        platform: 'polymarket',
        platformMarketId: 'trump-50-executive-orders',
        url: 'https://polymarket.com/event/trump-eo-week1',
        yesProbability: 82,
        noProbability: 18,
        volume: 3240000,
        liquidity: 890000,
        change24h: 4.9,
        updatedAt: '2026-01-18T12:00:00Z',
      },
    ],
    combined: {
      platformCount: 2,
      combinedVolume: 5130000,
      combinedLiquidity: 1450000,
      divergence: 4,
      dominantPlatform: 'polymarket',
    },
    drivers: ['Cabinet confirmations', 'Legislative priorities', 'Policy announcements'],
    status: 'active',
  },
  {
    id: 'bitcoin-100k-q1',
    title: 'Bitcoin $100K Q1 2026',
    canonicalQuestion: 'Will Bitcoin reach $100,000 before April 1, 2026?',
    slug: 'bitcoin-100k-q1-2026',
    category: 'crypto',
    tags: ['bitcoin', 'cryptocurrency', 'btc', 'price-prediction'],
    expiryDate: '2026-03-31',
    nextCatalyst: { date: '2026-02-15', event: 'Grayscale ETF Deadline' },
    catalysts: [
      { date: '2026-02-15', event: 'Grayscale ETF Deadline' },
      { date: '2026-03-15', event: 'FOMC Meeting' },
    ],
    listings: [
      {
        platform: 'kalshi',
        platformMarketId: 'KXBTC-100K-Q1',
        url: 'https://kalshi.com/markets/btc-100k-q1',
        yesProbability: 45,
        noProbability: 55,
        volume: 5670000,
        liquidity: 1200000,
        change24h: -2.3,
        updatedAt: '2026-01-18T12:00:00Z',
      },
      {
        platform: 'polymarket',
        platformMarketId: 'bitcoin-100k-q1-2026',
        url: 'https://polymarket.com/event/btc-100k',
        yesProbability: 48,
        noProbability: 52,
        volume: 8920000,
        liquidity: 2100000,
        change24h: -1.8,
        updatedAt: '2026-01-18T12:00:00Z',
      },
    ],
    combined: {
      platformCount: 2,
      combinedVolume: 14590000,
      combinedLiquidity: 3300000,
      divergence: 3,
      dominantPlatform: 'polymarket',
    },
    drivers: ['ETF inflows', 'Halving aftermath', 'Macro liquidity', 'Institutional adoption'],
    status: 'active',
  },
  {
    id: 'greenland-acquisition',
    title: 'US Greenland Acquisition',
    canonicalQuestion: 'Will the US formally begin Greenland acquisition negotiations in 2026?',
    slug: 'us-greenland-acquisition-2026',
    category: 'geopolitics',
    tags: ['greenland', 'us-foreign-policy', 'denmark', 'arctic'],
    expiryDate: '2026-12-31',
    nextCatalyst: { date: '2026-02-01', event: 'State Dept Briefing' },
    catalysts: [
      { date: '2026-02-01', event: 'State Dept Briefing' },
      { date: '2026-06-15', event: 'NATO Summit' },
    ],
    listings: [
      {
        platform: 'kalshi',
        platformMarketId: 'KXGREENLAND-2026',
        url: 'https://kalshi.com/markets/greenland-2026',
        yesProbability: 15,
        noProbability: 85,
        volume: 890000,
        liquidity: 340000,
        change24h: 8.5,
        updatedAt: '2026-01-18T12:00:00Z',
      },
      {
        platform: 'polymarket',
        platformMarketId: 'us-greenland-negotiations',
        url: 'https://polymarket.com/event/greenland',
        yesProbability: 12,
        noProbability: 88,
        volume: 1240000,
        liquidity: 450000,
        change24h: 7.2,
        updatedAt: '2026-01-18T12:00:00Z',
      },
    ],
    combined: {
      platformCount: 2,
      combinedVolume: 2130000,
      combinedLiquidity: 790000,
      divergence: 3,
      dominantPlatform: 'polymarket',
    },
    drivers: ['Trump statements', 'Denmark response', 'NATO dynamics', 'Arctic strategy'],
    status: 'active',
  },
  {
    id: 'ai-regulation-2026',
    title: 'Federal AI Regulation 2026',
    canonicalQuestion: 'Will Congress pass comprehensive AI regulation in 2026?',
    slug: 'federal-ai-regulation-2026',
    category: 'tech',
    tags: ['ai', 'regulation', 'congress', 'technology-policy'],
    expiryDate: '2026-12-31',
    nextCatalyst: { date: '2026-03-01', event: 'Senate AI Caucus Hearing' },
    catalysts: [
      { date: '2026-03-01', event: 'Senate AI Caucus Hearing' },
      { date: '2026-07-15', event: 'House Tech Committee Vote' },
    ],
    listings: [
      {
        platform: 'kalshi',
        platformMarketId: 'KXAI-REG-2026',
        url: 'https://kalshi.com/markets/ai-regulation',
        yesProbability: 22,
        noProbability: 78,
        volume: 670000,
        liquidity: 210000,
        change24h: -1.2,
        updatedAt: '2026-01-18T12:00:00Z',
      },
      {
        platform: 'polymarket',
        platformMarketId: 'congress-ai-regulation-2026',
        url: 'https://polymarket.com/event/ai-regulation',
        yesProbability: 18,
        noProbability: 82,
        volume: 520000,
        liquidity: 180000,
        change24h: -0.8,
        updatedAt: '2026-01-18T12:00:00Z',
      },
    ],
    combined: {
      platformCount: 2,
      combinedVolume: 1190000,
      combinedLiquidity: 390000,
      divergence: 4,
      dominantPlatform: 'kalshi',
    },
    drivers: ['Tech lobbying', 'EU AI Act spillover', 'Election year politics', 'Safety incidents'],
    status: 'active',
  },
  {
    id: 'ukraine-ceasefire-h1',
    title: 'Ukraine Ceasefire H1 2026',
    canonicalQuestion: 'Will a formal ceasefire be declared in Ukraine before July 1, 2026?',
    slug: 'ukraine-ceasefire-h1-2026',
    category: 'geopolitics',
    tags: ['ukraine', 'russia', 'ceasefire', 'war', 'diplomacy'],
    expiryDate: '2026-06-30',
    nextCatalyst: { date: '2026-02-24', event: '3-Year Anniversary' },
    catalysts: [
      { date: '2026-02-24', event: '3-Year Anniversary' },
      { date: '2026-05-09', event: 'Victory Day Russia' },
    ],
    listings: [
      {
        platform: 'kalshi',
        platformMarketId: 'KXUKRAINE-CF-H1',
        url: 'https://kalshi.com/markets/ukraine-ceasefire',
        yesProbability: 28,
        noProbability: 72,
        volume: 1450000,
        liquidity: 520000,
        change24h: 4.7,
        updatedAt: '2026-01-18T12:00:00Z',
      },
      {
        platform: 'polymarket',
        platformMarketId: 'ukraine-ceasefire-h1-2026',
        url: 'https://polymarket.com/event/ukraine-ceasefire',
        yesProbability: 31,
        noProbability: 69,
        volume: 2180000,
        liquidity: 780000,
        change24h: 5.1,
        updatedAt: '2026-01-18T12:00:00Z',
      },
    ],
    combined: {
      platformCount: 2,
      combinedVolume: 3630000,
      combinedLiquidity: 1300000,
      divergence: 3,
      dominantPlatform: 'polymarket',
    },
    drivers: ['Trump mediation', 'EU pressure', 'Russian economy', 'Military stalemate'],
    status: 'active',
  },
  {
    id: 'superbowl-2026-winner',
    title: 'Super Bowl LX Winner',
    canonicalQuestion: 'Which team will win Super Bowl LX?',
    slug: 'super-bowl-lx-winner',
    category: 'sports',
    tags: ['nfl', 'super-bowl', 'football', 'sports-betting'],
    expiryDate: '2026-02-08',
    nextCatalyst: { date: '2026-01-18', event: 'Divisional Round' },
    catalysts: [
      { date: '2026-01-18', event: 'Divisional Round' },
      { date: '2026-01-25', event: 'Conference Championships' },
      { date: '2026-02-08', event: 'Super Bowl LX' },
    ],
    listings: [
      {
        platform: 'kalshi',
        platformMarketId: 'KXSB-LX-WINNER',
        url: 'https://kalshi.com/markets/super-bowl-lx',
        yesProbability: 35,
        noProbability: 65,
        volume: 8900000,
        liquidity: 3200000,
        change24h: 1.8,
        updatedAt: '2026-01-18T12:00:00Z',
      },
      {
        platform: 'polymarket',
        platformMarketId: 'super-bowl-lx-winner',
        url: 'https://polymarket.com/event/super-bowl-lx',
        yesProbability: 38,
        noProbability: 62,
        volume: 12400000,
        liquidity: 4500000,
        change24h: 2.1,
        updatedAt: '2026-01-18T12:00:00Z',
      },
    ],
    combined: {
      platformCount: 2,
      combinedVolume: 21300000,
      combinedLiquidity: 7700000,
      divergence: 3,
      dominantPlatform: 'polymarket',
    },
    drivers: ['Playoff performance', 'Injuries', 'Coaching', 'Weather conditions'],
    status: 'active',
  },
  {
    id: 'inflation-under-3',
    title: 'Inflation Under 3% by June',
    canonicalQuestion: 'Will US CPI year-over-year fall below 3% by June 2026?',
    slug: 'inflation-under-3-percent-june-2026',
    category: 'economy',
    tags: ['inflation', 'cpi', 'economy', 'federal-reserve'],
    expiryDate: '2026-06-15',
    nextCatalyst: { date: '2026-02-12', event: 'January CPI' },
    catalysts: [
      { date: '2026-02-12', event: 'January CPI' },
      { date: '2026-03-12', event: 'February CPI' },
      { date: '2026-06-11', event: 'May CPI' },
    ],
    listings: [
      {
        platform: 'kalshi',
        platformMarketId: 'KXCPI-3PCT-JUN',
        url: 'https://kalshi.com/markets/cpi-under-3',
        yesProbability: 58,
        noProbability: 42,
        volume: 1890000,
        liquidity: 670000,
        change24h: -0.8,
        updatedAt: '2026-01-18T12:00:00Z',
      },
      {
        platform: 'polymarket',
        platformMarketId: 'inflation-under-3-june-2026',
        url: 'https://polymarket.com/event/cpi-3-pct',
        yesProbability: 62,
        noProbability: 38,
        volume: 2340000,
        liquidity: 890000,
        change24h: -0.5,
        updatedAt: '2026-01-18T12:00:00Z',
      },
    ],
    combined: {
      platformCount: 2,
      combinedVolume: 4230000,
      combinedLiquidity: 1560000,
      divergence: 4,
      dominantPlatform: 'polymarket',
    },
    drivers: ['Housing costs', 'Energy prices', 'Wage growth', 'Supply chains'],
    status: 'active',
  },
  // Kalshi-only markets
  {
    id: 'scotus-term-major-ruling',
    title: 'SCOTUS Major Administrative Ruling',
    canonicalQuestion: 'Will SCOTUS issue a major ruling limiting agency authority in 2026 term?',
    slug: 'scotus-administrative-ruling-2026',
    category: 'politics',
    tags: ['scotus', 'supreme-court', 'administrative-law', 'chevron'],
    expiryDate: '2026-06-30',
    nextCatalyst: { date: '2026-04-15', event: 'Oral Arguments End' },
    catalysts: [
      { date: '2026-04-15', event: 'Oral Arguments End' },
      { date: '2026-06-30', event: 'Term Ends' },
    ],
    listings: [
      {
        platform: 'kalshi',
        platformMarketId: 'KXSCOTUS-ADMIN-2026',
        url: 'https://kalshi.com/markets/scotus-admin',
        yesProbability: 71,
        noProbability: 29,
        volume: 560000,
        liquidity: 180000,
        change24h: 2.1,
        updatedAt: '2026-01-18T12:00:00Z',
      },
    ],
    combined: {
      platformCount: 1,
      combinedVolume: 560000,
      combinedLiquidity: 180000,
      divergence: null,
      dominantPlatform: 'kalshi',
    },
    drivers: ['Chevron doctrine', 'Conservative majority', 'Pending cases', 'Agency overreach claims'],
    status: 'active',
  },
  {
    id: 'china-taiwan-military-action',
    title: 'China Taiwan Military Action 2026',
    canonicalQuestion: 'Will China take military action against Taiwan in 2026?',
    slug: 'china-taiwan-military-action-2026',
    category: 'geopolitics',
    tags: ['china', 'taiwan', 'military', 'geopolitics', 'asia'],
    expiryDate: '2026-12-31',
    nextCatalyst: { date: '2026-05-20', event: 'Taiwan Inauguration' },
    catalysts: [
      { date: '2026-05-20', event: 'Taiwan Inauguration' },
      { date: '2026-10-01', event: 'PRC National Day' },
    ],
    listings: [
      {
        platform: 'kalshi',
        platformMarketId: 'KXCHINA-TW-2026',
        url: 'https://kalshi.com/markets/china-taiwan',
        yesProbability: 8,
        noProbability: 92,
        volume: 2340000,
        liquidity: 890000,
        change24h: 0.5,
        updatedAt: '2026-01-18T12:00:00Z',
      },
      {
        platform: 'polymarket',
        platformMarketId: 'china-taiwan-military-2026',
        url: 'https://polymarket.com/event/china-taiwan',
        yesProbability: 6,
        noProbability: 94,
        volume: 1890000,
        liquidity: 720000,
        change24h: 0.3,
        updatedAt: '2026-01-18T12:00:00Z',
      },
    ],
    combined: {
      platformCount: 2,
      combinedVolume: 4230000,
      combinedLiquidity: 1610000,
      divergence: 2,
      dominantPlatform: 'kalshi',
    },
    drivers: ['US-China relations', 'Taiwan elections', 'Military exercises', 'Economic ties'],
    status: 'active',
  },
  {
    id: 'tariffs-eu-retaliation',
    title: 'EU Tariff Retaliation',
    canonicalQuestion: 'Will the EU impose retaliatory tariffs on US goods in Q1 2026?',
    slug: 'eu-tariff-retaliation-2026',
    category: 'economy',
    tags: ['tariffs', 'eu', 'trade', 'international-trade'],
    expiryDate: '2026-03-31',
    nextCatalyst: { date: '2026-01-25', event: 'Davos Summit' },
    catalysts: [
      { date: '2026-01-25', event: 'Davos Summit' },
      { date: '2026-02-15', event: 'EU Trade Council' },
    ],
    listings: [
      {
        platform: 'kalshi',
        platformMarketId: 'KXEU-TARIFF-Q1',
        url: 'https://kalshi.com/markets/eu-tariffs',
        yesProbability: 52,
        noProbability: 48,
        volume: 780000,
        liquidity: 290000,
        change24h: 6.2,
        updatedAt: '2026-01-18T12:00:00Z',
      },
      {
        platform: 'polymarket',
        platformMarketId: 'eu-tariff-retaliation-q1',
        url: 'https://polymarket.com/event/eu-tariffs',
        yesProbability: 55,
        noProbability: 45,
        volume: 920000,
        liquidity: 340000,
        change24h: 5.8,
        updatedAt: '2026-01-18T12:00:00Z',
      },
    ],
    combined: {
      platformCount: 2,
      combinedVolume: 1700000,
      combinedLiquidity: 630000,
      divergence: 3,
      dominantPlatform: 'polymarket',
    },
    drivers: ['Trump tariff threats', 'EU Commission response', 'Trade negotiations', 'WTO rulings'],
    status: 'active',
  },
  // Polymarket-only market
  {
    id: 'climate-legislation-2026',
    title: 'Climate Legislation Rollback',
    canonicalQuestion: 'Will Congress roll back major IRA climate provisions in 2026?',
    slug: 'climate-legislation-rollback-2026',
    category: 'climate',
    tags: ['climate', 'ira', 'congress', 'environment', 'legislation'],
    expiryDate: '2026-12-31',
    nextCatalyst: { date: '2026-03-01', event: 'Budget Proposal' },
    catalysts: [
      { date: '2026-03-01', event: 'Budget Proposal' },
      { date: '2026-09-30', event: 'Fiscal Year End' },
    ],
    listings: [
      {
        platform: 'polymarket',
        platformMarketId: 'climate-ira-rollback-2026',
        url: 'https://polymarket.com/event/climate-rollback',
        yesProbability: 42,
        noProbability: 58,
        volume: 280000,
        liquidity: 95000,
        change24h: 1.5,
        updatedAt: '2026-01-18T12:00:00Z',
      },
    ],
    combined: {
      platformCount: 1,
      combinedVolume: 280000,
      combinedLiquidity: 95000,
      divergence: null,
      dominantPlatform: 'polymarket',
    },
    drivers: ['GOP priorities', 'Energy industry lobbying', 'Budget reconciliation', 'State resistance'],
    status: 'active',
  },
  // Another Kalshi-only market
  {
    id: 'nyc-mayor-indictment',
    title: 'NYC Mayor Indictment 2026',
    canonicalQuestion: 'Will NYC Mayor Eric Adams be indicted on federal charges in 2026?',
    slug: 'nyc-mayor-indictment-2026',
    category: 'politics',
    tags: ['nyc', 'mayor', 'indictment', 'federal-charges', 'corruption'],
    expiryDate: '2026-12-31',
    nextCatalyst: { date: '2026-02-15', event: 'Grand Jury Deadline' },
    catalysts: [
      { date: '2026-02-15', event: 'Grand Jury Deadline' },
      { date: '2026-06-01', event: 'Primary Election' },
    ],
    listings: [
      {
        platform: 'kalshi',
        platformMarketId: 'KXADAMS-INDICT',
        url: 'https://kalshi.com/markets/adams-indictment',
        yesProbability: 65,
        noProbability: 35,
        volume: 420000,
        liquidity: 150000,
        change24h: 3.2,
        updatedAt: '2026-01-18T12:00:00Z',
      },
    ],
    combined: {
      platformCount: 1,
      combinedVolume: 420000,
      combinedLiquidity: 150000,
      divergence: null,
      dominantPlatform: 'kalshi',
    },
    drivers: ['FBI investigation', 'Campaign finance', 'Turkish connections', 'Legal strategy'],
    status: 'active',
  },
  // Another Polymarket-only market
  {
    id: 'eth-pos-upgrade',
    title: 'Ethereum Major Upgrade 2026',
    canonicalQuestion: 'Will Ethereum complete the Pectra upgrade before July 2026?',
    slug: 'ethereum-pectra-upgrade-2026',
    category: 'crypto',
    tags: ['ethereum', 'pectra', 'upgrade', 'blockchain', 'crypto'],
    expiryDate: '2026-06-30',
    nextCatalyst: { date: '2026-03-15', event: 'Testnet Launch' },
    catalysts: [
      { date: '2026-03-15', event: 'Testnet Launch' },
      { date: '2026-05-01', event: 'Mainnet Target' },
    ],
    listings: [
      {
        platform: 'polymarket',
        platformMarketId: 'eth-pectra-h1-2026',
        url: 'https://polymarket.com/event/eth-pectra',
        yesProbability: 72,
        noProbability: 28,
        volume: 1560000,
        liquidity: 580000,
        change24h: -1.2,
        updatedAt: '2026-01-18T12:00:00Z',
      },
    ],
    combined: {
      platformCount: 1,
      combinedVolume: 1560000,
      combinedLiquidity: 580000,
      divergence: null,
      dominantPlatform: 'polymarket',
    },
    drivers: ['Developer progress', 'Testnet stability', 'Community consensus', 'Technical complexity'],
    status: 'active',
  },
];

// ============================================
// Legacy markets array (for backwards compatibility)
// ============================================

export const markets: Market[] = globalMarkets.map(gm => {
  const kalshiListing = gm.listings.find(l => l.platform === 'kalshi');
  const polyListing = gm.listings.find(l => l.platform === 'polymarket');
  
  return {
    id: gm.id,
    title: gm.title,
    slug: gm.slug,
    category: gm.category,
    question: gm.canonicalQuestion,
    expirationDate: gm.expiryDate || '',
    platforms: {
      ...(kalshiListing && {
        kalshi: {
          yesPrice: (kalshiListing.yesProbability || 0) / 100,
          noPrice: (kalshiListing.noProbability || 0) / 100,
          volume: kalshiListing.volume || 0,
          liquidity: kalshiListing.liquidity || 0,
        },
      }),
      ...(polyListing && {
        polymarket: {
          yesPrice: (polyListing.yesProbability || 0) / 100,
          noPrice: (polyListing.noProbability || 0) / 100,
          volume: polyListing.volume || 0,
          liquidity: polyListing.liquidity || 0,
        },
      }),
    },
    change24h: gm.listings[0]?.change24h || 0,
    totalVolume: gm.combined.combinedVolume,
    drivers: gm.drivers,
    catalysts: gm.catalysts,
    status: gm.status,
  };
});

// ============================================
// Helper Functions - GlobalMarket
// ============================================

export const getGlobalMarketBySlug = (slug: string): GlobalMarket | undefined => {
  return globalMarkets.find(m => m.slug === slug);
};

export const getGlobalMarketById = (id: string): GlobalMarket | undefined => {
  return globalMarkets.find(m => m.id === id);
};

export const getGlobalMarketsByCategory = (category: string): GlobalMarket[] => {
  return globalMarkets.filter(m => m.category.toLowerCase() === category.toLowerCase());
};

// Cross-listed markets (on 2+ platforms)
export const getCrossListedMarkets = (): GlobalMarket[] => {
  return globalMarkets.filter(m => m.combined.platformCount >= 2);
};

// Platform-exclusive markets (only on one platform)
export const getPlatformExclusiveMarkets = (platform?: Platform): GlobalMarket[] => {
  const exclusives = globalMarkets.filter(m => m.combined.platformCount === 1);
  if (platform) {
    return exclusives.filter(m => m.listings[0]?.platform === platform);
  }
  return exclusives;
};

// Markets that include a specific platform
export const getMarketsByPlatform = (platform: Platform): GlobalMarket[] => {
  return globalMarkets.filter(m => 
    m.listings.some(l => l.platform === platform)
  );
};

// Get listing for a specific platform
export const getPlatformListing = (market: GlobalMarket, platform: Platform): PlatformListing | undefined => {
  return market.listings.find(l => l.platform === platform);
};

// Check if market is cross-listed
export const isCrossListed = (market: GlobalMarket): boolean => {
  return market.combined.platformCount >= 2;
};

// Check if market is exclusive to a platform
export const isExclusiveTo = (market: GlobalMarket, platform: Platform): boolean => {
  return market.combined.platformCount === 1 && market.listings[0]?.platform === platform;
};

// Get platform coverage status
export type PlatformCoverage = 'cross-listed' | 'kalshi-only' | 'polymarket-only';

export const getPlatformCoverage = (market: GlobalMarket): PlatformCoverage => {
  if (market.combined.platformCount >= 2) return 'cross-listed';
  if (market.listings[0]?.platform === 'kalshi') return 'kalshi-only';
  return 'polymarket-only';
};

// Top movers by absolute change
export const getGlobalTopMovers = (limit: number = 5): GlobalMarket[] => {
  return [...globalMarkets]
    .sort((a, b) => {
      const aChange = Math.max(...a.listings.map(l => Math.abs(l.change24h || 0)));
      const bChange = Math.max(...b.listings.map(l => Math.abs(l.change24h || 0)));
      return bChange - aChange;
    })
    .slice(0, limit);
};

// Highest volume
export const getGlobalHighestVolume = (limit: number = 5): GlobalMarket[] => {
  return [...globalMarkets]
    .sort((a, b) => b.combined.combinedVolume - a.combined.combinedVolume)
    .slice(0, limit);
};

// Biggest divergence (cross-listed only)
export const getGlobalBiggestDivergence = (limit: number = 5): GlobalMarket[] => {
  return getCrossListedMarkets()
    .filter(m => m.combined.divergence !== null)
    .sort((a, b) => (b.combined.divergence || 0) - (a.combined.divergence || 0))
    .slice(0, limit);
};

// Expiring soonest
export const getExpiringSoonest = (limit: number = 5): GlobalMarket[] => {
  return [...globalMarkets]
    .filter(m => m.expiryDate)
    .sort((a, b) => new Date(a.expiryDate!).getTime() - new Date(b.expiryDate!).getTime())
    .slice(0, limit);
};

// ============================================
// Legacy Helper Functions (backwards compatibility)
// ============================================

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

// ============================================
// Aggregate Stats
// ============================================

export const getMarketStats = () => {
  const crossListed = getCrossListedMarkets();
  const kalshiOnly = getPlatformExclusiveMarkets('kalshi');
  const polymarketOnly = getPlatformExclusiveMarkets('polymarket');
  
  const totalVolume = globalMarkets.reduce((sum, m) => sum + m.combined.combinedVolume, 0);
  const totalLiquidity = globalMarkets.reduce((sum, m) => sum + m.combined.combinedLiquidity, 0);
  
  const avgDivergence = crossListed.length > 0
    ? crossListed.reduce((sum, m) => sum + (m.combined.divergence || 0), 0) / crossListed.length
    : 0;

  return {
    totalMarkets: globalMarkets.length,
    crossListedCount: crossListed.length,
    kalshiOnlyCount: kalshiOnly.length,
    polymarketOnlyCount: polymarketOnly.length,
    totalVolume,
    totalLiquidity,
    avgDivergence,
  };
};
