import React, { FC } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import { Spin } from 'antd'
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import styles from './index.module.scss'
import StatHeader from "./StatHeader";
import ComponentList from './ComponentList'

const Stat: FC = () => {
  const nav = useNavigate()
  const { loading } = useLoadQuestionData()
  const { title, isPublished } = useGetPageInfo()

  // 修改标题
  useTitle(`问卷统计 - ${title}`)

  // loading效果
  const LoadingElem = (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin />
    </div>
  )

  // Content Elem
  const genContentElem = () => {
    // 判断布尔值，防止显示加载中
    if (typeof isPublished === 'boolean' && !isPublished) {
      return <div style={{ flex: '1' }}>
        <Result
        status='warning'
        title='该页面尚未发布'
        extra={
          <Button type="primary" onClick={() => nav(-1)}>
            返回
          </Button>
        }
      >
      </Result>
      </div>
    }

    return <>
      <div className={styles.left}>
        <ComponentList />
      </div>
      <div className={styles.main}>中</div>
      <div className={styles.right}>右</div>
    </>
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <Spin />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles['content-wrapper']}>
        {loading && LoadingElem}
        {!loading && <div className={styles.content}>
          {genContentElem()}
        </div>}
      </div>
    </div>
  )
}

export default Stat