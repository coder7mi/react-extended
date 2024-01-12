import React, { useEffect, useState } from 'react'
import './NewSandBox.scss'
import SideMenu from '../../components/sandBox/SideMenu'
import TopHeader from '../../components/sandBox/TopHeader'
import NewsRouter from '../../components/sandBox/NewsRouter'
import { Layout } from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const { Content } = Layout

export default function NewSandBox() {
  NProgress.start()
  useEffect(() => {
    NProgress.done()
  })
  return (
    <Layout>
      <SideMenu></SideMenu>

      <Layout className="site-layout">
        <TopHeader></TopHeader>

        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflow: 'auto'
          }}
        >
          <NewsRouter></NewsRouter>
        </Content>
      </Layout>
    </Layout>
  )
}
