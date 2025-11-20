"use client"
import React, { forwardRef, useImperativeHandle, useRef } from 'react'

const Hooks = () => {
  const inputRef = useRef<{ focus: () => void, blur: () => void, test: (value: string) => void }>(null);

  const handleTest = () => {
    inputRef.current?.test("test");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-4 p-8">
      <CustomInput
        type="text"
        ref={inputRef}
        className="text-black px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-64"
        placeholder="Type something..."
      />
      <button
        onClick={() => inputRef.current?.focus()}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
      >
        Focus Input
      </button>
      <button
        onClick={() => inputRef.current?.blur()}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
      >
        Blur Input
      </button>
      <button
        onClick={handleTest}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
      >
        Test Input
      </button>
    </div>
  )
}

export default Hooks

const CustomInput = forwardRef<{ focus: () => void, blur: () => void, test: (value: string) => void }, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
      console.info(inputRef.current);
    },
    blur: () => {
      inputRef.current?.blur();
      console.info(inputRef.current);
    },
    test: (value: string) => {
      console.log(value);
    }
  }));
  return <input {...props} ref={inputRef} className="text-black px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-64" />
})

CustomInput.displayName = 'CustomInput';

export { CustomInput };
