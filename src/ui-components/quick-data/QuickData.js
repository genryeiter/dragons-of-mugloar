import React from 'react'
import { BiTask, GrMoney } from 'react-icons/all'
import { Cookies } from 'react-cookie'

const cookie = new Cookies()

const quickDataItems = [
  {
    header: 'Gold',
    icon: GrMoney,
    data: cookie.get('gameId')?.data?.gold
  },
  {
    header: 'Lives',
    icon: BiTask,
    data: cookie.get('gameId')?.data?.lives
  },
  {
    header: 'Score',
    icon: BiTask,
    data: cookie.get('gameId')?.data?.score
  },
  {
    header: 'Turns',
    icon: BiTask,
    data: cookie.get('gameId')?.data?.turn
  }
]

export const QuickData = () => {
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
