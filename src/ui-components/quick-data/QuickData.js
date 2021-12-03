import React, { useEffect, useState } from 'react'
import memoji from './rexj-memoji-smile.png'
import firebase from 'firebase/compat'
import { firebaseConfig } from '../../config'

firebase.initializeApp(firebaseConfig)

const data = {}
let quickDataItems = []

export const QuickData = () => {
  const [dataz, setData] = useState({})

  useEffect(() => {
    firebase.database().ref('data').on('value', (snapshot) => {
      setData(snapshot.val())
    })
    console.log(quickDataItems)
  }, [data])

  const styles = {
    borderRight: '1px solid lightgray'
  }
  quickDataItems = [
    {
      header: 'Gold',
      info: 'Your earned amount of gold',
      data: dataz.gold,
      style: styles
    },
    {
      header: 'Lives',
      info: 'Your remaining lives',
      data: dataz.lives,
      style: styles
    },
    {
      header: 'Turns',
      info: 'Number of moves you made',
      data: dataz.turn,
      style: styles
    },
    {
      header: 'Score',
      info: 'Your amount of points earned',
      data: dataz.score
    }
  ]
  return (
        <>
            <div className="welcome-back-wrapper">
                <div className="welcome-back">
                    <div className="">
                        <img src={memoji} width={65}/>
                    </div>
                    <div className="">
                        <b>Welcome Back,&nbsp;</b> Brave Dragon Trainer!
                        <div className="question">Are you ready to work today?</div>
                    </div>
                </div>
            </div>
            <div className="quick-data-background">
                <div className="quick-data">
                    {quickDataItems.map((quickDataItem) => {
                      return (
                            <div style={quickDataItem.style} key={quickDataItem.header} className="quick-data-item">
                                <div className="quick-data-info">
                                    <div className="header">
                                        {quickDataItem.header}
                                    </div>
                                    <div className="data">
                                        <b> {quickDataItem.data}</b>
                                    </div>
                                    <div className="small-info">
                                        {quickDataItem.info}
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
