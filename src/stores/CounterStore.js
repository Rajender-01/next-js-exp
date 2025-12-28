import { makeAutoObservable } from "mobx";

class CounterStore {
  // observable state
  count = 0;

  constructor() {
    makeAutoObservable(this); // Makes all properties observable
  }

  // Actions: increment and decrement are actions that modify state.
  increment = () => {
    this.count++;
  };

  decrement = () => {
    this.count--;
  };

  // A computed value (derived from state)
  get isPositive() {
    return this.count > 0;
  }
}

// Export a singleton instance (for now)
export const counterStore = new CounterStore();
