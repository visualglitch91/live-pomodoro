export type State = boolean;

export enum Action {
  TOGGLE_RUNNING = "toggle-running",
}

export default function running(prevState: State, action: string): State {
  switch (action) {
    case Action.TOGGLE_RUNNING:
      return !prevState;
    default:
      return prevState;
  }
}
