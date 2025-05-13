import React, { FC, useState } from "react";
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button, Space, Divider, message } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './ManageLayout.module.scss'
import { createQuestionSerice } from '../../services/question'
// import '../../_mock/index'

const MainLayout: FC = () => {
  const nav = useNavigate()
  // 可以知道当前是哪个页面
  const { pathname } = useLocation()

  const [ loading, setLoading ] = useState(false)

  async function handleCreateClick() {
    setLoading(true)
    const data = await createQuestionSerice()
    const { id } = data || {}
    if (id) {
      nav(`/question/edit/${id}`)
      message.success('创建成功')
    }
    setLoading(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button disabled={loading} onClick={handleCreateClick} type="primary" size="large" icon={<PlusOutlined></PlusOutlined>}>创建问卷</Button>
          <Divider style={{ borderTop: 'transparent' }}></Divider>
          <Button type={pathname.startsWith('/manage/list2') ? 'default' : 'text'} size="large" icon={<BarsOutlined></BarsOutlined>} onClick={() => nav('/manage/list2')}>我的问卷</Button>
          <Button type={pathname.startsWith('/manage/star') ? 'default' : 'text'} size="large" icon={<StarOutlined />} onClick={() => nav('/manage/star')}>星标问卷</Button>
          <Button type={pathname.startsWith('/manage/trash') ? 'default' : 'text'} size="large" icon={<DeleteOutlined />} onClick={() => nav('/manage/trash')}>回收站</Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default MainLayout