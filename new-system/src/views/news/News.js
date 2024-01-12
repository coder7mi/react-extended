import React, { useEffect, useState } from 'react'
import { PageHeader } from 'antd'
import axios from 'axios'
import _ from 'lodash'
import { Card, Col, Row, List } from 'antd'

export default function News(props) {
  const [list, setList] = useState([])

  useEffect(() => {
    axios.get('/news?publishState=2&_expand=category').then((res) => {
      console.log(res.data)
      setList(Object.entries(_.groupBy(res.data, (item) => item.category.title)))
    })
  }, [])

  return (
    <div style={{ padding: '0 20px' }}>
      <PageHeader className="header" title="全球新闻" subTitle="新闻浏览" />

      <Row gutter={[16, 16]}>
        {list.map((item) => (
          <Col span={8} key={item[0]}>
            <Card title={item[0]} bordered={true} hoverable>
              <List
                dataSource={item[1]}
                pagination={{
                  pageSize: 5
                }}
                renderItem={(data) => (
                  <List.Item>
                    <span
                      style={{ color: 'orange' }}
                      onClick={() => {
                        props.history.push(`/detail/${data.id}`)
                      }}
                    >
                      {data.title}
                    </span>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
