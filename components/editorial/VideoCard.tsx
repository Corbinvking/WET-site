import Link from 'next/link';
import clsx from 'clsx';

interface VideoCardProps {
  title: string;
  href: string;
  runtime: string;
  category?: string;
  thumbnail?: string;
  className?: string;
}

export function VideoCard({ title, href, runtime, category, thumbnail, className }: VideoCardProps) {
  return (
    <Link
      href={href}
      className={clsx(
        'group flex-shrink-0 w-56',
        className
      )}
    >
      {/* Thumbnail with play button overlay */}
      <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden mb-2">
        {thumbnail ? (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${thumbnail})` }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="play-button w-10 h-10 bg-brand-primary/90 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        
        {/* Runtime badge */}
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[10px] font-medium rounded">
          {runtime}
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      {/* Category tag */}
      {category && (
        <span className="text-[10px] font-medium text-brand-primary uppercase tracking-wide">
          {category}
        </span>
      )}
      
      {/* Title */}
      <h4 className="text-xs font-medium text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug mt-1">
        {title}
      </h4>
    </Link>
  );
}


