"use client";

import React from "react";

interface RevealScreenProps {
  playerName: string;
  country: string;
  role: string;
  teams: string;
  matches: number;
  confidence: number;
  explanation: string;
  onPlayAgain: () => void;
}

/**
 * The Reveal Screen — shown after the Oracle successfully identifies the player.
 * Displays the player's name, details, and a "Why I guessed this" explanation.
 */
export default function RevealScreen({
  playerName,
  country,
  role,
  teams,
  matches,
  confidence,
  explanation,
  onPlayAgain,
}: RevealScreenProps) {
  const confidencePercent = Math.round(confidence * 100);

  return (
    <div
      id="reveal-screen"
      className="animate-fade-in-up"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
      }}
    >
      {/* Confidence badge */}
      <div
        className="animate-pulse-glow"
        style={{
          padding: "6px 20px",
          borderRadius: "var(--radius-full)",
          background: "rgba(249,194,5,0.15)",
          border: "1px solid rgba(249,194,5,0.4)",
          fontFamily: "var(--font-heading)",
          fontSize: "0.85rem",
          letterSpacing: "0.1em",
          color: "var(--electric-gold)",
        }}
      >
        {confidencePercent}% MATCH
      </div>

      {/* Player name — big heading */}
      <h1
        className="heading-display"
        style={{
          fontSize: "clamp(2.2rem, 6vw, 3.5rem)",
          margin: 0,
          textAlign: "center",
          lineHeight: 1.1,
        }}
      >
        {playerName}
      </h1>

      {/* Player stats cards */}
      <div
        className="glass"
        style={{
          width: "100%",
          padding: "20px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}
      >
        <StatItem label="Country" value={country} />
        <StatItem label="Role" value={role} />
        <StatItem label="Team(s)" value={teams} />
        <StatItem label="Matches" value={String(matches)} />
      </div>

      {/* Why I guessed this — explanation */}
      <div
        className="glass-strong"
        style={{
          width: "100%",
          padding: "24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1rem",
            letterSpacing: "0.08em",
            color: "var(--electric-gold)",
            margin: "0 0 12px 0",
            textTransform: "uppercase",
          }}
        >
          🧠 Why I Guessed This
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            color: "var(--foreground)",
            margin: 0,
            opacity: 0.9,
          }}
        >
          {explanation}
        </p>
      </div>

      {/* Play again button */}
      <button
        id="btn-play-again"
        onClick={onPlayAgain}
        style={{
          padding: "16px 48px",
          borderRadius: "var(--radius-full)",
          border: "1px solid rgba(249,194,5,0.4)",
          background: "linear-gradient(135deg, rgba(249,194,5,0.15), rgba(249,194,5,0.05))",
          color: "var(--electric-gold)",
          fontFamily: "var(--font-heading)",
          fontSize: "1.15rem",
          letterSpacing: "0.1em",
          cursor: "pointer",
          transition: "all 0.3s ease",
          textTransform: "uppercase",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(135deg, rgba(249,194,5,0.25), rgba(249,194,5,0.10))";
          e.currentTarget.style.boxShadow = "0 0 24px rgba(249,194,5,0.2)";
          e.currentTarget.style.transform = "scale(1.04)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(135deg, rgba(249,194,5,0.15), rgba(249,194,5,0.05))";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Play Again
      </button>
    </div>
  );
}

// ── Sub-component ────────────────────────────────────────────────────

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.7rem",
          color: "var(--text-muted)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
          fontWeight: 600,
          color: "var(--foreground)",
        }}
      >
        {value}
      </span>
    </div>
  );
}
