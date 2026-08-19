import { useEffect, useRef } from "react";

export function GameOverlays({
  state,
  highScore,
  reducedMotion,
  onReducedMotionChange,
  onStart,
  onResume,
  onRestart,
}) {
  const primaryRef = useRef(null);

  useEffect(() => {
    if (["start", "paused", "gameover"].includes(state.phase)) primaryRef.current?.focus();
  }, [state.phase]);

  if (state.phase === "playing") return null;

  if (state.phase === "start") {
    return (
      <section className="game-overlay start-overlay" aria-label="NEON GLIDER">
        <div className="overlay-copy">
          <p className="eyebrow">ENDLESS NEON RUNNER</p>
          <h1>NEON GLIDER</h1>
          <p className="mission">SURVIVE. DODGE OBSTACLES. KEEP YOUR ENERGY UP.</p>
          <p className="high-score">HIGH SCORE {highScore.toLocaleString()}</p>
          <p className="controls-copy">A / D — CHANGE LANE&nbsp;&nbsp;&nbsp; ESC / P — PAUSE</p>
          <button ref={primaryRef} className="primary-button" onClick={onStart}>Start</button>
          <label className="motion-toggle">
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(event) => onReducedMotionChange(event.target.checked)}
            />
            <span>Reduced motion</span>
          </label>
        </div>
      </section>
    );
  }

  if (state.phase === "countdown") {
    return (
      <section className="countdown-overlay" role="status" aria-live="polite">
        <span>STARTING IN</span>
        <strong>{state.countdown}</strong>
      </section>
    );
  }

  if (state.phase === "paused") {
    return (
      <section className="game-overlay compact-overlay">
        <p className="eyebrow">FLIGHT SUSPENDED</p>
        <h2>PAUSED</h2>
        <div className="overlay-actions">
          <button ref={primaryRef} className="primary-button" onClick={onResume}>Continue</button>
          <button className="secondary-button" onClick={onRestart}>Restart</button>
        </div>
      </section>
    );
  }

  return (
    <section className="game-overlay compact-overlay">
      <p className="eyebrow">ENERGY DEPLETED</p>
      <h2>RUN OVER</h2>
      <div className="run-summary">
        <span>SCORE <strong>{Math.round(state.score).toLocaleString()}</strong></span>
        <span>DISTANCE <strong>{Math.round(state.distance)}m</strong></span>
        <span>BEST <strong>{Math.max(highScore, Math.round(state.score)).toLocaleString()}</strong></span>
      </div>
      <button ref={primaryRef} className="primary-button" onClick={onRestart}>Run again</button>
    </section>
  );
}
