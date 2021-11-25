import React from 'react'
import { BiTask, GrMoney } from 'react-icons/all'

const quickDataItems = [
  {
    header: 'Gold',
    icon: GrMoney,
    data: ''
  },
  {
    header: 'Lives',
    icon: BiTask,
    data: ''

  },
  {
    header: 'Score',
    icon: BiTask,
    data: ''

  },
  {
    header: 'Turns',
    icon: BiTask,
    data: ''

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
                                        999
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
