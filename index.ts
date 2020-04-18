import { Action as PomodoroAction } from "./store/pomodoro";
import { Action as RunningAction } from "./store/running";
import createStore from "./store";

function main() {
  const { getState, dispatch } = createStore();
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
