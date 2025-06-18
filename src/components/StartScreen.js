export default function StartScreen({ numQst, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to React Quiz !</h2>
      <h3>{numQst} Questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Lets Start
      </button>
    </div>
  );
}
