import react, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Input } from 'antd'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant/index'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const [value, setValue] = useState('')
  const { pathname } = useLocation()

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  // 获取url参数
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(curVal)
  }, [searchParams])

  function handleSearch(value: string) {
    console.log('value', value)
    // 跳转页面
    nav({
      pathname: pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`
    })
  }
  return <Search
    size='large'
    allowClear
    placeholder='输入关键字'
    value={value}
    onChange={handleChange}
    onSearch={handleSearch}
    style={{ width: '200px'}}
  >
  </Search>
}

export default ListSearch