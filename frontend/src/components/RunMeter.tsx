"use client";

import React from "react";

interface RunMeterProps {
  /** Current question number (1-based) */
  questionNumber: number;
  /** Maximum questions allowed */
  maxQuestions: number;
  /** Current confidence as a float 0..1 */
  confidence: number;
}

/**
 * The "Run Meter" — a visual progress tracker at the top of the screen.
 * Shows question counter and a confidence bar that fills with golden glow
 * as the Oracle gets closer to the answer.
 */
export default function RunMeter({
  questionNumber,
  maxQuestions,
  confidence,
}: RunMeterProps) {
  const confidencePercent = Math.min(Math.round(confidence * 100), 100);
  const isHot = confidencePercent >= 60;
  const isOnFire = confidencePercent >= 80;

  return (
    <div
      id="run-meter"
      className="glass"
      style={{
        width: "100%",
        padding: "14px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {/* Top row: Question counter + Confidence label */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            letterSpacing: "0.04em",
          }}
        >
          QUESTION{" "}
          <span
            style={{
              color: "var(--electric-gold)",
              fontWeight: 700,
              fontSize: "1rem",
            }}
          >
            {questionNumber}
          </span>
          <span style={{ opacity: 0.5 }}> / {maxQuestions}</span>
        </span>

        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "0.95rem",
            letterSpacing: "0.08em",
            color: isOnFire
              ? "var(--electric-gold)"
              : isHot
              ? "var(--boundary-purple-light)"
              : "var(--text-muted)",
            transition: "color 0.4s ease",
          }}
        >
          {confidencePercent}% CONFIDENCE
        </span>
      </div>

      {/* Confidence bar */}
      <div
        style={{
          width: "100%",
          height: "6px",
          borderRadius: "var(--radius-full)",
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${confidencePercent}%`,
            borderRadius: "var(--radius-full)",
            background: isOnFire
              ? "linear-gradient(90deg, var(--electric-gold), #ffe066)"
              : isHot
              ? "linear-gradient(90deg, var(--boundary-purple), var(--boundary-purple-light))"
              : "linear-gradient(90deg, var(--stadium-blue), var(--stadium-blue-light))",
            boxShadow: isOnFire
              ? "0 0 14px rgba(249,194,5,0.5)"
              : "none",
            transition: "width 0.6s ease, background 0.4s ease, box-shadow 0.4s ease",
          }}
        />
      </div>

      {/* Cricket ball dots — one per question */}
      <div
        style={{
          display: "flex",
          gap: "5px",
          justifyContent: "center",
        }}
      >
        {Array.from({ length: maxQuestions }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background:
                i < questionNumber
                  ? "var(--electric-gold)"
                  : "rgba(255,255,255,0.12)",
              boxShadow:
                i < questionNumber
                  ? "0 0 6px rgba(249,194,5,0.3)"
                  : "none",
              transition: "background 0.3s ease, box-shadow 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
