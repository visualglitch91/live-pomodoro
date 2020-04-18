import { Action as PomodoroAction } from "./store/pomodoro";
import { Action as RunningAction } from "./store/running";
import createStore, { State } from "./store";

function main() {
  const { getState, dispatch, subscribe } = createStore();
  const timerNode = document.getElementById("timer");
  const phaseNode = document.getElementById("phase");
  const toggleRunningButton = document.getElementById("toggle-running");

  function render(state: State) {
    timerNode.textContent = state.pomodoro.timer.toString();
    phaseNode.textContent = state.pomodoro.phase;
    toggleRunningButton.textContent = state.running ? "Pause" : "Resume";
  }

  toggleRunningButton.onclick = () => {
    dispatch(RunningAction.TOGGLE_RUNNING);
  };

  subscribe(render);

  render(getState());

  setInterval(() => {
    if (getState().running) {
      dispatch(PomodoroAction.TICK);
    }
  }, 1000);
}

main();
