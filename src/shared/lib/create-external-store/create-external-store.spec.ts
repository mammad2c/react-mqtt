import { createExternalStore } from ".";

describe("createExternalStore", () => {
  it("should create a store with initial state", () => {
    const store = createExternalStore({ count: 0 });
    expect(store.getState()).toEqual({ count: 0 });
  });

  it("should allow subscribing to state changes", () => {
    const store = createExternalStore({ count: 0 });
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);

    store.setState({ count: 1 });
    expect(listener).toHaveBeenCalledWith({ count: 1 });

    unsubscribe();
    store.setState({ count: 2 });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("should allow getting the current state", () => {
    const store = createExternalStore({ count: 0 });
    expect(store.getState()).toEqual({ count: 0 });

    store.setState({ count: 5 });
    expect(store.getState()).toEqual({ count: 5 });
  });
});
