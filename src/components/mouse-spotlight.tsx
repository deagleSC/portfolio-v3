"use client";

import { useMotionValue, motion, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function MouseSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleMouseMove({ clientX, clientY }: MouseEvent) {
      mouseX.set(clientX);
      mouseY.set(clientY);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Create transformed background values - very subtle effect
  const backgroundDark = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(400px circle at ${x}px ${y}px, rgba(100, 255, 218, 0.04), transparent 70%)`,
  );

  const backgroundLight = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(400px circle at ${x}px ${y}px, rgba(15, 23, 42, 0.015), transparent 70%)`,
  );

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute">
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 lg:opacity-100"
        style={{
          background: isDark ? backgroundDark : backgroundLight,
        }}
      />
    </div>
  );
}
