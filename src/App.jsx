import { useEffect, useRef, useState } from "react";
import { useNeonGame } from "./game/useNeonGame.js";
import { GameHud } from "./ui/GameHud.jsx";
import { GameOverlays } from "./ui/GameOverlays.jsx";

export function App() {
  const canvasRef = useRef(null);
  const pointerStartRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(() => localStorage.getItem("neon-reduced-motion") === "true");
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem("neon-sound") !== "false");
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem("neon-high-score-v2") || 0));
  const { state, effects, start, move, pause, restart, boost } = useNeonGame({ canvasRef, reducedMotion, soundEnabled });

  useEffect(() => { localStorage.setItem("neon-sound", String(soundEnabled)); }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem("neon-reduced-motion", String(reducedMotion));
  }, [reducedMotion]);

  useEffect(() => {
    if (state.phase !== "gameover") return;
    setHighScore((current) => {
      const next = Math.max(current, Math.round(state.score));
      localStorage.setItem("neon-high-score-v2", String(next));
      return next;
    });
  }, [state.phase, state.score]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (["ArrowLeft", "ArrowRight", " "].includes(event.key)) event.preventDefault();
      if (event.code === "Space" && !event.repeat) boost(true);
      if (["ArrowLeft", "a", "A"].includes(event.key)) move(-1);
      if (["ArrowRight", "d", "D"].includes(event.key)) move(1);
      if (["Escape", "p", "P"].includes(event.key)) pause();
      if (event.key === "Enter" && ["start", "gameover"].includes(state.phase)) restart();
    };
    const onKeyUp = (event) => { if (event.code === "Space") boost(false); };
    const onBlur = () => { boost(false); if (state.phase === "playing") pause(); };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [move, pause, restart, boost, state.phase]);

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

  const pulse = effects.hit > effects.collect ? "hit" : "collect";
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
      <div className="flight-frame" aria-hidden="true" />
      {state.phase === "playing" && <>
        <div className="flight-status">SECTOR {String(state.gate).padStart(2, "0")} / {state.boosting ? "OVERDRIVE" : "SYSTEMS ONLINE"}</div>
        <div className="event-toast" key={effects.messageAt}>{effects.message}</div>
        <div className="flight-controls">
          <button aria-label="Move left" onClick={() => move(-1)}>←</button>
          <button className={`boost-button ${state.boosting ? "active" : ""}`} onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); boost(true); }} onPointerUp={() => boost(false)} onPointerCancel={() => boost(false)} onKeyDown={(e) => { if (e.key === "Enter") boost(true); }} onKeyUp={() => boost(false)} onBlur={() => boost(false)} aria-label="Hold to boost">BOOST <small>{Math.round(state.boost)}%</small></button>
          <button aria-label="Move right" onClick={() => move(1)}>→</button>
        </div>
      </>}
      <GameHud state={state} onPause={pause} />
      <GameOverlays
        state={state}
        highScore={highScore}
        soundEnabled={soundEnabled}
        onSoundChange={setSoundEnabled}
        reducedMotion={reducedMotion}
        onReducedMotionChange={setReducedMotion}
        onStart={start}
        onResume={pause}
        onRestart={restart}
      />
    </main>
  );
}
