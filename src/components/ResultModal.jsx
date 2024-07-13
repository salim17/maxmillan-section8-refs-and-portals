import { forwardRef, useImperativeHandle, useRef } from "react";

// Refs cannot be forwarded in the form or props
// hence we need to use forwardRef function from react
// forwardRef recieves ref as the second argument, first argument is props
const forwardedModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  // this hook is used to uncouple the tight binding of this component with ref.
  // now using this we can change dialog html element to a div.
  // and now we can call this open method from outside.
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return (
    <dialog className="result-modal" ref={dialog} onClose={onReset}>
      {userLost && <h2>You lost </h2>}
      {!userLost && <h2>Your Score: {score} </h2>}
      <p>
        The target time was <strong>{targetTime} seconds</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default forwardedModal;
