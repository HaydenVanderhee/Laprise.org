import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const SPACE_GROTESK = "'Space Grotesk', sans-serif"
const HANKEN = "'Hanken Grotesk', sans-serif"

const navLinks = [
  { label: 'Platform', href: '#platform' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Developers', href: '#developers' },
  { label: 'Pricing', href: '#pricing' },
]

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Platform')

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        background: 'rgba(8, 12, 12, 0.8)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '80px',
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: 'clamp(20px, 6.25vw, 80px)',
          paddingRight: 'clamp(20px, 6.25vw, 80px)',
        }}
      >
        {/* Brand */}
        <a
          href="#"
          aria-label="LaserFlow home"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            fontFamily: SPACE_GROTESK,
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: '#dce4e2',
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ color: '#47f1e4', fontSize: '28px', lineHeight: 1 }}
            aria-hidden="true"
          >
            bubble_chart
          </span>
          LaserFlow
        </a>

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          style={{ display: 'flex', gap: '32px', alignItems: 'center' }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              label={link.label}
              active={activeLink === link.label}
              onClick={() => setActiveLink(link.label)}
            />
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          className="show-mobile"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#dce4e2',
            minWidth: '44px',
            minHeight: '44px',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '28px' }} aria-hidden="true">
            {mobileOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence mode="wait">
        {mobileOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)', y: 8 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, scale: 0.97, filter: 'blur(4px)', y: -6 }}
            transition={{ duration: 0.25 }}
            style={{
              borderTop: '1px solid rgba(255,255,255,0.05)',
              padding: '8px 20px 16px',
              background: 'rgba(8, 12, 12, 0.95)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => { setActiveLink(link.label); setMobileOpen(false) }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontFamily: HANKEN,
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: activeLink === link.label ? '#47f1e4' : '#bacac7',
                  minHeight: '44px',
                  background: activeLink === link.label ? 'rgba(71, 241, 228, 0.06)' : 'transparent',
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 768px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  )
}

interface NavLinkProps {
  href: string
  label: string
  active: boolean
  onClick: () => void
}

function NavLink({ href, label, active, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '4px 0',
        textDecoration: 'none',
        fontFamily: "'Hanken Grotesk', sans-serif",
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: active ? '#47f1e4' : '#bacac7',
        transition: 'color 0.25s',
      }}
      onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = '#47f1e4' }}
      onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = '#bacac7' }}
    >
      {label}
      {/* underline — scaleX 0→1 when active, draws left→right on hover */}
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          width: '100%',
          background: '#47f1e4',
          transformOrigin: 'left',
          transform: active ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.25s ease-out',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
    </a>
  )
}
