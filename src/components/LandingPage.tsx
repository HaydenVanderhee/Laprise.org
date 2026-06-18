import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, CheckCircle2, ChevronDown } from 'lucide-react'
import { LogoMark } from './LogoMark'

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: false, amount: 0.12 } as const,
  transition: { duration: 0.75, ease: EASE, delay },
})

// ── Palette ───────────────────────────────────────────────────────────────────
const NAVY = '#0B2A38'
const CYAN = '#1CA7C4'
const WHITE_BAND = '#F7FAFB'
const INK = '#0F2A38'
const BODY = '#54707C'
const ACCENT = '#0E7FA8'
// warm + local "sunlit pool" accents (used sparingly for personality)
const GREEN = '#1FB39B'   // aqua-green (default tick colour)
const MINT = '#26D7C4'    // bright spring-teal band (Soakly-style)

// depth-bloom gradients — a single soft CENTRED glow that fades to nothing well before
// the top/bottom edges, so a band's edges stay pure flat colour (no tonal line at the wave joins)
const CYAN_BLOOM = 'radial-gradient(ellipse 82% 44% at 50% 50%, rgba(255,255,255,0.13), transparent 70%)'
const NAVY_BLOOM = 'radial-gradient(ellipse 82% 44% at 50% 44%, rgba(28,167,196,0.16), transparent 70%)'
const MINT_BLOOM = 'radial-gradient(ellipse 82% 44% at 50% 50%, rgba(255,255,255,0.15), transparent 70%)'

// ── Decorative drifting bubbles (organic depth; circles cross section edges) ──
// `soft: true` renders a blurred radial-gradient glow instead of a hard circle/ring.
type Bubble = { size: number; top?: string; bottom?: string; left?: string; right?: string; color: string; ring?: boolean; soft?: boolean; anim: string }
function Bubbles({ items }: { items: Bubble[] }) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none', zIndex: 1 }}>
      {items.map((b, i) => (
        <span key={i} className={b.anim} style={{
          position: 'absolute', width: b.size, height: b.size, borderRadius: '50%',
          top: b.top, bottom: b.bottom, left: b.left, right: b.right,
          ...(b.soft
            ? { background: `radial-gradient(circle, ${b.color}, transparent 70%)` }
            : b.ring
              ? { background: 'transparent', border: `2px solid ${b.color}` }
              : { background: b.color }),
        }} />
      ))}
    </div>
  )
}

// ── Depth blooms — soft radial glows that give a flat band light + shadow ─────
function Blooms({ gradient }: { gradient: string }) {
  return <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: gradient }} />
}

// ── Floating "proof" chip — the little corner card from the hero, reusable ────
function FloatChip({ icon, iconBg, title, sub, style, delay = 0 }: {
  icon: React.ReactNode; iconBg: string; title: string; sub: string; style?: React.CSSProperties; delay?: number
}) {
  return (
    <div className="soft-float" style={{ position: 'absolute', zIndex: 5, background: '#FFFFFF', borderRadius: 16, boxShadow: '0 16px 40px rgba(4,49,63,0.20)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, animationDelay: `${delay}s`, ...style }}>
      <div style={{ width: 26, height: 26, borderRadius: '50%', background: iconBg, color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: INK, whiteSpace: 'nowrap' }}>{title}</div>
        <div style={{ fontSize: 11, color: '#7C95A0', whiteSpace: 'nowrap' }}>{sub}</div>
      </div>
    </div>
  )
}

// ── Animated hand-drawn ribbon underline (draws on / slides off every 6s) ─────
function ScribbleUnderline({ color = '#FFC247', strokeW = 5 }: { color?: string; strokeW?: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 300 18" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, bottom: '-0.26em', width: '100%', height: '0.42em', overflow: 'visible' }}>
      <path className="ribbon-draw" d="M4,11 C70,3 150,3 210,9 C245,12 275,9 296,5" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" pathLength={100} />
    </svg>
  )
}

// ── Hand-drawn swim doodles — clean line sketches run through a subtle roughen ──
// filter so they read as penned, not vector-perfect (the opposite of stock icons).
type DoodleName = 'ads' | 'booking' | 'afterhours' | 'seo' | 'websites' | 'reviews'
function Doodle({ name, size = 56, color = ACCENT }: { name: DoodleName; size?: number; color?: string }) {
  const fid = `rough-${name}`
  const s = { fill: 'none', stroke: color, strokeWidth: 2.1, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const glyph: Record<DoodleName, React.ReactNode> = {
    // paper plane with a dotted trail — targeted local outreach
    ads: (<><path d="M5 27 L44 8 L34 44 L26 30 Z" /><path d="M26 30 L44 8" /><path d="M5 39 q7 -1 11 -6" strokeDasharray="0.5 4.5" /></>),
    // calendar with a tick — a booked trial
    booking: (<><path d="M9 13 h30 a3 3 0 0 1 3 3 v23 a3 3 0 0 1 -3 3 h-30 a3 3 0 0 1 -3 -3 v-23 a3 3 0 0 1 3 -3 Z" /><path d="M16 9 v8" /><path d="M32 9 v8" /><path d="M6 22 h36" /><path d="M17 32 l5 5 l9 -10" /></>),
    // crescent moon + a little sparkle — after hours
    afterhours: (<><path d="M35 31 A13 13 0 1 1 21 11 A9.5 9.5 0 1 0 35 31 Z" /><path d="M40 10 l1 2.6 2.6 1 -2.6 1 -1 2.6 -1 -2.6 -2.6 -1 2.6 -1 Z" /></>),
    // magnifying glass with a little pin — local search
    seo: (<><circle cx="28" cy="21" r="12" /><path d="M19.5 30 L9 41" /><path d="M28 16 a3.4 3.4 0 0 1 3.4 3.4 c0 2.4 -3.4 5.6 -3.4 5.6 s-3.4 -3.2 -3.4 -5.6 A3.4 3.4 0 0 1 28 16 Z" /></>),
    // browser window with a wave inside
    websites: (<><path d="M7 12 h34 a2.5 2.5 0 0 1 2.5 2.5 v21 a2.5 2.5 0 0 1 -2.5 2.5 h-34 a2.5 2.5 0 0 1 -2.5 -2.5 v-21 a2.5 2.5 0 0 1 2.5 -2.5 Z" /><path d="M5 20 h38" /><circle cx="10" cy="16" r="1" fill={color} stroke="none" /><circle cx="14" cy="16" r="1" fill={color} stroke="none" /><path d="M11 30 q3.5 -3.5 7 0 t7 0 t7 0" /></>),
    // two hand-drawn stars — reviews
    reviews: (<><path d="M20 9 l3.4 7 7.6 .9 -5.6 5.2 1.4 7.5 -6.8 -3.7 -6.8 3.7 1.4 -7.5 -5.6 -5.2 7.6 -.9 Z" /><path d="M38 8 l1.5 3 3.3 .4 -2.4 2.3 .6 3.3 -3 -1.6 -3 1.6 .6 -3.3 -2.4 -2.3 3.3 -.4 Z" /></>),
  }
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} {...s}>
      <defs>
        <filter id={fid} x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.013" numOctaves="1" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter={`url(#${fid})`}>{glyph[name]}</g>
    </svg>
  )
}

// organic "squishy" blob radii for icon holders (kills the rounded-square AI tell)
const BLOB = [
  '46% 54% 57% 43% / 52% 44% 56% 48%',
  '57% 43% 47% 53% / 56% 52% 48% 44%',
  '42% 58% 54% 46% / 44% 51% 49% 56%',
  '54% 46% 43% 57% / 49% 57% 43% 51%',
  '47% 53% 60% 40% / 53% 46% 54% 47%',
  '60% 40% 49% 51% / 47% 55% 45% 53%',
]

// ── Wave divider — big sweeping arch + a translucent echo for depth ───────────
// Two tiled copies per layer translate for a seamless loop; the back layer drifts
// slower and dips lower so the bands feel like they pour into each other.
export function WaveDivider({ top, bottom, height = 96 }: { top: string; bottom: string; height?: number }) {
  // One smooth periodic wave — starts and ends at the same height (y=60) so the
  // two tiled copies join seamlessly, and no second layer to create an edge line.
  const front = 'M0,60 C240,26 480,26 720,60 C960,94 1200,94 1440,60 L1440,0 L0,0 Z'
  return (
    <div style={{ background: bottom, overflow: 'hidden', lineHeight: 0, position: 'relative', height, marginTop: -1, marginBottom: -1, zIndex: 21 }} aria-hidden="true">
      <div className="wave-drift" style={{ position: 'absolute', inset: 0, display: 'flex', width: '200%', animation: 'wave-drift 26s linear infinite' }}>
        {[0, 1].map(i => (
          <svg key={i} viewBox="0 0 1440 120" width="50%" height={height} preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d={front} fill={top} />
          </svg>
        ))}
      </div>
    </div>
  )
}

// ── Blob-masked breathing photo ───────────────────────────────────────────────
function BlobImage({ src, alt, height = 360 }: { src: string; alt: string; height?: number }) {
  return (
    // TODO: replace with a licensed AU swim-school photo
    <div className="blob" style={{ position: 'relative', width: '100%', maxWidth: 460, boxShadow: '0 30px 60px rgba(14,127,168,0.20)' }}>
      <img src={src} alt={alt} style={{ width: '100%', height, objectFit: 'cover', display: 'block' }} />
    </div>
  )
}

// ── Tick list (solid colour circles + white checks, Soakly-style) ─────────────
function TickList({ items, tint = GREEN, textColor = BODY }: { items: string[]; tint?: string; textColor?: string }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map(t => (
        <li key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 15, lineHeight: 1.5, color: textColor }}>
          <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: tint, color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1, boxShadow: `0 3px 8px ${tint}55` }}>
            <Check size={13} strokeWidth={3} />
          </span>
          {t}
        </li>
      ))}
    </ul>
  )
}

// ── Alternating feature row (per-row colour for personality) ──────────────────
function FeatureRow({ eyebrow, title, accent, body, bullets, visual, reverse, tone = ACCENT }: {
  eyebrow: string; title: string; accent: string; body: string; bullets: string[]; visual: React.ReactNode; reverse?: boolean; tone?: string
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(32px,5vw,72px)', alignItems: 'center', marginBottom: 'clamp(56px,8vw,104px)' }}>
      <motion.div {...fadeUp(0)} style={{ order: reverse ? 2 : 1 }}>
        <span style={{ display: 'inline-block', color: tone, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: `${tone}18`, border: `1px solid ${tone}3A`, padding: '5px 14px', borderRadius: 9999, marginBottom: 18 }}>{eyebrow}</span>
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: 16, color: INK }}>
          {title} <span style={{ color: tone }}>{accent}</span>
        </h3>
        <p style={{ fontSize: 17, color: BODY, lineHeight: 1.7, marginBottom: 24, maxWidth: 520 }}>{body}</p>
        <TickList items={bullets} tint={tone} />
      </motion.div>
      <motion.div {...fadeUp(0.1)} style={{ order: reverse ? 1 : 2, display: 'flex', justifyContent: 'center', position: 'relative' }}>
        {/* soft tone shading radiating from the visual — gentle radial glow that fully fades out */}
        <div aria-hidden="true" style={{
          position: 'absolute', width: '124%', height: '120%', top: '0%', left: reverse ? '-14%' : '4%',
          background: `radial-gradient(ellipse at 44% 46%, ${tone}24, ${tone}0d 40%, transparent 62%)`,
          zIndex: 0,
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', width: '64%', height: '60%', bottom: '-6%', right: reverse ? '4%' : '-10%',
          background: `radial-gradient(ellipse, ${tone}1a, transparent 58%)`,
          zIndex: 0,
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>{visual}</div>
      </motion.div>
    </div>
  )
}

// ── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.3s',
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(14,42,56,0.08)' : '1px solid transparent',
        padding: scrolled ? '12px 0' : '20px 0',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px,5vw,80px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <LogoMark size={44} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 700, color: scrolled ? INK : '#FFFFFF', letterSpacing: '-0.01em', transition: 'color 0.3s' }}>Laprise</span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 40 }} className="hidden-mobile">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ color: scrolled ? BODY : 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = scrolled ? ACCENT : '#FFFFFF')}
              onMouseLeave={e => (e.currentTarget.style.color = scrolled ? BODY : 'rgba(255,255,255,0.9)')}>
              {l.label}
            </a>
          ))}
          <a href="/book" style={{
            background: CYAN, color: '#FFFFFF', padding: '10px 24px', borderRadius: 9999,
            fontWeight: 700, fontSize: 14, textDecoration: 'none', transition: 'transform 0.2s',
            boxShadow: '0 4px 14px rgba(14,127,168,0.25)',
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
            Book a 15-Minute Chat
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: 'none', border: 'none', color: scrolled ? INK : '#FFFFFF', cursor: 'pointer', padding: 8 }}
          className="show-mobile"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen
              ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
            }
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div style={{ background: '#FFFFFF', padding: '16px 24px', borderTop: '1px solid rgba(14,42,56,0.08)' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ display: 'block', color: INK, padding: '12px 0', textDecoration: 'none', fontSize: 15, borderBottom: '1px solid rgba(14,42,56,0.06)' }}>
              {l.label}
            </a>
          ))}
          <a href="/book" style={{ display: 'block', background: CYAN, color: '#FFFFFF', padding: '12px 0', borderRadius: 8, textAlign: 'center', fontWeight: 700, textDecoration: 'none', marginTop: 12 }}>
            Book a 15-Minute Chat
          </a>
        </div>
      )}
    </header>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────
const CHECKLIST = [
  {
    heading: 'Set up for you',
    items: ['No setup fee to get started', 'Live in about 14 days', 'Works with your booking system', 'Trained on your levels & pricing'],
  },
  {
    heading: 'Works around the clock',
    items: ['Answers enquiries 24/7', 'Replies in seconds, day or night', 'Books trials onto your calendar', 'Chases no-shows automatically'],
  },
  {
    heading: 'You stay in control',
    items: ['You only pay for results', 'Tricky questions go to your staff', 'Family data kept private & secure', 'No lock-in — cancel any time'],
  },
]

const SERVICES = [
  { title: 'Personalised Ads', desc: 'High-converting ad creatives designed specifically to attract families searching for swim lessons in your local area.' },
  { title: 'Trial Booking Automation', desc: 'Streamlined workflows that guide new families from first enquiry to confirmed trial lesson without any manual follow-up.' },
  { title: 'After-Hours Handling', desc: "Seamless call and message management when you're in the pool. Your AI assistant handles enquiries professionally after 6pm and on weekends." },
  { title: 'Local SEO', desc: 'Long-term organic growth strategies ensuring your swim school ranks #1 for families searching "swim lessons near me" in your suburb.' },
  { title: 'Custom Websites', desc: 'Stunning, high-performance web architecture that not only looks incredible but actively drives trial bookings and enrolments.' },
  { title: 'Review Management', desc: 'Automated follow-up protocols to capture 5-star reviews from happy families while intercepting negative feedback privately.' },
]

const BENCHMARKS = [
  {
    stat: '55–65%', stat2: 'Trial-to-Enrolment',
    h4: 'With Automated Follow-Up vs. 30–45% Without',
    desc: 'Schools with automated trial follow-up sequences see dramatically higher enrolment rates. Families who get a reminder and a warm check-in show up — and enrol.',
    source: 'Source: [TODO — add citation]',
  },
  {
    stat: '40–55% of Enquiries', stat2: 'Arrive After 6PM',
    h4: "When You're Teaching and Can't Pick Up",
    desc: 'Swim schools lose nearly half their potential enrolments simply by being in the pool. Our system captures families that currently go to a competitor who answered first.',
    source: 'Source: [TODO — add citation]',
  },
  {
    stat: '45–50%', stat2: 'Annual Churn',
    h4: 'A 400-student school needs ~180 new students every year just to stay flat.',
    desc: "At ~45% annual churn, standing still means running a constant replacement race. Without a reliable enrolment engine, you're always behind.",
    source: 'Source: [TODO — add citation]',
  },
]

const FAQS = [
  {
    question: 'Do you work with brand new swim schools?',
    answer: "Not immediately. Our system is built to capture and convert existing enquiry flow. If your school has zero incoming enquiries, we'd recommend establishing a paid traffic baseline first before installing the enrolment system.",
  },
  {
    question: 'Can I customise the AI responses for my school?',
    answer: "Yes. We don't use generic templates. We train the AI specifically on your school's pricing, your level structure, your enrolment policies, and your cancellation terms.",
  },
  {
    question: "What happens if a parent asks a detailed question about their child's level or lesson structure?",
    answer: 'The AI is strictly trained on your level guidelines. If a parent asks a complex assessment question, the system instantly pauses and routes the conversation to your staff dashboard for human review.',
  },
  {
    question: 'Will this replace my front desk staff?',
    answer: "No. This system relieves your team from answering the same 15 pricing and availability questions all day. It handles the 24/7 enquiries so your staff can focus on in-pool operations and personal enrolments.",
  },
  {
    question: 'How fast can you set this up for my school?',
    answer: 'Once we map your workflows on our Strategy Call, the entire enrolment engine is typically built, tested, and deployed within 14 days.',
  },
  {
    question: 'How does Laprise connect with my existing booking system or CRM?',
    answer: 'We integrate directly with major booking platforms and CRMs to drop trial bookings right onto your active calendar without double-booking.',
  },
  {
    question: 'Is my student and family data kept private and secure?',
    answer: 'Absolutely. Our system uses enterprise-grade encryption and compliant data routing to ensure all family information remains strictly confidential.',
  },
  {
    question: 'What if we don\'t see more trial bookings — do we still pay?',
    answer: "No. We exclusively partner with swim schools and our system is performance-guaranteed. We guarantee more trial bookings in 90 days, or we work with you for free until you see results.",
  },
]

// ── Mockup visuals (light, plain-language) ────────────────────────────────────
function TimelineCard() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 420, background: '#FFFFFF', border: '1px solid rgba(14,42,56,0.10)', borderRadius: 24, padding: 24, boxShadow: '0 20px 50px rgba(14,127,168,0.12)', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <FloatChip icon="⚡" iconBg="#FF7D54" title="Replied in 8s" sub="before they left" style={{ top: -16, right: -12 }} delay={0.6} />
      {[
        { label: 'New enquiry received', sub: 'Emma W. — Trial Lesson', time: '10:42 pm', color: '#7C95A0' },
        { label: 'Reply sent automatically', sub: 'Answered pricing & availability', time: '10:42 pm', color: CYAN },
        { label: 'Trial lesson booked', sub: 'Saturday 9:00 am confirmed', time: '10:44 pm', color: '#17B5AE' },
      ].map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, background: '#F1F7F9', border: '1px solid rgba(14,42,56,0.06)' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{item.label}</div>
            <div style={{ fontSize: 12, color: '#7C95A0', marginTop: 2 }}>{item.sub}</div>
          </div>
          <span style={{ fontSize: 12, color: ACCENT, fontWeight: 600, whiteSpace: 'nowrap' }}>{item.time}</span>
        </div>
      ))}
    </div>
  )
}

function BookingCard() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 360, background: '#FFFFFF', border: '1px solid rgba(14,42,56,0.10)', borderRadius: 24, padding: 24, boxShadow: '0 20px 50px rgba(14,127,168,0.12)' }}>
      <FloatChip icon="✓" iconBg="#17B5AE" title="On your calendar" sub="no double-booking" style={{ top: -16, right: -12 }} delay={1.1} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: INK }}>October</span>
        <span style={{ fontSize: 12, color: '#7C95A0', fontWeight: 600 }}>Trial lessons</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <div key={`h${i}`} style={{ textAlign: 'center', fontSize: 10, color: '#7C95A0', fontWeight: 700 }}>{d}</div>
        ))}
        {Array.from({ length: 21 }).map((_, i) => {
          const day = i + 1
          const booked = day === 11
          return (
            <div key={i} style={{
              aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: booked ? 700 : 500, borderRadius: 9,
              background: booked ? 'linear-gradient(135deg,#1CA7C4,#17B5AE)' : 'transparent',
              color: booked ? '#FFFFFF' : BODY,
              boxShadow: booked ? '0 6px 14px rgba(14,127,168,0.28)' : 'none',
            }}>{day}</div>
          )
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, padding: '12px 14px', background: '#F1F7F9', border: '1px solid rgba(14,42,56,0.06)', borderRadius: 12 }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#17B5AE', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>✓</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Trial lesson — Sat 9:00am</div>
          <div style={{ fontSize: 11, color: '#7C95A0' }}>Booked automatically</div>
        </div>
      </div>
    </div>
  )
}

function StatsCard() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 420, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <FloatChip icon="↑" iconBg="#0E8C7B" title="+18% trials" sub="this term" style={{ top: -18, right: -10 }} delay={0.4} />
      {[{ label: 'Conversion', val: '68%', color: INK }, { label: 'Cost / booking', val: '$14', color: ACCENT }].map(m => (
        <div key={m.label} style={{ background: '#FFFFFF', padding: 24, borderRadius: 18, border: '1px solid rgba(14,42,56,0.10)', boxShadow: '0 14px 36px rgba(14,127,168,0.10)' }}>
          <div style={{ fontSize: 11, color: '#7C95A0', marginBottom: 8, fontWeight: 600 }}>{m.label}</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 38, fontWeight: 700, color: m.color }}>{m.val}</div>
        </div>
      ))}
      <div style={{ gridColumn: 'span 2', background: '#FFFFFF', padding: '18px 24px', borderRadius: 18, border: '1px solid rgba(23,181,174,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 14px 36px rgba(14,127,168,0.10)' }}>
        <CheckCircle2 size={22} color="#17B5AE" />
        <span style={{ fontSize: 14, color: '#0C6A65', fontWeight: 700 }}>Everything's running smoothly</span>
      </div>
    </div>
  )
}

export function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [typingText, setTypingText] = useState('')

  const fullSms = "Hi Sarah, completely understand the hesitation! Our trial lessons are completely no-pressure — your child swims, our instructor assesses their level, and we'll give you an honest recommendation. Shall I lock in a spot? 🏊"

  // Typing animation for the hero chat
  useEffect(() => {
    let i = 0
    const iv = setInterval(() => {
      setTypingText(fullSms.slice(0, i))
      i++
      if (i > fullSms.length) clearInterval(iv)
    }, 48)
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{ color: INK, fontFamily: "'Hanken Grotesk', sans-serif", overflowX: 'clip', position: 'relative' }}>
      <Nav />

      {/* ── HERO (dark navy, two-column) ──────────────────────────────────── */}
      <section style={{ position: 'relative', zIndex: 20, background: NAVY, paddingTop: 'clamp(140px,18vw,180px)', paddingBottom: 'clamp(72px,9vw,110px)', overflow: 'visible' }}>
        {/* soft water blooms + a warm Aussie sun glow top-right */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 42% 40% at 88% 6%, rgba(255,194,71,0.18), transparent 55%), radial-gradient(ellipse 50% 50% at 78% 14%, rgba(28,167,196,0.22), transparent 60%), radial-gradient(ellipse 45% 45% at 6% 92%, rgba(23,181,174,0.18), transparent 60%)', pointerEvents: 'none' }} />
        <Bubbles items={[
          { size: 90, top: '16%', left: '4%', color: 'rgba(127,215,230,0.18)', anim: 'bubble-a' },
          { size: 46, top: '30%', left: '46%', color: 'rgba(255,194,71,0.4)', ring: true, anim: 'bubble-c' },
          { size: 150, bottom: '-70px', left: '18%', color: 'rgba(28,167,196,0.14)', anim: 'bubble-b' },
          { size: 30, top: '24%', right: '5%', color: 'rgba(84,224,214,0.55)', anim: 'bubble-c' },
        ]} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px,5vw,80px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(40px,5vw,72px)', alignItems: 'center' }}>
          {/* Left: copy */}
          <div>
            <motion.p {...fadeUp(0)} style={{
              display: 'inline-block', fontWeight: 700, color: '#7FD7E6', letterSpacing: '0.06em',
              textTransform: 'uppercase', marginBottom: 22, fontSize: 12,
              border: '1px solid rgba(127,215,230,0.30)', background: 'rgba(28,167,196,0.14)',
              padding: '9px 18px', borderRadius: 9999,
            }}>
              Stop Losing After-Hours Enquiries to the School Down the Road
            </motion.p>

            <motion.h1 {...fadeUp(0.1)} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 4.25rem)', fontWeight: 700, lineHeight: 1.08, marginBottom: 24, color: '#FFFFFF' }}>
              Fill Your Lanes. <br />
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{ backgroundImage: 'linear-gradient(to right, #54E0D6, #1CA7C4, #7FD7E6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Keep Teaching.
                </span>
                {/* animated hand-drawn underline */}
                <ScribbleUnderline />
              </span>
            </motion.h1>

            <motion.p {...fadeUp(0.2)} style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(230,240,243,0.82)', marginBottom: 32, maxWidth: 540, lineHeight: 1.7 }}>
              We install a 24/7 enrolment system that instantly answers pricing questions, books qualified trial lessons, and follows up on no-shows — even while you're in the pool teaching.
            </motion.p>

            <motion.div {...fadeUp(0.3)} style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
              <a href="/book" style={{
                background: CYAN, color: '#FFFFFF', padding: '16px 32px', borderRadius: 9999,
                fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
                boxShadow: '0 10px 30px rgba(28,167,196,0.4)', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 40px rgba(28,167,196,0.55)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(28,167,196,0.4)' }}>
                Book a 15-Minute Chat <ArrowRight size={16} />
              </a>
            </motion.div>

            {/* trust strip */}
            <motion.div {...fadeUp(0.4)} style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(14px,3vw,28px)', marginTop: 28 }}>
              {['Built for AU & NZ swim schools', 'You only pay for results'].map(t => (
                <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(230,240,243,0.78)', fontSize: 13, fontWeight: 600 }}>
                  <Check size={15} strokeWidth={3} color="#54E0D6" /> {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: floating chat + booking mockups */}
          <motion.div {...fadeUp(0.2)} style={{ position: 'relative', minHeight: 380, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* floating "after-hours" chip top-left */}
            <div className="soft-float" style={{ position: 'absolute', top: -6, left: 'clamp(-6px,1vw,4px)', zIndex: 3, background: '#FFFFFF', borderRadius: 16, boxShadow: '0 16px 40px rgba(0,0,0,0.28)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, animationDelay: '1.5s' }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#FF7D54', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>⏱</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: INK }}>New enquiry</div>
                <div style={{ fontSize: 11, color: '#7C95A0' }}>10:42 pm · answered</div>
              </div>
            </div>
            {/* chat card */}
            <div style={{ width: '100%', maxWidth: 360, background: '#FFFFFF', borderRadius: 24, border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 30px 70px rgba(0,0,0,0.35)', padding: 20, position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, borderBottom: '1px solid rgba(14,42,56,0.08)', paddingBottom: 14 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#D6EEF4', color: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>S</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Sarah M.</div>
                  <div style={{ fontSize: 11, color: '#17B5AE', fontWeight: 600 }}>● Online</div>
                </div>
              </div>
              <div style={{ alignSelf: 'flex-start', maxWidth: '85%', background: '#F1F7F9', border: '1px solid rgba(14,42,56,0.06)', color: INK, borderRadius: '16px 16px 16px 4px', padding: '10px 14px', fontSize: 13, lineHeight: 1.5, marginBottom: 10 }}>
                Hi! Is my daughter too nervous for a trial lesson? 😟
              </div>
              <div style={{ marginLeft: 'auto', maxWidth: '92%', background: 'linear-gradient(135deg,#1CA7C4,#17B5AE)', color: '#FFFFFF', borderRadius: '16px 16px 4px 16px', padding: '12px 14px', fontSize: 13, lineHeight: 1.55, boxShadow: '0 6px 16px rgba(14,127,168,0.25)' }}>
                {typingText}
                <span style={{ display: 'inline-block', width: 2, height: 14, background: 'rgba(255,255,255,0.85)', marginLeft: 3, verticalAlign: 'middle', animation: 'pulse 1s infinite' }} />
              </div>
            </div>
            {/* floating booked pill */}
            <div className="soft-float" style={{ position: 'absolute', bottom: -8, right: 'clamp(-4px,2vw,8px)', zIndex: 3, background: '#FFFFFF', borderRadius: 16, boxShadow: '0 16px 40px rgba(0,0,0,0.28)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#17B5AE', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>✓</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: INK }}>Trial booked</div>
                <div style={{ fontSize: 11, color: '#7C95A0' }}>Sat 9:00am</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <WaveDivider top={NAVY} bottom={CYAN} />

      {/* ── VALUE CHECKLIST (light blue) ──────────────────────────────────── */}
      <section style={{ position: 'relative', zIndex: 20, background: CYAN, padding: 'clamp(64px,9vw,96px) 24px', overflow: 'visible' }}>
        <Blooms gradient={CYAN_BLOOM} />
        <Bubbles items={[
          { size: 130, top: '-50px', left: '5%', color: 'rgba(255,255,255,0.10)', anim: 'bubble-a' },
          { size: 64, top: '18%', right: '9%', color: 'rgba(255,255,255,0.5)', ring: true, anim: 'bubble-b' },
          { size: 210, bottom: '-90px', right: '-50px', color: 'rgba(255,255,255,0.08)', anim: 'bubble-c' },
          { size: 38, bottom: '14%', left: '11%', color: 'rgba(255,194,71,0.55)', anim: 'bubble-b' },
        ]} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1152, margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 56, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: 16, color: '#FFFFFF', lineHeight: 1.15 }}>
              Fair, simple and clear
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 18, lineHeight: 1.6 }}>
              Most agencies sell you cheap quick wins. We install systems that fill your lanes every term — and you only pay when families actually show up.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, alignItems: 'start' }}>
            {CHECKLIST.map((col, i) => {
              const tints = ['#FFC247', '#FF7D54', '#34D8C2']
              return (
                <motion.div key={col.heading} {...fadeUp(i * 0.1)} style={{ background: '#FFFFFF', borderRadius: 26, padding: 'clamp(26px,3vw,34px)', boxShadow: '0 18px 44px rgba(4,49,63,0.18)', marginTop: i === 1 ? 'clamp(0px,4vw,40px)' : 0 }}>
                  <div style={{ width: 48, height: 48, borderRadius: BLOB[i % BLOB.length], background: tints[i], display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, boxShadow: `0 8px 18px ${tints[i]}66` }}>
                    <Check size={22} strokeWidth={3} color="#FFFFFF" />
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 19, fontWeight: 700, color: INK, marginBottom: 18 }}>{col.heading}</h3>
                  <TickList items={col.items} tint={tints[i]} textColor={BODY} />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <WaveDivider top={CYAN} bottom={WHITE_BAND} />

      {/* ── HOW IT WORKS — alternating feature rows (white) ───────────────── */}
      <section id="how-it-works" style={{ position: 'relative', zIndex: 20, background: WHITE_BAND, padding: 'clamp(72px,10vw,112px) 24px', scrollMarginTop: 96, overflow: 'visible' }}>
        {/* soft drifting gradient glows — coloured to read against the white band */}
        <Bubbles items={[
          { size: 300, top: '2%', left: '-4%', color: 'rgba(28,167,196,0.22)', soft: true, anim: 'bubble-a' },
          { size: 260, top: '24%', right: '-3%', color: 'rgba(255,125,84,0.16)', soft: true, anim: 'bubble-c' },
          { size: 240, top: '52%', left: '0%', color: 'rgba(31,179,155,0.16)', soft: true, anim: 'bubble-b' },
          { size: 220, top: '74%', right: '4%', color: 'rgba(255,194,71,0.16)', soft: true, anim: 'bubble-a' },
          { size: 240, bottom: '-4%', left: '10%', color: 'rgba(18,124,142,0.14)', soft: true, anim: 'bubble-c' },
        ]} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1180, margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,80px)', maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: 16 }}>
              The 24/7 <span style={{ color: ACCENT }}>Enrolment Engine</span>
            </h2>
            <p style={{ color: BODY, fontSize: 18, lineHeight: 1.6 }}>
              Stop missing enquiries because you're on deck. We handle every stage of the enrolment journey — from first enquiry to attended trial.
            </p>
          </motion.div>

          <FeatureRow
            tone={ACCENT}
            eyebrow="Step 01"
            title="Precision Ad Campaigns"
            accent="For Your Swim School."
            body="High-converting ad creatives built specifically for swim school families — targeting parents already searching for lessons in your area, not a general audience."
            bullets={['Targets parents already searching nearby', 'Creative built for swim schools, not generic', 'Fills lanes through your quieter terms']}
            visual={<BlobImage src="https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=900&q=80" alt="A swim instructor teaching a small group of children in a pool" />}
          />
          <FeatureRow
            reverse
            tone="#0E8C7B"
            eyebrow="Step 02"
            title="Around-the-Clock"
            accent="Responses."
            body="Every enquiry that comes in gets responded to immediately, around the clock. No family sits unanswered over a weekend while they enrol at the school down the road."
            bullets={['Every enquiry answered in seconds', 'No family left waiting over the weekend', 'Works after 6pm and on weekends']}
            visual={<TimelineCard />}
          />
          <FeatureRow
            tone="#D9572E"
            eyebrow="Step 03"
            title="From Enquiry to"
            accent="Booked Trial, Automatically."
            body="The system knows the questions swim parents ask before enrolling — pricing, level progression, makeup lesson policies — and handles them automatically before they reach your front desk."
            bullets={['Answers pricing & level questions', 'Books trials straight to your calendar', 'Hands tricky questions to your staff']}
            visual={<BookingCard />}
          />
          <FeatureRow
            reverse
            tone="#C98A1E"
            eyebrow="Step 04"
            title="Know Your Numbers"
            accent="at a Glance."
            body="Real-time visibility into every enquiry, ad dollar, and booked trial. Stop guessing what your marketing is doing — know exactly what fills lanes."
            bullets={['See every enquiry, ad dollar & booking', 'Know your cost per booked trial', "Stop guessing what's working"]}
            visual={<StatsCard />}
          />
          <FeatureRow
            tone="#127C8E"
            eyebrow="Step 05"
            title="Scaleable"
            accent="Partnership."
            body="After the system is live, we stay on as your long-term growth partner — expanding to new pool locations, building new enrolment workflows, developing term-specific campaigns, and creating custom tools as your school scales."
            bullets={['New pools & locations as you grow', 'Term-specific enrolment campaigns', 'Custom tools built for your school']}
            visual={<BlobImage src="https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?auto=format&fit=crop&w=900&q=80" alt="A young swimmer learning to swim with a coach in a clear pool" />}
          />
        </div>
      </section>

      <WaveDivider top={WHITE_BAND} bottom={CYAN} />

      {/* ── WHAT WE OFFER (light blue) ────────────────────────────────────── */}
      <section style={{ position: 'relative', zIndex: 20, background: CYAN, padding: 'clamp(72px,9vw,104px) 24px', overflow: 'visible' }}>
        <Blooms gradient={CYAN_BLOOM} />
        <Bubbles items={[
          { size: 90, top: '-30px', right: '12%', color: 'rgba(255,255,255,0.5)', ring: true, anim: 'bubble-a' },
          { size: 160, top: '30%', left: '-50px', color: 'rgba(255,255,255,0.08)', anim: 'bubble-c' },
          { size: 44, bottom: '8%', right: '8%', color: 'rgba(255,125,84,0.55)', anim: 'bubble-b' },
        ]} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1240, margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 56, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: 16, color: '#FFFFFF' }}>
              What We <span style={{ position: 'relative', display: 'inline-block' }}>Offer<ScribbleUnderline /></span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: 18, lineHeight: 1.6 }}>
              We build everything your school needs to keep classes full — without adding to your plate.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 20, alignItems: 'start' }}>
            {SERVICES.map((s, i) => {
              const names: DoodleName[] = ['ads', 'booking', 'afterhours', 'seo', 'websites', 'reviews']
              const colors = ['#0E7FA8', '#0E8C7B', '#FF7D54', '#127C8E', '#E0A12E', '#E85A9B']
              const c = colors[i]
              const featured = i === 0 || i === 4
              const lift = i % 2 === 1 ? 'clamp(0px,3vw,28px)' : 0
              return (
                <motion.div key={s.title} {...fadeUp(i * 0.06)}
                  style={{
                    background: featured ? `linear-gradient(155deg, ${c}, ${c}cc)` : '#FFFFFF',
                    borderRadius: i % 3 === 1 ? 28 : 22, padding: '28px 28px 30px', marginTop: lift,
                    boxShadow: featured ? `0 20px 44px ${c}55` : '0 16px 40px rgba(4,49,63,0.16)',
                    display: 'flex', flexDirection: 'column', transition: 'transform 0.2s',
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}>
                  {/* hand-drawn doodle drawn straight on the card — no icon tile */}
                  <div style={{ height: 64, marginBottom: 12, display: 'flex', alignItems: 'flex-end' }}>
                    <Doodle name={names[i]} size={62} color={featured ? '#FFFFFF' : c} />
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 10, color: featured ? '#FFFFFF' : INK }}>{s.title}</h3>
                  <p style={{ color: featured ? 'rgba(255,255,255,0.9)' : BODY, fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <WaveDivider top={CYAN} bottom={NAVY} />

      {/* ── RESULTS / WHY AUTOMATION WINS (dark navy) ─────────────────────── */}
      <section style={{ position: 'relative', zIndex: 20, background: NAVY, padding: 'clamp(72px,9vw,104px) 24px', overflow: 'visible' }}>
        <Blooms gradient={NAVY_BLOOM} />
        <Bubbles items={[
          { size: 120, top: '-40px', left: '8%', color: 'rgba(28,167,196,0.18)', anim: 'bubble-a' },
          { size: 70, top: '22%', right: '7%', color: 'rgba(127,215,230,0.4)', ring: true, anim: 'bubble-b' },
          { size: 200, bottom: '-80px', right: '-40px', color: 'rgba(31,179,155,0.12)', anim: 'bubble-c' },
        ]} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1152, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.h2 {...fadeUp(0)} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 16, textAlign: 'center', color: '#FFFFFF' }}>
            Why <span style={{ color: '#7FD7E6' }}>Automation Wins for Swim Schools</span>
          </motion.h2>
          <motion.p {...fadeUp(0.1)} style={{ color: 'rgba(230,240,243,0.82)', textAlign: 'center', fontSize: 18, maxWidth: 768, margin: '0 auto 56px', lineHeight: 1.6 }}>
            Response speed and persistent follow-up are the deciding factors in whether a family enrols with you or the school down the road.
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, width: '100%' }}>
            {BENCHMARKS.map((b, i) => {
              const statColors = ['#54E0D6', '#FFC247', '#FF9E7D']
              const sc = statColors[i]
              return (
                <motion.div key={i} {...fadeUp(i * 0.1)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 24, padding: 32, transition: 'border-color 0.3s', marginTop: i === 1 ? 'clamp(0px,3vw,32px)' : 0 }}
                  whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${sc}80`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: sc, fontSize: 30, fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>
                    {b.stat}<br />{b.stat2}
                  </h3>
                  <h4 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>{b.h4}</h4>
                  <p style={{ color: 'rgba(230,240,243,0.8)', lineHeight: 1.6, fontSize: 14 }}>{b.desc}</p>
                  <p style={{ fontSize: 11, color: 'rgba(230,240,243,0.45)', marginTop: 12, fontStyle: 'italic' }}>{b.source}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <WaveDivider top={NAVY} bottom={MINT} />

      {/* ── FAQ (Soakly-style mint green) ─────────────────────────────────── */}
      <section style={{ position: 'relative', zIndex: 20, background: MINT, padding: 'clamp(72px,9vw,104px) 24px', overflow: 'visible' }}>
        <Blooms gradient={MINT_BLOOM} />
        <Bubbles items={[
          { size: 120, top: '-44px', right: '10%', color: 'rgba(255,255,255,0.16)', anim: 'bubble-a' },
          { size: 64, top: '20%', left: '7%', color: 'rgba(11,42,56,0.18)', ring: true, anim: 'bubble-b' },
          { size: 190, bottom: '-80px', left: '-40px', color: 'rgba(255,255,255,0.10)', anim: 'bubble-c' },
          { size: 40, top: '13%', right: '6%', color: 'rgba(255,194,71,0.6)', anim: 'bubble-c' },
          { size: 96, bottom: '8%', right: '4%', color: 'rgba(255,255,255,0.5)', ring: true, anim: 'bubble-b' },
          { size: 30, top: '58%', left: '4%', color: 'rgba(255,255,255,0.55)', anim: 'bubble-a' },
        ]} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1024, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.h2 {...fadeUp(0)} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: 48, textAlign: 'center', color: INK }}>
            Frequently Asked <span style={{ color: '#FFFFFF' }}>Questions</span>
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 16, width: '100%', alignItems: 'start' }}>
            {FAQS.map((faq, i) => (
              <motion.div key={i} {...fadeUp(i * 0.06)} style={{ background: '#FFFFFF', border: `1px solid ${openFaq === i ? 'rgba(28,167,196,0.55)' : 'rgba(14,42,56,0.10)'}`, borderRadius: 16, overflow: 'hidden', transition: 'border-color 0.3s', boxShadow: '0 6px 20px rgba(14,127,168,0.06)' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 700, fontSize: 16, background: 'none', border: 'none', color: INK, cursor: 'pointer', minHeight: 72 }}>
                  {faq.question}
                  <ChevronDown size={20} color={ACCENT} style={{ flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                </button>
                <div style={{
                  maxHeight: openFaq === i ? 300 : 0, opacity: openFaq === i ? 1 : 0,
                  overflow: 'hidden', transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
                  padding: openFaq === i ? '0 24px 24px' : '0 24px', color: BODY, lineHeight: 1.7,
                }}>
                  {faq.answer}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider top={MINT} bottom={CYAN} />

      {/* ── GUARANTEE + CTA (light blue) ──────────────────────────────────── */}
      <section style={{ position: 'relative', zIndex: 20, background: CYAN, padding: 'clamp(80px,10vw,120px) 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}>
        <Blooms gradient={CYAN_BLOOM} />
        <Bubbles items={[
          { size: 150, top: '-60px', left: '8%', color: 'rgba(255,255,255,0.10)', anim: 'bubble-a' },
          { size: 70, top: '24%', right: '10%', color: 'rgba(255,255,255,0.5)', ring: true, anim: 'bubble-b' },
          { size: 50, bottom: '14%', left: '12%', color: 'rgba(255,194,71,0.5)', anim: 'bubble-c' },
          { size: 220, bottom: '-100px', right: '-50px', color: 'rgba(255,255,255,0.07)', anim: 'bubble-b' },
          { size: 104, top: '8%', left: '-2%', color: 'rgba(255,255,255,0.4)', ring: true, anim: 'bubble-c' },
          { size: 34, top: '32%', left: '22%', color: 'rgba(255,255,255,0.6)', anim: 'bubble-a' },
          { size: 56, bottom: '22%', right: '15%', color: 'rgba(255,194,71,0.45)', ring: true, anim: 'bubble-c' },
        ]} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1024, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div {...fadeUp(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 9999, border: '1px solid rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', fontSize: 13, letterSpacing: '0.08em', marginBottom: 40, fontWeight: 700, textTransform: 'uppercase' }}>
            <LogoMark size={16} /> The Performance Guarantee
          </motion.div>
          <motion.h2 {...fadeUp(0.1)} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 700, marginBottom: 32, lineHeight: 1.05, color: '#FFFFFF' }}>
            Increase Your Bookings<br />by 30% in <span style={{ position: 'relative', display: 'inline-block' }}>90 Days.<ScribbleUnderline /></span>{' '}
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(1.5rem, 4vw, 3.25rem)', marginTop: 16 }}>Or We Work for Free Until You Do.</span>
          </motion.h2>
          <motion.p {...fadeUp(0.2)} style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', color: 'rgba(255,255,255,0.9)', maxWidth: 768, textAlign: 'center', marginBottom: 56, lineHeight: 1.7 }}>
            Stop losing after-hours enquiries and watching booked trials go cold. We install a 24/7 enrolment system that turns website visitors and missed calls into families sitting poolside on trial day.
          </motion.p>
          <motion.a {...fadeUp(0.3)} href="/book" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            padding: '22px 44px', background: '#FFFFFF', color: ACCENT, borderRadius: 9999,
            fontWeight: 700, fontSize: 19, textDecoration: 'none',
            boxShadow: '0 14px 40px rgba(4,49,63,0.25)', transition: 'all 0.3s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 18px 55px rgba(4,49,63,0.4)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 40px rgba(4,49,63,0.25)' }}>
            Book a 15-Minute Chat <ArrowRight size={24} />
          </motion.a>
        </div>
      </section>

      <WaveDivider top={CYAN} bottom={NAVY} />

      {/* ── FOOTER (dark navy) ────────────────────────────────────────────── */}
      <footer style={{ background: NAVY, padding: '64px 24px', position: 'relative', zIndex: 20 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>
            <div style={{ gridColumn: 'span 2' }}>
              <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
                <LogoMark size={36} />
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: '#FFFFFF' }}>Laprise</span>
              </a>
              <p style={{ color: 'rgba(230,240,243,0.65)', maxWidth: 384, lineHeight: 1.7, fontSize: 14 }}>
                Filling swim school lanes every term with intelligent enrolment automation.
              </p>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: 16, color: '#FFFFFF', fontSize: 15 }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[{ href: '/', label: 'Home' }, { href: '/book', label: 'Book a Call' }, { href: '/contact', label: 'Contact' }].map(l => (
                  <li key={l.href}><a href={l.href} style={{ color: 'rgba(230,240,243,0.65)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#7FD7E6')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(230,240,243,0.65)')}>{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: 16, color: '#FFFFFF', fontSize: 15 }}>Contact</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li><a href="mailto:haydenvanderhee@laprise.org" style={{ color: 'rgba(230,240,243,0.65)', fontSize: 14, textDecoration: 'none' }}>haydenvanderhee@laprise.org</a></li>
                <li><a href="https://laprise.org" style={{ color: 'rgba(230,240,243,0.65)', fontSize: 14, textDecoration: 'none' }}>laprise.org</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: 32, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <p style={{ color: 'rgba(230,240,243,0.45)', fontSize: 13 }}>© {new Date().getFullYear()} Laprise. All rights reserved.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
              {[
                { label: 'Privacy Policy', href: 'https://app.termly.io/policy-viewer/policy.html?policyUUID=576499bb-e5ba-4839-989d-a639e19739ef' },
                { label: 'Terms of Service', href: 'https://app.termly.io/policy-viewer/policy.html?policyUUID=ca6aefbb-e411-4065-8cfb-36cbea11c613' },
                { label: 'Cookie Policy', href: 'https://app.termly.io/policy-viewer/policy.html?policyUUID=2ec82e6e-58f8-4a44-9c2a-5d09144afc69' },
                { label: 'Disclaimer', href: 'https://app.termly.io/policy-viewer/policy.html?policyUUID=a6f7794e-80e0-4702-81d0-c2ce2289671d' },
                { label: 'Acceptable Use Policy', href: 'https://app.termly.io/policy-viewer/policy.html?policyUUID=04469ba4-1e6f-4edf-8662-aba4c608f0b8' },
                { label: 'Accessibility Statement', href: 'https://app.termly.io/policy-viewer/policy.html?policyUUID=023cecf5-639f-4c22-84e2-f7685cadc132' },
              ].map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(230,240,243,0.45)', fontSize: 13, textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#7FD7E6')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(230,240,243,0.45)')}>{l.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </div>
  )
}
