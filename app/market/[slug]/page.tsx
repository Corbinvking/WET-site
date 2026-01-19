import { notFound } from 'next/navigation';
import { globalMarkets } from '@/data/markets';
import { stories } from '@/data/stories';
import MarketDetailClient from './MarketDetailClient';

interface MarketPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return globalMarkets.map((market) => ({
    slug: market.slug,
  }));
}

export async function generateMetadata({ params }: MarketPageProps) {
  const { slug } = await params;
  const market = globalMarkets.find(m => m.slug === slug);
  if (!market) {
    return {};
  }
  return {
    title: `${market.title} | W.E.T. Markets`,
    description: market.canonicalQuestion,
  };
}

export default async function MarketPage({ params }: MarketPageProps) {
  const { slug } = await params;
  const market = globalMarkets.find(m => m.slug === slug);

  if (!market) {
    notFound();
  }

  // Find related stories
  const relatedStories = stories.filter(story => 
    story.relatedMarketIds?.includes(market.id)
  ).slice(0, 5);

  return (
    <MarketDetailClient 
      market={market} 
      relatedStories={relatedStories}
    />
  );
}
