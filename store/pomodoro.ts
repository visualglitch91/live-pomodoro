export enum Phase {
  WORK = "WORK",
  SHORT_BREAK = "SHORT_BREAK",
  LONG_BREAK = "LONG_BREAK",
}

export enum Action {
  TICK = "tick",
}

const durations = {
  [Phase.WORK]: 5,
  [Phase.SHORT_BREAK]: 2,
  [Phase.LONG_BREAK]: 10,
};

export interface State {
  timer: number;
  phase: Phase;
  workCount: number;
}

export default function pomodoro(prevState: State, action: string): State {
  switch (action) {
    case Action.TICK:
      const state = { ...prevState, timer: prevState.timer + 1 };

      if (state.timer >= durations[state.phase]) {
        state.timer = 0;

        switch (state.phase) {
          case Phase.WORK:
            state.workCount++;
            state.phase =
              state.workCount === 4 ? Phase.LONG_BREAK : Phase.SHORT_BREAK;
            break;
          case Phase.SHORT_BREAK:
            state.phase = Phase.WORK;
            break;
          case Phase.LONG_BREAK:
            state.workCount = 0;
            state.phase = Phase.WORK;
            break;
        }
      }

      return state;
    default:
      return prevState;
  }
}
