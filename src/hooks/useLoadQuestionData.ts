import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionSerice } from '../services/question'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentsReducer'
import { resetPageInfo } from '../store/pageInfoReducer'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  // const [ loading, setLoading ] = useState(true)
  // const [ questionData, setQuestionData ] = useState({})

  // useEffect(() => {
  //   async function fn() {
  //     const data = await getQuestionSerice(id)
  //     setQuestionData(data)
  //     setLoading(false)
  //   }
  //   fn()
  // }, [id])

  // return { loading, questionData }

  const { data, loading, error, run } = useRequest(async (id: string) => {
    if (!id) throw new Error('没有问卷 id')
    const data = await getQuestionSerice(id)
    return data
  }, {
    manual: true
  })

  useEffect(() => {
    if (!data) return
    const { title = '', desc = '', js = '', css = '', componentList = [] } = data

    // 获取默认的selectedId
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id // 默认选中第一个组件
    }

    // 把componentList存储到redux中
    dispatch(resetComponents({ componentList, selectId: selectedId, copiedComponent: null }))
  
    // 把pageInfo存储到redux中
    dispatch(resetPageInfo({ title, desc, js, css }))
  }, [data])

  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadQuestionData