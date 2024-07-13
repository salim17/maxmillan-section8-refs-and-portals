import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  //   const [timerStarted, setTimerStarted] = useState(false);
  //   const [timerExpired, setTimerExpired] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  const timer = useRef();
  const dialog = useRef();

  //   function handleStart() {
  //     timer.current = setTimeout(() => {
  //       setTimerExpired(true);
  //       dialog.current.open();
  //     }, targetTime * 1000);

  //     setTimerStarted(true);
  //   }

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    setTimeRemaining(targetTime * 1000);
    dialog.current.open();
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((previousTimeRemaining) => previousTimeRemaining - 1000);
    }, 1000);
  }

  console.log("Timer challenge loading...");

  //   function handleStop() {
  //     clearTimeout(timer.current); // will not trigger TimerChallenge (this component) re-rendering
  //   }

  function handleStop() {
    clearInterval(timer.current); // will not trigger TimerChallenge (this component) re-rendering
    dialog.current.open();
  }
  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} result="lost" />{" "}
      {/* since it is invisible in the dom by default */}
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
