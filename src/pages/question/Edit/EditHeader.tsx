import React, { FC, useState, ChangeEvent, useEffect } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Typography, Space, Input, message } from 'antd'
import { LeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import useGetComponentInfo from '../../../hooks/useGetComponentsInfo'
import { changePageTitle } from '../../../store/pageInfoReducer'
import { useDispatch } from 'react-redux'
import { updateQuestionService } from '../../../services/question'
import { useRequest, useDebounceEffect, useKeyPress } from 'ahooks'

const { Title } = Typography

// 显示和修改标题
const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
  const [editState, setEditState] = useState(false)
  const dispatch = useDispatch()

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    dispatch(changePageTitle({ title: newTitle }))
  }

  if (editState) {
    return (
      <Input
        value={title}
        onChange={handleChange}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
      />
    )
  }

  return <Space>
    <Title>{title}</Title>
    <Button icon={<EditOutlined />} type='text' onClick={() => setEditState(true)} />
  </Space>
}

// 保存按钮
const SaveButton: FC = () => {
  const { id } = useParams()
  const { componentList = []} = useGetComponentInfo()
  const pageInfo = useGetPageInfo()

  const { loading, run: save } = useRequest(async () => {
    if (!id) return
    await updateQuestionService(id, { ...pageInfo, componentList })
  }, { manual: true })

  // 快捷键
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })

  // 自动保存 (effect加防抖)，不是定期保存，是自动保存
  useDebounceEffect(() => {
      save()
    }, 
    [componentList, pageInfo],
    { wait: 1000 }
  )

  return <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
    保存
  </Button>
}

// 发布按钮
const PublishButton: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { componentList = []} = useGetComponentInfo()
  const pageInfo = useGetPageInfo()

  const { loading, run: pub } = useRequest(async () => {
    if (!id) return
    await updateQuestionService(id, {
      ...pageInfo,
      componentList,
      isPublished: true // 标志着问卷已经被发布
    })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        nav('/question/stat/' + id) // 发布成功，跳转统计页面
      }
    }
  )

  return <Button type='primary' onClick={pub} disabled={loading}>发布</Button>
}

// 编辑器头部
const EditHeader: FC = () => {
  const nav = useNavigate()
  return <div className={styles['header-wrap']}>
    <div className={styles.header}>
      <div className={styles.left}>
        <Space>
          <Button type='link' icon={<LeftOutlined />} onClick={() => nav(-1)}>返回</Button>
          <TitleElem />
          {/* <Title>问卷标题</Title> */}
        </Space>
      </div>
      <div className={styles.main}>
        <EditToolbar />
      </div>
      <div className={styles.right}>
        <Space>
          {/* <Button>保存</Button> */}
          <SaveButton />
          <PublishButton />
        </Space>
      </div>
    </div>
  </div>
}

export default EditHeader