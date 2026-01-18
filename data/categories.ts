export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

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
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(c => c.slug === slug);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(c => c.id === id);
};


