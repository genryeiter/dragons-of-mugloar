import React, { useEffect, useState } from 'react'
import {
  MdVideogameAsset,
  BsFillSuitHeartFill,
  SiBitcoinsv,
  MdOutlineAssignmentTurnedIn,
  MdDataExploration,
  FaSortAmountUp,
  BsArrowReturnRight
} from 'react-icons/all'
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
      icon: MdVideogameAsset,
      data: cookie.get('gameId')
    },
    {
      text: 'Lives',
      icon: BsFillSuitHeartFill,
      data: dataz?.lives
    },
    {
      text: 'Gold',
      icon: SiBitcoinsv,
      data: dataz?.gold
    },
    {
      text: 'Level',
      icon: MdDataExploration,
      data: dataz?.level
    },
    {
      text: 'Score',
      icon: FaSortAmountUp,
      data: dataz?.score
    },
    {
      text: 'HighScore',
      icon: MdOutlineAssignmentTurnedIn,
      data: dataz?.gameHighScore === undefined ? dataz?.score : dataz?.gameHighScore < dataz.score ? dataz.score : dataz.gameHighScore
    },
    {
      text: 'Turn',
      icon: BsArrowReturnRight,
      data: dataz?.turn
    }
  ]
  return (
        <>
            <h1>Full Data</h1>
            <div className="full-data-wrapper">
                {}
                {fullData.map((el) => {
                  return (
                        <div key={el.text} className="full-data-item">
                            {el.text}
                            <el.icon/>
                            <br/>
                            {el.data}
                            <br/>
                            <br/>
                        </div>
                  )
                })}
            </div>
        </>
  )
}
