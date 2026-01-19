// Calendar Event Data Model and Mock Data
// Based on ForexFactory calendar UX with prediction market enhancements

export type EventDesk = 'politics' | 'economy' | 'world' | 'elections' | 'crypto' | 'tech' | 'sports';
export type EventImpact = 'high' | 'medium' | 'low';
export type EventStatus = 'upcoming' | 'live' | 'completed' | 'delayed' | 'window';
export type EventType = 'release' | 'speech' | 'decision' | 'sports' | 'crypto' | 'resolution' | 'watch';

export interface SourceLink {
  title: string;
  publisher: string;
  url: string;
  publishedAt: string;
  type: 'official' | 'reporting' | 'data' | 'commentary';
}

export interface EventMarketLink {
  marketId: string;
  marketTitle: string;
  marketSlug: string;
  platforms: ('kalshi' | 'polymarket')[];
  yesProbability?: number;
  divergence?: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  slug: string;
  desk: EventDesk;
  eventType: EventType;
  impact: EventImpact;
  startTime: string; // ISO datetime
  endTime?: string; // ISO datetime for events with duration
  allDay?: boolean;
  timezone: string;
  status: EventStatus;
  isRecurring: boolean;
  recurrenceKey?: string;
  summary: string;
  marketAngle: string;
  sourceLinks: SourceLink[];
  relatedMarkets: EventMarketLink[];
  entities: string[];
  // ForexFactory-style data
  actual?: string;
  forecast?: string;
  previous?: string;
  // History for recurring events
  history?: {
    date: string;
    actual: string;
    forecast: string;
    previous: string;
  }[];
}

// Mock calendar events for the week of Jan 18-24, 2026
export const calendarEvents: CalendarEvent[] = [
  // Sunday Jan 18
  {
    id: 'wef-day1',
    title: 'WEF Annual Meetings',
    slug: 'wef-annual-2026-day1',
    desk: 'world',
    eventType: 'speech',
    impact: 'medium',
    startTime: '2026-01-18T09:00:00Z',
    allDay: true,
    timezone: 'CET',
    status: 'upcoming',
    isRecurring: true,
    recurrenceKey: 'wef-2026',
    summary: 'Day 1 of World Economic Forum Annual Meeting in Davos. Global leaders discuss economic outlook.',
    marketAngle: 'Key speeches may signal policy shifts affecting trade, crypto regulation, and geopolitical markets.',
    sourceLinks: [
      { title: 'WEF Official Schedule', publisher: 'World Economic Forum', url: '#', publishedAt: '2026-01-15', type: 'official' },
    ],
    relatedMarkets: [
      { marketId: 'eu-tariff', marketTitle: 'EU Tariff Retaliation', marketSlug: 'eu-tariff-retaliation-2026', platforms: ['kalshi', 'polymarket'], yesProbability: 52 },
    ],
    entities: ['WEF', 'Davos', 'Global Economy'],
  },

  // Monday Jan 19
  {
    id: 'bank-holiday-mlk',
    title: 'Bank Holiday (MLK Day)',
    slug: 'mlk-day-2026',
    desk: 'economy',
    eventType: 'release',
    impact: 'low',
    startTime: '2026-01-19T00:00:00Z',
    allDay: true,
    timezone: 'EST',
    status: 'upcoming',
    isRecurring: true,
    summary: 'US markets closed for Martin Luther King Jr. Day. Reduced liquidity expected.',
    marketAngle: 'Low volume day - significant moves may occur on thinner liquidity.',
    sourceLinks: [],
    relatedMarkets: [],
    entities: ['MLK Day', 'US Markets'],
  },
  {
    id: 'wef-day2',
    title: 'WEF Annual Meetings',
    slug: 'wef-annual-2026-day2',
    desk: 'world',
    eventType: 'speech',
    impact: 'medium',
    startTime: '2026-01-19T09:00:00Z',
    allDay: true,
    timezone: 'CET',
    status: 'upcoming',
    isRecurring: true,
    recurrenceKey: 'wef-2026',
    summary: 'Day 2 of World Economic Forum. Focus on AI governance and climate finance.',
    marketAngle: 'AI regulation discussions could move tech and crypto markets.',
    sourceLinks: [
      { title: 'WEF Official Schedule', publisher: 'World Economic Forum', url: '#', publishedAt: '2026-01-15', type: 'official' },
    ],
    relatedMarkets: [
      { marketId: 'ai-regulation', marketTitle: 'Federal AI Regulation 2026', marketSlug: 'federal-ai-regulation-2026', platforms: ['kalshi', 'polymarket'], yesProbability: 22, divergence: 4 },
    ],
    entities: ['WEF', 'AI', 'Climate'],
  },

  // Tuesday Jan 20 - Inauguration Day
  {
    id: 'inauguration-2026',
    title: 'Presidential Inauguration',
    slug: 'inauguration-2026',
    desk: 'politics',
    eventType: 'decision',
    impact: 'high',
    startTime: '2026-01-20T12:00:00-05:00',
    timezone: 'EST',
    status: 'upcoming',
    isRecurring: false,
    summary: 'Presidential Inauguration ceremony at the US Capitol. New administration officially begins.',
    marketAngle: 'Executive orders expected within hours. Markets watching for policy signals on trade, crypto, immigration.',
    sourceLinks: [
      { title: 'Inauguration Schedule', publisher: 'Joint Congressional Committee', url: '#', publishedAt: '2026-01-10', type: 'official' },
    ],
    relatedMarkets: [
      { marketId: 'trump-orders', marketTitle: 'Trump Executive Orders Week 1', marketSlug: 'trump-executive-orders-week-1', platforms: ['kalshi', 'polymarket'], yesProbability: 78, divergence: 3 },
      { marketId: 'greenland', marketTitle: 'US Greenland Acquisition', marketSlug: 'us-greenland-acquisition-2026', platforms: ['kalshi', 'polymarket'], yesProbability: 15 },
    ],
    entities: ['Trump', 'Inauguration', 'Executive Orders'],
  },
  {
    id: 'adp-employment',
    title: 'ADP Weekly Employment Change',
    slug: 'adp-employment-jan-20',
    desk: 'economy',
    eventType: 'release',
    impact: 'medium',
    startTime: '2026-01-20T08:15:00-05:00',
    timezone: 'EST',
    status: 'upcoming',
    isRecurring: true,
    recurrenceKey: 'adp-weekly',
    summary: 'ADP National Employment Report showing private sector job changes.',
    marketAngle: 'Strong jobs data reduces Fed rate cut probability. Weak data increases it.',
    sourceLinks: [
      { title: 'ADP Employment Report', publisher: 'ADP Research Institute', url: '#', publishedAt: '2026-01-20', type: 'official' },
    ],
    relatedMarkets: [
      { marketId: 'fed-rate', marketTitle: 'Fed Rate Cut January 2026', marketSlug: 'fed-rate-cut-january-2026', platforms: ['kalshi', 'polymarket'], yesProbability: 32, divergence: 3 },
    ],
    entities: ['ADP', 'Employment', 'Fed'],
    forecast: '11.8K',
    history: [
      { date: '2026-01-13', actual: '12.1K', forecast: '11.5K', previous: '10.8K' },
      { date: '2026-01-06', actual: '10.8K', forecast: '11.0K', previous: '11.2K' },
    ],
  },

  // Wednesday Jan 21
  {
    id: 'wef-day3',
    title: 'WEF Annual Meetings',
    slug: 'wef-annual-2026-day3',
    desk: 'world',
    eventType: 'speech',
    impact: 'medium',
    startTime: '2026-01-21T09:00:00Z',
    allDay: true,
    timezone: 'CET',
    status: 'upcoming',
    isRecurring: true,
    recurrenceKey: 'wef-2026',
    summary: 'Day 3 of World Economic Forum. Trade and tariff discussions expected.',
    marketAngle: 'EU-US trade rhetoric could move tariff retaliation markets.',
    sourceLinks: [],
    relatedMarkets: [
      { marketId: 'eu-tariff', marketTitle: 'EU Tariff Retaliation', marketSlug: 'eu-tariff-retaliation-2026', platforms: ['kalshi', 'polymarket'], yesProbability: 52 },
    ],
    entities: ['WEF', 'Trade', 'Tariffs'],
  },
  {
    id: 'trump-speaks-1',
    title: 'President Trump Speaks',
    slug: 'trump-speaks-jan-21',
    desk: 'politics',
    eventType: 'speech',
    impact: 'high',
    startTime: '2026-01-21T07:30:00-05:00',
    timezone: 'EST',
    status: 'upcoming',
    isRecurring: false,
    summary: 'First major presidential address after inauguration. Policy priorities expected.',
    marketAngle: 'Executive order announcements likely. Watch for trade, immigration, crypto policy signals.',
    sourceLinks: [],
    relatedMarkets: [
      { marketId: 'trump-orders', marketTitle: 'Trump Executive Orders Week 1', marketSlug: 'trump-executive-orders-week-1', platforms: ['kalshi', 'polymarket'], yesProbability: 78 },
      { marketId: 'greenland', marketTitle: 'US Greenland Acquisition', marketSlug: 'us-greenland-acquisition-2026', platforms: ['kalshi', 'polymarket'], yesProbability: 15 },
    ],
    entities: ['Trump', 'Speech', 'Policy'],
  },
  {
    id: 'pending-home-sales',
    title: 'Pending Home Sales m/m',
    slug: 'pending-home-sales-jan',
    desk: 'economy',
    eventType: 'release',
    impact: 'medium',
    startTime: '2026-01-21T09:00:00-05:00',
    timezone: 'EST',
    status: 'upcoming',
    isRecurring: true,
    recurrenceKey: 'pending-home-sales',
    summary: 'National Association of Realtors report on pending home sales.',
    marketAngle: 'Housing data impacts Fed rate expectations and regional bank markets.',
    sourceLinks: [
      { title: 'NAR Pending Home Sales', publisher: 'National Association of Realtors', url: '#', publishedAt: '2026-01-21', type: 'official' },
    ],
    relatedMarkets: [
      { marketId: 'fed-rate', marketTitle: 'Fed Rate Cut January 2026', marketSlug: 'fed-rate-cut-january-2026', platforms: ['kalshi', 'polymarket'], yesProbability: 32 },
      { marketId: 'bank-failure', marketTitle: 'Regional Bank Failure 2026', marketSlug: 'regional-bank-failure-2026', platforms: ['kalshi'], yesProbability: 18 },
    ],
    entities: ['Housing', 'Real Estate', 'Fed'],
    forecast: '3.3%',
    previous: '-2.6%',
    history: [
      { date: '2025-12-20', actual: '-2.6%', forecast: '0.5%', previous: '1.2%' },
      { date: '2025-11-20', actual: '1.2%', forecast: '0.8%', previous: '-1.5%' },
    ],
  },
  {
    id: 'construction-spending',
    title: 'Construction Spending m/m',
    slug: 'construction-spending-jan',
    desk: 'economy',
    eventType: 'release',
    impact: 'low',
    startTime: '2026-01-21T09:00:00-05:00',
    timezone: 'EST',
    status: 'upcoming',
    isRecurring: true,
    summary: 'Census Bureau report on construction spending.',
    marketAngle: 'Secondary indicator for economic health and infrastructure spending.',
    sourceLinks: [
      { title: 'Construction Spending', publisher: 'Census Bureau', url: '#', publishedAt: '2026-01-21', type: 'official' },
    ],
    relatedMarkets: [],
    entities: ['Construction', 'Economy'],
    forecast: '0.1%',
    history: [
      { date: '2025-12-01', actual: '0.2%', forecast: '-0.2%', previous: '0.4%' },
    ],
  },

  // Thursday Jan 22
  {
    id: 'wef-day4',
    title: 'WEF Annual Meetings',
    slug: 'wef-annual-2026-day4',
    desk: 'world',
    eventType: 'speech',
    impact: 'medium',
    startTime: '2026-01-22T09:00:00Z',
    allDay: true,
    timezone: 'CET',
    status: 'upcoming',
    isRecurring: true,
    recurrenceKey: 'wef-2026',
    summary: 'Day 4 of World Economic Forum. Crypto and digital assets on agenda.',
    marketAngle: 'Crypto regulation discussions could impact Bitcoin and ETF markets.',
    sourceLinks: [],
    relatedMarkets: [
      { marketId: 'btc-100k', marketTitle: 'Bitcoin $100K Q1 2026', marketSlug: 'bitcoin-100k-q1-2026', platforms: ['kalshi', 'polymarket'], yesProbability: 45 },
    ],
    entities: ['WEF', 'Crypto', 'Digital Assets'],
  },
  {
    id: 'core-pce',
    title: 'Core PCE Price Index m/m',
    slug: 'core-pce-jan-22',
    desk: 'economy',
    eventType: 'release',
    impact: 'high',
    startTime: '2026-01-22T07:30:00-05:00',
    timezone: 'EST',
    status: 'upcoming',
    isRecurring: true,
    recurrenceKey: 'core-pce',
    summary: 'Fed\'s preferred inflation measure. Key input for monetary policy decisions.',
    marketAngle: 'Hot PCE = hawkish Fed, reduces rate cut odds. Cool PCE = dovish Fed, increases cut odds.',
    sourceLinks: [
      { title: 'PCE Price Index', publisher: 'Bureau of Economic Analysis', url: '#', publishedAt: '2026-01-22', type: 'official' },
    ],
    relatedMarkets: [
      { marketId: 'fed-rate', marketTitle: 'Fed Rate Cut January 2026', marketSlug: 'fed-rate-cut-january-2026', platforms: ['kalshi', 'polymarket'], yesProbability: 32, divergence: 3 },
      { marketId: 'inflation', marketTitle: 'Inflation Under 3% by June', marketSlug: 'inflation-under-3-percent-june-2026', platforms: ['kalshi', 'polymarket'], yesProbability: 58 },
    ],
    entities: ['PCE', 'Inflation', 'Fed'],
    forecast: '0.2%',
    history: [
      { date: '2025-12-20', actual: '0.1%', forecast: '0.2%', previous: '0.3%' },
      { date: '2025-11-27', actual: '0.3%', forecast: '0.2%', previous: '0.2%' },
    ],
  },
  {
    id: 'gdp-q4',
    title: 'Final GDP q/q',
    slug: 'gdp-q4-2025',
    desk: 'economy',
    eventType: 'release',
    impact: 'high',
    startTime: '2026-01-22T07:30:00-05:00',
    timezone: 'EST',
    status: 'upcoming',
    isRecurring: true,
    recurrenceKey: 'gdp-quarterly',
    summary: 'Final Q4 2025 GDP reading. Confirms economic growth trajectory.',
    marketAngle: 'Strong GDP supports Fed holding rates. Weak GDP increases cut expectations.',
    sourceLinks: [
      { title: 'GDP Report', publisher: 'Bureau of Economic Analysis', url: '#', publishedAt: '2026-01-22', type: 'official' },
    ],
    relatedMarkets: [
      { marketId: 'fed-rate', marketTitle: 'Fed Rate Cut January 2026', marketSlug: 'fed-rate-cut-january-2026', platforms: ['kalshi', 'polymarket'], yesProbability: 32 },
    ],
    entities: ['GDP', 'Economic Growth'],
    forecast: '4.3%',
    previous: '4.3%',
  },
  {
    id: 'unemployment-claims',
    title: 'Unemployment Claims',
    slug: 'unemployment-claims-jan-22',
    desk: 'economy',
    eventType: 'release',
    impact: 'medium',
    startTime: '2026-01-22T07:30:00-05:00',
    timezone: 'EST',
    status: 'upcoming',
    isRecurring: true,
    recurrenceKey: 'weekly-claims',
    summary: 'Weekly initial jobless claims. Leading indicator for labor market health.',
    marketAngle: 'Rising claims signal weakening labor market, increases Fed cut odds.',
    sourceLinks: [
      { title: 'Weekly Claims', publisher: 'Department of Labor', url: '#', publishedAt: '2026-01-22', type: 'official' },
    ],
    relatedMarkets: [
      { marketId: 'fed-rate', marketTitle: 'Fed Rate Cut January 2026', marketSlug: 'fed-rate-cut-january-2026', platforms: ['kalshi', 'polymarket'], yesProbability: 32 },
    ],
    entities: ['Jobs', 'Unemployment', 'Labor'],
    forecast: '203K',
    previous: '198K',
  },

  // Friday Jan 23
  {
    id: 'wef-day5',
    title: 'WEF Annual Meetings',
    slug: 'wef-annual-2026-day5',
    desk: 'world',
    eventType: 'speech',
    impact: 'medium',
    startTime: '2026-01-23T09:00:00Z',
    allDay: true,
    timezone: 'CET',
    status: 'upcoming',
    isRecurring: true,
    recurrenceKey: 'wef-2026',
    summary: 'Final day of World Economic Forum. Closing sessions and communiqué.',
    marketAngle: 'Watch for consensus statements on trade, climate, and technology.',
    sourceLinks: [],
    relatedMarkets: [],
    entities: ['WEF', 'Davos'],
  },
  {
    id: 'pmi-manufacturing',
    title: 'Flash Manufacturing PMI',
    slug: 'pmi-manufacturing-jan',
    desk: 'economy',
    eventType: 'release',
    impact: 'high',
    startTime: '2026-01-23T08:45:00-05:00',
    timezone: 'EST',
    status: 'upcoming',
    isRecurring: true,
    recurrenceKey: 'pmi-flash',
    summary: 'S&P Global Flash Manufacturing PMI. Early read on manufacturing sector health.',
    marketAngle: 'Above 50 = expansion, bullish. Below 50 = contraction, bearish for growth-sensitive markets.',
    sourceLinks: [
      { title: 'Flash PMI', publisher: 'S&P Global', url: '#', publishedAt: '2026-01-23', type: 'official' },
    ],
    relatedMarkets: [
      { marketId: 'fed-rate', marketTitle: 'Fed Rate Cut January 2026', marketSlug: 'fed-rate-cut-january-2026', platforms: ['kalshi', 'polymarket'], yesProbability: 32 },
    ],
    entities: ['PMI', 'Manufacturing'],
    forecast: '52.1',
    previous: '51.8',
  },
  {
    id: 'pmi-services',
    title: 'Flash Services PMI',
    slug: 'pmi-services-jan',
    desk: 'economy',
    eventType: 'release',
    impact: 'high',
    startTime: '2026-01-23T08:45:00-05:00',
    timezone: 'EST',
    status: 'upcoming',
    isRecurring: true,
    recurrenceKey: 'pmi-flash',
    summary: 'S&P Global Flash Services PMI. Services sector accounts for ~70% of US economy.',
    marketAngle: 'Services strength supports Fed holding rates. Weakness increases cut odds.',
    sourceLinks: [
      { title: 'Flash PMI', publisher: 'S&P Global', url: '#', publishedAt: '2026-01-23', type: 'official' },
    ],
    relatedMarkets: [
      { marketId: 'fed-rate', marketTitle: 'Fed Rate Cut January 2026', marketSlug: 'fed-rate-cut-january-2026', platforms: ['kalshi', 'polymarket'], yesProbability: 32 },
    ],
    entities: ['PMI', 'Services'],
    forecast: '52.8',
    previous: '52.5',
  },
  {
    id: 'consumer-sentiment',
    title: 'Revised UoM Consumer Sentiment',
    slug: 'consumer-sentiment-jan',
    desk: 'economy',
    eventType: 'release',
    impact: 'medium',
    startTime: '2026-01-23T09:00:00-05:00',
    timezone: 'EST',
    status: 'upcoming',
    isRecurring: true,
    summary: 'University of Michigan Consumer Sentiment final reading.',
    marketAngle: 'Consumer confidence impacts spending expectations and market sentiment.',
    sourceLinks: [
      { title: 'Consumer Sentiment', publisher: 'University of Michigan', url: '#', publishedAt: '2026-01-23', type: 'official' },
    ],
    relatedMarkets: [],
    entities: ['Consumer', 'Sentiment'],
    forecast: '54.0',
    previous: '54.0',
  },
  {
    id: 'inflation-expectations',
    title: 'Revised UoM Inflation Expectations',
    slug: 'inflation-expectations-jan',
    desk: 'economy',
    eventType: 'release',
    impact: 'medium',
    startTime: '2026-01-23T09:00:00-05:00',
    timezone: 'EST',
    status: 'upcoming',
    isRecurring: true,
    summary: 'University of Michigan Inflation Expectations. Key Fed input.',
    marketAngle: 'Rising inflation expectations = hawkish Fed. Falling = dovish.',
    sourceLinks: [
      { title: 'Inflation Expectations', publisher: 'University of Michigan', url: '#', publishedAt: '2026-01-23', type: 'official' },
    ],
    relatedMarkets: [
      { marketId: 'inflation', marketTitle: 'Inflation Under 3% by June', marketSlug: 'inflation-under-3-percent-june-2026', platforms: ['kalshi', 'polymarket'], yesProbability: 58 },
    ],
    entities: ['Inflation', 'Expectations'],
    previous: '4.2%',
  },

  // Saturday Jan 24 - Sports
  {
    id: 'nfl-divisional-1',
    title: 'NFL Divisional Round',
    slug: 'nfl-divisional-jan-24',
    desk: 'sports',
    eventType: 'sports',
    impact: 'high',
    startTime: '2026-01-24T16:30:00-05:00',
    timezone: 'EST',
    status: 'upcoming',
    isRecurring: false,
    summary: 'NFL Divisional Playoff games. Winners advance to Conference Championships.',
    marketAngle: 'Results directly impact Super Bowl odds and futures markets.',
    sourceLinks: [
      { title: 'NFL Playoff Schedule', publisher: 'NFL', url: '#', publishedAt: '2026-01-15', type: 'official' },
    ],
    relatedMarkets: [
      { marketId: 'super-bowl', marketTitle: 'Super Bowl LX Winner', marketSlug: 'super-bowl-lx-winner', platforms: ['kalshi', 'polymarket'], yesProbability: 35, divergence: 3 },
    ],
    entities: ['NFL', 'Playoffs', 'Football'],
  },
];

// Helper functions
export function getEventsByDate(date: string): CalendarEvent[] {
  return calendarEvents.filter(event => {
    const eventDate = new Date(event.startTime).toISOString().split('T')[0];
    return eventDate === date;
  });
}

export function getEventsByDateRange(startDate: string, endDate: string): CalendarEvent[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return calendarEvents.filter(event => {
    const eventDate = new Date(event.startTime);
    return eventDate >= start && eventDate <= end;
  });
}

export function getEventsByDesk(desk: EventDesk): CalendarEvent[] {
  return calendarEvents.filter(event => event.desk === desk);
}

export function getHighImpactEvents(): CalendarEvent[] {
  return calendarEvents.filter(event => event.impact === 'high');
}

export function groupEventsByDay(events: CalendarEvent[]): Record<string, CalendarEvent[]> {
  const grouped: Record<string, CalendarEvent[]> = {};
  
  events.forEach(event => {
    const dateKey = new Date(event.startTime).toISOString().split('T')[0];
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(event);
  });

  // Sort events within each day by time
  Object.keys(grouped).forEach(key => {
    grouped[key].sort((a, b) => {
      if (a.allDay && !b.allDay) return -1;
      if (!a.allDay && b.allDay) return 1;
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    });
  });

  return grouped;
}

export function formatEventTime(event: CalendarEvent): string {
  if (event.allDay) return 'All Day';
  
  const date = new Date(event.startTime);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).replace(' ', '').toLowerCase();
}

export function getDeskLabel(desk: EventDesk): string {
  const labels: Record<EventDesk, string> = {
    politics: 'Politics',
    economy: 'Economy',
    world: 'World',
    elections: 'Elections',
    crypto: 'Crypto',
    tech: 'Tech',
    sports: 'Sports',
  };
  return labels[desk];
}

export function getDeskColor(desk: EventDesk): string {
  const colors: Record<EventDesk, string> = {
    politics: 'text-red-600',
    economy: 'text-blue-600',
    world: 'text-purple-600',
    elections: 'text-orange-600',
    crypto: 'text-yellow-600',
    tech: 'text-cyan-600',
    sports: 'text-green-600',
  };
  return colors[desk];
}

