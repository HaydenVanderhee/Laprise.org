import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'

interface WordRevealProps {
  text: string
  className?: string
  style?: CSSProperties
  delay?: number
}

export function WordReveal({ text, className = '', style, delay = 0 }: WordRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const words = text.split(' ')

  return (
    <span
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', rowGap: '0.1em', ...style }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden="true"
          style={{ display: 'inline-block', marginRight: '0.28em', ...style }}
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { filter: 'blur(10px)', opacity: 0, y: 40 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { filter: 'blur(0px)', opacity: 1, y: 0 }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0.5, delay: delay + i * 0.06 }
              : {
                  duration: 0.7,
                  delay: delay + (i * 100) / 1000,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }
          }
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
