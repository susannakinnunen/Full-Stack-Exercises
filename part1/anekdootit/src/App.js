import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  console.log(handleClick,text)
  return(
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState('If it hurts, do it more often.')

  const [votes, setVotes] = useState(new Array(8).fill(0))
  
  const [index, setIndex] = useState(0)

  const random_number = () => {
    return Math.floor(Math.random() * anecdotes.length)
  }

  const handleAnecdoteClick = () => {
    const number = random_number()
    console.log(number)
    setIndex(number)
    const copySelected = anecdotes[number]
    console.log("copySelected",copySelected)
    setSelected(copySelected)
    }
  const handleVoteClick = () => {
    console.log("juu", index)
    const copyVotes = [...votes]
    console.log("copyVotes", copyVotes)
    copyVotes[index] += 1
    setVotes(copyVotes)
    console.log(copyVotes)
    console.log("votes", votes)

    }



  return (
    <div>
      <p>{selected}</p>
      <p>has votes {votes[index]}</p>
      <Button handleClick={handleVoteClick} text="vote"/>
      <Button handleClick={handleAnecdoteClick} text = "next anecdote"/>
    </div>
  )
}

export default App
