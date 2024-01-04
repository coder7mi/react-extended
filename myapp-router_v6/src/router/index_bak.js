import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Redirect from '../components/Redirect'

export default function MRouter() {
  return (
    <Routes>
      {/* <Route path="/" element={<Film />} /> */}
      {/* <Route index element={<Film />} /> */}
      <Route path="/film" element={LazyLoad('Film')}>
        {/* <Route index element={<Nowplaying />} /> */}
        <Route index element={<Redirect to="/film/nowplaying" />} />
        <Route path="nowplaying" element={LazyLoad('films/Nowplaying')}></Route>
        <Route path="commingsoon" element={LazyLoad('films/Commingsoon')}></Route>
      </Route>
      <Route path="/cinema" element={LazyLoad('Cinema')} />

      {/* 路由拦截 */}
      <Route path="/center" element={<AuthComp>{LazyLoad('Center')}</AuthComp>} />

      {/* 动态路由 /detail/xxx */}
      <Route path="/detail/:id" element={LazyLoad('Detail')} />

      <Route path="/login" element={LazyLoad('Login')} />
      <Route path="/" element={<Redirect to="/film" />}></Route>
      <Route path="*" element={LazyLoad('NotFound')}></Route>
    </Routes>
  )
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
