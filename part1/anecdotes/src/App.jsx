import { useState } from 'react'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const Paragragh =  ({ text, votes }) => (
    <div>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </div>
  )

const randomiser = (limit) =>{
    return Math.floor(Math.random() * limit)
}

const MostVotedAnecdote = ({anecdotes,votes}) => {
        const mostVotes = Math.max( ...votes )
        const mostVotedIndex = votes.indexOf(mostVotes)
    
        return <Paragragh text={anecdotes[mostVotedIndex]} votes={mostVotes}/>
 }

const App = () => {
   const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)
  const [maxVotes, setMaxVotes] = useState(0)
 
  const handleVote = () => {
      const copy = [...votes]
      copy[selected]++
      setVotes(copy)
    } 

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <Paragragh text={anecdotes[selected]} votes={votes[selected]}/>
      <Button handleClick={handleVote} text='vote'/>
      <Button handleClick={()=>setSelected(x => randomiser(anecdotes.length))} text='next anecdote'/>
      <h1>Anecdote with the most votes</h1>
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}
export default App