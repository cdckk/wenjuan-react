import React, { FC, useState } from "react";
import { Outlet } from 'react-router-dom'
import { Typography, Empty, Table, Tag, Button, Space, Modal, Spin, message } from 'antd'
import QuestionCard from "../../components/QuestionCard";
import styles from './List1.module.scss'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from "../../components/ListPage";
import { updateQuestionService, deleteQuestionService } from '../../services/question'
import { useRequest } from 'ahooks'

const { Title } = Typography
const { confirm } = Modal

const rawQuestionList = [
  { id: 'q1', title: '新增问卷4', isPublished: false, isStar: true, answerCount: 5, creatAt: '3月10日 13:23' },
  { id: 'q2', title: '新增问卷2', isPublished: false, isStar: true, answerCount: 5, creatAt: '3月10日 13:23' },
  { id: 'q3', title: '新增问卷3', isPublished: false, isStar: true, answerCount: 5, creatAt: '3月10日 13:23' },
]

const Trash: FC = () => {
  const [questionList, setQuestionList] = useState(rawQuestionList)
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data
  // 选中的id
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // 恢复
  const {run: recover} = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success('恢复成功')
        refresh() // 手动刷新列表
        setSelectedIds([])
      }
    }
  )

  // 删除
  const { run: deleteQuestion } = useRequest(
    async () => await deleteQuestionService(selectedIds),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        refresh()
        setSelectedIds([])
      }
    }
  )

  function del() {
    confirm({
      title: '彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk: deleteQuestion
    })
  }

  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      }
    },
    {
      title: '答卷数量',
      dataIndex: 'answerCount'
    },
    {
      title: '创建时间',
      dataIndex: 'creatAt'
    },

  ]

  const TableElem = <>
    <div style={{ marginBottom: '16px' }}>
      <Space>
        <Button onClick={recover} type="primary" disabled={selectedIds.length === 0}>恢复</Button>
        <Button danger disabled={selectedIds.length === 0} onClick={del}>彻底删除</Button>
      </Space>
    </div>
    <Table
      dataSource={list}
      columns={tableColumns}
      rowKey={(q:any) => q.id}
      rowSelection={{
        type: 'checkbox',
        onChange: (selectedRowKeys) => {
          console.log('selectedRowKeys', selectedRowKeys)
          setSelectedIds(selectedRowKeys as string[])
        }
      }}
    />
  </>

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          {/* (搜索) */}
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && (
          TableElem
        )}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Trash