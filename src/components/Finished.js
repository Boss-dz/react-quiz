export default function Finished({ points, maxPoints, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You scored {points} from {maxPoints} ({Math.ceil(percentage)}%)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Finish
      </button>
    </>
  );
}
