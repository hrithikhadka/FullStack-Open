import { useState } from "react";

const FindMaxVote = ({ vote, anecdotes }) => {
  const max = Math.max(...vote);
  const index = vote.indexOf(max);
  if (max === 0) {
    return <p>No Votes</p>;
  }
  return (
    <>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[index]}</p>
      <p>has {max} votes</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(new Uint8Array(7));

  const nextAnecdote = () => {
    const randomAnecdote = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomAnecdote);
  };

  const increaseVote = () => {
    const aryCopy = [...vote];
    aryCopy[selected]++;
    setVote(aryCopy);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br />
      has {vote[selected]} votes
      <br />
      <button onClick={increaseVote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <FindMaxVote vote={vote} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
