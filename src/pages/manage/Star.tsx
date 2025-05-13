import React, { FC, useState } from "react";
import { Outlet } from 'react-router-dom'
import { Typography, Empty, Spin, Pagination } from 'antd'
import QuestionCard from "../../components/QuestionCard";
import styles from './List1.module.scss'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from "../../components/ListPage";

const { Title } = Typography

const rawQuestionList = [
  { id: 'q1', title: '新增问卷4', isPublished: false, isStar: true, answerCount: 5, creatAt: '3月10日 13:23' },
  { id: 'q2', title: '新增问卷2', isPublished: false, isStar: true, answerCount: 5, creatAt: '3月10日 13:23' },
  { id: 'q3', title: '新增问卷3', isPublished: false, isStar: true, answerCount: 5, creatAt: '3月10日 13:23' },
]

const Star: FC = () => {
  const [questionList, setQuestionList] = useState(rawQuestionList)
  const { data = {}, loading, error } = useLoadQuestionListData({ isStar: true })
  const { list = [], total = 0 } = data
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
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
        {!loading && list.length === 0 && <Empty description="暂无数据"/>}
        {list.length > 0 && list.map((q: any) => {
          const { id, title, isPublished, isStar, answerCount, creatAt } = q
          return (
            <QuestionCard
              key={id}
              id={id}
              title={title}
              isPublished={isPublished}
              // deleteQuestion={deleteQuestion}
              // publishQuestion={publishQuestion}
              isStar={isStar}
              answerCount={answerCount}
              creatAt={creatAt}
            />
          )
        })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Star