import { animate, useInView, useIsomorphicLayoutEffect } from "framer-motion";
import { useRef } from "react";

const roundToNearestFive = (value: number): number => {
  return Math.round(value / 1) * 1;
};

interface AnimatedCounterProps {
  from: number;
  to: number;
  animationOptions?: Partial<{
    duration: number;
    ease: string | ((t: number) => number);
    onUpdate: (value: number) => void;
  }>;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from,
  to,
  animationOptions,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;

    if (!element) return;
    if (!inView) return;

    // Set initial value
    element.textContent = String(from);

    // If reduced motion is enabled in system's preferences
    if (window.matchMedia("(prefers-reduced-motion)").matches) {
      element.textContent = String(to);
      return;
    }

    const controls = animate(from as any, to as any, {
      duration: 1,
      ease: "easeOut" as any,
      ...animationOptions,
      onUpdate(value) {
        const roundedValue = roundToNearestFive(value);
        element.textContent = roundedValue.toFixed(0);
      },
    });

    // Cancel on unmount
    return () => {
      controls.stop();
    };
  }, [ref, inView, from, to, animationOptions]);

  return <span ref={ref} className="! " />;
};

export default AnimatedCounter;
