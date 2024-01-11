import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Switch, Form } from 'antd'
import axios from 'axios'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import UserForm from '../../../components/user-manage/UserForm'

const { confirm } = Modal

export default function UserList() {
  const [dataSource, setDataSource] = useState([])

  const { roleId, username, region } = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    const roleObj = {
      1: 'superadmin',
      2: 'admin',
      3: 'editor'
    }

    axios('/users?_expand=role').then((res) => {
      const list = res.data

      setDataSource(
        roleObj[roleId] === 'superadmin'
          ? list
          : [
              ...list.filter((item) => item.username === username),
              ...list.filter((item) => item.region === region && roleObj[item.roleId] === 'editor')
            ]
      )
    })
  }, [roleId, username, region])

  /* --------------------------------- 添加用户模块 --------------------------------- */

  const [open, setOpen] = useState(false)

  const [form] = Form.useForm()

  const [regionList, setRegionList] = useState([])
  const [roleList, setRoleList] = useState([])

  useEffect(() => {
    axios('/regions').then((res) => {
      setRegionList(res.data)
    })
  }, [])

  useEffect(() => {
    axios('/roles').then((res) => {
      setRoleList(res.data)
    })
  }, [])

  const onCreate = (values) => {
    axios
      .post('/users', {
        ...values,
        roleState: true,
        default: false
      })
      .then((res) => {
        console.log(res.data)
        setDataSource([
          ...dataSource,
          {
            ...res.data,
            role: roleList.filter((item) => item.id === values.roleId)[0]
          }
        ])
      })
    setOpen(false)
  }

  const submitForm = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields()
        onCreate(values)
      })
      .catch((info) => {
        console.log(info)
      })
  }

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render: (region) => {
        return region === '' ? '全球' : region
      },
      filters: [
        ...regionList.map((item) => ({
          text: item.title,
          value: item.value
        })),
        {
          text: '全球',
          value: ''
        }
      ],
      onFilter: (value, record) => record.region === value
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => {
        return role.roleName
      }
    },
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, item) => {
        return (
          <Switch
            checked={roleState}
            disabled={item.default}
            onChange={() => changeState(item)}
          ></Switch>
        )
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
              disabled={item.default}
              onClick={() => showDelete(item)}
            />

            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              disabled={item.default}
              onClick={() => showEditForm(item)}
            />
          </div>
        )
      }
    }
  ]

  const changeState = (item) => {
    console.log(item)
    item.roleState = !item.roleState
    setDataSource([...dataSource])
    axios.patch(`/users/${item.id}`, {
      roleState: item.roleState
    })
  }

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
    setDataSource(dataSource.filter((data) => data.id !== item.id))
    axios.delete(`/users/${item.id}`)
  }

  /* --------------------------------- 编辑用户模块 --------------------------------- */
  const [editOpen, setEditOpen] = useState(false)
  const [editDisabled, setEditDisabled] = useState(false)
  const [editId, setEditId] = useState(0)
  const [editForm] = Form.useForm()

  const showEditForm = (item) => {
    console.log(item)
    setEditOpen(true)
    editForm.setFieldsValue({ ...item })
    setEditId(item.id)

    if (item.roleId === 1) {
      setEditDisabled(true)
    } else {
      setEditDisabled(false)
    }
  }

  const submitEditForm = () => {
    editForm
      .validateFields()
      .then((values) => {
        editForm.resetFields()
        setDataSource(
          dataSource.map((item) => {
            if (item.id === editId) {
              return {
                ...item,
                ...values,
                role: roleList.filter((data) => data.id === values.roleId)[0]
              }
            }
            return item
          })
        )
        setEditDisabled(!editDisabled)

        axios.patch(`/users/${editId}`, values)
        setEditOpen(false)
      })
      .catch((info) => {
        console.log(info)
      })
  }

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true)
        }}
      >
        添加用户
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 6 }}
        rowKey={(item) => item.id}
      />

      {/* 添加用户模块 */}
      <Modal
        open={open}
        title="添加用户"
        okText="确认"
        cancelText="取消"
        onCancel={() => {
          setOpen(false)
        }}
        onOk={() => submitForm()}
      >
        <UserForm regionList={regionList} roleList={roleList} form={form}></UserForm>
      </Modal>

      {/* 编辑用户模块 */}
      <Modal
        open={editOpen}
        title="编辑用户"
        okText="确认"
        cancelText="取消"
        onCancel={() => {
          setEditOpen(false)
          setEditDisabled(!editDisabled)
        }}
        onOk={() => submitEditForm()}
      >
        <UserForm
          regionList={regionList}
          roleList={roleList}
          form={editForm}
          editDisabled={editDisabled}
          isEdit={true}
        ></UserForm>
      </Modal>
    </div>
  )
}
