import { AnimatedSection } from './animation/AnimatedSection'
import { WordReveal } from './animation/WordReveal'

const SPACE_GROTESK = "'Space Grotesk', sans-serif"
const HANKEN = "'Hanken Grotesk', sans-serif"
const NEWSREADER = "'Newsreader', serif"

export function NewHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '896px',
        margin: '0 auto',
        paddingTop: '16px',
        paddingBottom: '48px',
        width: '100%',
      }}
    >
      <AnimatedSection delay={0.1}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            border: '1px solid rgba(71, 241, 228, 0.25)',
            background: 'rgba(71, 241, 228, 0.06)',
            marginBottom: '32px',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#47f1e4',
              flexShrink: 0,
              boxShadow: '0 0 8px rgba(71, 241, 228, 0.9)',
              display: 'inline-block',
            }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: HANKEN,
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#47f1e4',
            }}
          >
            Purpose-built for Aesthetic Medicine
          </span>
        </div>
      </AnimatedSection>

      <h1
        id="hero-heading"
        aria-label="Customer Acquisition for your Clinic"
        style={{
          fontFamily: SPACE_GROTESK,
          fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: '#dce4e2',
          margin: '0 0 24px',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.05em',
        }}
      >
        <WordReveal
          text="Customer Acquisition"
          delay={0.25}
          style={{ fontFamily: SPACE_GROTESK, fontWeight: 700, justifyContent: 'center' }}
        />
        <WordReveal
          text="for your Clinic"
          delay={0.55}
          style={{ fontFamily: SPACE_GROTESK, fontWeight: 700, justifyContent: 'center' }}
        />
      </h1>

      <AnimatedSection delay={0.65}>
        <h2
          style={{
            fontFamily: NEWSREADER,
            fontSize: '24px',
            fontWeight: 400,
            lineHeight: 1.4,
            fontStyle: 'italic',
            color: '#47f1e4',
            margin: '0 0 24px',
          }}
        >
          Precision-built. Patient-ready.
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.8}>
        <p
          style={{
            fontFamily: HANKEN,
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: 1.6,
            color: '#bacac7',
            maxWidth: '600px',
            margin: '0 0 32px',
          }}
        >
          LaserFlow is the AI infrastructure layer that eliminates lead leakage,
          automates patient communication, and fills treatment chairs — without
          adding a single staff member.
        </p>
      </AnimatedSection>

    </section>
  )
}
