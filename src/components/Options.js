export default function Options({ question, dispatch, answer }) {
  const answerRes = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""}
        ${
          answerRes
            ? index === question.correctOption
              ? "correct"
              : "wrong"
            : ""
        }
        `}
        disabled={answerRes}
          key={option}
          onClick={() => dispatch({ type: "hasAnswered", payload: index })}
        >
          {option}
        </button>
        
      ))}
    </div>
  );
}
