import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const a = Array(anecdotes.length).fill(0);
  // console.log(a);
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(a);
  const [max, setMax] = useState(0);

  const handleClick = (max) => () => {
    setSelected(Math.floor(Math.random() * max));
  };

  const handleVote = () => () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
    setMax(indexOfMax(copy));
    // console.log(votes);
  };

  function indexOfMax(arr) {
    if (arr.length === 0) {
      return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }

    return maxIndex;
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]} has {votes[selected]} votes
      </div>
      <br></br>
      <button onClick={handleVote()}>vote</button>
      <button onClick={handleClick(anecdotes.length)}>next anecdote</button>
      <div>
        <h1>Anecdote with the most votes</h1>
        <div>
          {anecdotes[max]} has {votes[max]} votes
        </div>
      </div>
    </div>
  );
};

export default App;
