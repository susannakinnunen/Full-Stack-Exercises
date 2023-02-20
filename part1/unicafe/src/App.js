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

const Statistics = (props) => {
  console.log(props)
  if (props.all === 0){
    return(
    <p>No props given</p>
    )
  }
  
  return(
  <div>
    <p>{props.good_text} {props.good}</p>
    <p>{props.neutral_text} {props.neutral}</p>
    <p>{props.bad_text} {props.bad}</p>
    <p>{props.all_text} {props.all}</p>
    <p>{props.average_text} {props.average}</p>
    <p>{props.positive_text} {props.positive} {props.percentage}</p>
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
  const all = good + bad + neutral
  const average = (good -bad) / (good + bad + neutral)
  const positive = good / (good + bad + neutral)

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
      <Statistics good={good} good_text="good" neutral={neutral} neutral_text="neutral" bad={bad} bad_text="bad" all={all} all_text="all" average={average} average_text="average" positive={positive} positive_text="positive" percentage="%"/>
    </div>
  )
}

export default App
