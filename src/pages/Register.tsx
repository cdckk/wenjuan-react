import React, { FC } from "react";
import { Outlet, Link } from 'react-router-dom'
import { Typography, Space, Form, Input, Button, message } from 'antd'
import { UserAddOutlined} from '@ant-design/icons'
import styles from './Register.module.scss'
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";

const { Title } = Typography

const Register: FC = () => {
  const nav = useNavigate()

  const onFinish = (values: any) => {
    console.log(values)
    const params = {
      username: values.username,
      password: values.password,
      nickname: values.nickname
    }
    register(params).then(res => {
      if (res.errno === 0) {
        message.success('注册成功，请登录')
        nav('/login')
      }
    })
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}><UserAddOutlined /></Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <Form
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item label="用户名" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item label="确认密码" name="confirm">
          <Input.Password />
        </Form.Item>
        <Form.Item label="昵称" name="nickname">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16  }}>
          <Space>
            <Button type="primary"htmlType="submit">注册</Button>
            <Link to="/login">已有账户请登录</Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register