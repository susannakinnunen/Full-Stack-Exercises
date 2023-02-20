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

const StatisticLine = (props) => {
  console.log(props)
  return(
    <div>
      <p>{props.text} {props.value} {props.percentage}</p>
    </div>
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
      <StatisticLine text="good" value={props.good}/> 
      <StatisticLine text="neutral" value={props.neutral}/> 
      <StatisticLine text="bad" value={props.bad}/> 
      <StatisticLine text="all" value={props.all}/>
      <StatisticLine text="average" value={props.average}/>
      <StatisticLine text="positive" value={props.positive} percentage="%"/>
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
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App
