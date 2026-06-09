import { useEffect, useRef } from 'react'

export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let rafId = 0
    let targetX = -9999
    let targetY = -9999
    let currentX = -9999
    let currentY = -9999

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const tick = () => {
      // Lerp toward cursor for smooth lag
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08

      if (el) {
        el.style.background = `radial-gradient(
          circle 520px at ${currentX}px ${currentY}px,
          rgba(71, 241, 228, 0.07) 0%,
          rgba(0, 212, 200, 0.04) 30%,
          transparent 70%
        )`
      }
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
        transition: 'none',
      }}
    />
  )
}
