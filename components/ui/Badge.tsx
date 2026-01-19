import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'brand' | 'success' | 'warning' | 'danger' | 'muted';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  pulse?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-bg-elevated text-text-secondary border-border',
  brand: 'bg-brand/20 text-brand border-brand/30',
  success: 'bg-market-up/20 text-market-up border-market-up/30',
  warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  danger: 'bg-market-down/20 text-market-down border-market-down/30',
  muted: 'bg-bg-surface text-text-muted border-border-subtle',
};

export function Badge({ children, variant = 'default', className, pulse }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded border',
        variantStyles[variant],
        className
      )}
    >
      {pulse && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      )}
      {children}
    </span>
  );
}



