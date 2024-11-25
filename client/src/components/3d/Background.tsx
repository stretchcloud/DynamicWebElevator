import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Ripple {
  x: number;
  y: number;
  size: number;
  alpha: number;
  id: number;
}

export const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripples = useRef<Ripple[]>([]);
  let animationFrameId: number;
  let nextRippleId = 0;

  const createRipple = (x: number, y: number) => {
    ripples.current.push({
      x,
      y,
      size: 0,
      alpha: 0.5,
      id: nextRippleId++
    });
  };

  const updateRipples = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Update and draw ripples
    ripples.current = ripples.current.filter(ripple => {
      ripple.size += 2;
      ripple.alpha *= 0.98;

      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.size, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(217, 91%, 60%, ${ripple.alpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      return ripple.alpha > 0.01;
    });

    // Randomly create new ripples
    if (Math.random() < 0.03) {
      createRipple(
        Math.random() * ctx.canvas.width,
        Math.random() * ctx.canvas.height
      );
    }

    animationFrameId = requestAnimationFrame(() => updateRipples(ctx));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handlePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      createRipple(x, y);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('pointerdown', handlePointer);
    canvas.addEventListener('pointermove', (e) => {
      if (e.pressure > 0) handlePointer(e);
    });

    // Start animation
    updateRipples(ctx);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('pointerdown', handlePointer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 -z-10"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full bg-background"
        style={{ 
          background: 'linear-gradient(to bottom right, rgba(0,0,0,0.9), rgba(0,0,0,1))'
        }}
      />
    </motion.div>
  );
};
