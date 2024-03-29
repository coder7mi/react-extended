import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, message } from 'antd'
import axios from 'axios'

export default function AuditList(props) {
  const { username } = JSON.parse(localStorage.getItem('token'))

  const [dataSource, setDataSource] = useState([])

  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      render: (title, item) => {
        return (
          <b
            style={{ cursor: 'pointer', color: '#1890ff' }}
            onClick={() => {
              props.history.push(`/news-manage/preview/${item.id}`)
            }}
          >
            {title}
          </b>
        )
      }
    },
    {
      title: '作者',
      dataIndex: 'author'
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      render: (category) => {
        return category.title
      }
    },
    {
      title: '审核状态',
      dataIndex: 'auditState',
      render: (auditState) => {
        const colorList = ['', 'orange', 'green', 'red']
        const auditList = ['草稿', '审核中', '已通过', '未通过']
        return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <div>
            {item.auditState === 1 && (
              <Button type="primary" onClick={() => revoke(item)}>
                撤销
              </Button>
            )}

            {item.auditState === 2 && (
              <Button type="primary" onClick={() => publish(item)}>
                发布
              </Button>
            )}

            {item.auditState === 3 && (
              <Button type="primary" onClick={() => update(item)}>
                更新
              </Button>
            )}
          </div>
        )
      }
    }
  ]

  useEffect(() => {
    axios(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(
      (res) => {
        console.log(res.data)
        setDataSource(res.data)
      }
    )
  }, [username])

  // 撤销
  const revoke = (item) => {
    axios
      .patch(`/news/${item.id}`, {
        auditState: 0
      })
      .then((res) => {
        setDataSource(dataSource.filter((data) => data.id !== item.id))
        message.success('撤销成功')
      })
  }

  // 更新
  const update = (item) => {
    props.history.push(`/news-manage/update/${item.id}`)
  }

  // 发布
  const publish = (item) => {
    axios
      .patch(`/news/${item.id}`, {
        publishState: 2,
        publishTime: Date.now()
      })
      .then((res) => {
        props.history.push('/publish-manage/published')

        message.success('发布成功')
      })
  }
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey={(item) => item.id}
      />
    </div>
  )
}
