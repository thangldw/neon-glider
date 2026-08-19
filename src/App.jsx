import { useEffect, useRef, useState } from "react";
import { useNeonGame } from "./game/useNeonGame.js";
import { GameHud } from "./ui/GameHud.jsx";
import { GameOverlays } from "./ui/GameOverlays.jsx";

export function App() {
  const canvasRef = useRef(null);
  const pointerStartRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(() => localStorage.getItem("neon-reduced-motion") === "true");
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem("neon-high-score") || 0));
  const { state, effects, start, move, pause, restart } = useNeonGame({ canvasRef, reducedMotion });

  useEffect(() => {
    localStorage.setItem("neon-reduced-motion", String(reducedMotion));
  }, [reducedMotion]);

  useEffect(() => {
    if (state.phase !== "gameover") return;
    setHighScore((current) => {
      const next = Math.max(current, Math.round(state.score));
      localStorage.setItem("neon-high-score", String(next));
      return next;
    });
  }, [state.phase, state.score]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (["ArrowLeft", "a", "A"].includes(event.key)) move(-1);
      if (["ArrowRight", "d", "D"].includes(event.key)) move(1);
      if (["Escape", "p", "P"].includes(event.key)) pause();
      if (event.key === "Enter" && ["start", "gameover"].includes(state.phase)) restart();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move, pause, restart, state.phase]);

  const handlePointerDown = (event) => {
    pointerStartRef.current = event.clientX;
  };

  const handlePointerUp = (event) => {
    const origin = pointerStartRef.current;
    pointerStartRef.current = null;
    if (origin == null) return;
    const delta = event.clientX - origin;
    if (Math.abs(delta) > 32) move(delta > 0 ? 1 : -1);
    else move(event.clientX < window.innerWidth / 2 ? -1 : 1);
  };

  const pulse = effects.hit > effects.collect ? "pulse-hit" : "pulse-collect";
  return (
    <main className={`neon-game phase-${state.phase} ${reducedMotion ? "reduced-motion" : ""}`} aria-label="Neon Glider">
      <canvas ref={canvasRef} className="neon-canvas" aria-hidden="true" />
      <div
        className="input-surface"
        aria-label="Swipe, tap an edge, or use arrow keys to change lanes"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      />
      <div key={Math.max(effects.collect, effects.hit)} className={`feedback-pulse ${pulse}`} aria-hidden="true" />
      <GameHud state={state} onPause={pause} />
      <GameOverlays
        state={state}
        highScore={highScore}
        reducedMotion={reducedMotion}
        onReducedMotionChange={setReducedMotion}
        onStart={start}
        onResume={pause}
        onRestart={restart}
      />
    </main>
  );
}
