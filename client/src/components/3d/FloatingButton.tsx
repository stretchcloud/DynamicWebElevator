import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Button } from '../ui/button';

interface FloatingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const FloatingButton = ({ children, onClick, className }: FloatingButtonProps) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setRotation({
      x: y * 20, // Rotation around X-axis
      y: x * 20, // Rotation around Y-axis
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      style={{
        perspective: '1000px',
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        ref={buttonRef}
        onClick={onClick}
        className={`relative overflow-hidden bg-primary/20 backdrop-blur-sm 
          hover:bg-primary/30 border border-primary/30 
          transition-all duration-300 ${className}`}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <span className="relative z-10">{children}</span>
      </Button>
    </motion.div>
  );
};
