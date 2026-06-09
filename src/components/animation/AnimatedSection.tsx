import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  once?: boolean
}

export function AnimatedSection({ children, className = '', delay = 0, once = true }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-60px' })
  const prefersReducedMotion = useReducedMotion()

  const variants: Variants = prefersReducedMotion
    ? {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.5, delay } },
    }
    : {
      hidden: { filter: 'blur(8px)', opacity: 0, y: 24 },
      visible: {
        filter: 'blur(0px)',
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
      },
    }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}