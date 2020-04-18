import createFlux, { combineReducers } from "../lib/flux";
import pomodoro, { Phase, State as PomodoroState } from "./pomodoro";
import running, { State as RunningState } from "./running";

interface State {
  running: RunningState;
  pomodoro: PomodoroState;
}

const initialState: State = {
  running: true,
  pomodoro: {
    timer: 0,
    phase: Phase.WORK,
    workCount: 0,
  },
};

export default function createStore() {
  return createFlux<State>(
    combineReducers({ pomodoro, running }),
    initialState
  );
}
