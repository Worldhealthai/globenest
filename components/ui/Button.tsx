'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-40 disabled:cursor-not-allowed'

  const variants = {
    primary: 'text-white focus:ring-primary-500',
    secondary: 'text-white focus:ring-secondary-500',
    outline: 'border border-white/20 text-white/80 hover:text-white hover:border-white/40 focus:ring-primary-500',
    ghost: 'text-primary-400 hover:bg-primary/10 focus:ring-primary-500',
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: { background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 60%, #06B6D4 100%)', boxShadow: '0 4px 24px rgba(139,92,246,0.4)' },
    secondary: { background: 'linear-gradient(135deg, #0891B2 0%, #22D3EE 100%)', boxShadow: '0 4px 24px rgba(34,211,238,0.35)' },
    outline: { background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' },
    ghost: { background: 'transparent' },
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      style={variantStyles[variant]}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  )
}
