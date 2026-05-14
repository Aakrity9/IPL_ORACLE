"use client";

import React from "react";

interface OracleAvatarProps {
  /** "thinking" | "confident" | "idle" — controls expression/animation */
  mood?: "idle" | "thinking" | "confident";
}

/**
 * The Oracle — a futuristic cricket umpire / strategy coach avatar.
 * Rendered as a stylized SVG with LED sunglasses and dynamic glow.
 */
export default function OracleAvatar({ mood = "idle" }: OracleAvatarProps) {
  const glowColor =
    mood === "confident"
      ? "var(--electric-gold)"
      : mood === "thinking"
      ? "var(--boundary-purple-light)"
      : "var(--stadium-blue-light)";

  const floatClass =
    mood === "thinking" ? "" : "animate-oracle-float";

  return (
    <div
      id="oracle-avatar"
      className={floatClass}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        transition: "all 0.4s ease",
      }}
    >
      {/* Avatar circle with glow ring */}
      <div
        style={{
          position: "relative",
          width: "110px",
          height: "110px",
        }}
      >
        {/* Outer glow ring */}
        <div
          style={{
            position: "absolute",
            inset: "-6px",
            borderRadius: "50%",
            background: `conic-gradient(from 0deg, ${glowColor}, transparent, ${glowColor})`,
            opacity: mood === "confident" ? 0.9 : 0.5,
            animation:
              mood === "thinking"
                ? "spin 2s linear infinite"
                : mood === "confident"
                ? "pulse-glow 1.5s ease-in-out infinite"
                : "none",
            transition: "opacity 0.4s ease",
          }}
        />

        {/* Avatar body */}
        <div
          style={{
            position: "relative",
            width: "110px",
            height: "110px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1a2a5c 0%, #3b1f6e 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            border: `2px solid ${glowColor}`,
            boxShadow: `0 0 30px ${glowColor}44`,
            transition: "border-color 0.4s, box-shadow 0.4s",
          }}
        >
          {/* Face — stylized tech-umpire with LED sunglasses */}
          <svg
            viewBox="0 0 100 100"
            width="80"
            height="80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Head silhouette */}
            <ellipse cx="50" cy="42" rx="28" ry="30" fill="#1e293b" />
            {/* Umpire hat */}
            <ellipse cx="50" cy="20" rx="32" ry="10" fill="#0f172a" />
            <rect x="20" y="14" width="60" height="8" rx="4" fill="#0f172a" />
            {/* LED Sunglasses */}
            <rect
              x="28"
              y="34"
              width="18"
              height="8"
              rx="3"
              fill={glowColor}
              style={{
                filter: `drop-shadow(0 0 6px ${glowColor})`,
                transition: "fill 0.4s",
              }}
            />
            <rect
              x="54"
              y="34"
              width="18"
              height="8"
              rx="3"
              fill={glowColor}
              style={{
                filter: `drop-shadow(0 0 6px ${glowColor})`,
                transition: "fill 0.4s",
              }}
            />
            {/* Bridge */}
            <rect x="46" y="36" width="8" height="3" rx="1.5" fill="#334155" />
            {/* Mouth — subtle smile or thinking line */}
            {mood === "confident" ? (
              <path
                d="M40 52 Q50 58 60 52"
                stroke={glowColor}
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <rect x="42" y="52" width="16" height="2" rx="1" fill="#475569" />
            )}
            {/* Body / collar */}
            <path
              d="M30 70 Q50 60 70 70 L75 95 H25 L30 70Z"
              fill="#0f172a"
            />
            {/* Collar detail */}
            <path
              d="M38 68 L50 62 L62 68"
              stroke="#334155"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Oracle title */}
      <span
        className="heading-display"
        style={{
          fontSize: "1.1rem",
          letterSpacing: "0.12em",
          opacity: 0.85,
        }}
      >
        The Oracle
      </span>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
