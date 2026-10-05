import { useEffect, useRef } from "react";

export function GameOverlays({
  state,
  highScore,
  soundEnabled,
  onSoundChange,
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
          <p className="eyebrow">FLIGHT SYSTEM / 02</p>
          <h1>NEON<br /><em>GLIDER</em></h1>
          <p className="mission">SURVIVE. DODGE OBSTACLES. KEEP YOUR ENERGY UP.</p>
          <p className="high-score">HIGH SCORE {highScore.toLocaleString()}</p>
          <div className="flight-brief"><span><b>01</b> DODGE THE BLOCKERS</span><span><b>02</b> COLLECT ENERGY</span><span><b>03</b> BOOST. CHASE YOUR BEST.</span></div>
          <p className="controls-copy">A / D — CHANGE LANE&nbsp;&nbsp;&nbsp; ESC / P — PAUSE · SPACE — BOOST</p>
          <button ref={primaryRef} className="primary-button" onClick={onStart}>Start</button>
          <p className="launch-note">THREE LANES. ONE WAY FORWARD.</p>
          <label className="motion-toggle"><input type="checkbox" checked={soundEnabled} onChange={(e) => onSoundChange(e.target.checked)} /><span>Sound effects</span></label>
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
      <p className="run-detail">{state.pickups} ENERGY CELLS · {state.nearMisses} CLOSE CALLS · BEST COMBO {state.bestCombo}</p>
      <button ref={primaryRef} className="primary-button" onClick={onRestart}>Run again</button>
    </section>
  );
}
