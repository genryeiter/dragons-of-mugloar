import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_DASHBOARD } from '../routing/routes'
import '../scss/style.scss'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import { database } from '../config'
import background from './bg.jpeg'
import logo from './logo.png'

export const Welcome = () => {
  const cookie = new Cookies()
  async function startGame () {
    const response = await axios.post('https://dragonsofmugloar.com/api/v2/game/start')
    cookie.remove('gameId')
    cookie.set('gameId', response?.data?.gameId, { path: '/' })
    database.ref('data').update({
      gameId: response?.data?.gameId
    })
  }

  const style = {
    backgroundImage: `url(${background})`
  }

  return (
        <>
            <div style={style} className="wrapper">

                <div className="">
                    <div className="logo-wrapper">
                        <img src={logo} alt=""/>
                    </div>
                    <h1 className="">Welcome, Great Freelance Dragon Trainer!<br/>

                        Do you have a desire to use your dragon for profitable purposes? <br/>

                        Then quickly click on the &quot;New Game&quot; and start making money on your dragon right now!

                    </h1>

                    <div className="button-wrapper">
                        <Link onClick={startGame} to={ROUTE_DASHBOARD}>New Game</Link>
                    </div>
                    <div className="copyright">
                        Copyright © 2021. Drawings by Nele Sergejeva, editing Jaan Pullerits. <br/>
                        Background photo by Sergei Akulich on Unsplash. All rights reserved.
                    </div>
                </div>

            </div>
        </>
  )
}
