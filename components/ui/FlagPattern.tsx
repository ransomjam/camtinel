"use client";

import { motion, useReducedMotion } from "framer-motion";

type Sq = {
  x: number;
  y: number;
  size: number;
  color: "green" | "yellow" | "red";
  rot: number;
  delay: number;
  dur: number;
};

const palette: Record<Sq["color"], string> = {
  green: "#00A550",
  yellow: "#FCD116",
  red: "#CE1126",
};

const baseSquares: Sq[] = [
  { x: 5, y: 12, size: 60, color: "green", rot: -8, delay: 0.0, dur: 7 },
  { x: 12, y: 55, size: 42, color: "yellow", rot: 6, delay: 0.4, dur: 8 },
  { x: 22, y: 30, size: 78, color: "red", rot: -3, delay: 1.2, dur: 9 },
  { x: 18, y: 78, size: 34, color: "green", rot: 12, delay: 0.7, dur: 6.5 },
  { x: 34, y: 22, size: 26, color: "yellow", rot: -5, delay: 1.5, dur: 7 },
  { x: 8, y: 88, size: 50, color: "red", rot: 4, delay: 2.0, dur: 8.5 },
  { x: 72, y: 15, size: 66, color: "yellow", rot: -6, delay: 0.2, dur: 9 },
  { x: 82, y: 42, size: 48, color: "green", rot: 8, delay: 1.0, dur: 7.5 },
  { x: 65, y: 68, size: 40, color: "red", rot: -10, delay: 0.6, dur: 8 },
  { x: 88, y: 78, size: 58, color: "green", rot: 3, delay: 1.7, dur: 8.5 },
  { x: 92, y: 25, size: 30, color: "red", rot: -2, delay: 2.2, dur: 7 },
  { x: 78, y: 88, size: 22, color: "yellow", rot: 14, delay: 1.3, dur: 6 },
];

const squares: Sq[] = Array.from({ length: 48 }, (_, index) => {
  const base = baseSquares[index % baseSquares.length];
  const row = Math.floor(index / 8);
  const column = index % 8;
  const spreadX = (column - 3.5) * 2.2;
  const spreadY = (row - 2.5) * 2.8;

  return {
    x: Math.max(3, Math.min(97, base.x + spreadX + (index % 2) * 0.6)),
    y: Math.max(3, Math.min(97, base.y + spreadY)),
    size: base.size * (0.7 + (index % 3) * 0.05),
    color: base.color,
    rot: base.rot + (index % 5 - 2) * 1.2,
    delay: (index * 0.08) % 2.4,
    dur: base.dur + (index % 3) * 0.4,
  };
});

export function FlagPattern({
  className = "",
  intensity = 0.28,
}: {
  className?: string;
  intensity?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {squares.map((s, i) => (
        <motion.div
          key={i}
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: intensity, scale: 1 }}
          transition={{
            duration: 1.4,
            delay: reduce ? 0 : s.delay,
            ease: "easeOut",
          }}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
          }}
        >
          <motion.div
            animate={
              reduce
                ? undefined
                : {
                    y: [0, -4, 0],
                    rotate: [s.rot, s.rot + 3, s.rot],
                  }
            }
            transition={{
              duration: s.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: s.delay,
            }}
            style={{
              width: "100%",
              height: "100%",
              border: `1px solid ${palette[s.color]}`,
              borderRadius: "8px",
              boxShadow: `0 0 16px -8px ${palette[s.color]}`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
