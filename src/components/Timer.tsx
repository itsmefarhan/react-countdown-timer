import React, { useEffect, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(1 * 60);
  const [paused, setPaused] = useState(true);

  let timePassed = 0;
  let timeLeft = seconds;

  // Warning occurs at 10s
  const WARNING_THRESHOLD = 30;
  // Alert occurs at 5s
  const ALERT_THRESHOLD = 10;

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (!paused) {
        setSeconds((prev) => prev - 1);
        timePassed += 1;
        timeLeft = seconds - timePassed;
      }
      setCircleDasharray();
      setRemainingPathColor(timeLeft);
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [paused]);

  useEffect(() => {
    if (seconds === 0) {
      window.location.reload();
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
    setSeconds(1 * 60);
  };

  const COLOR_CODES = {
    info: {
      color: "#4CAF50",
    },
    warning: {
      color: "orange",
      threshold: WARNING_THRESHOLD,
    },
    alert: {
      color: "red",
      threshold: ALERT_THRESHOLD,
    },
  };

  let remainingPathColor = COLOR_CODES.info.color;

  const calculateTimeFraction = () => {
    const rawTimeFraction = timeLeft / seconds;
    return rawTimeFraction - (1 / seconds) * (1 - rawTimeFraction);
  };

  const setCircleDasharray = () => {
    const circleDasharray = `${(calculateTimeFraction() * 283).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      ?.setAttribute("stroke-dasharray", circleDasharray);
  };

  const setRemainingPathColor = (timeLeft: any) => {
    const { alert, warning } = COLOR_CODES;

    // If the remaining time is less than or equal to 5, remove the "warning" class and apply the "alert" class.
    if (timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        ?.style.removeProperty("color");
      // .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        ?.classList.add(alert.color);

      // If the remaining time is less than or equal to 10, remove the base color and apply the "warning" class.
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        ?.style.removeProperty("color");
      // .classList.remove(info.color);
      document
        .getElementById("base-timer-path-remaining")
        ?.classList.add(warning.color);
    }
  };

  return (
    <div className="base-timer">
      <svg
        className="base-timer__svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="base-timer__circle">
          <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
          <path
            style={{ color: remainingPathColor }}
            id="base-timer-path-remaining"
            strokeDasharray="283"
            className={`base-timer__path-remaining ${remainingPathColor}`}
            d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" className="base-timer__label">{`${Math.floor(
        seconds / 60
      )}:${("00" + (seconds % 60)).slice(-2)}`}</span>
      {/* buttons */}
      <div className="timer-button-container">
        <button
          onClick={() => (paused ? startTimer() : pauseTimer())}
          className={paused ? "start-timer" : "pause-timer"}
        >
          {paused ? "Start" : "Pause"}
        </button>
        <button onClick={() => resetTimer()} className="reset-timer">
          Reset
        </button>
      </div>
      {/* End buttons */}
    </div>
  );
};

export default Timer;
