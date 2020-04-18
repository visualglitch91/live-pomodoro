import createFlux from "../lib/flux";
import pomodoroReducer, { Phase, State as PomodoroState } from "./pomodoro";
import runningReducer, { State as RunningState } from "./running";

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

function appReducer(state: State, action: string): State {
  return {
    running: runningReducer(state.running, action),
    pomodoro: pomodoroReducer(state.pomodoro, action),
  };
}

export default function createStore() {
  return createFlux<State>(appReducer, initialState);
}
