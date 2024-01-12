import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from '../views/login/Login'
import NewSandBox from '../views/sandBox/NewSandBox'
import News from '../views/news/News'
import Detail from '../views/news/Detail'

export default function IndexRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/news" component={News} />
        <Route path="/detail/:id" component={Detail} />

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
