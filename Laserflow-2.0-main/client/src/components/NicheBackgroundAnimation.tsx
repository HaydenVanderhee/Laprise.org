import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speedX: number;
  speedY: number;
  wobbleFreq: number;
  wobbleAmp: number;
  wobbleOffset: number;
}

function makeParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2.2 + 0.8,
    opacity: Math.random() * 0.55 + 0.25,
    speedX: (Math.random() - 0.5) * 0.35,
    speedY: -(Math.random() * 0.5 + 0.2),
    wobbleFreq: Math.random() * 0.015 + 0.005,
    wobbleAmp: Math.random() * 1.4 + 0.5,
    wobbleOffset: Math.random() * Math.PI * 2,
  };
}

export function NicheBackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let paused = false;
    let tick = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles: Particle[] = Array.from({ length: 150 }, () =>
      makeParticle(canvas.width, canvas.height)
    );

    const draw = () => {
      if (paused) { rafId = requestAnimationFrame(draw); return; }
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        const wobble = Math.sin(tick * p.wobbleFreq + p.wobbleOffset) * p.wobbleAmp;
        p.x += p.speedX + wobble * 0.04;
        p.y += p.speedY;

        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
        if (p.x < -4) p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;

        ctx.beginPath();
        ctx.arc(p.x + wobble, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(71, 241, 228, ${p.opacity})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    const onVisibility = () => { paused = document.hidden; };
    const onResize = () => { resize(); };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
