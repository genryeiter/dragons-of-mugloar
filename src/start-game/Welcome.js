import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Rules } from './Rules'
import { ROUTE_DASHBOARD, ROUTE_WELCOMEPAGE } from '../routing/routes'
import '../scss/style.scss'

function componentDidMount () {
  // Simple POST request with a JSON body using fetch
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' })
  }
  fetch('', requestOptions)
    .then(response => response.json())
    .then(data => this.setState({ postId: data.id }))
}

export const Welcome = () => (
    <>
        <div className="bg"/>
        <button onClick={componentDidMount()}/>
        <div className="">
            <h1 className="">Welcome freelance dragon trainer! <br/>

                Do you have a desire to use your dragon for profitable purposes? <br/>

                If you are already familiar with the rules, then click on the button &quot;Start a new game&quot; <br/>

                If you are not familiar with the rules, then you can familiarize yourself with them by clicking on the &quot;Game Rules&quot; button</h1>
            <h1>Welcome to my game for bigbank <a href={ROUTE_DASHBOARD}>start new game</a></h1>
            <h1><a href={`${ROUTE_WELCOMEPAGE}/rules`}>check the rules</a></h1>
        <Switch>
            <Route path={`${ROUTE_WELCOMEPAGE}/rules`}>
                <Rules/>
            </Route>
        </Switch>
        </div>
    </>
)
