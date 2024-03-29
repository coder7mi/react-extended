import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, Modal, Popover, Switch } from 'antd'
import axios from 'axios'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal

export default function RightList() {
  const [dataSource, setDataSource] = useState([])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title'
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key) => {
        return <Tag color="orange">{key}</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <div>
            <Button
              type="danger"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => showDelete(item)}
            />

            <Popover
              content={<Switch checked={item.pagepermisson} onChange={() => switchMethod(item)} />}
              title="配置项"
              trigger={item.pagepermisson === undefined ? '' : 'click'}
            >
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                disabled={item.pagepermisson === undefined}
              />
            </Popover>
          </div>
        )
      }
    }
  ]

  useEffect(() => {
    axios('/rights?_embed=children').then((res) => {
      const list = res.data
      list.forEach((item) => {
        if (item.children.length === 0) {
          item.children = ''
        }
      })
      setDataSource(list)
    })
  }, [])

  // 显示删除模态框
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

  // 确认删除
  const deleteMethod = (item) => {
    if (item.grade === 1) {
      setDataSource(dataSource.filter((data) => data.id !== item.id))
      axios.delete(`/rights/${item.id}`)
    } else {
      let list = dataSource.filter((data) => data.id === item.rightId)
      list[0].children = list[0].children.filter((data) => data.id !== item.id)
      setDataSource([...dataSource])
      axios.delete(`/children/${item.id}`)
    }
  }

  const switchMethod = (item) => {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
    setDataSource([...dataSource])

    if (item.grade === 1) {
      axios.patch(`/rights/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    } else {
      axios.patch(`/children/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    }
  }
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
    </div>
  )
}
