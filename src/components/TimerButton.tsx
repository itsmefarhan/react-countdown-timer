import React from "react";

interface Props {
  buttonAction: Function;
  buttonValue: string;
}

const TimerButton = ({ buttonAction, buttonValue }: Props) => {
  return (
    <div className={`button-container`}>
      <button
        className={
          buttonAction.name === "startTimer"
            ? "start-timer"
            : buttonAction.name === "pauseTimer"
            ? "pause-timer"
            : buttonAction.name === "resetTimer"
            ? "reset-timer"
            : ""
        }
        onClick={() => buttonAction()}
      >
        {buttonValue}
      </button>
    </div>
  );
};

export default TimerButton;
