"use client";

import { useEffect, useState } from "react";
import VisualNovelLayout from "@/components/VisualNovelLayout";
import QuestionCard from "@/components/QuestionCard";
import RevealScreen from "@/components/RevealScreen";
import { useGameState } from "@/hooks/useGameState";

export default function Home() {
  const {
    status,
    sessionId,
    questionNumber,
    maxQuestions,
    questionText,
    confidence,
    revealData,
    error,
    startSession,
    submitAnswer,
    fetchReveal,
    resetGame,
  } = useGameState();

  const [batsmanAction, setBatsmanAction] = useState<"idle" | "swing">("idle");
  const [showBall, setShowBall] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-fetch reveal data once the Oracle makes its guess
  useEffect(() => {
    if (status === "revealing" && sessionId) {
      fetchReveal();
    }
  }, [status, sessionId, fetchReveal]);

  // Orchestrate the cinematic transition
  const handleAnswer = async (answer: "yes" | "no" | "maybe" | "dont_know") => {
    if (isAnimating) return;
    setIsAnimating(true);

    // 1. Trigger the swing and ball animation
    setBatsmanAction("swing");
    setShowBall(true);

    // 2. Wait for the ball to visually cross the screen
    await new Promise((r) => setTimeout(r, 400));

    // 3. Flip the card out
    setIsFlipping(true);

    // 4. Submit the answer to the backend
    await submitAnswer(answer);

    // 5. Wait a moment while flipped
    await new Promise((r) => setTimeout(r, 300));

    // 6. Flip the card back in with the new question
    setIsFlipping(false);

    // 7. Reset the batsman
    await new Promise((r) => setTimeout(r, 400));
    setBatsmanAction("idle");
    setShowBall(false);
    setIsAnimating(false);
  };

  return (
    <VisualNovelLayout batsmanAction={batsmanAction} showBall={showBall}>
      
      {/* ── IDLE: Welcome Screen ───────────────────────────────────── */}
      {status === "idle" && (
        <div
          className="glass-strong animate-fade-in-up"
          style={{
            padding: "48px 40px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            alignItems: "flex-start",
            boxShadow: "0 24px 48px rgba(0,0,0,0.6)",
          }}
        >
          <h1
            className="heading-display"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", margin: 0, lineHeight: 1 }}
          >
            IPL Oracle
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--foreground)",
              fontSize: "1.15rem",
              lineHeight: 1.6,
              margin: 0,
              opacity: 0.9,
            }}
          >
            Think of any IPL player from 2008 to today.
            <br />
            I&apos;ll read your mind in under 12 questions.
          </p>

          <button
            id="btn-start-game"
            onClick={startSession}
            style={{
              marginTop: "16px",
              padding: "16px 48px",
              borderRadius: "var(--radius-sm)",
              border: "none",
              background: "linear-gradient(135deg, var(--electric-gold), #ffe066)",
              color: "#0e2460",
              fontFamily: "var(--font-heading)",
              fontSize: "1.4rem",
              letterSpacing: "0.1em",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 24px rgba(249,194,5,0.4)",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04) translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(249,194,5,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1) translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(249,194,5,0.4)";
            }}
          >
            Challenge Me
          </button>
        </div>
      )}

      {/* ── LOADING: Waiting for session ────────────────────────────── */}
      {status === "loading" && (
        <div className="glass-strong" style={{ padding: "40px" }}>
          <h2
            className="heading-display"
            style={{
              fontSize: "1.8rem",
              animation: "confidence-pulse 1.5s ease-in-out infinite",
              margin: 0,
            }}
          >
            Preparing the Pitch...
          </h2>
        </div>
      )}

      {/* ── PLAYING: Question loop ──────────────────────────────────── */}
      {status === "playing" && (
        <QuestionCard
          questionText={questionText}
          questionNumber={questionNumber}
          maxQuestions={maxQuestions}
          onAnswer={handleAnswer}
          disabled={isAnimating}
          isFlipping={isFlipping}
        />
      )}

      {/* ── REVEALING: Transition moment ────────────────────────────── */}
      {status === "revealing" && (
        <div className="glass-strong" style={{ padding: "40px" }}>
          <h2
            className="heading-display"
            style={{
              fontSize: "2.2rem",
              animation: "confidence-pulse 1s ease-in-out infinite",
              margin: 0,
            }}
          >
            I know who it is...
          </h2>
        </div>
      )}

      {/* ── REVEALED: Final answer ──────────────────────────────────── */}
      {status === "revealed" && revealData && (
        <div className="animate-fade-in-up">
          <RevealScreen
            playerName={revealData.player_name}
            country={revealData.country}
            role={revealData.role}
            teams={revealData.teams}
            matches={revealData.matches}
            confidence={revealData.confidence}
            explanation={revealData.explanation}
            onPlayAgain={resetGame}
          />
        </div>
      )}

      {/* ── ERROR ─────────────────────────────────────────────────── */}
      {status === "error" && (
        <div className="glass-strong animate-fade-in-up" style={{ padding: "40px" }}>
          <h2 style={{ color: "var(--no-red)", margin: "0 0 16px 0" }}>System Error</h2>
          <p>{error || "Something went wrong."}</p>
          <button
            onClick={resetGame}
            style={{
              marginTop: "20px",
              padding: "12px 32px",
              background: "rgba(239,68,68,0.2)",
              color: "white",
              border: "1px solid var(--no-red)",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </VisualNovelLayout>
  );
}
