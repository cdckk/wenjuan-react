import React, { FC, useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import styles from './QuestionCard.module.scss'
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import { EditOutlined, LineChartOutlined, CopyOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons'
import { updateQuestionService, duplicateQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

type PropsType = {
  id: string,
  title: string,
  isPublished: boolean,
  deleteQuestion?: (id: string) => void,
  publishQuestion?: (id: string) => void,
  isStar: boolean,
  answerCount: number,
  creatAt: string
}

const { confirm } = Modal

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate()
  const { id, title, isPublished, creatAt, answerCount, isStar } = props

  // 修改标星
  const [isStarState, setIsStarState] = useState(isStar)
  const { loading: changeStarLoading, run: changeStar } = useRequest(async () => {
    await updateQuestionService(id, { isStar: !isStarState })
  }, {
    manual: true,
    onSuccess() {
      setIsStarState(!isStarState) //更新state
      message.success('已更新')
    }
  })

  // const duplicate = () => {
  //   message.success('执行复制')
  // }

  const { loading: duplicateLoading, run: duplicate } = useRequest(async () => {
    const data = await duplicateQuestionService(id)
    return data
  }, {
    manual: true,
    onSuccess(result) {  // 注意：前端往后端传，包括服务端返回可以适当用any
      message.success('复制成功')
      nav(`/question/edit/${result.id}`) // 跳转到问卷编辑页
    }
  })

  // 删除
  const [isDeletedState, setIsDeletedState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setIsDeletedState(true)
      }
    }
  )

  const del = () => {
    confirm({
      title: '确定删除该问卷？',
      onOk: () => deleteQuestion()
    })
  }

  // 已经删除不渲染卡片
  if (isDeletedState) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${id}` : `/question/edit/${id}`}>
            <Space>
              { isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
          <span>答卷：{answerCount}</span>
          <span>{creatAt}</span>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
          <div className={styles.left}>
            <Space>
              <Button
                icon={<EditOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/edit/${id}`)}
              >
                编辑问卷
              </Button>
              <Button
                icon={<LineChartOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/stat/${id}`)}
                disabled={!isPublished}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button
                size="small"
                type="text"
                onClick={changeStar}
                disabled={changeStarLoading}
                icon={<StarOutlined />}
              >
                { isStarState ? '取消标星' : '标星' }
              </Button>
              <Popconfirm
                title="确定复制该问卷"
                okText="确定"
                cancelText="取消"
                onConfirm={duplicate}
              >
                <Button
                  size="small"
                  type="text"
                  disabled={duplicateLoading}
                  icon={<CopyOutlined />}
                >
                  复制
                </Button>
              </Popconfirm>
              <Button
                size="small"
                type="text"
                icon={<DeleteOutlined />}
                disabled={deleteLoading}
                onClick={del}
              >
                删除
              </Button>
            </Space>
          </div>
      </div>
    </div>
  )
}

export default QuestionCard