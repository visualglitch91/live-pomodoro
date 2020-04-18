export default function createFlux<T>(
  reducer: (prevState: T, action: string) => T,
  initialState: T
) {
  let state = initialState;

  function dispatch(action: string) {
    state = reducer(state, action);
  }

  function getState() {
    return state;
  }

  return {
    dispatch,
    getState,
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
