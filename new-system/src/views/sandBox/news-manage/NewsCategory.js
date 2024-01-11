import React, { useContext, useEffect, useRef, useState } from 'react'
import { Table, Button, message, Form, Input } from 'antd'
import axios from 'axios'
import { DeleteOutlined } from '@ant-design/icons'

const EditableContext = React.createContext(null)

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef(null)
  const form = useContext(EditableContext)
  useEffect(() => {
    if (editing) {
      inputRef.current.focus()
    }
  }, [editing])
  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    })
  }
  const save = async () => {
    try {
      const values = await form.validateFields()
      toggleEdit()
      handleSave({
        ...record,
        ...values
      })
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }
  let childNode = children
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    )
  }
  return <td {...restProps}>{childNode}</td>
}

export default function NewsCategory() {
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    axios.get('/categories').then((res) => {
      console.log(res.data)
      setDataSource(res.data)
    })
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '栏目名称',
      dataIndex: 'title',
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: 'title',
        title: '栏目名称',
        handleSave
      })
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
              onClick={() => deleteMethod(item)}
            />
          </div>
        )
      }
    }
  ]

  const deleteMethod = (item) => {
    axios
      .delete(
        `/categories/${item.id}
    `
      )
      .then((res) => {
        setDataSource(dataSource.filter((data) => data.id !== item.id))
      })
  }

  const handleSave = (row) => {
    console.log(row)

    setDataSource(
      dataSource.map((item) => {
        if (item.id === row.id) {
          return {
            id: item.id,
            title: row.title,
            value: row.title
          }
        }
        return item
      })
    )

    axios.patch(`/categories/${row.id}`, {
      title: row.title,
      value: row.title
    })
  }

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey={(item) => item.id}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell
          }
        }}
      />
    </div>
  )
}
