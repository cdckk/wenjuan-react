import React, { FC, useState, useEffect, useRef, useMemo } from "react";
import { produce } from 'immer';
import styles from './List1.module.scss'
import '../../components/QuestionCard'
import QuestionCard from "../../components/QuestionCard";
import { Typography, Spin, Empty } from 'antd'
import ListSearch from '../../components/ListSearch'
import { getQuestionListSerice } from "../../services/question";
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { useSearchParams } from 'react-router-dom'
import { useDebounceFn, useRequest } from 'ahooks'

const { Title } = Typography

const rawQuestionList = [
  { id: 'q1', title: '新增问卷4', isPublished: false, isStar: true, answerCount: 5, creatAt: '3月10日 13:23' },
  { id: 'q2', title: '新增问卷2', isPublished: false, isStar: true, answerCount: 5, creatAt: '3月10日 13:23' },
  { id: 'q3', title: '新增问卷3', isPublished: false, isStar: true, answerCount: 5, creatAt: '3月10日 13:23' },
]

const List2: FC = () => {
  const [questionList, setQuestionList] = useState(rawQuestionList)
  
  // const [list, setList] = useState([])
  // const [total, setTotal] = useState(0)
  // useEffect(() => {
  //   async function load() {
  //     const data = await getQuestionListSerice()
  //     const { list = [], total = 0 } = data
  //     setList(list)
  //     setTotal(total)
  //   }
  //   load()
  // }, [])

  // const { data = {}, loading, error } = useLoadQuestionListData()
  // const { list = [], total = 0 } = data

  const [started, setStarted] = useState(false) // 是否开始加载，防抖有延迟时间
  const [page, setPage] = useState(1)
  const [list, setList] = useState([]) // 全部的累计数据
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length

  const [searhParams] = useSearchParams() // url参数虽然没有page pageSize，但是有keyWord
  const keyword =  searhParams.get('keyword') || ''

  // keyword变化重置信息
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  // 真正加载
  const { run: load, loading } = useRequest(async () => {
    const data = await getQuestionListSerice({
      page,
      pageSize: 10,
      keyword
    })
    return data
  }, {
    manual: true,
    onSuccess(result) {
      const { list: l = [], total = 0 } = result
      setList(list.concat(l)) // 累计
      setTotal(total)
      setPage(page + 1)
    }
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(() => {
    // console.log('tryLoadMore...')
    const elem = containerRef.current
    if (elem == null) return

    const domRect = elem.getBoundingClientRect()
    if (domRect == null) return
    const { bottom } = domRect
    if (bottom <= document.body.clientHeight) {
      console.log('加载')
      load()
      setStarted(true)
    }
  }, {
    wait: 1000
  })

  // 触发加载更多的事件
  // function tryLoadMore() {
  //   console.log('tryLoadMore...')
  // }

  // 当页面加载或者参数变化时或者keyword变化时，触发加载
  useEffect(() => {
    tryLoadMore() // 加载第一页
  }, [searhParams])

  // 页面滚动时，尝试触发加载
  useEffect(() => {
    //还有更多要加载的数据就监听
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      // 解绑事件
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searhParams, haveMoreData])

  // LoadMore Elem
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无更多数据" />
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>开始加载下一页</span>
  }, [started, loading, haveMoreData])
  
  function add() {
    const r = Math.random().toString().slice(-3)
    setQuestionList(produce(draft => {
      draft.push({
        id: 'q' + r,
        title: '新问卷' + r,
        isPublished: false,
        isStar: true, answerCount: 5, creatAt: '3月10日 13:23'
      })
    }))
  }
  function deleteQuestion(id: string) {
    setQuestionList(
      produce(draft => {
        const index = draft.findIndex(q => q.id === id)
        draft.splice(index, 1)
      })
    )
  }
  function publishQuestion(id: string) {
    setQuestionList(
      produce(draft => {
        const q = draft.find(item => item.id === id)
        if (q) q.isPublished = true
      })
    )
  }
  return <div>
    <div className={styles.header}>
      <div className={styles.left}>
        <Title level={3}>我的问卷</Title>
      </div>
      <div className={styles.right}>
        {/* (搜索) */}
        <ListSearch />
      </div>
    </div>
    <div className={styles.content}>
      {/* <div style={{ height: '2000px'}}></div> */}
    {list.length > 0 && list.map((q: any) => {
        const { id, title, isPublished, isStar, answerCount, creatAt } = q
        return (
          <QuestionCard
            key={id}
            id={id}
            title={title}
            isPublished={isPublished}
            deleteQuestion={deleteQuestion}
            publishQuestion={publishQuestion}
            isStar={isStar}
            answerCount={answerCount}
            creatAt={creatAt}
          />
        )
      })}
      {/* {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && list.length > 0 && list.map((q: any) => {
        const { id, title, isPublished, isStar, answerCount, creatAt } = q
        return (
          <QuestionCard
            key={id}
            id={id}
            title={title}
            isPublished={isPublished}
            deleteQuestion={deleteQuestion}
            publishQuestion={publishQuestion}
            isStar={isStar}
            answerCount={answerCount}
            creatAt={creatAt}
          />
        )
      })} */}
    </div>
    <div className={styles.footer}>
      <div ref={containerRef}>
        { LoadMoreContentElem }
      </div>
    </div>
  </div>
}

export default List2;