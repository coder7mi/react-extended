import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Tree } from 'antd'
import axios from 'axios'
import { DeleteOutlined, UnorderedListOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal

export default function RoleList() {
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
      title: '角色名称',
      dataIndex: 'roleName'
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

            <Button
              type="primary"
              shape="circle"
              icon={<UnorderedListOutlined />}
              onClick={() => showTreeModal(item)}
            />
          </div>
        )
      }
    }
  ]

  useEffect(() => {
    axios('/roles').then((res) => {
      const list = res.data

      setDataSource(list)
    })
  }, [])

  // 显示删除模态框
  const showDelete = (item) => {
    confirm({
      title: '确认删除?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteMethod(item)
      },
      onCancel() {}
    })
  }

  // 确认删除
  const deleteMethod = (item) => {
    setDataSource(dataSource.filter((data) => data.id !== item.id))
    axios.delete(`/roles/${item.id}`)
  }

  /* ---------------------------------- 树型模块 ---------------------------------- */
  const [treeModal, setTreeModal] = useState(false)
  const [treeData, setTreeData] = useState([])
  const [rightList, setRightList] = useState([])
  const [treeId, setTreeId] = useState(0)

  useEffect(() => {
    axios('/rights?_embed=children').then((res) => {
      setTreeData(res.data)
    })
  }, [])

  const showTreeModal = (item) => {
    setTreeModal(true)
    setRightList(item.rights)
    setTreeId(item.id)
  }
  const handleOk = () => {
    console.log(dataSource)
    console.log(rightList)
    setTreeModal(false)
    setDataSource(
      dataSource.map((item) => {
        if (item.id === treeId) {
          return {
            ...item,
            rights: rightList
          }
        }
        return item
      })
    )

    axios.patch(`/roles/${treeId}`, {
      rights: rightList
    })
  }
  const handleCancel = () => {
    setTreeModal(false)
  }

  const onCheck = (checkedKeys) => {
    console.log(checkedKeys)
    setRightList(checkedKeys.checked)
  }

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey={(item) => item.id}
      />

      <Modal title="Basic Modal" open={treeModal} onOk={handleOk} onCancel={handleCancel}>
        <Tree
          checkable
          checkStrictly={true}
          checkedKeys={rightList}
          onCheck={onCheck}
          treeData={treeData}
        />
      </Modal>
    </div>
  )
}
