import { useCallback, useEffect, useRef, useState } from "react";
import { createGameState, moveLane, startRun, stepGame, togglePause } from "./model.js";
import { createNeonWorld } from "./neonWorld.js";

export function useNeonGame({ canvasRef, reducedMotion }) {
  const [state, setState] = useState(() => createGameState(Date.now() & 0xffff));
  const [effects, setEffects] = useState({ collect: 0, hit: 0 });
  const stateRef = useRef(state);
  const worldRef = useRef(null);
  const countdownStartRef = useRef(0);

  useEffect(() => { stateRef.current = state; }, [state]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const world = createNeonWorld(canvas);
    worldRef.current = world;
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      world.resize(bounds.width, bounds.height, window.devicePixelRatio);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    let frame = 0;
    let previous = performance.now();
    const tick = (now) => {
      const dt = Math.min(50, now - previous);
      previous = now;
      let next = stateRef.current;

      if (next.phase === "countdown") {
        const elapsed = now - countdownStartRef.current;
        const countdown = Math.max(1, 3 - Math.floor(elapsed / 650));
        if (elapsed >= 1950) next = startRun(next);
        else if (next.countdown !== countdown) next = { ...next, countdown };
      } else if (next.phase === "playing") {
        const result = stepGame(next, dt);
        next = result.state;
        if (result.events.includes("collect")) setEffects((value) => ({ ...value, collect: now }));
        if (result.events.includes("hit")) setEffects((value) => ({ ...value, hit: now }));
      }

      if (next !== stateRef.current) {
        stateRef.current = next;
        setState(next);
      }
      world.render(next, effectsRef.current);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      world.dispose();
      worldRef.current = null;
    };
  }, [canvasRef]);

  const effectsRef = useRef(effects);
  useEffect(() => { effectsRef.current = effects; }, [effects]);
  useEffect(() => { worldRef.current?.setReducedMotion(reducedMotion); }, [reducedMotion]);

  const start = useCallback(() => {
    countdownStartRef.current = performance.now();
    const next = { ...startRun(stateRef.current), phase: "countdown", countdown: 3 };
    stateRef.current = next;
    setEffects({ collect: 0, hit: 0 });
    setState(next);
  }, []);

  const move = useCallback((delta) => {
    const next = moveLane(stateRef.current, delta);
    stateRef.current = next;
    setState(next);
  }, []);

  const pause = useCallback(() => {
    const next = togglePause(stateRef.current);
    stateRef.current = next;
    setState(next);
  }, []);

  const restart = start;
  return { state, effects, start, move, pause, restart };
}
