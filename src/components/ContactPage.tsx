import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LogoMark } from './LogoMark'
import { WaveDivider } from './LandingPage'
import { Mail, Globe, Clock, CheckCircle2, Send, ChevronDown, ChevronUp } from 'lucide-react'

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
const TEAL = '#0E7FA8'
const BG = '#F7FAFB'

const SUBJECTS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'demo', label: 'Request a Demo' },
  { value: 'pricing', label: 'Pricing Information' },
  { value: 'support', label: 'Technical Support' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'other', label: 'Other' },
]

function PageNav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.92)',
      borderBottom: '1px solid rgba(14,42,56,0.08)',
      padding: '14px 0', transition: 'background 0.3s',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px,5vw,80px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <LogoMark size={32} />
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: '#0F2A38', letterSpacing: '-0.01em' }}>Laprise</span>
        </a>
        <a href="/" style={{ color: '#54707C', fontSize: 14, textDecoration: 'none', fontFamily: "'Space Grotesk',sans-serif", transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = TEAL)}
          onMouseLeave={e => (e.currentTarget.style.color = '#54707C')}>
          ← Back to home
        </a>
      </div>
    </header>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '13px 16px',
  background: '#FFFFFF', border: '1px solid rgba(14,42,56,0.12)',
  borderRadius: 10, color: '#0F2A38', fontSize: 15,
  fontFamily: "'Hanken Grotesk',sans-serif", outline: 'none',
  transition: 'border-color 0.2s', boxSizing: 'border-box',
}

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', agreedToTerms: false })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [showDisclaimer, setShowDisclaimer] = useState(false)

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) { setError('Please fill in all required fields.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError('Please enter a valid email address.'); return }
    if (!form.agreedToTerms) { setError('Please agree to the Terms & Conditions.'); return }
    setError('')
    setIsSubmitting(true)
    try {
      const res = await fetch('https://formspree.io/f/xykbyjrb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setIsSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PageNav />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: EASE }}
          style={{ textAlign: 'center', maxWidth: 480, padding: '0 24px' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg,#1CA7C4,#17B5AE)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <CheckCircle2 size={36} color="#FFFFFF" />
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 12, color: TEAL }}>Message sent!</h1>
          <p style={{ color: '#54707C', fontSize: 16, marginBottom: 32 }}>Thanks for reaching out. We'll get back to you within one business day.</p>
          <a href="/" style={{ display: 'inline-block', background: TEAL, color: '#FFFFFF', padding: '14px 32px', borderRadius: 9999, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>Return to Home</a>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#0F2A38', fontFamily: "'Hanken Grotesk',sans-serif", position: 'relative', overflow: 'hidden' }}>
      {/* blue haze — soft depth/contrast behind the light contact body */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '-7%', width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle, rgba(28,167,196,0.24), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '46%', right: '-6%', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,127,168,0.18), transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-4%', left: '28%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(23,181,174,0.15), transparent 70%)' }} />
      </div>
      <PageNav />

      {/* Cyan hero header + wave into the body */}
      <section style={{ position: 'relative', zIndex: 1, background: '#1CA7C4', padding: 'clamp(120px,16vw,160px) clamp(20px,5vw,40px) clamp(48px,7vw,72px)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE }} style={{ maxWidth: 720, margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2.5rem,7vw,4.25rem)', fontWeight: 700, lineHeight: 1.05, marginBottom: 20, color: '#FFFFFF' }}>
            Let's Start a Conversation
          </h1>
          <p style={{ fontSize: 'clamp(1.05rem,2.2vw,1.35rem)', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
            Have questions about how Laprise works for swim schools? We're here to help.
          </p>
        </motion.div>
      </section>
      <WaveDivider top="#1CA7C4" bottom="#F7FAFB" />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: 'clamp(32px,5vw,56px) clamp(20px,5vw,40px) 80px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'start' }}>

          {/* Contact info sidebar */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Contact Information</h2>
            <p style={{ color: '#54707C', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
              Ready to transform your swim school's enrolment pipeline? Reach out and let's discuss how Laprise can help you grow.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 36 }}>
              {[
                { icon: <Mail size={20} color="#FFFFFF" />, label: 'Email Us', content: <a href="mailto:haydenvanderhee@laprise.org" style={{ color: '#54707C', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = TEAL)} onMouseLeave={e => (e.currentTarget.style.color = '#54707C')}>haydenvanderhee@laprise.org</a> },
                { icon: <Globe size={20} color="#FFFFFF" />, label: 'Website', content: <a href="https://laprise.org" target="_blank" rel="noopener noreferrer" style={{ color: '#54707C', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = TEAL)} onMouseLeave={e => (e.currentTarget.style.color = '#54707C')}>laprise.org</a> },
                { icon: <Clock size={20} color="#FFFFFF" />, label: 'Response Time', content: <span style={{ color: '#54707C' }}>Within one business day</span> },
              ].map(({ icon, label, content }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg,#1CA7C4,#17B5AE)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {icon}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, fontFamily: "'Space Grotesk',sans-serif" }}>{label}</p>
                    {content}
                  </div>
                </div>
              ))}
            </div>

            {/* Book a call CTA */}
            <div style={{ background: '#FFFFFF', border: '1px solid rgba(14,42,56,0.10)', boxShadow: '0 14px 40px rgba(14,127,168,0.08)', borderRadius: 20, padding: 24 }}>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Ready to get started?</p>
              <p style={{ fontSize: 14, color: '#54707C', marginBottom: 20, lineHeight: 1.6 }}>Skip the form and book a discovery call directly.</p>
              <a href="/book" style={{ display: 'block', textAlign: 'center', background: TEAL, color: '#FFFFFF', padding: '13px 0', borderRadius: 9999, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, textDecoration: 'none', transition: 'transform 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
                Book a Discovery Call
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
            style={{ background: '#FFFFFF', border: '1px solid rgba(14,42,56,0.10)', boxShadow: '0 14px 40px rgba(14,127,168,0.08)', borderRadius: 24, padding: 'clamp(24px,5vw,40px)' }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 28 }}>Send Us a Message</h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#54707C', marginBottom: 8, fontWeight: 500 }}>Your Name <span style={{ color: '#ef4444' }}>*</span></label>
                  <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Emma Wilson" style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(28,167,196,0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(14,42,56,0.12)')} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#54707C', marginBottom: 8, fontWeight: 500 }}>Email Address <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="emma@aquaswim.com.au" style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(28,167,196,0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(14,42,56,0.12)')} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#54707C', marginBottom: 8, fontWeight: 500 }}>Subject</label>
                <select value={form.subject} onChange={e => set('subject', e.target.value)}
                  style={{ ...inputStyle, appearance: 'none' as const }}>
                  <option value="" style={{ background: '#FFFFFF' }}>What's this about?</option>
                  {SUBJECTS.map(s => <option key={s.value} value={s.value} style={{ background: '#FFFFFF' }}>{s.label}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#54707C', marginBottom: 8, fontWeight: 500 }}>Your Message <span style={{ color: '#ef4444' }}>*</span></label>
                <textarea value={form.message} onChange={e => set('message', e.target.value)} rows={5}
                  placeholder="Tell us about your swim school and how we can help..."
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 130 }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(28,167,196,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(14,42,56,0.12)')} />
              </div>

              {/* Terms */}
              <div style={{ padding: '14px 18px', borderRadius: 10, border: '1px solid rgba(14,42,56,0.08)', background: '#F1F7F9' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.agreedToTerms} onChange={e => set('agreedToTerms', e.target.checked)}
                    style={{ marginTop: 2, accentColor: TEAL, width: 16, height: 16, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#54707C', lineHeight: 1.6 }}>
                    I agree to Laprise's{' '}
                    <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=ca6aefbb-e411-4065-8cfb-36cbea11c613" target="_blank" rel="noopener noreferrer" style={{ color: TEAL, textDecoration: 'none' }}>Terms & Conditions</a>
                    {' '}and{' '}
                    <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=576499bb-e5ba-4839-989d-a639e19739ef" target="_blank" rel="noopener noreferrer" style={{ color: TEAL, textDecoration: 'none' }}>Privacy Policy</a>
                    . <span style={{ color: '#ef4444' }}>*</span>
                  </span>
                </label>
              </div>

              {error && <p style={{ color: '#ef4444', fontSize: 14 }}>{error}</p>}

              <button type="submit" disabled={isSubmitting}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: TEAL, color: '#FFFFFF', padding: '15px 32px', borderRadius: 9999, border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, opacity: isSubmitting ? 0.7 : 1, transition: 'transform 0.2s, opacity 0.2s', width: '100%' }}
                onMouseEnter={e => { if (!isSubmitting) (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}>
                {isSubmitting ? 'Sending…' : <><Send size={16} /> Send Message</>}
              </button>

              {/* Disclaimer */}
              <div style={{ fontSize: 12, color: '#7C95A0', lineHeight: 1.6 }}>
                <div style={{ overflow: 'hidden', maxHeight: showDisclaimer ? 200 : 40, transition: 'max-height 0.4s ease', maskImage: showDisclaimer ? 'none' : 'linear-gradient(to bottom, black 40%, transparent 100%)', WebkitMaskImage: showDisclaimer ? 'none' : 'linear-gradient(to bottom, black 40%, transparent 100%)' }}>
                  <p style={{ marginBottom: 8 }}>By clicking 'Send Message', I agree to receive recurring marketing messages and outbound calls at the number provided. These communications may be sent via automated technology, including an AI voice, from Laprise or its partners.</p>
                  <p>Consent is not a condition of purchase. Msg & data rates may apply. Opt out anytime by replying STOP or stating 'Unsubscribe' during a call.</p>
                </div>
                <button type="button" onClick={() => setShowDisclaimer(v => !v)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: TEAL, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, marginTop: 6, padding: 0 }}>
                  {showDisclaimer ? <><ChevronUp size={12} /> Show less</> : <><ChevronDown size={12} /> Read full disclaimer</>}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
