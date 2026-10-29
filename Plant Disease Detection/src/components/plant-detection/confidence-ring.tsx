"use client";

import { useEffect, useState } from "react";

interface ConfidenceRingProps {
  value: number; // 0-100
  size?: number;
  stroke?: number;
  label?: string;
}

const colorForValue = (v: number) => {
  if (v >= 80) return "oklch(0.55 0.14 150)"; // green - high confidence
  if (v >= 55) return "oklch(0.70 0.15 85)"; // amber - medium
  return "oklch(0.65 0.2 35)"; // orange/red - low
};

export function ConfidenceRing({ value, size = 96, stroke = 9, label }: ConfidenceRingProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setProgress((clamped / 100) * circumference), 80);
    return () => clearTimeout(t);
  }, [clamped, circumference]);

  const color = colorForValue(clamped);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="oklch(0.55 0.14 150 / 0.12)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold tabular-nums" style={{ color }}>
          {clamped}%
        </span>
        {label && <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>}
      </div>
    </div>
  );
}
