import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Descriptions, PageHeader } from 'antd'
import moment from 'moment'
import { HeartTwoTone } from '@ant-design/icons'

export default function Detail(props) {
  const [news, setNews] = useState(null)

  useEffect(() => {
    console.log(props.match.params.id)
    axios
      .get(`news/${props.match.params.id}?_expand=category&_expand=role`)
      .then((res) => {
        console.log(res.data)
        setNews({
          ...res.data,
          views: res.data.view + 1
        })
        return res.data
      })
      .then((res) => {
        axios.patch(`/news/${props.match.params.id}`, {
          view: res.view + 1
        })
      })
  }, [props.match.params.id])

  const handleStar = () => {
    setNews({
      ...news,
      star: news.star + 1
    })

    axios.patch(`/news/${props.match.params.id}`, {
      star: news.star + 1
    })
  }

  return (
    <div style={{ padding: '0 20px' }}>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={news?.title}
        subTitle={
          <div>
            {news?.category?.title}
            <HeartTwoTone twoToneColor="#eb2f96" onClick={() => handleStar()} />
          </div>
        }
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="创建者">{news?.author}</Descriptions.Item>

          <Descriptions.Item label="创建时间">
            {moment(news?.createTime).format('YYYY/MM/DD HH:mm:ss')}
          </Descriptions.Item>

          <Descriptions.Item label="发布时间 ">
            {news?.publishTime ? moment(news?.publishTime).format('YYYY/MM/DD HH:mm:ss') : '-'}
          </Descriptions.Item>

          <Descriptions.Item label="访问数量">{news?.view}</Descriptions.Item>

          <Descriptions.Item label="点赞数量">{news?.star}</Descriptions.Item>

          <Descriptions.Item label="评论数量">0</Descriptions.Item>
        </Descriptions>
      </PageHeader>

      <div
        dangerouslySetInnerHTML={{
          __html: news?.content
        }}
      ></div>
    </div>
  )
}
