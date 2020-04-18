import pomodoro, { Phase, State } from "./pomodoro";

function main() {
  let state: State = {
    timer: 0,
    phase: Phase.WORK,
    workCount: 0,
  };

  setInterval(() => {
    state = pomodoro(state);
    console.log(state);
  }, 1000);
}

main();
