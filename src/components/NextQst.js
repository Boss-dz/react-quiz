export default function NextQst({ dispatch, answer, index, numQst }) {
  if (answer === null) return;
  if (index < numQst - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQst" })}
      >
        Next
      </button>
    );

  if (index === numQst - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}
