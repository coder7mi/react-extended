import React, { useState } from 'react'
import { Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import style from './TopHeader.module.scss'
import { Dropdown, Avatar } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const { Header } = Layout

function TopHeader(props) {
  console.log(props)

  const {
    role: { roleName },
    username
  } = JSON.parse(localStorage.getItem('token'))

  const logout = () => {
    localStorage.removeItem('token')
    props.history.replace('/login')
  }

  const items = [
    { label: <span>{roleName}</span>, key: 'item-1' },
    { label: <span onClick={logout}>退出</span>, key: 'item-2', danger: true }
  ]

  return (
    <Header
      className="site-layout-background"
      style={{
        padding: '0 16px',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      {React.createElement(props.isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => props.changeCollapsed()
      })}

      <div className={style.user}>
        <span className={style.text}>
          欢迎<b style={{ color: '#1890ff' }}>{username}</b>
        </span>
        <Dropdown menu={{ items }}>
          <Avatar size={40} icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  )
}

const mapStateToProps = ({ CollapsedReducer: { isCollapsed } }) => {
  return {
    isCollapsed
  }
}

const mapDispatchToProps = {
  changeCollapsed() {
    return {
      type: 'change_collapsed'
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopHeader))
