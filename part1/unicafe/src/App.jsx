import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value, percent=false }) => {
  if (percent) {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = all ? (good - bad) / all : 0
  const positive = all ? (good / all) * 100 : 0

  if (all === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text={'good'} value={good} />
        <StatisticLine text={'neutral'} value={neutral} />
        <StatisticLine text={'bad'} value={bad} />
        <StatisticLine text={'all'} value={all} />
        <StatisticLine text={'average'} value={average} />
        <StatisticLine text={'positive'} value={positive} percent={true} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => setGood(good + 1)
  const handleClickNeutral = () => setNeutral(neutral + 1)
  const handleClickBad = () => setBad(bad + 1)

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <Button onClick={handleClickGood} text={'good'} />
        <Button onClick={handleClickNeutral} text={'neutral'} />
        <Button onClick={handleClickBad} text={'bad'} />
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App