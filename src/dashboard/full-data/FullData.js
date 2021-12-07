import React, { useEffect, useState } from 'react'
import firebase from 'firebase/compat'

export const FullData = () => {
  const [data, setData] = useState({})

  useEffect(() => {
    firebase.database().ref('data').on('value', (snapshot) => {
      setData(snapshot.val())
    })
  }, [])

  const fullData = [
    {
      text: 'Game ID',
      data: data?.gameId
    },
    {
      text: 'Lives',
      data: data?.lives
    },
    {
      text: 'Gold',
      data: data?.gold
    },
    {
      text: 'Level',
      data: data?.level
    },
    {
      text: 'Score',
      data: data?.score
    },
    {
      text: 'Last Game HighScore',
      data: data?.gameHighScore === undefined ? data?.score : data?.gameHighScore < data.score ? data.score : data.gameHighScore
    },
    {
      text: 'Turn',
      data: data?.turn
    }
  ]
  return (
        <>
            <h1>My Data</h1>
            <div className="full-data-wrapper">
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
