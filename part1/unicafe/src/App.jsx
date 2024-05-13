import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return <table>
            <tbody>
              <tr>
                <td>{text}</td>
                <td>{value}</td>
              </tr>
            </tbody>
          </table>
  
}

const Statistics = ({good,neutral,bad,total}) => {
  if(total===0) {
    return(<p>No feedback given</p>)
  } 
  return <>
      <h2>statistics</h2>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={total}/>
      <StatisticLine text='average' value ={(total)/3}/>
      <StatisticLine text="positive" value={100*good/(total) + '%'}/>
    </>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
   <div>
      <h1>give feedback</h1>
      <Button handleClick={()=>setGood(x => x+1)} text='good'/>
      <Button handleClick={()=>setNeutral(y => y+1)} text='neutral'/>
      <Button handleClick={()=>setBad(z => z+1)} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} total={good+neutral+bad}/>
    </div>
  )
}

export default App