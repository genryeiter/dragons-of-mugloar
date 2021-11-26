import React from 'react'
import { MdVideogameAsset, BsFillSuitHeartFill, SiBitcoinsv, MdOutlineAssignmentTurnedIn, MdDataExploration, FaSortAmountUp, BsArrowReturnRight } from 'react-icons/all'
import { Cookies } from 'react-cookie'

const cookie = new Cookies()

const fullData = [
  {
    text: 'Game ID',
    icon: MdVideogameAsset,
    data: cookie.get('gameId')?.data?.gameId
  },
  {
    text: 'Lives',
    icon: BsFillSuitHeartFill,
    data: cookie.get('gameId')?.data?.lives
  },
  {
    text: 'Gold',
    icon: SiBitcoinsv,
    data: cookie.get('gameId')?.data?.gold
  },
  {
    text: 'Level',
    icon: MdDataExploration,
    data: cookie.get('gameId')?.data?.level
  },
  {
    text: 'Score',
    icon: FaSortAmountUp,
    data: cookie.get('gameId')?.data?.score
  },
  {
    text: 'HighScore',
    icon: MdOutlineAssignmentTurnedIn,
    data: cookie.get('gameId')?.data?.highScore
  },
  {
    text: 'Turn',
    icon: BsArrowReturnRight,
    data: cookie.get('gameId')?.data?.turn
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
