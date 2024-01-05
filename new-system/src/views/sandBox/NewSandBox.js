import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SideMenu from '../../components/sandBox/SideMenu'
import TopHeader from '../../components/sandBox/TopHeader'
import Home from './home/Home'
import RightList from './right-manage/RightList'
import RoleList from './right-manage/RoleList'
import UserList from './user-manage/UserList'
import NoPermission from './noPermission/NoPermission'
import './NewSandBox.scss'

/* ---------------------------------- antd ---------------------------------- */
import { Layout } from 'antd'
const { Content } = Layout

export default function NewSandBox() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout>
      <SideMenu collapsed={collapsed}></SideMenu>

      <Layout className="site-layout">
        <TopHeader
          collapsed={collapsed}
          handleCoollapsed={() => {
            setCollapsed(!collapsed)
          }}
        ></TopHeader>

        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflow: 'auto'
          }}
        >
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/user-manage/list" component={UserList} />
            <Route path="/right-manage/role/list" component={RoleList} />
            <Route path="/right-manage/right/list" component={RightList} />

            <Redirect from="/" to="/home" exact />

            <Route path="*" component={NoPermission} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}
