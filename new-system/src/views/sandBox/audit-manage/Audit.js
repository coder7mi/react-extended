import React, { useEffect, useState } from 'react'
import { Table, Button, message } from 'antd'
import axios from 'axios'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

export default function Audit(props) {
  const [dataSource, setDataSource] = useState([])

  const { roleId, username, region } = JSON.parse(localStorage.getItem('token'))

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
        return (
          <div>
            <Button
              type="primary"
              shape="circle"
              icon={<CheckOutlined />}
              onClick={() => adopt(item, 2, 1)}
            />

            <Button
              type="danger"
              shape="circle"
              icon={<CloseOutlined />}
              onClick={() => adopt(item, 3, 0)}
            />
          </div>
        )
      }
    }
  ]

  useEffect(() => {
    const roleObj = {
      1: 'superadmin',
      2: 'admin',
      3: 'editor'
    }

    axios(`/news?auditState=1&_expand=category`).then((res) => {
      console.log(res.data)
      const list = res.data

      setDataSource(
        roleObj[roleId] === 'superadmin'
          ? list
          : [
              ...list.filter((item) => item.author === username),
              ...list.filter((item) => item.region === region && roleObj[item.roleId] === 'editor')
            ]
      )
    })
  }, [roleId, username, region])

  const adopt = (item, auditState, publishState) => {
    axios
      .patch(`/news/${item.id}`, {
        auditState,
        publishState
      })
      .then((res) => {
        setDataSource(dataSource.filter((data) => data.id !== item.id))
        message.success('操作成功')
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
