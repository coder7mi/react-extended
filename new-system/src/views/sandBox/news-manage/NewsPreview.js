import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Descriptions, PageHeader } from 'antd'
import moment from 'moment'

export default function NewsPreview(props) {
  const [news, setNews] = useState(null)

  useEffect(() => {
    console.log(props.match.params.id)
    axios.get(`news/${props.match.params.id}?_expand=category&_expand=role`).then((res) => {
      console.log(res.data)
      setNews(res.data)
    })
  }, [props.match.params.id])

  const auditList = ['未审核', '审核中', '已通过', '未通过']
  const publishLsit = ['未发布', '待发布', '已上线', '已下线']

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={news?.title}
        subTitle={news?.category?.title}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="创建者">{news?.author}</Descriptions.Item>

          <Descriptions.Item label="创建时间">
            {moment(news?.createTime).format('YYYY/MM/DD HH:mm:ss')}
          </Descriptions.Item>

          <Descriptions.Item label="发布时间 ">
            {news?.publishTime ? moment(news?.publishTime).format('YYYY/MM/DD HH:mm:ss') : '-'}
          </Descriptions.Item>

          <Descriptions.Item label="区域 ">{news?.region}</Descriptions.Item>

          <Descriptions.Item label="审核状态">{auditList[news?.auditState]}</Descriptions.Item>

          <Descriptions.Item label="发布状态">{publishLsit[news?.publishState]}</Descriptions.Item>

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
