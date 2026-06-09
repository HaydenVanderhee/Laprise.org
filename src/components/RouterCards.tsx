import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const SCROLL_MARGIN = '-60px'

const SPACE_GROTESK = "'Space Grotesk', sans-serif"
const HANKEN = "'Hanken Grotesk', sans-serif"

interface CardData {
  id: string
  icon: string
  title: string
  description: string
  href: string
}

const cards: CardData[] = [
  {
    id: 'weight-loss',
    icon: 'monitor_weight',
    title: 'Weight Loss Clinics',
    description: 'Capture every GLP-1 enquiry and keep monthly patients booked solid.',
    href: '/weight-loss',
  },
  {
    id: 'hair-restoration',
    icon: 'face',
    title: 'Hair Restoration',
    description: 'Turn high-value consultations into booked procedures, automatically.',
    href: '/hair',
  },
  {
    id: 'skin-rejuvenation',
    icon: 'spa',
    title: 'Skin Rejuvenation',
    description: 'Fill your treatment chairs with rebooking patients on autopilot.',
    href: '/skin',
  },
]

export function RouterCards({
  disableLinks = false,
  showTrustLine = true,
}: {
  disableLinks?: boolean
  showTrustLine?: boolean
} = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const itemVariants: Variants = prefersReducedMotion
    ? {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.5 } },
    }
    : {
      hidden: { filter: 'blur(8px)', opacity: 0, y: 28 },
      visible: {
        filter: 'blur(0px)',
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
      },
    }

  return (
    <section
      aria-label="Clinic specialties"
      style={{ width: '100%', paddingBottom: '96px' }}
    >
      {/* Directive — animated chevron + label */}
      <motion.div
        animate={prefersReducedMotion ? undefined : { opacity: [0.75, 1, 0.75] }}
        transition={prefersReducedMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '32px',
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Expanding glow ring behind chevron */}
          <motion.div
            animate={prefersReducedMotion ? undefined : { scale: [1, 1.5, 1], opacity: [0.25, 0, 0.25] }}
            transition={prefersReducedMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(71, 241, 228, 0.3)',
              filter: 'blur(6px)',
            }}
          />
          <motion.svg
            animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }}
            transition={prefersReducedMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            width="28"
            height="17"
            viewBox="0 0 20 12"
            fill="none"
            aria-hidden="true"
            style={{
              display: 'block',
              position: 'relative',
              filter: 'drop-shadow(0 0 6px rgba(71, 241, 228, 0.55))',
            }}
          >
            <path
              d="M1 1L10 10L19 1"
              stroke="#47f1e4"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>
        <p
          style={{
            fontFamily: "'Newsreader', serif",
            fontSize: '16px',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#47f1e4',
            margin: 0,
            textShadow: '0 0 14px rgba(71, 241, 228, 0.6)',
          }}
        >
          Select your clinic type to see your results
        </p>
      </motion.div>

      {/* Cards grid */}
      <div
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}
      >
        {cards.map((card, i) => (
          <ClinicCard
            key={card.id}
            card={card}
            itemVariants={itemVariants}
            prefersReducedMotion={!!prefersReducedMotion}
            disableLinks={disableLinks}
            delay={i * 0.09}
          />
        ))}
      </div>

      {showTrustLine && (
        <p
          style={{
            fontFamily: HANKEN,
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: 1.5,
            color: 'rgba(186, 202, 199, 0.45)',
            textAlign: 'center',
            marginTop: '40px',
            marginBottom: 0,
          }}
        >
          Trusted by clinics across North America and Oceania
        </p>
      )}
    </section>
  )
}

function ClinicCard({
  card,
  itemVariants,
  prefersReducedMotion,
  disableLinks,
  delay,
}: {
  card: CardData
  itemVariants: Variants
  prefersReducedMotion: boolean
  disableLinks: boolean
  delay: number
}) {
  const cardRef = useRef<HTMLElement>(null)
  const isInView = useInView(cardRef, { once: false, margin: SCROLL_MARGIN })

  const article = (
    <motion.article
        ref={cardRef}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={itemVariants}
        whileHover={prefersReducedMotion ? {} : { y: -7, scale: 1.018 }}
        transition={{ delay, type: 'spring', stiffness: 300, damping: 20 }}
        className="glass-card"
        style={{
          borderRadius: '1.5rem',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          cursor: 'pointer',
        }}
        aria-label={card.title}
      >
        {/* Icon circle */}
        <motion.div
          whileHover={prefersReducedMotion ? {} : {
            boxShadow: '0 0 14px rgba(71, 241, 228, 0.35), inset 0 0 8px rgba(71, 241, 228, 0.08)',
            borderColor: 'rgba(71, 241, 228, 0.45)',
          }}
          transition={{ duration: 0.25 }}
          style={{
            width: '48px',
            height: '48px',
            minWidth: '48px',
            minHeight: '48px',
            borderRadius: '50%',
            background: '#1a2120',
            border: '1px solid rgba(71, 241, 228, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-hidden="true"
        >
          <span
            className="material-symbols-outlined"
            style={{ color: '#47f1e4', fontSize: '22px', lineHeight: 1 }}
          >
            {card.icon}
          </span>
        </motion.div>

        {/* Title */}
        <h3
          style={{
            fontFamily: SPACE_GROTESK,
            fontSize: '24px',
            fontWeight: 600,
            lineHeight: 1.3,
            color: '#dce4e2',
            margin: 0,
          }}
        >
          {card.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: HANKEN,
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: 1.6,
            color: '#bacac7',
            margin: 0,
          }}
        >
          {card.description}
        </p>
      </motion.article>
  )

  if (disableLinks) return <div>{article}</div>
  return <Link to={card.href} style={{ textDecoration: 'none' }}>{article}</Link>
}