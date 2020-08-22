import React from "react";

interface Props {
  buttonAction: Function;
  buttonValue: string;
}

const TimerButton = ({ buttonAction, buttonValue }: Props) => {
  let classes =
    buttonAction.name === "startTimer"
      ? "start-timer"
      : buttonAction.name === "pauseTimer"
      ? "pause-timer"
      : buttonAction.name === "resetTimer"
      ? "reset-timer"
      : "";
  

  // console.log(classes);
  return (
    <div className={`button-container`}>
      <button className={classes} onClick={() => buttonAction()}>
        {buttonValue}
      </button>
    </div>
  );
};

export default TimerButton;
