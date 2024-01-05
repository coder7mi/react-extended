import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from '../views/login/Login'
import NewSandBox from '../views/sandBox/NewSandBox'

export default function IndexRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route
          path="/"
          render={() => {
            return localStorage.getItem('token') ? <NewSandBox /> : <Redirect to="/login" />
          }}
        />
      </Switch>
    </BrowserRouter>
  )
}
