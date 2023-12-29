import React, { Component } from "react";
import style from "./Tabbar.css";
import { NavLink } from "dva/router";

export default class Tabbar extends Component {
  render() {
    return (
      <div>
        <footer>
          <ul>
            <li>
              <NavLink to="/film" activeClassName={style.active}>
                电影
              </NavLink>
            </li>

            <li>
              <NavLink to="/cinema" activeClassName={style.active}>
                影院
              </NavLink>
            </li>

            <li>
              <NavLink to="/center" activeClassName={style.active}>
                我的
              </NavLink>
            </li>
          </ul>
        </footer>
      </div>
    );
  }
}
