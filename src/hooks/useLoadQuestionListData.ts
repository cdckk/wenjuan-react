import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionListSerice } from '../services/question'
import { LIST_SEARCH_PARAM_KEY } from '../constant/index'

type OptionType = {
  isStar: boolean,
  isDeleted: boolean
}

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const page = parseInt(searchParams.get('page') || '') || 1
      const pageSize = parseInt(searchParams.get('pageSize') || '') || 10
      const data = await getQuestionListSerice({ keyword, isStar, isDeleted, page, pageSize })
      return data
    }, 
    {
      refreshDeps: [searchParams]
    }
  )

  return { data, loading, error, refresh }
}

export default useLoadQuestionListData