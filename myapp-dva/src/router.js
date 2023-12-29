import React from "react";
import { Router, Route, Switch, Redirect } from "dva/router";

import App from "./routes/App";
import Cinema from "./routes/Cinema";
import Film from "./routes/Film";
import Center from "./routes/Center";
import Detail from "./routes/Detail";
import Login from "./routes/Login";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route
          path="/"
          render={() => {
            return (
              <App>
                <Switch>
                  <Route path="/film" component={Film}></Route>
                  <Route path="/cinema" component={Cinema}></Route>
                  <Route
                    path="/center"
                    render={() =>
                      localStorage.getItem("token") ? (
                        <Center></Center>
                      ) : (
                        <Redirect to="/login"></Redirect>
                      )
                    }
                  ></Route>
                  <Route path="/detail/:id" component={Detail}></Route>

                  <Redirect from="/" to="/film"></Redirect>
                </Switch>
              </App>
            );
          }}
        />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
