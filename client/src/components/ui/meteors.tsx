import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<{ top: string; left: string; animationDelay: string; opacity: string }>>([]);

  useEffect(() => {
    const styles = [...Array(number)].map(() => ({
      top: `-${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      opacity: `${0.3 + Math.random() * 0.7}`,
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          className="absolute h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-primary/50 shadow-[0_0_0_1px_#ffffff10]"
          style={{
            top: style.top,
            left: style.left,
            animationDelay: style.animationDelay,
            opacity: style.opacity,
          }}
        >
          <div className="absolute -inset-[2px] -top-[200px] animate-meteor-trail bg-gradient-to-b from-primary/0 to-primary/40" />
        </span>
      ))}
    </div>
  );
};
