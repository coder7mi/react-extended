import React, { useState, useEffect } from 'react'
import { Form, Input, Select } from 'antd'

const { Option } = Select

export default function UserForm({ regionList, roleList, form, editDisabled, isEdit }) {
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    setIsDisabled(editDisabled)
  }, [editDisabled])

  const roleChange = (value) => {
    if (value === 1) {
      setIsDisabled(true)
      form.setFieldsValue({ region: '' })
    } else {
      setIsDisabled(false)
    }
  }

  const { roleId, region } = JSON.parse(localStorage.getItem('token'))

  const roleObj = {
    1: 'superadmin',
    2: 'admin',
    3: 'editor'
  }

  const checkRegionDisabled = (item) => {
    if (isEdit) {
      if (roleObj[roleId] === 'superadmin') {
        return false
      } else {
        return true
      }
    } else {
      if (roleObj[roleId] === 'superadmin') {
        return false
      } else {
        return item.value !== region
      }
    }
  }

  const checkRoleDisabled = (item) => {
    if (isEdit) {
      if (roleObj[roleId] === 'superadmin') {
        return false
      } else {
        return true
      }
    } else {
      if (roleObj[roleId] === 'superadmin') {
        return false
      } else {
        return roleObj[item.id] !== 'editor'
      }
    }
  }

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="username"
        label="用户名"
        rules={[
          {
            required: true,
            message: '请输入'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: '请输入'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="region"
        label="区域"
        rules={
          isDisabled
            ? []
            : [
                {
                  required: true,
                  message: '请选择'
                }
              ]
        }
      >
        <Select disabled={isDisabled}>
          {regionList.map((item) => {
            return (
              <Option value={item.value} key={item.id} disabled={checkRegionDisabled(item)}>
                {item.title}
              </Option>
            )
          })}
        </Select>
      </Form.Item>

      <Form.Item
        name="roleId"
        label="角色"
        rules={[
          {
            required: true,
            message: '请输入'
          }
        ]}
      >
        <Select onChange={(value) => roleChange(value)}>
          {roleList.map((item) => {
            return (
              <Option value={item.roleType} key={item.id} disabled={checkRoleDisabled(item)}>
                {item.roleName}
              </Option>
            )
          })}
        </Select>
      </Form.Item>
    </Form>
  )
}
