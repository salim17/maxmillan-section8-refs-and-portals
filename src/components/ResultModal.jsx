import { forwardRef } from "react";

// Refs cannot be forwarded in the form or props
// hence we need to use forwardRef function from react
// forwardRef recieves ref as the second argument, first argument is props
const forwardedModal =  forwardRef(function ResultModal({ result, targetTime }, ref) {
  return (
    <dialog className="result-modal" ref={ref}>
      <h2>You {result} </h2>
      <p>
        The target time was <strong>{targetTime} seconds</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default forwardedModal;
