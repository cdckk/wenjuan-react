import React, { FC, useEffect } from "react";
import { Outlet, Link } from 'react-router-dom'
import { Typography, Space, Form, Input, Button, Checkbox } from 'antd'
import { UserAddOutlined} from '@ant-design/icons'
import styles from './Login.module.scss'

const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUserInfofromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY)
  }
}

const Login: FC = () => {

  const [form] = Form.useForm()

  useEffect(() => {
    const { username, password } = getUserInfofromStorage()
    form.setFieldsValue({ username, password })
  }, [])

  const onFinish = (values: any) => {
    const { username, password, remember } = values || {}
    console.log(values)
    if (values.remember) {
      rememberUser(username, password)
    } else {
      deleteUserFromStorage()
    }
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}><UserAddOutlined /></Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <Form
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }} // 初始化remember为true
        form={form}
      >
        <Form.Item label="用户名" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16  }}>
          <Checkbox>记住我</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16  }}>
          <Space>
            <Button type="primary"htmlType="submit">登录</Button>
            <Link to="/register">注册新用户</Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login