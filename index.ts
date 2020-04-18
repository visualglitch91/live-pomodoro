import pomodoro, { Phase, State } from "./pomodoro";

function main() {
  const timerNode = document.getElementById("timer");
  const phaseNode = document.getElementById("phase");

  let state: State = {
    timer: 0,
    phase: Phase.WORK,
    workCount: 0,
  };

  function render() {
    timerNode.textContent = state.timer.toString();
    phaseNode.textContent = state.phase;
  }

  render();

  setInterval(() => {
    state = pomodoro(state);
    render();
  }, 1000);
}

main();
