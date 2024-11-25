import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface RippleProps {
  className?: string;
  color?: string;
}

export default function Ripple({ className, color = "hsl(217, 91%, 60%)" }: RippleProps) {
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rippleEl = rippleRef.current;
    if (!rippleEl) return;

    let animationFrameId: number;
    const ripples = new Set<{
      el: HTMLDivElement;
      age: number;
      growing: boolean;
    }>();

    function createRipple(x: number, y: number) {
      const ripple = document.createElement("div");
      ripple.className = "absolute rounded-full pointer-events-none";
      ripple.style.backgroundColor = color;
      ripple.style.opacity = "0.4";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      rippleEl.appendChild(ripple);
      ripples.add({ el: ripple, age: 0, growing: true });
    }

    function updateRipples() {
      ripples.forEach((ripple) => {
        if (ripple.growing) {
          ripple.age += 1;
          ripple.el.style.width = `${ripple.age * 10}px`;
          ripple.el.style.height = `${ripple.age * 10}px`;
          if (ripple.age > 20) {
            ripple.growing = false;
          }
        } else {
          ripple.el.style.opacity = `${0.4 - ripple.age * 0.01}`;
          ripple.age += 1;
          if (ripple.age > 60) {
            ripple.el.remove();
            ripples.delete(ripple);
          }
        }
      });

      if (Math.random() < 0.03) {
        const rect = rippleEl.getBoundingClientRect();
        createRipple(
          Math.random() * rect.width,
          Math.random() * rect.height
        );
      }

      animationFrameId = requestAnimationFrame(updateRipples);
    }

    function handlePointer(event: PointerEvent) {
      const rect = rippleEl.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      createRipple(x, y);
    }

    rippleEl.addEventListener("pointerdown", handlePointer);
    rippleEl.addEventListener("pointermove", (e) => {
      if (e.pressure > 0) handlePointer(e);
    });

    updateRipples();

    return () => {
      cancelAnimationFrame(animationFrameId);
      rippleEl.removeEventListener("pointerdown", handlePointer);
      ripples.forEach((ripple) => ripple.el.remove());
      ripples.clear();
    };
  }, [color]);

  return (
    <div
      ref={rippleRef}
      className={cn(
        "absolute inset-0 overflow-hidden",
        className
      )}
    />
  );
}
