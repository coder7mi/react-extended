import React, { useState } from 'react'
import { Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import style from './TopHeader.module.scss'
import { Dropdown, Avatar } from 'antd'

const { Header } = Layout

export default function TopHeader(props) {
  const items = [
    { label: '管理员', key: 'item-1' }, // 菜单项务必填写 key
    { label: '退出', key: 'item-2', danger: true }
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
      {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => props.handleCoollapsed()
      })}

      <div className={style.user}>
        <span className={style.text}>欢迎Admin</span>
        <Dropdown menu={{ items }}>
          <Avatar size={40} icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  )
}
