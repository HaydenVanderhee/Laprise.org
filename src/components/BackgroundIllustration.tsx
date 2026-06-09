import { useEffect, useRef } from 'react'

interface Stream {
  x0: number; y0: number
  cx1: number; cy1: number
  cx2: number; cy2: number
  x3: number; y3: number
  color: string; width: number; alpha: number
  phase: number; amplitude: number; speed: number
}

interface Particle {
  x: number; y: number
  vx: number; vy: number
  r: number; alpha: number
  phase: number; twinkleSpeed: number
  color: string
}

interface Node {
  // base position in 0–1 normalised coords
  bx: number; by: number
  // drift params
  driftAmp: number; driftPhase: number; driftSpeed: number
  r: number; alpha: number; color: string
}

interface NodeCluster {
  nodes: Node[]
  // edges as index pairs
  edges: [number, number][]
}

// ── streams (alpha * 0.75 vs original) ──────────────────────────────
const STREAMS: Stream[] = [
  { x0:-80,  y0:780, cx1:350, cy1:590, cx2:900, cy2:290, x3:1340, y3:180, color:'#47f1e4', width:1.4, alpha:0.54, phase:0.0, amplitude:18, speed:0.48 },
  { x0:-60,  y0:830, cx1:340, cy1:620, cx2:920, cy2:310, x3:1360, y3:210, color:'#24ddd1', width:1.0, alpha:0.41, phase:1.5, amplitude:14, speed:0.42 },
  { x0: 20,  y0:860, cx1:390, cy1:640, cx2:950, cy2:350, x3:1380, y3:240, color:'#24ddd1', width:0.8, alpha:0.30, phase:3.0, amplitude:11, speed:0.36 },
  { x0:100,  y0:-40, cx1:400, cy1:230, cx2:900, cy2:410, x3:1340, y3:380, color:'#47f1e4', width:1.2, alpha:0.47, phase:0.8, amplitude:16, speed:0.46 },
  { x0: 60,  y0:-60, cx1:380, cy1:210, cx2:880, cy2:400, x3:1380, y3:370, color:'#24ddd1', width:0.9, alpha:0.34, phase:2.2, amplitude:12, speed:0.38 },
  { x0:-120, y0:700, cx1:320, cy1:540, cx2:860, cy2:380, x3:1400, y3:340, color:'#24ddd1', width:0.9, alpha:0.32, phase:1.0, amplitude:13, speed:0.43 },
  { x0:200,  y0:920, cx1:480, cy1:680, cx2:980, cy2:420, x3:1440, y3:300, color:'#47f1e4', width:0.7, alpha:0.26, phase:4.0, amplitude:10, speed:0.34 },
  { x0:-40,  y0:200, cx1:340, cy1:310, cx2:840, cy2:430, x3:1360, y3:420, color:'#24ddd1', width:0.6, alpha:0.23, phase:2.8, amplitude: 8, speed:0.30 },
  // ── right-side filler streams ──
  // Upper-right zone: originates mid-screen, arcs into top-right corner
  { x0:700,  y0:-60, cx1:960, cy1:60,  cx2:1200, cy2:100, x3:1500, y3:160, color:'#47f1e4', width:0.6, alpha:0.22, phase:1.2, amplitude:10, speed:0.26 },
  { x0:750,  y0:-80, cx1:980, cy1:80,  cx2:1220, cy2:130, x3:1500, y3:200, color:'#24ddd1', width:0.5, alpha:0.18, phase:3.4, amplitude: 8, speed:0.24 },
  // Lower-right zone: sweeps from centre-bottom up into lower-right
  { x0:600,  y0:960, cx1:900, cy1:820, cx2:1180, cy2:720, x3:1500, y3:580, color:'#47f1e4', width:0.6, alpha:0.20, phase:2.0, amplitude:11, speed:0.29 },
  { x0:650,  y0:980, cx1:920, cy1:840, cx2:1200, cy2:750, x3:1500, y3:640, color:'#24ddd1', width:0.5, alpha:0.17, phase:0.6, amplitude: 9, speed:0.25 },
]

const GLOW_LAYERS: [number, number][] = [
  [8, 0.04],
  [4, 0.10],
  [2, 0.22],
  [1, 1.00],
]

// ── node clusters in the two empty right-side zones ──────────────────
const NODE_CLUSTERS: NodeCluster[] = [
  // Cluster A — upper-right (~83–96% x, 8–22% y)
  {
    nodes: [
      { bx:0.855, by:0.10, driftAmp:0.006, driftPhase:0.0, driftSpeed:0.28, r:1.8, alpha:0.50, color:'#47f1e4' },
      { bx:0.900, by:0.16, driftAmp:0.005, driftPhase:1.4, driftSpeed:0.22, r:2.4, alpha:0.60, color:'#47f1e4' },
      { bx:0.940, by:0.09, driftAmp:0.007, driftPhase:2.8, driftSpeed:0.32, r:1.6, alpha:0.45, color:'#24ddd1' },
      { bx:0.875, by:0.21, driftAmp:0.005, driftPhase:0.9, driftSpeed:0.18, r:1.4, alpha:0.40, color:'#24ddd1' },
      { bx:0.960, by:0.18, driftAmp:0.006, driftPhase:2.1, driftSpeed:0.25, r:1.8, alpha:0.48, color:'#47f1e4' },
    ],
    edges: [[0,1],[1,2],[1,3],[2,4],[3,4]],
  },
  // Cluster B — lower-right (~75–96% x, 72–88% y)
  {
    nodes: [
      { bx:0.780, by:0.76, driftAmp:0.006, driftPhase:1.0, driftSpeed:0.20, r:1.6, alpha:0.45, color:'#24ddd1' },
      { bx:0.840, by:0.82, driftAmp:0.007, driftPhase:2.5, driftSpeed:0.27, r:2.2, alpha:0.55, color:'#47f1e4' },
      { bx:0.900, by:0.74, driftAmp:0.005, driftPhase:0.4, driftSpeed:0.23, r:1.8, alpha:0.50, color:'#47f1e4' },
      { bx:0.870, by:0.88, driftAmp:0.006, driftPhase:3.2, driftSpeed:0.19, r:1.4, alpha:0.38, color:'#24ddd1' },
      { bx:0.950, by:0.80, driftAmp:0.008, driftPhase:1.8, driftSpeed:0.30, r:2.0, alpha:0.52, color:'#47f1e4' },
    ],
    edges: [[0,1],[1,2],[1,3],[2,4],[3,4],[0,3]],
  },
]

const PARTICLE_COUNT = 110
const COLORS = ['#47f1e4', '#24ddd1', '#00d4c8']

function makeParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => {
    const angle = Math.random() * Math.PI * 2
    const spd   = 0.008 + Math.random() * 0.018
    return {
      x: Math.random(), y: Math.random(),
      vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd,
      r:  0.5 + Math.random() * 1.2,
      alpha: (0.15 + Math.random() * 0.45) * 0.75,   // –25%
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.4 + Math.random() * 1.0,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }
  })
}

export function BackgroundIllustration() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)
  const particles = useRef<Particle[]>(makeParticles())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let startTime: number | null = null
    let lastTime = 0

    function resize() {
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      canvas.width  = window.innerWidth  * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width  = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx!.scale(dpr, dpr)
    }

    function draw(ts: number) {
      if (!ctx || !canvas) return
      if (startTime === null) startTime = ts
      const t  = (ts - startTime) / 1000
      const dt = Math.min((ts - lastTime) / 1000, 0.05)
      lastTime = ts

      const W = window.innerWidth
      const H = window.innerHeight

      ctx.clearRect(0, 0, W, H)

      // ── streams ──────────────────────────────────────────────────
      const sx = W / 1440
      const sy = H / 900

      for (const s of STREAMS) {
        const wave1 =  Math.sin(t * s.speed + s.phase)           * s.amplitude
        const wave2 = -Math.sin(t * s.speed + s.phase + Math.PI) * s.amplitude

        const x0  = s.x0  * sx;  const y0  = s.y0  * sy
        const cx1 = s.cx1 * sx;  const cy1 = (s.cy1 + wave1) * sy
        const cx2 = s.cx2 * sx;  const cy2 = (s.cy2 + wave2) * sy
        const x3  = s.x3  * sx;  const y3  = s.y3  * sy

        for (const [wMul, aMul] of GLOW_LAYERS) {
          ctx.beginPath()
          ctx.moveTo(x0, y0)
          ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x3, y3)
          ctx.strokeStyle = s.color
          ctx.lineWidth   = s.width * wMul
          ctx.globalAlpha = s.alpha * aMul
          ctx.lineCap     = 'round'
          ctx.stroke()
        }
      }

      // ── node clusters ─────────────────────────────────────────────
      for (const cluster of NODE_CLUSTERS) {
        // compute current world positions for all nodes
        const pos = cluster.nodes.map(n => ({
          x: (n.bx + Math.sin(t * n.driftSpeed + n.driftPhase)           * n.driftAmp) * W,
          y: (n.by + Math.sin(t * n.driftSpeed + n.driftPhase + 1.57)    * n.driftAmp) * H,
        }))

        // edges (thin connector lines)
        for (const [i, j] of cluster.edges) {
          const ni = cluster.nodes[i]
          const twinkle = 0.5 + 0.5 * Math.sin(t * 0.4 + ni.driftPhase)
          ctx.beginPath()
          ctx.moveTo(pos[i].x, pos[i].y)
          ctx.lineTo(pos[j].x, pos[j].y)
          ctx.strokeStyle = '#47f1e4'
          ctx.lineWidth   = 0.4
          ctx.globalAlpha = 0.18 * twinkle
          ctx.stroke()
        }

        // nodes
        for (let k = 0; k < cluster.nodes.length; k++) {
          const n = cluster.nodes[k]
          const { x, y } = pos[k]
          const twinkle = 0.5 + 0.5 * Math.sin(t * n.driftSpeed * 1.3 + n.driftPhase)
          const a = n.alpha * twinkle

          // soft halo
          ctx.beginPath()
          ctx.arc(x, y, n.r * 4, 0, Math.PI * 2)
          ctx.fillStyle = n.color
          ctx.globalAlpha = a * 0.10
          ctx.fill()

          // mid glow
          ctx.beginPath()
          ctx.arc(x, y, n.r * 2, 0, Math.PI * 2)
          ctx.globalAlpha = a * 0.22
          ctx.fill()

          // crisp core
          ctx.beginPath()
          ctx.arc(x, y, n.r, 0, Math.PI * 2)
          ctx.globalAlpha = a
          ctx.fill()
        }
      }

      // ── particles ─────────────────────────────────────────────────
      for (const p of particles.current) {
        p.x += p.vx * dt
        p.y += p.vy * dt
        if (p.x < -0.02) p.x = 1.02
        if (p.x >  1.02) p.x = -0.02
        if (p.y < -0.02) p.y = 1.02
        if (p.y >  1.02) p.y = -0.02

        const px = p.x * W
        const py = p.y * H
        const twinkle = 0.5 + 0.5 * Math.sin(t * p.twinkleSpeed + p.phase)
        const a = p.alpha * twinkle

        ctx.beginPath()
        ctx.arc(px, py, p.r * 4, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = a * 0.08
        ctx.fill()

        ctx.beginPath()
        ctx.arc(px, py, p.r * 2, 0, Math.PI * 2)
        ctx.globalAlpha = a * 0.18
        ctx.fill()

        ctx.beginPath()
        ctx.arc(px, py, p.r, 0, Math.PI * 2)
        ctx.globalAlpha = a
        ctx.fill()
      }

      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      <div
        aria-hidden="true"
        className="bg-fade-in"
        style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 55% 50% at 62% 48%, rgba(0,212,200,0.08) 0%, transparent 65%),
            radial-gradient(ellipse 45% 50% at  6% 52%, rgba(36,221,209,0.05) 0%, transparent 60%)
          `,
        }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="bg-fade-in"
        style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}
      />
    </>
  )
}
