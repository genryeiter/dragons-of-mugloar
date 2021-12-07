import React, { useEffect, useState } from 'react'
import memoji from './rexj-memoji-smile.png'
import firebase from 'firebase/compat'
import { firebaseConfig } from '../../config'
import { BiCoin, GrScorecard, IoFootstepsOutline, RiHandHeartLine } from 'react-icons/all'

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
    console.log(dataz)
  }, [data])

  const styles = {
    borderLeft: '1px solid rgba(224, 224, 224, 1)',
    paddingLeft: 20
  }
  quickDataItems = [
    {
      header: 'Gold',
      info: 'Your earned amount of gold',
      data: dataz.gold,
      icon: BiCoin
    },
    {
      header: 'Lives',
      info: 'Your remaining lives',
      data: dataz.lives,
      icon: RiHandHeartLine,
      style: styles
    },
    {
      header: 'Turns',
      info: 'Number of moves you made',
      data: dataz.turn,
      icon: IoFootstepsOutline,
      style: styles
    },
    {
      header: 'Score',
      info: 'Your amount of points earned',
      icon: GrScorecard,
      data: dataz.score,
      style: styles
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
                        <b>Welcome Back,&nbsp;</b>Brave Dragon Trainer!
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
                                    <div className="data-wrapper">
                                    <div className="data">
                                        <b>{quickDataItem.data}</b>
                                    </div>
                                    <div className="icon">
                                         <quickDataItem.icon />
                                    </div>
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
