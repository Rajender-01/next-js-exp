"use client";
import { counterStore } from "../stores/CounterStore";
import { observer } from "mobx-react-lite";

const Counter = observer(() => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-4 p-8 text-black">
      <h1>{counterStore.count}</h1>
      <button
        onClick={counterStore.increment}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
      >
        Increment
      </button>
      <button
        onClick={counterStore.decrement}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
      >
        Decrement
      </button>
    </div>
  );
});

export default Counter;
