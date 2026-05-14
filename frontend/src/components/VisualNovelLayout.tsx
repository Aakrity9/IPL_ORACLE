"use client";

import React, { ReactNode } from "react";
import Image from "next/image";

interface VisualNovelLayoutProps {
  children: ReactNode;
  batsmanAction: "idle" | "swing";
  showBall: boolean;
}

export default function VisualNovelLayout({
  children,
  batsmanAction,
  showBall,
}: VisualNovelLayoutProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#060c1f",
      }}
    >
      {/* 1. Cinematic Stadium Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/images/stadium_bg.png"
          alt="Stadium Background"
          fill
          style={{ objectFit: "cover", filter: "blur(2px) brightness(0.7)" }}
          priority
        />
        {/* Soft atmospheric overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 20%, rgba(6, 12, 31, 0.8) 100%)",
          }}
        />
        {/* Particle layer from globals.css */}
        <div className="stadium-bg" style={{ position: "absolute", inset: 0, background: "none" }} />
      </div>

      {/* 2. Batsman Character on the Left */}
      <div
        className={batsmanAction === "idle" ? "vn-idle" : "vn-swing-active"}
        style={{
          position: "absolute",
          bottom: "-5%",
          left: "5%",
          width: "40vw",
          height: "85vh",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <Image
          src={batsmanAction === "idle" ? "/images/batsman_idle_nobg.png" : "/images/batsman_swing_nobg.png"}
          alt="Batsman"
          fill
          style={{
            objectFit: "contain",
            objectPosition: "bottom left",
            filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.8)) drop-shadow(0 0 10px rgba(25, 56, 138, 0.4))",
          }}
          priority
        />
      </div>

      {/* 3. The Ball Arc Animation */}
      {showBall && (
        <div
          className="ball-element ball-animating"
          style={{ top: "30%", left: "50%" }}
        />
      )}

      {/* 4. Interactive Dialogue Area (Center-Right) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "55%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "40px 80px 40px 0",
          zIndex: 20,
        }}
      >
        <div style={{ width: "100%", maxWidth: "600px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
