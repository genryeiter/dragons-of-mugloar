import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ROUTE_DASHBOARD } from '../routing/routes'
import { Tasks } from './tasks/Tasks'
import { Shop } from './shop/Shop'
import { FullData } from './full-data/FullData'
import '../scss/style.scss'
import { Sidebar } from '../ui-components/sidebar/Sidebar'
import { Body } from '../ui-components/body/Body'
import { Cookies } from 'react-cookie'

export const Dashboard = () => {
  const fetchGameId = () => {
    const cookie = new Cookies()
    console.log(cookie.get('gameId'))
    console.log(cookie.get('gameStats'), 'stats')
  }

  return (
        <>
            <div className='main-wrapper'>
                <Sidebar/>
                <Body>
                    <button onClick={fetchGameId}>
                        fetch game id
                    </button>
                    <br/>
                    <br/>
                    <Switch>
                        <Route exact path={ROUTE_DASHBOARD}>
                            <Redirect to={`${ROUTE_DASHBOARD}/tasks`}/>
                        </Route>
                        <Route path={`${ROUTE_DASHBOARD}/tasks`}>
                            <Tasks/>
                        </Route>
                        <Route path={`${ROUTE_DASHBOARD}/shop`}>
                            <Shop/>
                        </Route>
                        <Route path={`${ROUTE_DASHBOARD}/full-data`}>
                            <FullData/>
                        </Route>
                    </Switch>
                </Body>
            </div>
        </>
  )
}
