import React from 'react'
import { NavLink } from 'react-router-dom'
import './Tabbar.css'

export default function Tabbar() {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/film" className={({ isActive }) => (isActive ? 'tabActive' : '')}>
            电影
          </NavLink>
        </li>
        <li>
          <NavLink to="/cinema" className={({ isActive }) => (isActive ? 'tabActive' : '')}>
            影院
          </NavLink>
        </li>
        <li>
          <NavLink to="/center" className={({ isActive }) => (isActive ? 'tabActive' : '')}>
            我的
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
