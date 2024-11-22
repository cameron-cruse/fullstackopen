/* eslint-disable react/prop-types */
import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Feedback = ({
  good,
  setGood,
  neutral,
  setNeutral,
  bad,
  setBad,
  all,
  setAll,
  score,
  setScore,
}) => {
  const handleGood = () => () => {
    setGood(good + 1);
    setAll(all + 1);
    setScore(score + 1);
  };
  const handleNeutral = () => () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };
  const handleBad = () => () => {
    setBad(bad + 1);
    setAll(all + 1);
    setScore(score - 1);
  };
  return (
    <div className="feedback">
      <h1>give feedback</h1>
      <Button handleClick={handleGood()} text="good"></Button>
      <Button handleClick={handleNeutral()} text="neutral"></Button>
      <Button handleClick={handleBad()} text="bad"></Button>
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      {text} {value} {text === "average" || text === "positive" ? "%" : ""}
    </div>
  );
};

const Statistics = ({ good, neutral, bad, all, score }) => {
  const avg = score <= 0 ? 0 : (score / all) * 100;
  const positive = (good / all) * 100;
  if (all <= 0) {
    return (
      <div className="statistics">
        <h1>statistics</h1>
        <p>No Feedback Given</p>
      </div>
    );
  }

  return (
    <div className="statistics">
      <h1>statistics</h1>
      <StatisticLine text="good" value={good}></StatisticLine>
      <StatisticLine text="neutral" value={neutral}></StatisticLine>
      <StatisticLine text="bad" value={bad}></StatisticLine>
      <StatisticLine text="all" value={all}></StatisticLine>
      <StatisticLine text="average" value={avg}></StatisticLine>
      <StatisticLine text="positive" value={positive}></StatisticLine>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [score, setScore] = useState(0);

  return (
    <>
      <Feedback
        good={good}
        setGood={setGood}
        neutral={neutral}
        setNeutral={setNeutral}
        bad={bad}
        setBad={setBad}
        all={all}
        setAll={setAll}
        score={score}
        setScore={setScore}
      ></Feedback>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        score={score}
      ></Statistics>
    </>
  );
};

export default App;
