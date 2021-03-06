import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ROUTE_DASHBOARD } from '../routing/routes'
import { Tasks } from './tasks/Tasks'
import { Shop } from './shop/Shop'
import { FullData } from './full-data/FullData'
import '../scss/style.scss'
import { Sidebar } from '../ui-components/sidebar/Sidebar'
import { Body } from '../ui-components/body/Body'

export const Dashboard = () => {
  return (
        <>
            <div className='main-wrapper'>
                <Sidebar/>
                <Body>
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
