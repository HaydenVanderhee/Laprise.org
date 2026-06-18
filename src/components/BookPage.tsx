import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { LogoMark } from './LogoMark'
import { WaveDivider } from './LandingPage'
import { CheckCircle2, Building2, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react'

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
const TEAL = '#0E7FA8'
const BG = '#F7FAFB'

const SERVICES = [
  'Trial Lesson Enquiry', 'Term Enrolment', 'Group Lessons', 'Private Lessons',
  'Squad / Competitive Training', 'Holiday Intensive', 'Adult Learn-to-Swim',
  'Parent & Baby Classes', 'School Holiday Programs', 'Other',
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

export function BookPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', businessName: '', services: [] as string[],
    agreedToTerms: false,
  })
  const [serviceSearch, setServiceSearch] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showDisclaimer, setShowDisclaimer] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  const toggleService = (s: string) =>
    set('services', form.services.includes(s) ? form.services.filter(x => x !== s) : [...form.services, s])

  const filteredServices = SERVICES.filter(
    s => !form.services.includes(s) && s.toLowerCase().includes(serviceSearch.toLowerCase())
  )

  const validate = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.businessName) return 'Please fill in all required fields.'
    if (form.services.length === 0) return 'Please select at least one service.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email address.'
    if (!form.agreedToTerms) return 'Please agree to the Terms & Conditions.'
    return ''
  }

  const handleSubmit = async () => {
    const err = validate()
    if (err) { setError(err); return }
    setError('')
    setIsSubmitting(true)
    try {
      await fetch('https://hook.us2.make.com/2qk018h9agzh2obxi965lejo04w8a65e', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(form),
      })
      const params = new URLSearchParams({
        firstName: form.firstName, lastName: form.lastName,
        email: form.email, phone: form.phone,
      }).toString()
      window.location.href = `https://api.leadconnectorhq.com/widget/bookings/discovery-call-1ct8u?${params}`
    } catch {
      setError('Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#0F2A38', fontFamily: "'Hanken Grotesk',sans-serif" }}>
      <PageNav />

      {/* Cyan hero header + wave into the form */}
      <section style={{ background: '#1CA7C4', padding: 'clamp(120px,16vw,160px) clamp(20px,5vw,40px) clamp(48px,7vw,72px)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE }} style={{ maxWidth: 720, margin: '0 auto' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFFFFF', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 16px', borderRadius: 9999, marginBottom: 20 }}>
            Free Discovery Call
          </span>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,5.5vw,3.2rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: 16, color: '#FFFFFF' }}>
            Book Your Discovery Call
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
            Tell us about your swim school so we can prepare a customised demonstration of how Laprise can transform your enrolment pipeline.
          </p>
        </motion.div>
      </section>
      <WaveDivider top="#1CA7C4" bottom="#F7FAFB" />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(32px,5vw,56px) clamp(20px,5vw,40px) 80px' }}>

        {/* Form card */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
          style={{ background: '#FFFFFF', border: '1px solid rgba(14,42,56,0.10)', borderRadius: 24, padding: 'clamp(24px,5vw,40px)', boxShadow: '0 14px 40px rgba(14,127,168,0.08)' }}>

          {/* Section label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#1CA7C4,#17B5AE)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Building2 size={18} color="#FFFFFF" />
            </div>
            <div>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 2 }}>Your Information</p>
              <p style={{ fontSize: 13, color: '#54707C' }}>Let's get to know you and your school</p>
            </div>
          </div>

          {/* Name row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            {[['firstName', 'First Name', 'Emma', true], ['lastName', 'Last Name', 'Wilson', true]].map(([k, label, ph, req]) => (
              <div key={k as string}>
                <label style={{ display: 'block', fontSize: 13, color: '#54707C', marginBottom: 8, fontWeight: 500 }}>
                  {label as string}{req && <span style={{ color: '#ef4444' }}> *</span>}
                </label>
                <input value={(form as any)[k as string]} onChange={e => set(k as string, e.target.value)}
                  placeholder={ph as string} style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(28,167,196,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(14,42,56,0.12)')} />
              </div>
            ))}
          </div>

          {/* Email / phone */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#54707C', marginBottom: 8, fontWeight: 500 }}>Email Address <span style={{ color: '#ef4444' }}>*</span></label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                placeholder="emma@aquaswim.com.au" style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(28,167,196,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(14,42,56,0.12)')} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#54707C', marginBottom: 8, fontWeight: 500 }}>Phone Number</label>
              <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                placeholder="+61 400 000 000" style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(28,167,196,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(14,42,56,0.12)')} />
            </div>
          </div>

          {/* School name */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#54707C', marginBottom: 8, fontWeight: 500 }}>Swim School Name <span style={{ color: '#ef4444' }}>*</span></label>
            <input value={form.businessName} onChange={e => set('businessName', e.target.value)}
              placeholder="Aqua Swim School" style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(28,167,196,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(14,42,56,0.12)')} />
          </div>

          {/* Services multiselect */}
          <div style={{ marginBottom: 24 }} ref={dropRef}>
            <label style={{ display: 'block', fontSize: 13, color: '#54707C', marginBottom: 8, fontWeight: 500 }}>Primary Services Offered <span style={{ color: '#ef4444' }}>*</span></label>

            {form.services.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                {form.services.map(s => (
                  <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 9999, background: 'rgba(28,167,196,0.10)', border: '1px solid rgba(28,167,196,0.30)', color: TEAL, fontSize: 13, fontWeight: 600 }}>
                    {s}
                    <button type="button" onClick={() => toggleService(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, lineHeight: 1, fontSize: 16 }}>×</button>
                  </span>
                ))}
              </div>
            )}

            <div style={{ position: 'relative' }}>
            <input value={serviceSearch} onChange={e => setServiceSearch(e.target.value)}
              onFocus={() => setDropdownOpen(true)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
              placeholder="Type to search services..."
              style={inputStyle}
              onFocusCapture={e => (e.currentTarget.style.borderColor = 'rgba(28,167,196,0.5)')}
              onBlurCapture={e => (e.currentTarget.style.borderColor = 'rgba(14,42,56,0.12)')} />

            {dropdownOpen && filteredServices.length > 0 && (
              <div style={{ position: 'absolute', zIndex: 50, top: 'calc(100% + 4px)', left: 0, right: 0, background: '#FFFFFF', border: '1px solid rgba(14,42,56,0.12)', borderRadius: 10, maxHeight: 200, overflowY: 'auto', boxShadow: '0 8px 32px rgba(14,127,168,0.16)' }}>
                {filteredServices.map(s => (
                  <button key={s} type="button"
                    onMouseDown={e => { e.preventDefault(); toggleService(s); setServiceSearch('') }}
                    style={{ width: '100%', textAlign: 'left', padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#54707C', transition: 'background 0.15s, color 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(28,167,196,0.10)'; (e.currentTarget as HTMLElement).style.color = '#0F2A38' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = '#54707C' }}>
                    {s}
                  </button>
                ))}
              </div>
            )}
            </div>

            <p style={{ fontSize: 12, color: '#0E7FA8', marginTop: 6 }}>
              Helps us build a custom growth plan before the call so we hit the ground running.
            </p>
          </div>

          {/* Terms */}
          <div style={{ padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(14,42,56,0.08)', background: '#F1F7F9', marginBottom: 24 }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.agreedToTerms} onChange={e => set('agreedToTerms', e.target.checked)}
                style={{ marginTop: 2, accentColor: TEAL, width: 16, height: 16, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: '#54707C', lineHeight: 1.6 }}>
                I agree to Laprise's{' '}
                <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=ca6aefbb-e411-4065-8cfb-36cbea11c613" target="_blank" rel="noopener noreferrer" style={{ color: TEAL, textDecoration: 'none' }}>Terms & Conditions</a>
                {' '}and{' '}
                <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=576499bb-e5ba-4839-989d-a639e19739ef" target="_blank" rel="noopener noreferrer" style={{ color: TEAL, textDecoration: 'none' }}>Privacy Policy</a>
                , and consent to being contacted regarding my inquiry. <span style={{ color: '#ef4444' }}>*</span>
              </span>
            </label>
          </div>

          {error && <p style={{ color: '#ef4444', fontSize: 14, marginBottom: 16 }}>{error}</p>}

          {/* Submit */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 16, borderTop: '1px solid rgba(14,42,56,0.08)' }}>
            <button onClick={handleSubmit} disabled={isSubmitting}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: TEAL, color: '#FFFFFF', padding: '14px 32px', borderRadius: 9999, border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, opacity: isSubmitting ? 0.7 : 1, transition: 'transform 0.2s, opacity 0.2s' }}
              onMouseEnter={e => { if (!isSubmitting) (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}>
              {isSubmitting ? 'Submitting…' : <><MessageSquare size={16} /> Submit Request</>}
            </button>
          </div>

          {/* Disclaimer */}
          <div style={{ marginTop: 20, fontSize: 12, color: '#7C95A0', lineHeight: 1.6 }}>
            <div style={{ overflow: 'hidden', maxHeight: showDisclaimer ? 200 : 40, transition: 'max-height 0.4s ease', maskImage: showDisclaimer ? 'none' : 'linear-gradient(to bottom, black 40%, transparent 100%)', WebkitMaskImage: showDisclaimer ? 'none' : 'linear-gradient(to bottom, black 40%, transparent 100%)' }}>
              <p style={{ marginBottom: 8 }}>By clicking 'Submit', I agree to receive recurring marketing messages and outbound calls at the number provided. These communications may be sent via automated technology, including an AI voice, from Laprise or its partners.</p>
              <p>Consent is not a condition of purchase. Msg & data rates may apply. Opt out anytime by replying STOP or stating 'Unsubscribe' during a call.</p>
            </div>
            <button type="button" onClick={() => setShowDisclaimer(v => !v)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: TEAL, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, marginTop: 6, padding: 0 }}>
              {showDisclaimer ? <><ChevronUp size={12} /> Show less</> : <><ChevronDown size={12} /> Read full disclaimer</>}
            </button>
          </div>
        </motion.div>

        {/* Trust row */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: '#7C95A0', marginBottom: 16 }}>Your information is secure and used only to prepare for your call.</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {['No commitment', 'Free consultation', 'Custom demo'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#54707C' }}>
                <CheckCircle2 size={15} color={TEAL} />{t}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
