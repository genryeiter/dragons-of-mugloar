import React, { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import firebase from 'firebase/compat'

const cookie = new Cookies()

const data = {}

export const FullData = () => {
  const [dataz, setData] = useState({})
  console.log(cookie.get('highScore'))
  console.log(cookie.get('gameStats'))
  useEffect(() => {
    firebase.database().ref('data').on('value', (snapshot) => {
      setData(snapshot.val())
    })
  }, [data])

  const fullData = [
    {
      text: 'Game ID',
      data: cookie.get('gameId')
    },
    {
      text: 'Lives',
      data: dataz?.lives
    },
    {
      text: 'Gold',
      data: dataz?.gold
    },
    {
      text: 'Level',
      data: dataz?.level
    },
    {
      text: 'Score',
      data: dataz?.score
    },
    {
      text: 'HighScore',
      data: dataz?.gameHighScore === undefined ? dataz?.score : dataz?.gameHighScore < dataz.score ? dataz.score : dataz.gameHighScore
    },
    {
      text: 'Turn',
      data: dataz?.turn
    }
  ]
  return (
        <>
            <h1>My Data</h1>
            <div className="full-data-wrapper">
                {}
                {fullData.map((el) => {
                  return (
                        <div key={el.text} className="full-data-item">
                          <div className="data-header">
                            {el.text} &nbsp;- &nbsp;
                          </div>
                          <div className="data">
                            {el.data}
                          </div>
                        </div>
                  )
                })}
            </div>
        </>
  )
}
