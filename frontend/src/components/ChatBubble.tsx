"use client";

import React from "react";

interface ChatBubbleProps {
  /** The question text to display */
  text: string;
  /** Whether this bubble is currently animating in */
  isNew?: boolean;
}

/**
 * The Oracle's dialogue box — a glassmorphism chat bubble
 * that displays the current question in the center of the Pitch.
 */
export default function ChatBubble({ text, isNew = false }: ChatBubbleProps) {
  return (
    <div
      id="chat-bubble"
      className={`glass-strong ${isNew ? "animate-fade-in-up" : ""}`}
      style={{
        width: "100%",
        padding: "28px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle shimmer overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(249,194,5,0.04) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 4s linear infinite",
          pointerEvents: "none",
        }}
      />

      {/* Question text */}
      <p
        style={{
          position: "relative",
          fontFamily: "var(--font-body)",
          fontSize: "1.15rem",
          lineHeight: 1.6,
          color: "var(--foreground)",
          margin: 0,
          fontWeight: 400,
        }}
      >
        {text}
      </p>
    </div>
  );
}
