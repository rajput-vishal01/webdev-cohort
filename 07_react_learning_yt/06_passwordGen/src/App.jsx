import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()+";

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(char);
    }
    setPassword(password);
  }, [length, numberAllowed, charAllowed]); //dependencies  which do not change too frequently

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(password);
    passwordRef.current?.select();

  };
  //useEffect Hook atleast runs once as dom loads
  useEffect(() => {
    generatePassword();
  }, [generatePassword, length, charAllowed]); //dependemcies on which we want to re-run the code

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 min-h-screen text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Password Generator</h1>

      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          ref={passwordRef}
          className="border border-gray-700 rounded p-2 w-60 bg-gray-800 text-gray-200"
        />
        <button
          onClick={copyPasswordToClipboard}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Copy
        </button>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
          <label htmlFor="length" className="text-gray-400">
            Length: {length}
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
            className="form-checkbox h-5 w-5 text-blue-600 bg-gray-800 border-gray-700"
          />
          <label htmlFor="number" className="text-gray-400">
            Include Numbers
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
            className="form-checkbox h-5 w-5 text-blue-600 bg-gray-800 border-gray-700"
          />
          <label htmlFor="char" className="text-gray-400">
            Include Characters
          </label>
        </div>
      </div>
    </div>
  );
}

/*
Here's a concise overview of each React hook:

### `useState`
- **Purpose**: Manages state in functional components.
- **Usage**: `[state, setState] = useState(initialValue)`
- **Example**: `const [count, setCount] = useState(0);`
- **Note**: `setState` re-renders the component when state updates.

### `useCallback`
- **Purpose**: Memoizes a function to prevent it from being recreated on every render.
- **Usage**: `const memoizedFunction = useCallback(() => { ... }, [dependencies])`
- **Example**: `const increment = useCallback(() => setCount(count + 1), [count]);`
- **Note**: Optimizes performance by caching functions across renders.

### `useEffect`
- **Purpose**: Runs side effects in a component (e.g., data fetching, subscriptions).
- **Usage**: `useEffect(() => { ... }, [dependencies])`
- **Example**: `useEffect(() => { fetchData(); }, []);`
- **Note**: Runs after render. Dependency array controls when it re-runs.

### `useRef`
- **Purpose**: Accesses or persists a value without causing re-renders.
- **Usage**: `const ref = useRef(initialValue)`
- **Example**: `const inputRef = useRef(null);`
- **Note**: Commonly used to access DOM elements or store mutable values.
*/

export default App;
