import { useRef } from "react";
import { useState } from "react";

export default function Player() {
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  const playerName = useRef();

  // key difference in state vs refs.
  // whenever state changes component functions re-executes(re-renders) but in refs it does not.

  // therefore state should be used for values that are directly reflected in the UI and should not be used
  // for "behind the scenes" values that have no direct UI impact

  // Refs can be used to gain direct DOM element access (great for reading values or accessing certain browser APIs)
  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = ""; //do not do it like this unless it is simple usecase like this here
  }
  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
