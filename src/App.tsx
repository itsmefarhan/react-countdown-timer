import React from "react";
import "./App.css";
import Timer from "./components/Timer";

function App() {
  return (
    <div className="app-container">
      <h1 style={{ display: "flex", justifyContent: "center", color: "white" }}>
        Countdown Timer
      </h1>
      <Timer />
    </div>
  );
}

export default App;
