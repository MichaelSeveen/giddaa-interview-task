"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

export function Marquee({
  children,
  speed = 40,
  direction = "left",
  className = "",
}: MarqueeProps) {
  const [paused, setPaused] = useState(false);

  const animDirection = direction === "left" ? "normal" : "reverse";

  return (
    <div
      className={cn("marquee-container", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      role="marquee"
      aria-live="off"
    >
      <div
        className="marquee-track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: animDirection,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        <div className="marquee-content">{children}</div>
        <div className="marquee-content" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
