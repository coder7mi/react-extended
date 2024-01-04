import React from 'react'
import { useRoutes } from 'react-router-dom'
import Redirect from '../components/Redirect'

export default function MRouter() {
  const element = useRoutes([
    {
      path: '/film',
      element: LazyLoad('Film'),
      children: [
        {
          path: '',
          element: <Redirect to="/film/nowplaying" />
        },
        {
          path: 'nowplaying',
          element: LazyLoad('films/Nowplaying')
        },
        {
          path: 'comingsoon',
          element: LazyLoad('films/Commingsoon')
        }
      ]
    },
    {
      path: '/cinema',
      element: LazyLoad('Cinema')
    },
    {
      path: '/center',
      element: <AuthComp>{LazyLoad('Center')}</AuthComp>
    },
    {
      path: '/detail/:id',
      element: LazyLoad('Detail')
    },
    {
      path: '/login',
      element: LazyLoad('Login')
    },
    {
      path: '/',
      element: <Redirect to="/film" />
    },
    {
      path: '*',
      element: LazyLoad('NotFound')
    }
  ])
  return element
}

// 路由拦截组件的封装
function AuthComp({ children }) {
  const isLogin = localStorage.getItem('token')
  return isLogin ? children : <Redirect to="/login" />
}

// 路由懒加载封装
const LazyLoad = (path) => {
  const Comp = React.lazy(() => import(`../views/${path}`))
  return (
    <React.Suspense fallback={<>加载中</>}>
      <Comp />
    </React.Suspense>
  )
}
