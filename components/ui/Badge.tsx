import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'neutral'
  className?: string
}

export default function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  const variants = {
    primary: 'bg-primary/15 text-primary-300 border border-primary/25',
    secondary: 'bg-secondary/10 text-secondary-300 border border-secondary/20',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    neutral: 'bg-white/5 text-white/60 border border-white/10',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
