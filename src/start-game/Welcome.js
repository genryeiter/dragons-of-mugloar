import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_DASHBOARD, ROUTE_RULES } from '../routing/routes'
import '../scss/style.scss'
import axios from 'axios'
import { useCookies } from 'react-cookie'

export const Welcome = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(['name'])

  async function startGame () {
    const response = await axios.post('https://dragonsofmugloar.com/api/v2/game/start')
    setCookie('gameId', response, { path: '/' })
  }

  return (
        <>
            <div className="wrapper">
                <div className="">
                    <h1 className="">Welcome, Great Freelance Dragon Trainer!<br/>

                        Do you have a desire to use your dragon for profitable purposes? <br/>

                        If you are already familiar with the rules, then click on the button &quot;New Game&quot;<br/>

                        If you are newbie, then you can familiarize yourself with rules by clicking on the &quot;Game
                        Rules&quot; button!</h1>

                    <div className="button-wrapper">
                        <Link onClick={startGame} to={ROUTE_DASHBOARD}>New Game</Link>
                        <Link to={ROUTE_RULES}>Game Rules</Link>
                    </div>

                </div>

            </div>
        </>
  )
}
