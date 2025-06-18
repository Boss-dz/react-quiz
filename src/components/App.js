import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextQst from "./NextQst";
import Progress from "./Progress";
import Finished from "./Finished";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemain: null,
};
const SECS_REM = 30;
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "error":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemain : state.questions.length * SECS_REM
      };
    case "hasAnswered":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? question.points + state.points
            : state.points,
      };
    case "nextQst":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemain: state.secondsRemain - 1,
        status : state.secondsRemain === 0 ? 'finished' : state.status
      };
    default:
      throw Error("Action Unknown");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, secondsRemain },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQst = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(function () {
    async function fetching() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "error" });
      }
    }
    fetching();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQst={numQst} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              answer={answer}
              numQst={numQst}
              points={points}
              maxPoints={maxPoints}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemain={secondsRemain} />
              <NextQst
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQst={numQst}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Finished points={points} maxPoints={maxPoints} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}
