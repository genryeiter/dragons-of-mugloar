import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_DASHBOARD, ROUTE_RULES } from '../routing/routes'
import '../scss/style.scss'

// import { useMutation } from 'react-query'

// import axios from 'axios'

export const Welcome = () => {
  // async function fetchData () {
  //   const response = await axios.post('https://dragonsofmugloar.com/api/v2/game/start')
  //   console.log(response)
  // }

  return (
        <>
            {/* <button onClick={fetchData}>start the game</button> */}
            <div className="wrapper">
                <div className="">
                    <h1 className="">Welcome, Great Freelance Dragon Trainer!<br/>

                        Do you have a desire to use your dragon for profitable purposes? <br/>

                        If you are already familiar with the rules, then click on the button &quot;New Game&quot;<br/>

                        If you are newbie, then you can familiarize yourself with rules by clicking on the &quot;Game
                        Rules&quot; button!</h1>

                    {/* <h1><a href={`${ROUTE_WELCOMEPAGE}/rules`}>check the rules</a></h1> */}
                    <div className="button-wrapper">
                        <Link to={ROUTE_DASHBOARD}>New Game</Link>
                        <Link to={ROUTE_RULES}>Game Rules</Link>
                    </div>

                </div>

            </div>
        </>
  )
}
