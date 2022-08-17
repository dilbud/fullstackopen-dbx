import { useState } from 'react'
import { Controlles } from './Controlles';
import { Statistics } from './Statistics';


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedBack = {
    controlle: {
      name: 'give feedback',
      controlles: [
        {
          name: 'good',
          state: good,
          stateFun: () => setGood(good + 1),
          constVal: 1
        },
        {
          name: 'neutral',
          state: neutral,
          stateFun: () => setNeutral(neutral + 1),
          constVal: 0
        },
        {
          name: 'bad',
          state: bad,
          stateFun: () => setBad(bad + 1),
          constVal: -1
        },
      ]
    },
    statistic: {
      name: 'statistics',
      fallback: 'No feedback given',
      statistics: [
        {
          name: 'good',
          valueFun: (feedBack) => good,
          sufix: '',
          fixed: 0
        },
        {
          name: 'neutral',
          valueFun: (feedBack) => neutral,
          sufix: '',
          fixed: 0
        },
        {
          name: 'bad',
          valueFun: (feedBack) => bad,
          sufix: '',
          fixed: 0
        },
        {
          name: 'all',
          valueFun: (feedBack) => feedBack.statistic.helperFun.all(feedBack),
          sufix: '',
          fixed: 0
        },
        {
          name: 'avarage',
          valueFun: (feedBack) => {
            let interVal = feedBack.controlle.controlles.map(c => c.state * c.constVal).reduce((a, b) => (a + b), 0);
            let all = feedBack.statistic.helperFun.all(feedBack);
            if (all === 0) {
              return 0
            }
            return interVal / all
          },
          sufix: '',
          fixed: 1
        },
        {
          name: 'positive',
          valueFun: (feedBack) => {
            let interVal = feedBack.controlle.controlles.filter(c => c.name === 'good').map(c => c.state * c.constVal).reduce((a, b) => (a + b), 0);
            let all = feedBack.statistic.helperFun.all(feedBack);
            if (all === 0) {
              return 0
            }
            return (interVal * 100 / all)
          },
          sufix: '%',
          fixed: 1
        }
      ],
      helperFun: {
        all: (feedBack) => feedBack.controlle.controlles.map(c => c.state).reduce((a, b) => (a + b), 0)
      }
    }
  }

  return (
    <div>
      <Controlles feedBack={feedBack}></Controlles>
      <Statistics feedBack={feedBack}></Statistics>
    </div>
  )
}

export default App