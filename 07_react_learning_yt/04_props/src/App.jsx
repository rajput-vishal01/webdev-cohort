import { useState } from "react";
import Card from "./components/Card";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Card
        username="Jhon"
        post="sde ii"
        img="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <Card />
    </>
  );
}

export default App;
