"use client";

import React from "react";

type Answer = "yes" | "no" | "maybe" | "dont_know";

interface DecisionButtonsProps {
  /** Callback when user picks an answer */
  onAnswer: (answer: Answer) => void;
  /** Disable all buttons (e.g. while loading) */
  disabled?: boolean;
}

const BUTTONS: { answer: Answer; label: string; icon: string; color: string; hoverBg: string }[] = [
  {
    answer: "yes",
    label: "Yes",
    icon: "🏏",      // Sixer icon
    color: "var(--yes-green)",
    hoverBg: "rgba(34, 197, 94, 0.15)",
  },
  {
    answer: "no",
    label: "No",
    icon: "🪵",      // Wicket / stumps
    color: "var(--no-red)",
    hoverBg: "rgba(239, 68, 68, 0.15)",
  },
  {
    answer: "maybe",
    label: "Maybe",
    icon: "🤔",      // Unsure
    color: "var(--maybe-gray)",
    hoverBg: "rgba(107, 114, 128, 0.15)",
  },
  {
    answer: "dont_know",
    label: "Don't Know",
    icon: "⚪",      // Dead ball
    color: "var(--dont-know-slate)",
    hoverBg: "rgba(148, 163, 184, 0.12)",
  },
];

/**
 * The Decision Buttons — large, tactile 3D-effect card-style buttons.
 * Each has a unique color, icon, and hover state.
 */
export default function DecisionButtons({
  onAnswer,
  disabled = false,
}: DecisionButtonsProps) {
  return (
    <div
      id="decision-buttons"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
        width: "100%",
      }}
    >
      {BUTTONS.map((btn) => (
        <button
          key={btn.answer}
          id={`btn-${btn.answer}`}
          onClick={() => onAnswer(btn.answer)}
          disabled={disabled}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "18px 12px",
            borderRadius: "var(--radius-md)",
            border: `1px solid ${btn.color}33`,
            background: "var(--surface-glass)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            color: btn.color,
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.4 : 1,
            transition: "all 0.25s ease",
            // 3D card shadow
            boxShadow: `0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`,
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              const el = e.currentTarget;
              el.style.background = btn.hoverBg;
              el.style.borderColor = `${btn.color}88`;
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = `0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 16px ${btn.color}22`;
            }
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = "var(--surface-glass)";
            el.style.borderColor = `${btn.color}33`;
            el.style.transform = "translateY(0)";
            el.style.boxShadow = `0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`;
          }}
        >
          <span style={{ fontSize: "1.6rem" }}>{btn.icon}</span>
          <span>{btn.label}</span>
        </button>
      ))}
    </div>
  );
}
