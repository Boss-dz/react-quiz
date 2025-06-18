import { useEffect } from "react";

export default function Timer({ dispatch, secondsRemain }) {
  const min = Math.floor(secondsRemain / 60);
  const sec = secondsRemain % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {min < 10 ? "0" : ""}
      {min}:{sec}
      {sec < 10 ? "0" : ""}
    </div>
  );
}
