import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Activity, ChevronDown } from 'lucide-react'
import { LogoMark } from './LogoMark'

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: false, amount: 0.12 } as const,
  transition: { duration: 0.75, ease: EASE, delay },
})

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
        background: scrolled ? 'rgba(13,13,18,0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.05)',
        padding: scrolled ? '12px 0' : '20px 0',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px,5vw,80px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <LogoMark size={44} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 700, color: '#dce4e2', letterSpacing: '-0.01em' }}>Laprise</span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 40 }} className="hidden-mobile">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ color: 'rgba(220,228,226,0.75)', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#48CFCB')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(220,228,226,0.75)')}>
              {l.label}
            </a>
          ))}
          <a href="/book" style={{
            background: '#48CFCB', color: '#0D0D12', padding: '10px 24px', borderRadius: 9999,
            fontWeight: 700, fontSize: 14, textDecoration: 'none', transition: 'transform 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
            Book a 15-Minute Chat
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: 'none', border: 'none', color: '#dce4e2', cursor: 'pointer', padding: 8 }}
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
        <div style={{ background: 'rgba(13,13,18,0.95)', backdropFilter: 'blur(20px)', padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ display: 'block', color: '#dce4e2', padding: '12px 0', textDecoration: 'none', fontSize: 15, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {l.label}
            </a>
          ))}
          <a href="/book" style={{ display: 'block', background: '#48CFCB', color: '#0D0D12', padding: '12px 0', borderRadius: 8, textAlign: 'center', fontWeight: 700, textDecoration: 'none', marginTop: 12 }}>
            Book a 15-Minute Chat
          </a>
        </div>
      )}
    </header>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────
const TRIAGE_SERVICES = [
  'Trial Lesson Enquiry', 'Adult Learn to Swim', 'Term 4 Enrolment',
  'Holiday Intensive', 'Level Assessment', 'Squad Enquiry', 'New Family Intake',
]

const TRIAGE_INITIAL = [
  { id: 1, time: '23:42', name: 'Sarah M.', intent: 'Trial Lesson Enquiry', status: 'Booked' },
  { id: 2, time: '21:15', name: 'Jessica T.', intent: 'Term 4 Enrolment', status: 'Booked' },
  { id: 3, time: '19:30', name: 'Emily R.', intent: 'Holiday Intensive', status: 'Booked' },
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

export function LandingPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [triageCards, setTriageCards] = useState(TRIAGE_INITIAL)
  const [typingText, setTypingText] = useState('')

  const fullSms = "Hi Sarah, completely understand the hesitation! Our trial lessons are completely no-pressure — your child swims, our instructor assesses their level, and we'll give you an honest recommendation. Shall I lock in a spot? 🏊"

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  // Rotating triage cards
  useEffect(() => {
    let idx = 0
    const iv = setInterval(() => {
      setTriageCards(prev => {
        const card = {
          id: Date.now(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          name: 'New Enquiry',
          intent: TRIAGE_SERVICES[idx % TRIAGE_SERVICES.length],
          status: 'Processing',
        }
        idx++
        return [card, ...prev.slice(0, 2)]
      })
    }, 4000)
    return () => clearInterval(iv)
  }, [])

  // Typing animation for card 2 terminal
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
    <div style={{ color: '#FAF8F5', fontFamily: "'Inter', sans-serif", overflowX: 'clip', position: 'relative' }}>
      <Nav />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="section-hero"
        onMouseMove={handleMouseMove}
        style={{ position: 'relative', zIndex: 20, width: '100%', display: 'flex', alignItems: 'center', paddingTop: 160, paddingBottom: 120 }}
      >
        {/* Mouse glow — fixed so it bleeds through section boundaries */}
        <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 0, background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(72,207,203,0.10), transparent 45%)` }} />

        <div style={{ position: 'relative', zIndex: 20, width: '100%', maxWidth: 896, margin: '0 auto', textAlign: 'center', padding: '0 24px' }}>
          <motion.p {...fadeUp(0)} style={{
            display: 'inline-block', fontWeight: 700, color: '#48CFCB', letterSpacing: '0.1em',
            textTransform: 'uppercase', marginBottom: 24, fontSize: 13,
            border: '1px solid rgba(72,207,203,0.3)', background: 'rgba(13,13,18,0.8)',
            backdropFilter: 'blur(8px)', padding: '13px 28px', borderRadius: 9999,
          }}>
            Stop Losing After-Hours Enquiries to the School Down the Road
          </motion.p>

          <motion.h1 {...fadeUp(0.1)} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: 32, color: '#FAF8F5' }}>
            Fill Your Lanes. <br />
            <span style={{ backgroundImage: 'linear-gradient(to right, #FAF8F5, #9ca3af, #6b7280)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Keep Teaching.
            </span>
          </motion.h1>

          <motion.p {...fadeUp(0.2)} style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#9ca3af', marginBottom: 40, maxWidth: 672, margin: '0 auto 40px', lineHeight: 1.7 }}>
            We install a 24/7 enrolment system that instantly answers pricing questions, books qualified trial lessons, and follows up on no-shows — even while you're in the pool teaching.
          </motion.p>

          <motion.div {...fadeUp(0.3)} style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            <a href="/book" style={{
              background: '#48CFCB', color: '#0D0D12', padding: '16px 32px', borderRadius: 9999,
              fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: '0 0 30px rgba(72,207,203,0.2)', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 50px rgba(72,207,203,0.4)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(72,207,203,0.2)' }}>
              Book a 15-Minute Chat <ArrowRight size={16} />
            </a>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: '#21212B', color: '#fff', padding: '16px 32px', borderRadius: 9999,
                fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#2A2A35')}
              onMouseLeave={e => (e.currentTarget.style.background = '#21212B')}>
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section style={{ padding: '64px 24px', position: 'relative', zIndex: 20 }}>
        <div id="how-it-works" style={{ maxWidth: 1280, margin: '0 auto', scrollMarginTop: 96 }}>
          <motion.div {...fadeUp(0)} style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 64, alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: 16 }}>
                The 24/7 <span style={{ color: '#48CFCB' }}>Enrolment Engine</span>
              </h2>
              <p style={{ color: '#9ca3af', fontSize: 18, maxWidth: 672, lineHeight: 1.6 }}>
                Stop missing enquiries because you're on deck. We use purpose-built AI and automation to handle every stage of the enrolment journey — from first enquiry to attended trial.
              </p>
            </div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {/* Card 1: Triage agent */}
            <motion.div {...fadeUp(0.05)} style={{ background: 'rgba(18,18,26,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 32, padding: 32, height: 450, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', transition: 'border-color 0.3s' }}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(72,207,203,0.3)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
              <div style={{ marginBottom: 48 }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Your After-Hours Receptionist</h3>
                <p style={{ fontSize: 13, color: '#9ca3af' }}>Instantly replies to late-night enquiries, qualifying family intent and capturing their info while you're still on deck.</p>
              </div>
              <div style={{ position: 'relative', flex: 1, paddingTop: 16 }}>
                {triageCards.map((c, i) => (
                  <div key={c.id} style={{
                    position: 'absolute', left: 0, right: 0,
                    background: 'rgba(26,26,36,0.88)', border: '1px solid rgba(255,255,255,0.1)',
                    padding: 20, borderRadius: 16,
                    top: `${i * 24}px`, transform: `scale(${1 - i * 0.04})`,
                    opacity: 1 - i * 0.15, zIndex: 10 - i,
                    transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#48CFCB', fontSize: 11, fontWeight: 600 }}>{c.time}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 8px', background: 'rgba(72,207,203,0.1)', color: '#48CFCB', borderRadius: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{c.status}</span>
                    </div>
                    <p style={{ fontWeight: 500, marginBottom: 4 }}>{c.name}</p>
                    <p style={{ fontSize: 12, color: '#9ca3af' }}>{c.intent}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Card 2: Terminal */}
            <motion.div {...fadeUp(0.15)} style={{ background: 'rgba(18,18,26,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 32, padding: 32, height: 450, display: 'flex', flexDirection: 'column', transition: 'border-color 0.3s' }}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(72,207,203,0.3)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Answers Parents' Questions For You</h3>
                <p style={{ fontSize: 13, color: '#9ca3af' }}>Automatically answers questions about pricing, level assessment, and trial policies to recover families who went cold.</p>
              </div>
              <div style={{ flex: 1, background: 'rgba(20,20,28,0.88)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', padding: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#d1d5db', lineHeight: 1.7, overflow: 'hidden', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#eab308' }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
                  <span style={{ fontSize: 10, color: '#6b7280', marginLeft: 8 }}>messages.log</span>
                </div>
                <span style={{ color: '#48CFCB' }}>&gt; new message to Sarah M.</span><br /><br />
                <span style={{ opacity: 0.9 }}>{typingText}</span>
                <span style={{ display: 'inline-block', width: 8, height: 16, background: '#48CFCB', marginLeft: 4, verticalAlign: 'middle', opacity: 0.8, animation: 'pulse 1s infinite' }} />
              </div>
            </motion.div>

            {/* Card 3: ROI chart */}
            <motion.div {...fadeUp(0.25)} style={{ background: 'rgba(18,18,26,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 32, padding: 32, height: 450, display: 'flex', flexDirection: 'column', transition: 'border-color 0.3s' }}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(72,207,203,0.3)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>See Exactly What's Working</h3>
                <p style={{ fontSize: 13, color: '#9ca3af' }}>Total operational clarity. See exactly which campaigns are actually turning into booked trial lessons.</p>
              </div>
              <div style={{ flex: 1, position: 'relative', background: 'rgba(20,20,28,0.88)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <svg style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', height: '80%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="roiG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#48CFCB" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#48CFCB" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0 90 Q 20 80, 40 50 T 100 10 L 100 100 L 0 100 Z" fill="url(#roiG)" />
                  <path d="M 0 90 Q 20 80, 40 50 T 100 10" fill="none" stroke="#48CFCB" strokeWidth="2" />
                </svg>
                <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, display: 'flex', justifyContent: 'space-between', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, background: 'rgba(13,13,18,0.9)', backdropFilter: 'blur(8px)', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div><div style={{ color: '#6b7280', marginBottom: 4 }}>SPEND</div><div style={{ color: '#fff', fontWeight: 700 }}>$240.50</div></div>
                  <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />
                  <div><div style={{ color: '#48CFCB', marginBottom: 4 }}>BOOKED</div><div style={{ color: '#48CFCB', fontWeight: 700 }}>8 TRIALS</div></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ────────────────────────────────────────────────────── */}
      <section style={{ padding: '48px 24px', position: 'relative', zIndex: 20 }}>
        <div style={{ maxWidth: 896, margin: '0 auto', textAlign: 'center' }}>
          <motion.p {...fadeUp(0)} style={{ fontSize: 18, color: '#6b7280', marginBottom: 24, fontWeight: 500 }}>
            Most marketing agencies focus on: cheap quick wins and zero school visibility.
          </motion.p>
          <motion.p {...fadeUp(0.1)} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
            We focus on: <span style={{ color: '#48CFCB' }}>systems</span> that fill your lanes every term.
          </motion.p>
        </div>
      </section>

      {/* ── PROTOCOL ──────────────────────────────────────────────────────── */}
      <section id="protocol" style={{ padding: '48px 0 48px', position: 'relative', zIndex: 20 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px,5vw,80px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32, marginBottom: 32 }}>
            {/* ── Step 01 ── */}
            <motion.div {...fadeUp(0)} style={{ background: 'rgba(18,18,26,0.92)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', padding: 'clamp(32px,4vw,48px)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 500, boxShadow: '0 20px 60px rgba(0,0,0,0.5)', transition: 'border-color 0.5s' }}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(72,207,203,0.3)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 0% 0%, rgba(72,207,203,0.08), transparent 50%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 24, left: 24, fontFamily: "'JetBrains Mono', monospace", color: '#48CFCB', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', background: 'rgba(72,207,203,0.1)', padding: '6px 12px', borderRadius: 9999, border: '1px solid rgba(72,207,203,0.2)', zIndex: 10 }}>Step 01</div>
              <div style={{ marginTop: 56, marginBottom: 32, width: '85%' }}>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.25rem, 5vw, 3rem)', fontWeight: 700, marginBottom: 16, lineHeight: 1.1 }}>
                  Precision Ad Campaigns<br />
                  <span style={{ backgroundImage: 'linear-gradient(to right, #48CFCB, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>For Your Swim School.</span>
                </h2>
                <p style={{ fontSize: 18, color: '#9ca3af', lineHeight: 1.7 }}>High-converting ad creatives built specifically for swim school families — targeting parents already searching for lessons in your area, not a general audience.</p>
              </div>
              <div style={{ width: '100%', height: 200, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(13,13,18,0.8)', backdropFilter: 'blur(8px)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#48CFCB,#3b82f6)', animation: 'spin 4s linear infinite' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ height: 8, width: 96, background: 'rgba(255,255,255,0.2)', borderRadius: 4 }} />
                    <div style={{ height: 6, width: 64, background: 'rgba(255,255,255,0.1)', borderRadius: 4 }} />
                  </div>
                </div>
                <div style={{ flex: 1, borderRadius: 8, background: 'linear-gradient(135deg,rgba(255,255,255,0.05),transparent)', border: '1px solid rgba(255,255,255,0.05)' }} />
                <div style={{ height: 24, borderRadius: 4, background: 'rgba(72,207,203,0.1)', border: '1px solid rgba(72,207,203,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: '#48CFCB', letterSpacing: '0.1em' }}>SPONSORED_CONTENT_ACTIVE</span>
                </div>
              </div>
            </motion.div>

            {/* ── Step 02 ── */}
            <motion.div {...fadeUp(0.12)} style={{ background: 'rgba(26,26,36,0.92)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', padding: 'clamp(32px,4vw,48px)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 500, boxShadow: '0 20px 60px rgba(0,0,0,0.5)', transition: 'border-color 0.5s' }}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(72,207,203,0.3)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 0% 100%, rgba(72,207,203,0.05), transparent 60%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 24, left: 24, fontFamily: "'JetBrains Mono', monospace", color: '#48CFCB', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', background: 'rgba(72,207,203,0.1)', padding: '6px 12px', borderRadius: 9999, border: '1px solid rgba(72,207,203,0.2)', zIndex: 10 }}>Step 02</div>
              <div style={{ marginTop: 56, marginBottom: 32, width: '85%' }}>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.25rem, 5vw, 3rem)', fontWeight: 700, marginBottom: 16, lineHeight: 1.1 }}>
                  Around-the-Clock<br />
                  <span style={{ backgroundImage: 'linear-gradient(to right, #9ca3af, #6b7280)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Responses.</span>
                </h2>
                <p style={{ fontSize: 18, color: '#9ca3af', lineHeight: 1.7 }}>Every enquiry that comes in gets responded to immediately, around the clock. No family sits unanswered over a weekend while they enrol at the school down the road.</p>
              </div>
              <div style={{ width: '100%', height: 200, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(13,13,18,0.8)', backdropFilter: 'blur(8px)', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
                {[
                  { label: 'New enquiry received', sub: 'Emma W. — Trial Lesson', time: '10:42 pm', color: '#9ca3af' },
                  { label: 'Reply sent automatically', sub: 'Answered pricing & availability', time: '10:42 pm', color: '#48CFCB' },
                  { label: 'Trial lesson booked', sub: 'Saturday 9:00 am confirmed', time: '10:44 pm', color: '#22c55e' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#e5e7eb' }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{item.sub}</div>
                    </div>
                    <span style={{ fontSize: 11, color: '#48CFCB', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap' }}>{item.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Step 03 ── */}
            <motion.div {...fadeUp(0)} style={{ background: 'rgba(18,18,26,0.92)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', padding: 'clamp(32px,4vw,48px)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 500, boxShadow: '0 20px 60px rgba(0,0,0,0.5)', transition: 'border-color 0.5s' }}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(72,207,203,0.3)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 100% 0%, rgba(72,207,203,0.05), transparent 60%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 24, left: 24, fontFamily: "'JetBrains Mono', monospace", color: '#48CFCB', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', background: 'rgba(72,207,203,0.1)', padding: '6px 12px', borderRadius: 9999, border: '1px solid rgba(72,207,203,0.2)', zIndex: 10 }}>Step 03</div>
              <div style={{ marginTop: 56, marginBottom: 32, width: '85%' }}>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.25rem, 5vw, 3rem)', fontWeight: 700, marginBottom: 16, lineHeight: 1.1 }}>
                  From Enquiry to<br />
                  <span style={{ backgroundImage: 'linear-gradient(to right, #9ca3af, #6b7280)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Booked Trial, Automatically.</span>
                </h2>
                <p style={{ fontSize: 18, color: '#9ca3af', lineHeight: 1.7 }}>The system knows the questions swim parents ask before enrolling — pricing, level progression, makeup lesson policies — and handles them automatically before they reach your front desk.</p>
              </div>
              <div style={{ width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', border: '1px solid rgba(72,207,203,0.1)', animation: 'spin 10s linear infinite', borderTop: '1px solid rgba(72,207,203,0.4)' }} />
                <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', border: '1px solid rgba(72,207,203,0.2)', animation: 'spinReverse 6s linear infinite', borderBottom: '1px solid rgba(72,207,203,0.5)' }} />
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(72,207,203,0.05)', border: '1px solid #48CFCB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#48CFCB', boxShadow: '0 0 15px #48CFCB', animation: 'pulse 1.5s infinite' }} />
                </div>
              </div>
            </motion.div>

            {/* ── Step 04 ── */}
            <motion.div {...fadeUp(0.12)} style={{ background: 'rgba(26,26,36,0.92)', borderRadius: 24, border: '1px solid rgba(72,207,203,0.2)', padding: 'clamp(32px,4vw,48px)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 500, boxShadow: '0 20px 60px rgba(0,0,0,0.5)', transition: 'border-color 0.5s' }}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(72,207,203,0.4)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(72,207,203,0.2)' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 100% 100%, rgba(72,207,203,0.05), transparent 60%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 24, left: 24, fontFamily: "'JetBrains Mono', monospace", color: '#48CFCB', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', background: 'rgba(72,207,203,0.1)', padding: '6px 12px', borderRadius: 9999, border: '1px solid rgba(72,207,203,0.2)', zIndex: 10 }}>Step 04</div>
              <div style={{ marginTop: 56, marginBottom: 32, width: '85%' }}>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.25rem, 5vw, 3rem)', fontWeight: 700, marginBottom: 16, lineHeight: 1.1 }}>
                  Know Your Numbers<br />
                  <span style={{ backgroundImage: 'linear-gradient(to right, #9ca3af, #6b7280)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>at a Glance.</span>
                </h2>
                <p style={{ fontSize: 18, color: '#9ca3af', lineHeight: 1.7 }}>Real-time visibility into every enquiry, ad dollar, and booked trial. Stop guessing what your marketing is doing — know exactly what fills lanes.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[{ label: 'CONVERSION', val: '68%', color: '#fff' }, { label: 'COST/BOOKING', val: '$14', color: '#48CFCB' }].map(m => (
                  <div key={m.label} style={{ background: 'rgba(18,18,26,0.9)', padding: 24, borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#6b7280', marginBottom: 8, letterSpacing: '0.1em' }}>{m.label}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 700, color: m.color }}>{m.val}</div>
                  </div>
                ))}
                <div style={{ gridColumn: 'span 2', background: 'rgba(18,18,26,0.9)', padding: 24, borderRadius: 16, border: '1px solid rgba(72,207,203,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 0 20px rgba(72,207,203,0.05)' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: '#48CFCB', boxShadow: '0 0 10px #48CFCB' }} />
                  <Activity size={24} color="#48CFCB" style={{ marginBottom: 8, animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: 13, color: '#48CFCB', fontWeight: 600 }}>All systems active</span>
                </div>
              </div>
            </motion.div>

            {/* ── Step 05: full-width ── */}
            <motion.div {...fadeUp(0.06)} style={{ gridColumn: '1 / -1', background: 'rgba(18,18,26,0.92)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', padding: 'clamp(32px,4vw,48px)', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', transition: 'border-color 0.5s' }}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(72,207,203,0.3)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 100%, rgba(72,207,203,0.05), transparent 60%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 24, left: 24, fontFamily: "'JetBrains Mono', monospace", color: '#48CFCB', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', background: 'rgba(72,207,203,0.1)', padding: '6px 12px', borderRadius: 9999, border: '1px solid rgba(72,207,203,0.2)' }}>Step 05</div>
              <div style={{ marginTop: 56, marginBottom: 16, maxWidth: 896 }}>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.25rem, 5vw, 3rem)', fontWeight: 700, marginBottom: 24, lineHeight: 1.1 }}>
                  Scaleable <span style={{ backgroundImage: 'linear-gradient(to right, #48CFCB, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Partnership.</span>
                </h2>
                <p style={{ fontSize: 18, color: '#9ca3af', lineHeight: 1.7 }}>
                  After the system is live, we stay on as your long-term growth partner — expanding to new pool locations, building new enrolment workflows, developing term-specific campaigns, and creating custom tools as your school scales.
                </p>
              </div>
              <div style={{ width: '100%', height: 120, marginTop: 32, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(13,13,18,0.8)', backdropFilter: 'blur(8px)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(72,207,203,0.4), transparent)', transform: 'translateY(-50%)' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: 16, height: 16, background: '#48CFCB', borderRadius: '50%', boxShadow: '0 0 20px #48CFCB', transform: 'translate(-50%,-50%)', animation: 'pulse 2s infinite' }} />
                <div style={{ position: 'absolute', top: '50%', left: '25%', width: 8, height: 8, background: '#fff', borderRadius: '50%', boxShadow: '0 0 10px white', transform: 'translate(-50%,-50%)' }} />
                <div style={{ position: 'absolute', top: '50%', left: '75%', width: 8, height: 8, background: '#fff', borderRadius: '50%', boxShadow: '0 0 10px white', transform: 'translate(-50%,-50%)' }} />
                <span style={{ position: 'absolute', bottom: 16, right: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(72,207,203,0.7)', letterSpacing: '0.1em' }}>Growing with you</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE OFFER ─────────────────────────────────────────────────── */}
      <section style={{ padding: '56px 24px', position: 'relative', zIndex: 20 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: 16, textAlign: 'center' }}>
              What We <span style={{ color: '#48CFCB' }}>Offer</span>
            </h2>
            <p style={{ color: '#9ca3af', textAlign: 'center', fontSize: 18, maxWidth: 672, lineHeight: 1.6 }}>
              We build everything your school needs to keep classes full — without adding to your plate.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { title: 'Personalised Ads', desc: 'High-converting ad creatives designed specifically to attract families searching for swim lessons in your local area.', img: '/old/images/purple-dashboard.png', mockup: 'img' },
              { title: 'Trial Booking Automation', desc: 'Streamlined workflows that guide new families from first enquiry to confirmed trial lesson without any manual follow-up.', img: '', mockup: 'sms' },
              { title: 'After-Hours Handling', desc: "Seamless call and message management when you're in the pool. Your AI assistant handles enquiries professionally after 6pm and on weekends.", img: '', mockup: 'agent' },
              { title: 'Local SEO', desc: 'Long-term organic growth strategies ensuring your swim school ranks #1 for families searching "swim lessons near me" in your suburb.', img: '/old/images/seo-illustration.png', mockup: 'img' },
              { title: 'Custom Websites', desc: 'Stunning, high-performance web architecture that not only looks incredible but actively drives trial bookings and enrolments.', img: '/old/images/custom-websites-illustration.png', mockup: 'img' },
              { title: 'Review Management', desc: 'Automated follow-up protocols to capture 5-star reviews from happy families while intercepting negative feedback privately.', img: '', mockup: 'stars' },
            ].map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)}
                style={{ background: 'rgba(11,13,21,0.88)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)', padding: '24px 32px 32px', display: 'flex', flexDirection: 'column', transition: 'border-color 0.5s', boxShadow: '0 4px 24px rgba(0,0,0,0.35)' }}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(72,207,203,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>

                {/* Image / mockup container */}
                <div style={{ width: '100%', height: 224, borderRadius: 16, overflow: 'hidden', position: 'relative', marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', ...(s.mockup === 'img' ? { border: '1px solid rgba(72,207,203,0.2)', boxShadow: '0 0 12px rgba(72,207,203,0.08)' } : { background: 'linear-gradient(to bottom, #161822, #0B0D15)', border: '1px solid rgba(255,255,255,0.05)' }) }}>
                  {/* Hover glow overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(72,207,203,0.06), transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />

                  {s.mockup === 'img' && (
                    <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
                  )}

                  {s.mockup === 'sms' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 260, padding: '0 12px', zIndex: 2 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#48CFCB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: 7, fontWeight: 700, color: '#0B0D15' }}>AI</span>
                        </div>
                        <div style={{ width: 80, height: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 3 }} />
                      </div>
                      <div style={{ alignSelf: 'flex-start', width: '80%', background: '#1E2035', borderRadius: '14px 14px 14px 4px', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ height: 5, background: 'rgba(255,255,255,0.15)', borderRadius: 3 }} />
                        <div style={{ height: 5, width: '75%', background: 'rgba(255,255,255,0.1)', borderRadius: 3 }} />
                      </div>
                      <div style={{ alignSelf: 'flex-end', width: '65%', background: '#48CFCB', borderRadius: '14px 14px 4px 14px', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ height: 5, background: 'rgba(0,0,0,0.15)', borderRadius: 3 }} />
                        <div style={{ height: 5, width: '50%', background: 'rgba(0,0,0,0.1)', borderRadius: 3 }} />
                      </div>
                      <div style={{ alignSelf: 'flex-start', width: '85%', background: '#1E2035', borderRadius: '14px 14px 14px 4px', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ height: 5, background: 'rgba(255,255,255,0.15)', borderRadius: 3 }} />
                        <div style={{ height: 5, width: '83%', background: 'rgba(255,255,255,0.1)', borderRadius: 3 }} />
                        <div style={{ height: 5, width: '60%', background: 'rgba(255,255,255,0.08)', borderRadius: 3 }} />
                      </div>
                      <div style={{ alignSelf: 'flex-end', width: '55%', background: '#48CFCB', borderRadius: '14px 14px 4px 14px', padding: '10px 12px' }}>
                        <div style={{ height: 5, background: 'rgba(0,0,0,0.15)', borderRadius: 3 }} />
                      </div>
                    </div>
                  )}

                  {s.mockup === 'agent' && (
                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                      <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#48CFCB', boxShadow: '0 0 8px rgba(72,207,203,0.6)' }} />
                        <div style={{ width: 2, height: 8, background: '#2E3148' }} />
                      </div>
                      <div style={{ width: 112, height: 160, background: '#1A1C2E', border: '3px solid #2E3148', borderRadius: 24, position: 'relative', overflow: 'hidden', boxShadow: '0 0 40px rgba(72,207,203,0.15)' }}>
                        <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', width: 32, height: 6, background: '#2E3148', borderRadius: 3 }} />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', paddingTop: 8, gap: 6 }}>
                          <div style={{ width: 52, height: 44, background: 'linear-gradient(to bottom, #48CFCB, #3BA8A5)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(72,207,203,0.3)' }}>
                            <div style={{ display: 'flex', gap: 8 }}>
                              <div style={{ width: 10, height: 10, background: '#0B0D15', borderRadius: '50%' }} />
                              <div style={{ width: 10, height: 10, background: '#0B0D15', borderRadius: '50%' }} />
                            </div>
                          </div>
                          <div style={{ width: 18, height: 18, border: '2px solid #48CFCB', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: 5, height: 7, background: '#48CFCB', borderRadius: 2 }} />
                          </div>
                          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 14 }}>
                            {[5,10,7,13,9,11,5,10,7].map((h, idx) => (
                              <div key={idx} style={{ width: 3, height: h, background: 'rgba(72,207,203,0.6)', borderRadius: 2, animation: 'pulse 1s infinite', animationDelay: `${idx * 0.1}s` }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {s.mockup === 'stars' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, zIndex: 2 }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {[1,2,3,4,5].map(n => (
                          <span key={n} style={{ fontSize: 28, color: '#48CFCB', lineHeight: 1, filter: 'drop-shadow(0 0 6px rgba(72,207,203,0.5))' }}>★</span>
                        ))}
                      </div>
                      <div style={{ fontSize: 12, color: '#48CFCB' }}>New review received</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '60%', alignItems: 'center' }}>
                        <div style={{ height: 5, width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: 3 }} />
                        <div style={{ height: 5, width: '80%', background: 'rgba(255,255,255,0.07)', borderRadius: 3 }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Text */}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 12, letterSpacing: '0.01em', color: '#fff' }}>{s.title}</h3>
                  <p style={{ color: '#9ca3af', fontSize: 13, lineHeight: 1.6, opacity: 0.85 }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tailored box */}
          <motion.div {...fadeUp(0.1)} style={{ marginTop: 24, background: 'rgba(11,13,21,0.88)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(32px,4vw,56px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 32, transition: 'border-color 0.5s' }}
            whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(72,207,203,0.4)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 700, marginBottom: 12 }}>Tailored on <span style={{ color: '#48CFCB' }}>Demand.</span></h3>
              <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.6, maxWidth: 480 }}>
                Our platform is built to grow with your school — continuously adding new automations, term-specific campaigns, and enrolment workflows tailored specifically for swim schools. Every enquiry touchpoint, handled.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 384, justifyContent: 'flex-end' }}>
              {['Trial Enquiry Capture', 'Enrolment Reminders', 'Intake Automation', 'Level FAQ Handling', 'Two-Way SMS', 'CRM Integrations', 'Term Re-enrolment', 'Holiday Program Campaigns'].map(tag => (
                <span key={tag} style={{ fontSize: 12, padding: '6px 12px', borderRadius: 9999, border: '1px solid rgba(72,207,203,0.2)', color: 'rgba(72,207,203,0.7)', background: 'rgba(72,207,203,0.05)', whiteSpace: 'nowrap' }}>{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '56px 24px', position: 'relative', zIndex: 20 }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.h2 {...fadeUp(0)} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: 48, textAlign: 'center' }}>
            Frequently Asked <span style={{ color: '#48CFCB' }}>Questions</span>
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 16, width: '100%', alignItems: 'start' }}>
            {FAQS.map((faq, i) => (
              <motion.div key={i} {...fadeUp(i * 0.06)} style={{ background: 'rgba(18,18,26,0.88)', border: `1px solid ${openFaq === i ? 'rgba(72,207,203,0.5)' : '#2A2A35'}`, borderRadius: 16, overflow: 'hidden', transition: 'border-color 0.3s' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 700, fontSize: 16, background: 'none', border: 'none', color: '#FAF8F5', cursor: 'pointer', minHeight: 72 }}>
                  {faq.question}
                  <ChevronDown size={20} color="#48CFCB" style={{ flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                </button>
                <div style={{
                  maxHeight: openFaq === i ? 300 : 0, opacity: openFaq === i ? 1 : 0,
                  overflow: 'hidden', transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
                  padding: openFaq === i ? '0 24px 24px' : '0 24px', color: '#9ca3af', lineHeight: 1.7,
                }}>
                  {faq.answer}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENCHMARKS ────────────────────────────────────────────────────── */}
      <section style={{ padding: '56px 24px', position: 'relative', zIndex: 20 }}>
        <div style={{ maxWidth: 1152, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.h2 {...fadeUp(0)} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 16, textAlign: 'center' }}>
            Why <span style={{ color: '#48CFCB' }}>Automation Wins for Swim Schools</span>
          </motion.h2>
          <motion.p {...fadeUp(0.1)} style={{ color: '#9ca3af', textAlign: 'center', fontSize: 18, maxWidth: 768, margin: '0 auto 64px', lineHeight: 1.6 }}>
            Response speed and persistent follow-up are the deciding factors in whether a family enrols with you or the school down the road.
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, width: '100%', marginBottom: 64 }}>
            {[
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
                desc: 'At ~45% annual churn, standing still means running a constant replacement race. Without a reliable enrolment engine, you\'re always behind.',
                source: 'Source: [TODO — add citation]',
              },
            ].map((b, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} style={{ background: 'rgba(18,18,26,0.88)', border: '1px solid #2A2A35', borderRadius: 24, padding: 32, position: 'relative', overflow: 'hidden', transition: 'border-color 0.3s' }}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
                onMouseEnter={e => { (e.currentTarget.style.borderColor = 'rgba(72,207,203,0.3)'); const glow = e.currentTarget.querySelector('.bench-glow') as HTMLElement; if (glow) glow.style.opacity = '1' }}
                onMouseLeave={e => { (e.currentTarget.style.borderColor = '#2A2A35'); const glow = e.currentTarget.querySelector('.bench-glow') as HTMLElement; if (glow) glow.style.opacity = '0.5' }}>
                <div className="bench-glow" style={{ position: 'absolute', top: 0, right: 0, width: 128, height: 128, background: 'rgba(72,207,203,0.1)', borderRadius: '50%', filter: 'blur(40px)', marginRight: -40, marginTop: -40, pointerEvents: 'none', opacity: 0.5, transition: 'opacity 0.3s' }} />
                <div style={{ position: 'relative', zIndex: 10 }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#48CFCB', fontSize: 32, fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>
                    {b.stat}<br />{b.stat2}
                  </h3>
                  <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>{b.h4}</h4>
                  <p style={{ color: '#9ca3af', lineHeight: 1.6, fontSize: 14 }}>{b.desc}</p>
                  <p style={{ fontSize: 11, color: '#4b5563', marginTop: 12, fontStyle: 'italic' }}>{b.source}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '64px 24px', position: 'relative', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <motion.div {...fadeUp(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 9999, border: '1px solid rgba(72,207,203,0.3)', background: 'rgba(72,207,203,0.1)', color: '#48CFCB', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: '0.1em', marginBottom: 40, fontWeight: 700, textTransform: 'uppercase' }}>
            <LogoMark size={16} /> The Performance Guarantee
          </motion.div>
          <motion.h2 {...fadeUp(0.1)} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', fontWeight: 700, marginBottom: 32, lineHeight: 1.05 }}>
            Increase Your Bookings<br />by 30% in 90 Days.{' '}
            <span style={{ display: 'block', color: '#6b7280', fontSize: 'clamp(1.5rem, 4vw, 3.5rem)', marginTop: 16 }}>Or We Work for Free Until You Do.</span>
          </motion.h2>
          <motion.p {...fadeUp(0.2)} style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: '#9ca3af', maxWidth: 768, textAlign: 'center', marginBottom: 64, lineHeight: 1.7 }}>
            Stop losing after-hours enquiries and watching booked trials go cold. We install a 24/7 enrolment system that turns website visitors and missed calls into families sitting poolside on trial day.
          </motion.p>
          <motion.a {...fadeUp(0.3)} href="/book" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            padding: '24px 48px', background: '#48CFCB', color: '#0D0D12', borderRadius: 9999,
            fontWeight: 700, fontSize: 20, textDecoration: 'none',
            boxShadow: '0 0 50px rgba(72,207,203,0.3)', transition: 'all 0.3s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 80px rgba(72,207,203,0.5)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 50px rgba(72,207,203,0.3)' }}>
            Book a 15-Minute Chat <ArrowRight size={24} />
          </motion.a>
        </div>
      </section>

      {/* ── FOOTER FADE ───────────────────────────────────────────────────── */}
      <div style={{ height: 30, background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 60%, #000 100%)', marginTop: -30, position: 'relative', zIndex: 19, pointerEvents: 'none' }} />

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '64px 24px', position: 'relative', zIndex: 20 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>
            <div style={{ gridColumn: 'span 2' }}>
              <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
                <LogoMark size={36} />
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: '#dce4e2' }}>Laprise</span>
              </a>
              <p style={{ color: '#6b7280', maxWidth: 384, lineHeight: 1.7, fontSize: 14 }}>
                Filling swim school lanes every term with intelligent enrolment automation.
              </p>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: 16, color: '#dce4e2', fontSize: 15 }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[{ href: '/', label: 'Home' }, { href: '/book', label: 'Book a Call' }, { href: '/contact', label: 'Contact' }].map(l => (
                  <li key={l.href}><a href={l.href} style={{ color: '#6b7280', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#48CFCB')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: 16, color: '#dce4e2', fontSize: 15 }}>Contact</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li><a href="mailto:haydenvanderhee@laprise.org" style={{ color: '#6b7280', fontSize: 14, textDecoration: 'none' }}>haydenvanderhee@laprise.org</a></li>
                <li><a href="https://laprise.org" style={{ color: '#6b7280', fontSize: 14, textDecoration: 'none' }}>laprise.org</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 32, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <p style={{ color: '#4b5563', fontSize: 13 }}>© {new Date().getFullYear()} Laprise. All rights reserved.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
              {[
                { label: 'Privacy Policy', href: 'https://app.termly.io/policy-viewer/policy.html?policyUUID=576499bb-e5ba-4839-989d-a639e19739ef' },
                { label: 'Terms of Service', href: 'https://app.termly.io/policy-viewer/policy.html?policyUUID=ca6aefbb-e411-4065-8cfb-36cbea11c613' },
                { label: 'Cookie Policy', href: 'https://app.termly.io/policy-viewer/policy.html?policyUUID=2ec82e6e-58f8-4a44-9c2a-5d09144afc69' },
                { label: 'Disclaimer', href: 'https://app.termly.io/policy-viewer/policy.html?policyUUID=a6f7794e-80e0-4702-81d0-c2ce2289671d' },
                { label: 'Acceptable Use Policy', href: 'https://app.termly.io/policy-viewer/policy.html?policyUUID=04469ba4-1e6f-4edf-8662-aba4c608f0b8' },
                { label: 'Accessibility Statement', href: 'https://app.termly.io/policy-viewer/policy.html?policyUUID=023cecf5-639f-4c22-84e2-f7685cadc132' },
              ].map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{ color: '#4b5563', fontSize: 13, textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#48CFCB')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#4b5563')}>{l.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinReverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        @keyframes slideUp { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
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
