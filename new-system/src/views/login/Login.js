import React, { useCallback } from 'react'
import style from './Login.module.scss'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import axios from 'axios'

import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

export default function Login(props) {
  const onFinish = (values) => {
    console.log(values)
    axios
      .get(
        `/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`
      )
      .then((res) => {
        console.log(res.data)
        if (res.data.length === 0) {
          message.error('用户名或密码错误')
        } else {
          localStorage.setItem('token', JSON.stringify(res.data[0]))
          props.history.push('/')
        }
      })
  }

  const config = {
    fullScreen: {
      zIndex: 1
    },
    background: {
      color: 'transparent'
    },
    emitters: {
      life: {
        count: 0,
        duration: 0.1,
        delay: 0.4
      },
      rate: {
        delay: 0.1,
        quantity: 150
      },
      size: {
        width: 0,
        height: 0
      }
    },
    particles: {
      color: {
        value: ['#1E00FF', '#FF0061', '#E1FF00', '#00FF9E']
      },
      move: {
        enable: true,
        gravity: {
          enable: true,
          acceleration: 10
        },
        speed: {
          min: 10,
          max: 20
        },
        decay: 0.1,
        direction: 'none',
        straight: false,
        outModes: {
          default: 'destroy',
          top: 'none'
        }
      },
      number: {
        value: 0
      },
      opacity: {
        value: 1,
        animation: {
          enable: true,
          minimumValue: 0,
          speed: 2,
          startValue: 'max',
          destroy: 'min'
        }
      },
      rotate: {
        value: {
          min: 0,
          max: 360
        },
        direction: 'random',
        animation: {
          enable: true,
          speed: 30
        }
      },
      tilt: {
        direction: 'random',
        enable: true,
        value: {
          min: 0,
          max: 360
        },
        animation: {
          enable: true,
          speed: 30
        }
      },
      size: {
        value: 10,
        random: {
          enable: true,
          minimumValue: 2
        }
      },
      shape: {
        type: ['circle', 'square'],
        options: {}
      }
    }
  }

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine)
  }, [])

  return (
    <div className={style.wrap}>
      <Particles options={config} init={particlesInit} />

      <div className={style.content}>
        <div className={style.title}>全球新闻发布系统</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={style['login-form-button']}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
