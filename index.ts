import pomodoro, { Phase, State as PomodoroState } from "./pomodoro";
import running, { State as RunningState } from "./running";

interface State {
  running: RunningState;
  pomodoro: PomodoroState;
}

function main() {
  const timerNode = document.getElementById("timer");
  const phaseNode = document.getElementById("phase");
  const toggleRunningButton = document.getElementById("toggle-running");

  let state: State = {
    running: true,
    pomodoro: {
      timer: 0,
      phase: Phase.WORK,
      workCount: 0,
    },
  };

  function render() {
    timerNode.textContent = state.pomodoro.timer.toString();
    phaseNode.textContent = state.pomodoro.phase;
    toggleRunningButton.textContent = state.running ? "Pause" : "Resume";
  }

  function updateStateAndRender(nextState: State) {
    state = nextState;
    render();
  }

  toggleRunningButton.onclick = () => {
    updateStateAndRender({
      ...state,
      running: running(state.running),
    });
  };

  render();

  setInterval(() => {
    if (state.running) {
      updateStateAndRender({
        ...state,
        pomodoro: pomodoro(state.pomodoro),
      });
    }
  }, 1000);
}

main();
