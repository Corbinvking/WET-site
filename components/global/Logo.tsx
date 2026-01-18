import Image from 'next/image';
import clsx from 'clsx';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { width: 24, height: 24 },
    md: { width: 32, height: 32 },
    lg: { width: 48, height: 48 },
  };

  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <Image
        src="/logo.png"
        alt="W.E.T. Logo"
        width={sizes[size].width}
        height={sizes[size].height}
        className="object-contain"
        priority
      />
      <span className="font-bold text-text-primary tracking-tight">
        W<span className="text-brand">·</span>E<span className="text-brand">·</span>T
      </span>
    </div>
  );
}
