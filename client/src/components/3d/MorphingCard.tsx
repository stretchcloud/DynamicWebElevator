import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Card } from '../ui/card';

interface MorphingCardProps {
  children: React.ReactNode;
  className?: string;
}

export const MorphingCard = ({ children, className }: MorphingCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]));
  const scale = useSpring(hovering ? 1.05 : 1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        scale,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      className={className}
    >
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <div className="relative z-10">{children}</div>
      </Card>
    </motion.div>
  );
};
