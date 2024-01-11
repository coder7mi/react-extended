import React, { useEffect, useState } from 'react'
import { PageHeader, Steps, Button, Form, Input, Select, message, notification } from 'antd'
import style from './NewAdd.module.scss'
import axios from 'axios'
import NewsEditor from '../../../components/news-manage/NewsEditor'

const { Option } = Select

const layout = {
  labelCol: {
    span: 3
  },
  wrapperCol: {
    span: 21
  }
}

export default function NewsAdd(props) {
  /* ----------------------------------- 步骤条 ---------------------------------- */
  const [current, setCurrent] = useState(0)
  const items = [
    {
      title: '基本信息',
      description: '新闻标题，新闻分类'
    },
    {
      title: '新闻内容',
      description: '新闻主题内容'
    },
    {
      title: '新闻提交',
      description: '保存草稿或者提交审核'
    }
  ]

  const next = () => {
    if (current === 0) {
      form
        .validateFields()
        .then((res) => {
          // console.log(res)
          setFormInfo(res)
          setCurrent(current + 1)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      if (editorContent === '' || editorContent === '<p></p>\n') {
        message.error('新闻内容不能为空')
      } else {
        setCurrent(current + 1)
      }
    }
  }

  const previous = () => {
    setCurrent(current - 1)
  }

  /* ----------------------------------- 表单 ----------------------------------- */
  const [categoryList, setCategoryList] = useState([])
  const [form] = Form.useForm()

  const [formInfo, setFormInfo] = useState({})
  const [editorContent, setEditorContent] = useState('')

  const User = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    axios.get('categories').then((res) => {
      console.log(res.data)
      setCategoryList(res.data)
    })
  }, [])

  const onChange = (val) => {
    console.log(val)
  }

  const handleSave = (auditState) => {
    axios
      .post('/news', {
        ...formInfo,
        content: editorContent,
        region: User.region ? User.region : '全球',
        author: User.username,
        roleId: User.roleId,
        auditState: 0,
        publishState: 0,
        createTime: Date.now(),
        star: 0,
        view: 0
        // publishTime: 0
      })
      .then((res) => {
        console.log(res.data)

        notification.info({
          message: `通知`,
          description: `您可以去${auditState === 0 ? '草稿箱' : '审核列表'}查看新闻`,
          placement: 'bottomRight'
        })

        props.history.push(auditState === 0 ? '/news-manage/draft' : '/audit-manage/list')
      })
  }
  return (
    <div>
      <PageHeader title="撰写新闻"></PageHeader>
      <Steps current={current} items={items} />

      <div className={style.content}>
        <div className={current === 0 ? '' : style.active}>
          <Form {...layout} form={form} name="control-hooks">
            <Form.Item
              name="title"
              label="标题"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="categoryId"
              label="新闻分类"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Select placeholder="请选择" onChange={onChange} allowClear>
                {categoryList.map((item) => (
                  <Option value={item.id} key={item.id}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </div>

        <div className={current === 1 ? '' : style.active}>
          <NewsEditor
            getContent={(value) => {
              console.log(value)
              setEditorContent(value)
            }}
          ></NewsEditor>
        </div>

        <div className={current === 2 ? '' : style.active}></div>
      </div>

      <div className="btn">
        {current === 2 && (
          <span>
            <Button type="primary" onClick={() => handleSave(0)}>
              保存草稿
            </Button>
            <Button type="danger" onClick={() => handleSave(1)}>
              提交审核
            </Button>
          </span>
        )}

        {current < 2 && (
          <Button type="primary" onClick={next}>
            下一步
          </Button>
        )}

        {current > 0 && <Button onClick={previous}>上一步</Button>}
      </div>
    </div>
  )
}
