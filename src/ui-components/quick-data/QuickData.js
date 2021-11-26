import React, { useEffect } from 'react'
import { BsArrowReturnRight, BsFillSuitHeartFill, FaSortAmountUp, GrMoney } from 'react-icons/all'
import { Cookies } from 'react-cookie'

const cookie = new Cookies()
let stats = cookie.get('gameStats')

const refreshGameStats = () => {
  stats = cookie.get('gameStats')
}

const quickDataItems = [
  {
    header: 'Gold',
    icon: GrMoney,
    data: stats?.gold
  },
  {
    header: 'Lives',
    icon: BsFillSuitHeartFill,
    data: stats?.lives
  },
  {
    header: 'Score',
    icon: FaSortAmountUp,
    data: stats?.score
  },
  {
    header: 'Turns',
    icon: BsArrowReturnRight,
    data: stats?.turn
  }
]

export const QuickData = () => {
  useEffect(() => {
    refreshGameStats()
  })
  return (
        <>
            <div className="quick-data-background">
                <div className="quick-data">
                    {quickDataItems.map((quickDataItem) => {
                      return (
                            <div key={quickDataItem.header} className="quick-data-item">
                                <div className="quick-data-icon">
                                    <h3>
                                        <quickDataItem.icon/>
                                    </h3>
                                </div>
                                <div className="quick-data-info">
                                    <div className="header">
                                        {quickDataItem.header}
                                    </div>
                                    <div className="data">
                                        {quickDataItem.data}
                                    </div>
                                </div>

                            </div>

                      )
                    })}

                </div>
            </div>
        </>
  )
}
