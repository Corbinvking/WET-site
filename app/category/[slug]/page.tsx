import { notFound } from 'next/navigation';
import { categories, getCategoryBySlug, getDeskConfigOrDefault } from '@/data/categories';
import DeskPageClient from './DeskPageClient';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    return {};
  }
  return {
    title: `${category.name} Markets | W.E.T.`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const deskConfig = getDeskConfigOrDefault(slug);

  if (!category) {
    notFound();
  }

  return (
    <DeskPageClient 
      slug={slug} 
      category={category} 
      deskConfig={deskConfig} 
    />
  );
}
