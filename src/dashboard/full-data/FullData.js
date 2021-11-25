import React from 'react'
import { BiTask } from 'react-icons/all'

const fullData = [
  {
    text: 'Game ID',
    icon: BiTask,
    data: '999'
  },
  {
    text: 'Lives',
    icon: BiTask,
    data: 999
  },
  {
    text: 'Gold',
    icon: BiTask,
    data: 999
  },
  {
    text: 'Level',
    icon: BiTask,
    data: 999
  },
  {
    text: 'Score',
    icon: BiTask,
    data: 999
  },
  {
    text: 'HighScore',
    icon: BiTask,
    data: 999
  },
  {
    text: 'Turn',
    icon: BiTask,
    data: 999
  }
]

export const FullData = () => (
    <>
        <h1>Full Data</h1>

        <div className="full-data-wrapper">
            {fullData.map((el) => {
              return (
                    <div key={el.text} className="full-data-item">
                        {el.text}
                        <el.icon/>
                        {el.data}
                    </div>
              )
            })}

        </div>
    </>
)
