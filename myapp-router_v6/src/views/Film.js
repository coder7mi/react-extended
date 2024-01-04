import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Film() {
  return (
    <div>
      <div style={{ height: '200px', background: 'orange' }}>大轮播</div>
      <Outlet></Outlet>
    </div>
  )
}
