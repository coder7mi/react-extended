import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import {
  HomeOutlined,
  UserOutlined,
  AlignRightOutlined,
  HighlightOutlined,
  FormOutlined,
  CloudUploadOutlined
} from '@ant-design/icons'
import style from './SideMenu.module.scss'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const { Sider } = Layout

const iconList = {
  '/home': <HomeOutlined />,
  '/user-manage': <UserOutlined />,
  '/right-manage': <AlignRightOutlined />,
  '/news-manage': <HighlightOutlined />,
  '/audit-manage': <FormOutlined />,
  '/publish-manage': <CloudUploadOutlined />
}

function SideMenu(props) {
  const [menu, setMenu] = useState([])

  const onClick = (e) => {
    props.history.push(e.key)
  }

  const renderMenu = (menuList) => {
    return menuList
      .filter((item) => item.pagepermisson === 1)
      .map((item) => {
        let newItem = {
          label: item.title,
          key: item.key,
          icon: iconList[item.key]
        }
        if (item.children?.length > 0) {
          newItem.children = renderMenu(item.children)
        }
        return newItem
      })
  }

  useEffect(() => {
    axios('http://localhost:5000/rights?_embed=children').then((res) => {
      console.log(res.data)
      setMenu(renderMenu(res.data))
    })
  }, [])

  const selectKeys = [props.location.pathname]
  const openKeys = ['/' + props.location.pathname.split('/')[1]]

  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed}>
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
        <div className={style.logo}>新闻发布系统</div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Menu
            theme="dark"
            mode="inline"
            items={menu}
            selectedKeys={selectKeys}
            defaultOpenKeys={openKeys}
            onClick={onClick}
          />
        </div>
      </div>
    </Sider>
  )
}

export default withRouter(SideMenu)
