import { motion, useReducedMotion } from 'framer-motion'

const SPACE_GROTESK = "'Space Grotesk', sans-serif"
const HANKEN = "'Hanken Grotesk', sans-serif"

const footerLinks = [
  { label: 'Privacy Policy', href: 'https://app.termly.io/policy-viewer/policy.html?policyUUID=576499bb-e5ba-4839-989d-a639e19739ef', boxed: false },
  { label: 'Terms of Service', href: 'https://app.termly.io/policy-viewer/policy.html?policyUUID=ca6aefbb-e411-4065-8cfb-36cbea11c613', boxed: false },
]

export function Footer() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <footer
      style={{
        width: '100%',
        background: '#08100f',
        borderTop: '1px solid rgba(59, 74, 72, 0.25)',
        position: 'relative',
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          paddingTop: '24px',
          paddingBottom: '24px',
          paddingLeft: 'clamp(20px, 6.25vw, 80px)',
          paddingRight: 'clamp(20px, 6.25vw, 80px)',
        }}
      >
        {/* Brand */}
        <span style={{ fontFamily: SPACE_GROTESK, fontSize: '18px', fontWeight: 700, color: '#dce4e2' }}>
          LaserFlow
        </span>

        {/* Links */}
        <nav aria-label="Footer navigation" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
          {footerLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              whileHover={prefersReducedMotion ? {} : { x: 3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{
                fontFamily: HANKEN,
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#849491',
                textDecoration: 'none',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'color 0.2s',
                ...(link.boxed ? {
                  border: '1px solid #849491',
                  borderRadius: '4px',
                  padding: '4px 10px',
                } : {}),
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.color = '#47f1e4'
                if (link.boxed) el.style.borderColor = '#47f1e4'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.color = '#849491'
                if (link.boxed) el.style.borderColor = '#849491'
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
