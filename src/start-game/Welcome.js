import React from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTE_DASHBOARD } from '../routing/routes'
import '../scss/style.scss'
import background from './bg.jpeg'
import logo from './logo.png'
import axios from 'axios'
import { database } from '../config'

export const Welcome = () => {
  async function startGame () {
    const response = await axios.post('https://dragonsofmugloar.com/api/v2/game/start')
    await database.ref('data').update(response?.data)
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
                        <NavLink to={ROUTE_DASHBOARD} onClick={startGame}>New Game</NavLink>
                    </div>
                    <div className="copyright">
                        Copyright © 2021 German Eiter. Drawings by Nele Sergejeva, editing Jaan Pullerits. <br/>
                        Background photo by Sergei Akulich on Unsplash. All rights reserved.
                    </div>
                </div>

            </div>
        </>
  )
}
