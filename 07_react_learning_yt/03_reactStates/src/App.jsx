import { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  function addVal() {
    setCount(count + 1);
  }

  function removeVal() {
    setCount(count - 1);
  }

  return (
    <>
      <h1>React States</h1>
      <h2>Counter value : {count} </h2>
      <button onClick={addVal}>Add Value</button> {""}
      <button onClick={removeVal}>Remove Value</button>
    </>
  );
}

export default App;
