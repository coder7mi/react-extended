import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, Modal, notification } from 'antd'
import axios from 'axios'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  UploadOutlined
} from '@ant-design/icons'

const { confirm } = Modal

export default function NewsDraft(props) {
  const [dataSource, setDataSource] = useState([])
  const { username } = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    axios.get(`/news?author=${username}&auditState=0&_expand=category`).then((res) => {
      setDataSource(res.data)
    })
  }, [username])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '新闻标题',
      dataIndex: 'title',
      render: (title, { id }) => {
        return (
          <span
            style={{ color: 'orange', cursor: 'pointer' }}
            onClick={() => {
              props.history.push(`/news-manage/preview/${id}`)
            }}
          >
            {title}
          </span>
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
        return <Tag color="green">{category.title}</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <div>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => showDelete(item)}
            />

            <Button
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                props.history.push(`/news-manage/update/${item.id}`)
              }}
            />

            <Button
              type="primary"
              shape="circle"
              icon={<UploadOutlined />}
              onClick={() => {
                handleAudit(item.id)
              }}
            />
          </div>
        )
      }
    }
  ]

  /* ---------------------------------- 删除按钮 ---------------------------------- */
  const showDelete = (item) => {
    confirm({
      title: '确认删除?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log('OK')
        deleteMethod(item)
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  const deleteMethod = (item) => {
    setDataSource(dataSource.filter((data) => data.id !== item.id))
    axios.delete(`/news/${item.id}`)
  }

  /* ---------------------------------- 编辑按钮 ---------------------------------- */

  /* ---------------------------------- 审核按钮 ---------------------------------- */
  const handleAudit = (id) => {
    axios
      .patch(`/news/${id}`, {
        auditState: 1
      })
      .then((res) => {
        notification.info({
          message: `通知`,
          description: `您可以去审核列表查看新闻`,
          placement: 'bottomRight'
        })

        props.history.push('/audit-manage/list')
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
