"use client";

import React from "react";

type Answer = "yes" | "no" | "maybe" | "dont_know";

interface QuestionCardProps {
  questionText: string;
  questionNumber: number;
  maxQuestions: number;
  onAnswer: (answer: Answer) => void;
  disabled?: boolean;
  isFlipping?: boolean;
}

const BUTTONS: { answer: Answer; label: string; color: string }[] = [
  { answer: "yes", label: "Yes", color: "var(--yes-green)" },
  { answer: "no", label: "No", color: "var(--no-red)" },
  { answer: "maybe", label: "Maybe", color: "var(--maybe-gray)" },
  { answer: "dont_know", label: "Don't Know", color: "var(--dont-know-slate)" },
];

export default function QuestionCard({
  questionText,
  questionNumber,
  maxQuestions,
  onAnswer,
  disabled = false,
  isFlipping = false,
}: QuestionCardProps) {
  return (
    <div
      className={`glass-strong ${isFlipping ? "vn-card-out" : "vn-card-in"}`}
      style={{
        width: "100%",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        position: "relative",
        boxShadow: "0 16px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
        // Cinematic light sweep reflection
        backgroundImage: "linear-gradient(120deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 70%)",
      }}
    >
      {/* Progress Meta */}
      <div
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--electric-gold)",
          letterSpacing: "0.15em",
          fontSize: "0.9rem",
          textTransform: "uppercase",
          opacity: 0.9,
        }}
      >
        Question {questionNumber} of {maxQuestions}
      </div>

      {/* Question Text */}
      <h2
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "1.4rem",
          lineHeight: 1.4,
          color: "var(--foreground)",
          margin: 0,
          fontWeight: 400,
        }}
      >
        {questionText}
      </h2>

      {/* Answers Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginTop: "16px",
        }}
      >
        {BUTTONS.map((btn) => (
          <button
            key={btn.answer}
            onClick={() => onAnswer(btn.answer)}
            disabled={disabled}
            style={{
              padding: "16px",
              borderRadius: "var(--radius-sm)",
              border: `1px solid ${btn.color}40`,
              background: "rgba(0,0,0,0.3)",
              color: btn.color,
              fontFamily: "var(--font-heading)",
              fontSize: "1.1rem",
              letterSpacing: "0.08em",
              cursor: disabled ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => {
              if (!disabled) {
                e.currentTarget.style.background = `${btn.color}15`;
                e.currentTarget.style.boxShadow = `0 0 16px ${btn.color}30`;
                e.currentTarget.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.3)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
