import React, { FC } from "react";
import { Outlet, Link } from 'react-router-dom'
import { Typography, Space, Form, Input, Button } from 'antd'
import { UserAddOutlined} from '@ant-design/icons'
import styles from './Register.module.scss'

const { Title } = Typography

const Register: FC = () => {
  const onFinish = (values: any) => {
    console.log(values)
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
          <Input.Password />
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