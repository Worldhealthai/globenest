'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export default function Card({
  children,
  className,
  hover = false,
  padding = 'md',
  onClick,
}: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const CardWrapper = hover ? motion.div : 'div'
  const hoverProps = hover ? {
    whileHover: { y: -4, scale: 1.01 },
    transition: { duration: 0.2 }
  } : {}

  return (
    <CardWrapper
      className={cn(
        'bg-white rounded-2xl shadow-soft border border-gray-100',
        paddingStyles[padding],
        hover && 'cursor-pointer hover:shadow-medium',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...hoverProps}
    >
      {children}
    </CardWrapper>
  )
}
