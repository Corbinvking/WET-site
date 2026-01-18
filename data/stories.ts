export type StoryLabel = 'News' | 'Analysis' | 'Explainer' | 'Live Updates' | 'Breaking';

export interface Story {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  heroImage: string;
  summary: string;
  body: string;
  marketAngle: string;
  relatedMarketIds: string[];
  labels: StoryLabel[];
  pricedIn: string[];
  notPricedIn: string[];
  catalysts: string[];
  sources: { name: string; url: string }[];
  featured?: boolean;
}

export const stories: Story[] = [
  {
    id: 'europe-greenland-response',
    title: 'A stunned Europe finally wakes up to Trump\'s Greenland threat',
    slug: 'europe-greenland-response-trump',
    category: 'geopolitics',
    author: 'Marcus Chen',
    publishedAt: '2026-01-18T14:30:00Z',
    heroImage: '/images/greenland-protest.jpg',
    summary: 'Across the continent, the response was immediate and emphatic as European leaders scrambled to respond to renewed US interest in acquiring Greenland.',
    body: `European capitals were caught off-guard this week as the Trump administration signaled renewed interest in acquiring Greenland, forcing a rapid reassessment of transatlantic relations just days into the new presidency.

The reaction from Denmark was swift and unequivocal. Prime Minister Mette Frederiksen called an emergency cabinet meeting, emerging to declare that "Greenland is not for sale" while emphasizing the autonomous territory's right to self-determination.

But behind closed doors, officials across the EU are grappling with a more complex reality. The strategic value of Greenland—rich in rare earth minerals and positioned at the center of increasingly navigable Arctic shipping routes—has long made it a geopolitical prize.

Market traders have already priced in significant uncertainty. Prediction markets on both Kalshi and Polymarket show odds of formal acquisition negotiations beginning have spiked from 4% to 15% in just 72 hours, with volume surging past $2 million.`,
    marketAngle: 'Markets now price 15% odds of formal US-Greenland negotiations beginning in 2026, up from 4% pre-inauguration.',
    relatedMarketIds: ['greenland-acquisition', 'tariffs-eu-retaliation'],
    labels: ['Analysis'],
    pricedIn: [
      'Initial diplomatic tensions with Denmark',
      'Increased Arctic strategic competition',
      'Short-term EUR/USD volatility',
    ],
    notPricedIn: [
      'Potential NATO Article 5 implications',
      'Danish constitutional crisis if Greenland votes for independence',
      'Chinese counter-offers for mineral rights',
    ],
    catalysts: [
      'State Department briefing scheduled for February 1',
      'Greenland Parliament session on January 25',
      'NATO foreign ministers meeting in March',
    ],
    sources: [
      { name: 'Reuters', url: 'https://reuters.com' },
      { name: 'Financial Times', url: 'https://ft.com' },
      { name: 'Kalshi Market Data', url: 'https://kalshi.com' },
    ],
    featured: true,
  },
  {
    id: 'minnesota-national-guard',
    title: '1,500 soldiers on standby for possible Minnesota deployment, source says, as state mobilizes National Guard',
    slug: 'minnesota-national-guard-standby',
    category: 'politics',
    author: 'Sarah Mitchell',
    publishedAt: '2026-01-18T12:15:00Z',
    heroImage: '/images/national-guard.jpg',
    summary: 'The federal government has placed 1,500 soldiers on standby as tensions escalate between state and federal authorities over immigration enforcement.',
    body: `Federal officials have placed approximately 1,500 military personnel on standby for potential deployment to Minnesota, according to a source familiar with the matter, as the state mobilizes its National Guard in an escalating standoff over immigration enforcement.

The move comes amid a broader pattern of friction between the Trump administration and Democratic governors over the implementation of aggressive new immigration policies unveiled during the president's first week in office.

Minnesota Governor Tim Walz has publicly refused to cooperate with certain federal directives, citing constitutional concerns and the state's sanctuary policies. The confrontation has legal scholars debating the limits of federal authority and governors' powers.`,
    marketAngle: 'State-federal tensions adding uncertainty to policy implementation timelines across multiple markets.',
    relatedMarketIds: ['trump-executive-orders'],
    labels: ['Breaking', 'Live Updates'],
    pricedIn: [
      'General increase in executive action volume',
      'Resistance from Democratic governors',
    ],
    notPricedIn: [
      'Potential National Guard federalization',
      'Court injunctions on enforcement',
      'Economic impact on affected states',
    ],
    catalysts: [
      'Court hearing on federal authority January 22',
      'Governor\'s press conference at 3 PM ET',
    ],
    sources: [
      { name: 'Associated Press', url: 'https://ap.com' },
      { name: 'Minnesota Public Radio', url: 'https://mprnews.org' },
    ],
    featured: true,
  },
  {
    id: 'trump-first-year-capital',
    title: 'How Trump\'s first year back is changing the nation\'s capital',
    slug: 'trump-first-year-washington-changes',
    category: 'politics',
    author: 'David Brooks',
    publishedAt: '2026-01-18T10:00:00Z',
    heroImage: '/images/capitol-change.jpg',
    summary: 'From agency restructuring to a transformed lobbying landscape, Washington is experiencing its most dramatic shift in decades.',
    body: `The transformation of Washington D.C. under the second Trump administration is proceeding at a pace that has even seasoned observers struggling to keep up. Federal agencies are being restructured, longtime civil servants are departing in waves, and the lobbying industry is scrambling to adapt to new centers of power.

Perhaps most striking is the physical change to the federal workforce. Entire floors of agency buildings sit empty as return-to-office mandates clash with ongoing reductions in force. The General Services Administration reports that federal office space utilization has dropped to historic lows.

For prediction market traders, the rapid pace of change creates both opportunities and challenges. Markets on specific policy outcomes are seeing unprecedented volatility, while longer-term structural bets require careful analysis of which changes are likely to prove durable.`,
    marketAngle: 'Executive order volume already exceeds first-term pace, with markets pricing 78% chance of 50+ orders in first week.',
    relatedMarketIds: ['trump-executive-orders', 'scotus-term-major-ruling'],
    labels: ['Analysis'],
    pricedIn: [
      'High volume of executive actions',
      'Federal workforce reductions',
      'Regulatory rollbacks',
    ],
    notPricedIn: [
      'Long-term institutional capacity effects',
      'State-level policy divergence',
      'International regulatory arbitrage',
    ],
    catalysts: [
      'First 100 days milestone April 30',
      'OMB budget proposal March 1',
    ],
    sources: [
      { name: 'Washington Post', url: 'https://washingtonpost.com' },
      { name: 'Politico', url: 'https://politico.com' },
    ],
  },
  {
    id: 'fed-rate-decision-preview',
    title: 'Fed decision preview: Markets see January hold as near-certainty despite cooling inflation',
    slug: 'fed-rate-decision-january-preview',
    category: 'economy',
    author: 'Jennifer Walsh',
    publishedAt: '2026-01-17T16:00:00Z',
    heroImage: '/images/federal-reserve.jpg',
    summary: 'The January FOMC meeting is expected to hold rates steady, but traders are focused on signals about the March decision.',
    body: `The Federal Reserve's first policy meeting of 2026 is widely expected to result in unchanged interest rates, with prediction markets pricing only a 32% chance of a rate cut at the January 29 decision.

The calculus is straightforward: despite encouraging inflation data—December CPI came in at 2.7% year-over-year, the lowest reading in three years—Fed officials have consistently messaged patience in their approach to further easing.

Chair Powell's recent comments emphasized the need to see "sustained progress" rather than react to individual data points. Translation for traders: the bar for a January cut is high.

More interesting is the divergence between Kalshi and Polymarket on this question. Kalshi shows 32% odds of a January cut, while Polymarket trades at 35%—a 3-point spread that sophisticated traders are watching closely.`,
    marketAngle: 'January rate cut odds at 32% (Kalshi) vs 35% (Polymarket). March meeting becoming the key battleground.',
    relatedMarketIds: ['fed-rate-jan-2026', 'inflation-under-3'],
    labels: ['Analysis'],
    pricedIn: [
      'January hold as base case',
      'Gradual disinflation trend',
      'Labor market resilience',
    ],
    notPricedIn: [
      'Tariff-driven inflation shock in Q1',
      'Credit event forcing emergency action',
      'Political pressure on Fed independence',
    ],
    catalysts: [
      'January 15 CPI report release',
      'January 24 GDP advance estimate',
      'January 29 FOMC decision',
    ],
    sources: [
      { name: 'Federal Reserve', url: 'https://federalreserve.gov' },
      { name: 'Bloomberg', url: 'https://bloomberg.com' },
    ],
  },
  {
    id: 'bitcoin-institutional-flows',
    title: 'Bitcoin ETF inflows hit 2026 high as institutional adoption accelerates',
    slug: 'bitcoin-etf-inflows-institutional',
    category: 'crypto',
    author: 'Alex Rivera',
    publishedAt: '2026-01-17T14:30:00Z',
    heroImage: '/images/bitcoin-chart.jpg',
    summary: 'Spot Bitcoin ETFs recorded their largest weekly inflow since approval, signaling renewed institutional appetite.',
    body: `Spot Bitcoin ETFs recorded $1.2 billion in net inflows this week, the highest weekly figure since the products launched a year ago, as institutional investors appear to be front-running potential policy shifts under the new administration.

BlackRock's IBIT led the way with $480 million in inflows, followed by Fidelity's FBTC at $320 million. Even Grayscale's GBTC, which has seen persistent outflows since conversion, recorded positive flows for the first time in months.

The surge comes as Bitcoin approaches the psychologically significant $100,000 level, currently trading around $94,500. Prediction markets show a 45-48% chance of Bitcoin reaching six figures before Q2, though the path there remains contested.`,
    marketAngle: 'Markets price 45-48% odds of $100K Bitcoin by April 1. Institutional flow data suggests momentum building.',
    relatedMarketIds: ['bitcoin-100k-q1'],
    labels: ['News'],
    pricedIn: [
      'ETF approval tailwind continuing',
      'Halving supply dynamics',
      'Macro risk-on environment',
    ],
    notPricedIn: [
      'Potential regulatory crackdown reversal',
      'Major exchange solvency risk',
      'Stablecoin regulatory action',
    ],
    catalysts: [
      'Grayscale ETF deadline February 15',
      'March FOMC meeting and dot plot',
    ],
    sources: [
      { name: 'CoinDesk', url: 'https://coindesk.com' },
      { name: 'Bloomberg ETF Data', url: 'https://bloomberg.com' },
    ],
  },
  {
    id: 'meloni-tariff-response',
    title: 'Meloni calls Trump tariff threat against European countries over Greenland \'a mistake\'',
    slug: 'meloni-trump-tariff-greenland-response',
    category: 'geopolitics',
    author: 'Marco Benedetti',
    publishedAt: '2026-01-18T11:45:00Z',
    heroImage: '/images/meloni-statement.jpg',
    summary: 'Italian PM Meloni breaks with other European leaders\' harsh rhetoric, calling for dialogue while criticizing tariff threats.',
    body: `Italian Prime Minister Giorgia Meloni offered a notably measured response to the escalating US-Europe tensions over Greenland, calling President Trump's tariff threats "a mistake" while stopping short of the more confrontational language adopted by other European leaders.

Speaking at a press conference in Rome, Meloni emphasized the need for "continued dialogue" and warned against "a cycle of retaliation that would harm both sides." Her comments reflect Italy's delicate balancing act as a NATO ally with significant trade exposure to the United States.

The response highlights emerging divisions within the EU over how to handle the new American administration. While France and Germany have adopted harder lines, southern European nations appear more hesitant to escalate.`,
    marketAngle: 'EU retaliatory tariff odds now at 52-55% for Q1, with member state divisions adding uncertainty.',
    relatedMarketIds: ['tariffs-eu-retaliation', 'greenland-acquisition'],
    labels: ['Live Updates'],
    pricedIn: [
      'EU unified public response',
      'Some tariff retaliation likely',
    ],
    notPricedIn: [
      'Depth of EU internal divisions',
      'Bilateral US-Italy negotiations',
      'Impact on NATO burden-sharing talks',
    ],
    catalysts: [
      'EU emergency summit January 22',
      'Davos World Economic Forum January 25',
    ],
    sources: [
      { name: 'ANSA', url: 'https://ansa.it' },
      { name: 'Reuters', url: 'https://reuters.com' },
    ],
  },
  {
    id: 'ai-chatbots-youth-safety',
    title: 'More young people are using AI chatbots. Is it safe?',
    slug: 'ai-chatbots-youth-safety-concerns',
    category: 'tech',
    author: 'Emily Zhang',
    publishedAt: '2026-01-17T09:00:00Z',
    heroImage: '/images/ai-youth.jpg',
    summary: 'As AI chatbot usage among teenagers surges, parents and regulators grapple with safety implications.',
    body: `A new survey finds that 67% of American teenagers now use AI chatbots at least weekly, up from just 23% a year ago. The rapid adoption is prompting urgent questions about safety, mental health impacts, and the adequacy of current guardrails.

The concerns aren't hypothetical. Several high-profile incidents in recent months have involved AI chatbots providing inappropriate advice to minors, spurring calls for stricter age verification and content filtering requirements.

For prediction market traders, the question of AI regulation has become increasingly relevant. Markets currently price only an 18-22% chance of comprehensive federal AI legislation in 2026, but advocacy groups are pushing hard to raise the issue's profile.`,
    marketAngle: 'AI regulation odds at 18-22% for 2026, but youth safety incidents could shift political calculus.',
    relatedMarketIds: ['ai-regulation-2026'],
    labels: ['Analysis'],
    pricedIn: [
      'Continued voluntary industry measures',
      'State-level patchwork regulation',
    ],
    notPricedIn: [
      'Major safety incident involving minors',
      'Bipartisan legislative push',
      'Platform liability changes',
    ],
    catalysts: [
      'Senate AI Caucus hearing March 1',
      'FTC report on AI practices due Q2',
    ],
    sources: [
      { name: 'Pew Research', url: 'https://pewresearch.org' },
      { name: 'The Atlantic', url: 'https://theatlantic.com' },
    ],
  },
  {
    id: 'ukraine-peace-talks-momentum',
    title: 'Ukraine peace talks gain momentum as Trump envoy meets with Zelensky',
    slug: 'ukraine-peace-talks-trump-envoy',
    category: 'geopolitics',
    author: 'Olena Kovalenko',
    publishedAt: '2026-01-16T18:00:00Z',
    heroImage: '/images/ukraine-talks.jpg',
    summary: 'President Trump\'s special envoy held extensive meetings in Kyiv, signaling a more active US role in seeking a negotiated end to the conflict.',
    body: `The Trump administration's special envoy for Ukraine and Russia, Keith Kellogg, concluded two days of intensive meetings in Kyiv, emerging with what he described as "productive conversations" about a potential path to peace.

The visit marks the most significant diplomatic engagement by the new administration on the Ukraine conflict and has sent prediction markets into motion. Odds of a formal ceasefire before July 1 have risen from 22% to 31% on Polymarket since the envoy's arrival was announced.

Ukrainian President Zelensky struck a cautiously optimistic tone, emphasizing that any settlement must respect Ukraine's sovereignty and territorial integrity. The details of what was discussed remain closely held, but sources indicate the talks covered both military assistance levels and potential negotiating frameworks.`,
    marketAngle: 'Ceasefire odds for H1 2026 jumped to 28-31% from 22% on Trump envoy visit. Key divergence emerging.',
    relatedMarketIds: ['ukraine-ceasefire-h1'],
    labels: ['News'],
    pricedIn: [
      'Active US diplomatic engagement',
      'Both sides\' willingness to talk',
    ],
    notPricedIn: [
      'Specific territorial compromises',
      'Security guarantee structures',
      'Timeline for implementation',
    ],
    catalysts: [
      'February 24 marks 3-year anniversary',
      'Potential Trump-Putin call',
      'May 9 Victory Day deadline speculation',
    ],
    sources: [
      { name: 'Kyiv Independent', url: 'https://kyivindependent.com' },
      { name: 'Associated Press', url: 'https://apnews.com' },
    ],
  },
  {
    id: 'superbowl-playoff-preview',
    title: 'Super Bowl LX preview: Conference championships set to determine final matchup',
    slug: 'super-bowl-playoff-preview-conference',
    category: 'sports',
    author: 'Mike Johnson',
    publishedAt: '2026-01-18T08:00:00Z',
    heroImage: '/images/nfl-playoffs.jpg',
    summary: 'With divisional round complete, four teams remain in contention for Super Bowl LX in New Orleans.',
    body: `The road to Super Bowl LX in New Orleans narrows this weekend as four teams battle for conference supremacy. The matchups promise high drama, with prediction markets showing tighter odds than at any point in the playoffs.

In the AFC, the defending champion Kansas City Chiefs host the surging Buffalo Bills in what many are calling a referendum on the AFC's hierarchy. Kalshi has the Chiefs as slight favorites, though the 3-point spread suggests a coin flip.

The NFC championship pits the Philadelphia Eagles against the Detroit Lions, with Detroit seeking its first Super Bowl appearance in franchise history. Polymarket shows the Lions as narrow favorites, reflecting their dominant playoff run.`,
    marketAngle: 'Super Bowl winner market shows $21M+ in total volume. Lions and Chiefs currently favored on respective platforms.',
    relatedMarketIds: ['superbowl-2026-winner'],
    labels: ['News'],
    pricedIn: [
      'Current team performance levels',
      'Home field advantages',
      'Key injury statuses',
    ],
    notPricedIn: [
      'Weather impact on Conference Championships',
      'Unexpected injury developments',
      'Coaching adjustments',
    ],
    catalysts: [
      'Conference Championships January 25',
      'Super Bowl LX February 8',
    ],
    sources: [
      { name: 'ESPN', url: 'https://espn.com' },
      { name: 'The Athletic', url: 'https://theathletic.com' },
    ],
  },
  {
    id: 'climate-ira-rollback-debate',
    title: 'GOP targets IRA climate provisions as budget battle looms',
    slug: 'gop-ira-climate-provisions-budget',
    category: 'climate',
    author: 'Rachel Green',
    publishedAt: '2026-01-16T12:00:00Z',
    heroImage: '/images/climate-congress.jpg',
    summary: 'Republican lawmakers are eyeing Inflation Reduction Act climate provisions as potential offsets for tax cut extensions.',
    body: `House Republicans are increasingly targeting the Inflation Reduction Act's climate provisions as they search for revenue offsets to fund an extension of the 2017 tax cuts, according to lawmakers and aides familiar with the deliberations.

The provisions at risk include the electric vehicle tax credit, clean energy production credits, and funding for the EPA's greenhouse gas reduction programs. Together, they represent hundreds of billions in planned spending over the next decade.

Prediction markets currently show 38-42% odds of major IRA climate rollbacks in 2026, though the actual legislative path remains unclear. Some Republicans from districts with significant clean energy investment have expressed reluctance to support full repeal.`,
    marketAngle: 'Markets price 38-42% odds of major IRA climate rollbacks. Red state clean energy investments complicating GOP calculus.',
    relatedMarketIds: ['climate-legislation-2026'],
    labels: ['Analysis'],
    pricedIn: [
      'Political desire for rollbacks',
      'Budget reconciliation as vehicle',
    ],
    notPricedIn: [
      'Industry lobbying effectiveness',
      'Red state economic dependencies',
      'Possible partial compromises',
    ],
    catalysts: [
      'Budget proposal due March 1',
      'Reconciliation instructions timeline',
      'Fiscal year end September 30',
    ],
    sources: [
      { name: 'E&E News', url: 'https://eenews.net' },
      { name: 'The Hill', url: 'https://thehill.com' },
    ],
  },
];

export const getStoryBySlug = (slug: string): Story | undefined => {
  return stories.find(s => s.slug === slug);
};

export const getStoryById = (id: string): Story | undefined => {
  return stories.find(s => s.id === id);
};

export const getStoriesByCategory = (category: string): Story[] => {
  return stories.filter(s => s.category === category);
};

export const getFeaturedStories = (): Story[] => {
  return stories.filter(s => s.featured);
};

export const getLatestStories = (limit: number = 10): Story[] => {
  return [...stories]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};

export const getStoriesByLabel = (label: StoryLabel): Story[] => {
  return stories.filter(s => s.labels.includes(label));
};

// Trending topics for the strip
export const trendingTopics = [
  { name: 'Minneapolis ICE shooting', slug: 'minneapolis-ice-shooting' },
  { name: 'Missing surveillance plane', slug: 'missing-surveillance-plane' },
  { name: 'Austria avalanches', slug: 'austria-avalanches' },
  { name: 'Virginia Gov. Abigail Spanberger', slug: 'virginia-gov-spanberger' },
  { name: 'Free trade agreement', slug: 'free-trade-agreement' },
  { name: '2026 trend', slug: '2026-trend' },
  { name: 'John Harbaugh', slug: 'john-harbaugh' },
];
