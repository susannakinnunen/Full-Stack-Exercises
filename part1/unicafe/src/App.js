import { useState } from 'react'
const Header = ({header}) => {
  console.log(header)
  return (
    <div>
      <h1> 
      {header}
      </h1>

    </div>
  )
}

const Button = ({ handleClick, text }) => {
  console.log(handleClick,text)
  return(
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const Display = ({stat, text}) => {
  console.log(stat,text)
  return(
  <div>
    {text} {stat}
  </div>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const mainheader = "give feedback"
  const statisticsheader = "statistics"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadlClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header header={mainheader} />
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadlClick} text="bad"/>
      <Header header={statisticsheader} />
      <Display stat={good} text="good"/>
      <Display stat={neutral} text="neutral"/>
      <Display stat={bad} text="bad"/>
    </div>
  )
}

export default App
