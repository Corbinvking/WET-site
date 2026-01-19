import Link from 'next/link';
import { trendingTopics } from '@/data/stories';

export function TrendingStrip() {
  return (
    <div className="bg-white border-b border-border py-2">
      <div className="container-wet flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide">
        <span className="text-xs font-bold text-text-primary mr-3 flex-shrink-0">Trending:</span>
        <div className="flex items-center gap-2">
          {trendingTopics.map((topic, index) => (
            <span key={topic.slug} className="flex items-center">
              <Link
                href={`/tag/${topic.slug}`}
                className="trending-link text-xs text-text-secondary flex-shrink-0 hover:underline"
              >
                {topic.name}
              </Link>
              {index < trendingTopics.length - 1 && (
                <span className="mx-2 text-border">|</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
