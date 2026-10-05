import { Pause } from "@phosphor-icons/react";

export function GameHud({ state, onPause }) {
  if (["start", "gameover"].includes(state.phase)) return null;
  return (
    <div className="game-hud">
      <section className="hud-score" aria-label="Score">
        <span>SCORE</span>
        <strong>{Math.round(state.score).toLocaleString()}</strong>
        <span>MULTIPLIER · {state.combo} COMBO</span>
        <b>×{state.multiplier.toFixed(1)}</b>
      </section>

      <section className="hud-distance" aria-label="Distance and gate">
        <span>DISTANCE</span>
        <strong>{Math.round(state.distance)}<small>m</small></strong>
        <b>GATE {state.gate}</b>
        <small className="speed-readout">SPEED {Math.round(state.speed)}</small>
      </section>

      <section className="hud-energy" aria-label="Energy">
        <span>ENERGY</span>
        <div
          className="energy-track"
          role="progressbar"
          aria-label="Energy"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={Math.round(state.energy)}
        >
          <i style={{ width: `${state.energy}%` }} />
        </div>
      </section>

      {state.phase === "playing" && (
        <button className="pause-button" onClick={onPause} aria-label="Pause">
          <Pause weight="fill" />
        </button>
      )}
    </div>
  );
}
