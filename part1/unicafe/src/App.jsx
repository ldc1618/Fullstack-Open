import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage(((good + 1) + (bad * -1))/(all + 1))
    setPositive((good + 1)/(all + 1) * 100)
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage((good + (bad * -1))/(all + 1))
    setPositive(good/(all + 1) * 100)
  }

  const handleClickBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage((good + ((bad + 1) * -1))/(all + 1))
    setPositive(good/(all + 1) * 100)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={handleClickGood} text={'good'} />
        <Button onClick={handleClickNeutral} text={'neutral'} />
        <Button onClick={handleClickBad} text={'bad'} />
      </div>
      <h1>statistics</h1>
      <div>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>all {all}</div>
        <div>average {average}</div>
        <div>positive {positive} %</div>
      </div>
    </div>
  )
}

export default App