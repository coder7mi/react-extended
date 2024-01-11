import React from 'react'
import { Table, Button } from 'antd'
import { withRouter } from 'react-router-dom'

function NewsPublish(props) {
  console.log(props)
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
      title: '操作',
      render: (item) => {
        return <div>{props.button(item.id)}</div>
      }
    }
  ]

  return (
    <div>
      <Table
        dataSource={props.dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey={(item) => item.id}
      />
    </div>
  )
}

export default withRouter(NewsPublish)
