import React from 'react'
import {Route, Switch} from "react-router-dom";
import {Rules} from "./Rules";
import {ROUTE_DASHBOARD, ROUTE_WELCOMEPAGE} from "../routing/routes";


export const Welcome = () => (
    <>
        <h1>Welcome to my game for bigbank <a href={ROUTE_DASHBOARD}>start new game</a></h1>
        <h1> <a href={`${ROUTE_WELCOMEPAGE}/rules`}>check the rules</a></h1>
        <Switch>
            <Route path={`${ROUTE_WELCOMEPAGE}/rules`}>
                <Rules/>
            </Route>
        </Switch>
    </>
)
