function createFlux<T>(
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

export default createFlux;
