import createFlux, { combineReducers, Flux } from "../lib/flux";
import pomodoro, { Phase, State as PomodoroState } from "./pomodoro";
import running, { State as RunningState } from "./running";

export interface State {
  running: RunningState;
  pomodoro: PomodoroState;
}

export type Store = Flux<State>;

const initialState: State = {
  running: true,
  pomodoro: {
    timer: 0,
    phase: Phase.WORK,
    workCount: 0,
  },
};

export default function createStore(): Store {
  return createFlux<State>(
    combineReducers({ pomodoro, running }),
    initialState
  );
}
