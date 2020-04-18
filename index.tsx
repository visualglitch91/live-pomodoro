import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Phase, Action as PomodoroAction } from "./store/pomodoro";
import { Action as RunningAction } from "./store/running";
import createStore, { Store } from "./store";

function useStore(store: Store) {
  const [state, setState] = useState(store.getState);

  useEffect(() => store.subscribe((state) => setState(state)), []);

  return state;
}

function App({ store }: { store: Store }) {
  const state = useStore(store);
  const intervalRef = useRef<number>();
  const prevPhaseRef = useRef<Phase>(state.pomodoro.phase);

  function tick() {
    store.dispatch(PomodoroAction.TICK);
  }

  function toggleRunning() {
    store.dispatch(RunningAction.TOGGLE_RUNNING);
  }

  useEffect(() => {
    if (prevPhaseRef.current !== state.pomodoro.phase) {
      console.log(`Phase changed to ${state.pomodoro.phase}`);
      prevPhaseRef.current = state.pomodoro.phase;
    }
  }, [state.pomodoro.phase]);

  useEffect(() => {
    if (state.running) {
      intervalRef.current = setInterval(tick, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [state.running]);

  return (
    <div>
      <div>{state.pomodoro.timer}</div>
      <div>{state.pomodoro.phase}</div>
      <button onClick={toggleRunning}>
        {state.running ? "Pause" : "Resume"}
      </button>
    </div>
  );
}

function main() {
  const store = createStore();
  ReactDOM.render(<App store={store} />, document.getElementById("root"));
}

main();
