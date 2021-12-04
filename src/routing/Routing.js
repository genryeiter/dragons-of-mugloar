import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Welcome } from '../start-game/Welcome'
import { ROUTE_DASHBOARD, ROUTE_HOMEPAGE, ROUTE_INIT, ROUTE_WELCOMEPAGE } from './routes'
import { Dashboard } from '../dashboard/Dashboard'

export const Routing = () => (
        <BrowserRouter>
            <div className="container pt-4">
                <Switch>
                    <Redirect exact from={ROUTE_INIT} to={ROUTE_WELCOMEPAGE}/>
                    <Redirect exact from={ROUTE_HOMEPAGE} to={ROUTE_WELCOMEPAGE}/>
                    <Route path={ROUTE_WELCOMEPAGE}>
                        <Welcome/>
                    </Route>
                    <Route path={ROUTE_DASHBOARD}>
                        <Dashboard/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
)

export default Routing
