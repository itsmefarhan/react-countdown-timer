import React, { useEffect, useState } from "react";
import TimerButton from "./TimerButton";

const Timer = () => {
  const [seconds, setSeconds] = useState(3 * 60);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (!paused) {
        setSeconds((prev) => prev - 1);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [paused]);

  useEffect(() => {
    if (seconds === 0) {
      resetTimer();
    }
  });

  const startTimer = () => {
    setPaused(false);
  };

  const pauseTimer = () => {
    setPaused(true);
  };
  const resetTimer = () => {
    setPaused(true);
    setSeconds(3 * 60);
  };

  return (
    <div className="timer-container">
      <div className="time-display">
        <p>{`${Math.floor(seconds / 60)}:${("00" + (seconds % 60)).slice(-2)}`}</p>
      </div>
      <div className="timer-button-container">
        <TimerButton
          buttonAction={paused ? startTimer : pauseTimer}
          buttonValue={`${paused ? "Start" : "Pause"}`}
        />
        <TimerButton buttonAction={resetTimer} buttonValue="Reset" />
      </div>
    </div>
  );
};

export default Timer;
