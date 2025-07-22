/**
 * Creates an external store that can be used with React's useSyncExternalStore.
 * External stores are a way to keep state outside of React components, and have
 * React components sync up with the external state.
 *
 * @param initialState The initial state of the store.
 * @returns An object with three methods: subscribe, setState, updateState and getState. The
 * subscribe method takes a function that will be called whenever the state
 * changes. The setState method takes a new state, and the getState method
 * returns the current state.
 */
export function createExternalStore<T>(initialState: T) {
  let state = initialState;
  const listeners = new Set<(state: T) => void>();

  const subscribe = (listener: (state: T) => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const setState = (newState: T) => {
    state = newState;
    listeners.forEach((listener) => listener(state));
  };

  const updateState = (partialState: Partial<T>) => {
    state = { ...state, ...partialState };
    listeners.forEach((listener) => listener(state));
  };

  const getState = () => state;

  return {
    subscribe,
    updateState,
    setState,
    getState,
  };
}
