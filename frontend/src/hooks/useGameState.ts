"use client";

import { useState, useCallback } from "react";

// ── Types ────────────────────────────────────────────────────────────

type Answer = "yes" | "no" | "maybe" | "dont_know";
type GameStatus = "idle" | "loading" | "playing" | "revealing" | "revealed" | "error";
type OracleMood = "idle" | "thinking" | "confident";

interface GameState {
  sessionId: string | null;
  status: GameStatus;
  questionNumber: number;
  maxQuestions: number;
  questionText: string;
  attribute: string | null;
  confidence: number;
  oracleMood: OracleMood;
  // Reveal data
  guessedPlayer: string | null;
  revealData: RevealData | null;
  error: string | null;
}

interface RevealData {
  player_name: string;
  country: string;
  role: string;
  teams: string;
  matches: number;
  confidence: number;
  explanation: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const INITIAL_STATE: GameState = {
  sessionId: null,
  status: "idle",
  questionNumber: 0,
  maxQuestions: 12,
  questionText: "",
  attribute: null,
  confidence: 0,
  oracleMood: "idle",
  guessedPlayer: null,
  revealData: null,
  error: null,
};

// ── Hook ─────────────────────────────────────────────────────────────

export function useGameState() {
  const [state, setState] = useState<GameState>(INITIAL_STATE);

  // ── Task 29: Start a new session ──────────────────────────────────
  const startSession = useCallback(async () => {
    setState((s) => ({ ...s, status: "loading", oracleMood: "thinking", error: null }));
    try {
      const res = await fetch(`${API_URL}/start-session`, { method: "POST" });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();

      setState({
        ...INITIAL_STATE,
        sessionId: data.session_id,
        status: "playing",
        questionNumber: data.question_number,
        maxQuestions: data.max_questions,
        questionText: data.question_text,
        attribute: data.attribute,
        confidence: data.confidence,
        oracleMood: "idle",
      });
    } catch (err: any) {
      setState((s) => ({
        ...s,
        status: "error",
        oracleMood: "idle",
        error: err.message || "Failed to start session.",
      }));
    }
  }, []);

  // ── Task 30: Submit an answer ─────────────────────────────────────
  const submitAnswer = useCallback(
    async (answer: Answer) => {
      if (!state.sessionId || state.status !== "playing") return;

      setState((s) => ({ ...s, oracleMood: "thinking" }));

      try {
        const res = await fetch(`${API_URL}/submit-answer`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: state.sessionId,
            answer,
          }),
        });
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();

        if (data.is_guess) {
          // ── Task 33: Transition to reveal ───────────────────────
          setState((s) => ({
            ...s,
            questionNumber: data.question_number,
            confidence: data.confidence,
            guessedPlayer: data.guessed_player,
            status: "revealing",
            oracleMood: "confident",
            questionText: "",
            attribute: null,
          }));
        } else {
          // ── Task 31: Update progress ────────────────────────────
          setState((s) => ({
            ...s,
            questionNumber: data.question_number,
            questionText: data.question_text,
            attribute: data.attribute,
            confidence: data.confidence,
            oracleMood: data.confidence > 0.5 ? "confident" : "idle",
          }));
        }
      } catch (err: any) {
        setState((s) => ({
          ...s,
          status: "error",
          oracleMood: "idle",
          error: err.message || "Failed to submit answer.",
        }));
      }
    },
    [state.sessionId, state.status]
  );

  // ── Task 33 (continued): Fetch reveal data ───────────────────────
  const fetchReveal = useCallback(async () => {
    if (!state.sessionId) return;

    try {
      const res = await fetch(`${API_URL}/reveal/${state.sessionId}`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data: RevealData = await res.json();

      setState((s) => ({
        ...s,
        status: "revealed",
        revealData: data,
        oracleMood: "confident",
      }));
    } catch (err: any) {
      setState((s) => ({
        ...s,
        status: "error",
        error: err.message || "Failed to fetch reveal.",
      }));
    }
  }, [state.sessionId]);

  // ── Reset to play again ───────────────────────────────────────────
  const resetGame = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    ...state,
    startSession,
    submitAnswer,
    fetchReveal,
    resetGame,
  };
}
