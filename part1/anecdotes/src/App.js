import { useState, useCallback, useMemo } from 'react'

const ShowElement = ({ title, anecdote, point }) => {
  return (
    <>
      <h1>{title}</h1>
      <div>{anecdote}</div>
      <div>{`has ${point} votes`}</div>
    </>
  );
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const randomNumber = useCallback(() => {
    return Math.floor(Math.random() * anecdotes.length);
  }, [anecdotes.length]);


  const [selected, setSelected] = useState(randomNumber);
  const [points, setPoints] = useState((new Array(anecdotes.length)).fill(0));

  const nextAnecdote = useCallback(() => {
    setSelected(randomNumber);
    // eslint-disable-next-line
  }, []);

  const vote = useCallback(() => {
    const newPoints = [...points];
    newPoints[selected] = newPoints[selected] + 1
    setPoints(newPoints);
  }, [selected, points]);

  const mostVoteRef = useMemo(() => {
    return points.indexOf(Math.max(...points));
  }, [points]);

  return (
    <div>
      {<ShowElement title={'Anecdotes of the day'} anecdote={anecdotes[selected]} point={points[selected]}></ShowElement>}
      <span><button onClick={vote}>vote</button><button onClick={nextAnecdote}>next anecdote</button></span>
      {<ShowElement title={'Anecdote with most votes'} anecdote={anecdotes[mostVoteRef]} point={points[mostVoteRef]}></ShowElement>}
    </div>
  )
}

export default App