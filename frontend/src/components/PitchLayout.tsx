"use client";

import React from "react";

interface PitchLayoutProps {
  children: React.ReactNode;
}

/**
 * The "Pitch" — the main game layout.
 * A full-viewport centered vertical stack with the stadium background.
 * Top third: Oracle avatar area
 * Middle: Dialogue / question area
 * Bottom: Controls area
 */
export default function PitchLayout({ children }: PitchLayoutProps) {
  return (
    <>
      {/* Dynamic stadium background with bokeh particles */}
      <div className="stadium-bg" aria-hidden="true" />

      {/* Main content container */}
      <main
        id="pitch-layout"
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100dvh",
          padding: "24px 16px",
          gap: "20px",
          maxWidth: "520px",
          margin: "0 auto",
        }}
      >
        {children}
      </main>
    </>
  );
}
