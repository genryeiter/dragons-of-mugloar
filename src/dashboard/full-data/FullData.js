import React from 'react'
import { MdVideogameAsset, BsFillSuitHeartFill, SiBitcoinsv, MdOutlineAssignmentTurnedIn, MdDataExploration, FaSortAmountUp, BsArrowReturnRight } from 'react-icons/all'
import { Cookies } from 'react-cookie'

const cookie = new Cookies()
const stats = cookie.get('gameStats')

console.log(cookie.get('gameStats'))

const fullData = [
  {
    text: 'Game ID',
    icon: MdVideogameAsset,
    data: stats?.gameId
  },
  {
    text: 'Lives',
    icon: BsFillSuitHeartFill,
    data: stats?.lives
  },
  {
    text: 'Gold',
    icon: SiBitcoinsv,
    data: stats?.gold
  },
  {
    text: 'Level',
    icon: MdDataExploration,
    data: stats?.level
  },
  {
    text: 'Score',
    icon: FaSortAmountUp,
    data: cookie.get('gameStats')?.score
  },
  {
    text: 'HighScore',
    icon: MdOutlineAssignmentTurnedIn,
    data: cookie.get('gameStats')?.highScore
  },
  {
    text: 'Turn',
    icon: BsArrowReturnRight,
    data: cookie.get('gameStats')?.turn
  }
]

export const FullData = () => {
  return (

    <>
        <h1>Full Data</h1>

        <div className="full-data-wrapper">
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
