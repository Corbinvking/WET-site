import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-bg-primary">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-brand mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Page Not Found
        </h2>
        <p className="text-text-muted mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            href="/"
            className="px-6 py-2.5 bg-brand hover:bg-brand-hover text-white font-medium rounded transition-colors"
          >
            Go Home
          </Link>
          <Link 
            href="/markets"
            className="px-6 py-2.5 bg-bg-surface hover:bg-bg-hover border border-border text-text-primary font-medium rounded transition-colors"
          >
            Browse Markets
          </Link>
        </div>
      </div>
    </div>
  );
}



