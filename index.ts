import pomodoroReducer, {
  Phase,
  State as PomodoroState,
  Action as PomodoroAction,
} from "./pomodoro";

import runningReducer, {
  State as RunningState,
  Action as RunningAction,
} from "./running";

import createFlux from "./flux";

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

function main() {
  const { getState, dispatch } = createFlux<State>(appReducer, initialState);
  const timerNode = document.getElementById("timer");
  const phaseNode = document.getElementById("phase");
  const toggleRunningButton = document.getElementById("toggle-running");

  function render() {
    const state = getState();
    timerNode.textContent = state.pomodoro.timer.toString();
    phaseNode.textContent = state.pomodoro.phase;
    toggleRunningButton.textContent = state.running ? "Pause" : "Resume";
  }

  function dispatchAndRender(action: string) {
    dispatch(action);
    render();
  }

  toggleRunningButton.onclick = () => {
    dispatchAndRender(RunningAction.TOGGLE_RUNNING);
  };

  render();

  setInterval(() => {
    if (getState().running) {
      dispatchAndRender(PomodoroAction.TICK);
    }
  }, 1000);
}

main();
