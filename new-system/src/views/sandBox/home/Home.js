import React, { useEffect, useRef, useState } from 'react'
import { Card, Col, Row, List, Avatar, Drawer } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import axios from 'axios'
import * as Echarts from 'echarts'
import _ from 'lodash'

const { Meta } = Card

export default function Home() {
  const {
    username,
    region,
    role: { roleName }
  } = JSON.parse(localStorage.getItem('token'))

  /* ----------------------------------- 浏览量 ---------------------------------- */
  const [viewList, setViewList] = useState([])

  useEffect(() => {
    axios
      .get('/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6')
      .then((res) => {
        setViewList(res.data)
      })
  }, [])

  /* ----------------------------------- 点赞数 ---------------------------------- */
  const [starList, setStarList] = useState([])

  useEffect(() => {
    axios
      .get('/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6')
      .then((res) => {
        setStarList(res.data)
      })
  }, [])

  /* ----------------------------------- 柱状图 ---------------------------------- */
  const [allList, setAllList] = useState([])

  useEffect(() => {
    axios.get('/news?publishState=2&_expand=category').then((res) => {
      renderBar(_.groupBy(res.data, (item) => item.category.title))

      setAllList(res.data)
    })

    return () => {
      window.onresize = null
    }
  }, [])

  const barRef = useRef(null)

  const renderBar = (obj) => {
    const barChart = Echarts.init(barRef.current)

    const option = {
      title: {
        text: '新闻分类'
      },
      tooltip: {},
      legend: {
        data: ['数量']
      },
      xAxis: {
        data: Object.keys(obj),
        axisLabel: {
          rotate: '45',
          interval: 0
        }
      },
      yAxis: {
        minInterval: 1
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          data: Object.values(obj).map((item) => item.length)
        }
      ]
    }

    barChart.setOption(option)

    window.onresize = () => {
      barChart.resize()
    }
  }

  /* ----------------------------------- 饼图 ----------------------------------- */
  const [open, setOpen] = useState(false)
  const [pieChart, setPieChart] = useState(null)

  const pieRef = useRef(null)

  const renderPie = () => {
    const currentList = allList.filter((item) => item.author === username)

    const groupObj = _.groupBy(currentList, (item) => item.category.title)

    const list = []

    for (const i in groupObj) {
      list.push({
        name: i,
        value: groupObj[i].length
      })
    }

    let myChart
    if (!pieChart) {
      myChart = Echarts.init(pieRef.current)
      setPieChart(myChart)
    } else {
      myChart = pieChart
    }

    const option = {
      title: {
        text: '当前用户新闻分类图示',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '发布数量',
          type: 'pie',
          radius: '50%',
          data: list,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

    option && myChart.setOption(option)
  }
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览" bordered={true}>
            <List
              size="small"
              dataSource={viewList}
              renderItem={(item) => (
                <List.Item>
                  <a href={`/news-manage/preview/${item.id}`}>{item.title}</a>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多" bordered={true}>
            <List
              size="small"
              dataSource={starList}
              renderItem={(item) => (
                <List.Item>
                  <a href={`/news-manage/preview/${item.id}`}>{item.title}</a>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined
                key="setting"
                onClick={() => {
                  setOpen(true)

                  setTimeout(() => {
                    renderPie()
                  }, 0)
                }}
              />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={username}
              description={region ? region : '全球' + roleName}
            />
          </Card>
        </Col>
      </Row>

      <div ref={barRef} style={{ width: '100%', height: '400px' }}></div>

      <Drawer
        width="500px"
        title="个人分类统计"
        placement="right"
        onClose={() => {
          setOpen(false)
        }}
        open={open}
      >
        <div ref={pieRef} style={{ width: '100%', height: '500px' }}></div>
      </Drawer>
    </div>
  )
}
