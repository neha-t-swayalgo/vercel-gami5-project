import { useEffect, useRef } from 'react';

const COLORS = [
  '99, 102, 241',  // violet
  '56, 189, 248',  // cyan
  '236, 72, 153',  // pink
  '79, 70, 229',   // indigo
];

const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const isMobile = window.innerWidth < 768;

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // ✅ Only enable mouse on desktop
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({
     length: isMobile ? 40 : 80,
    }).map(() => {
      const depth = Math.random();
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseX: 0,
        baseY: 0,
        radius: depth > 0.7
          ? Math.random() * 3 + 2
          : Math.random() * 1.4 + 0.7,
        vx: (Math.random() - 0.5) * (depth > 0.7 ? 0.35 : 0.15),
        vy: (Math.random() - 0.5) * (depth > 0.7 ? 0.35 : 0.15),
        alpha: depth > 0.7
          ? Math.random() * 0.35 + 0.25
          : Math.random() * 0.25 + 0.12,
        depth,
        color,
      };
    });

    particles.forEach(p => {
      p.baseX = p.x;
      p.baseY = p.y;
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ✅ Disable parallax on mobile
      const offsetX = isMobile ? 0 : (mouse.x / canvas.width - 0.5) * 30;
      const offsetY = isMobile ? 0 : (mouse.y / canvas.height - 0.5) * 30;

      for (const p of particles) {
        p.baseX += p.vx;
        p.baseY += p.vy;

        if (p.baseX < 0 || p.baseX > canvas.width) p.vx *= -1;
        if (p.baseY < 0 || p.baseY > canvas.height) p.vy *= -1;

        p.x = p.baseX + offsetX * p.depth;
        p.y = p.baseY + offsetY * p.depth;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.shadowColor = `rgba(${p.color}, 0.25)`;
     ctx.shadowBlur = p.depth > 0.7 ? 10 : 3;

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};

export default FloatingParticles;
