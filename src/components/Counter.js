"use client";
import { counterStore } from "../stores/CounterStore";
import { observer } from "mobx-react-lite";

const Counter = observer(() => {
  const { count, increment, decrement, isPositive } = counterStore;
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 gap-4 p-8 text-black">
      <h1>{count}</h1>
      <button
        onClick={increment}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
      >
        Increment
      </button>
      <button
        onClick={decrement}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
      >
        Decrement
      </button>
      <p>Is positive? {isPositive ? "Yes" : "No"}</p>
    </div>
  );
});

export default Counter;
// Key Concepts:
// observer: Wraps the component to automatically re‑render when observed state changes.
// Reactivity: The component will update whenever count or isPositive changes.
