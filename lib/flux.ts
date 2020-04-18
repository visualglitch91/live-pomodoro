export default function createFlux<T>(
  reducer: (prevState: T, action: string) => T,
  initialState: T
) {
  let subscriptions = [];
  let state = initialState;

  function dispatch(action: string) {
    const prevState = state;
    state = reducer(state, action);
    subscriptions.forEach((handler) => handler(state, prevState));
  }

  function getState() {
    return state;
  }

  function subscribe(handler) {
    subscriptions.push(handler);

    return () => {
      subscriptions = subscriptions.filter((it) => it !== handler);
    };
  }

  return {
    dispatch,
    getState,
    subscribe,
  };
}

export function combineReducers<T>(reducerMap: {
  [key: string]: (prevState: any, action: string) => any;
}) {
  return (prevState: T, action: string): T => {
    let nextState = {};

    for (let key in reducerMap) {
      nextState[key] = reducerMap[key](prevState[key], action);
    }

    return nextState as T;
  };
}
