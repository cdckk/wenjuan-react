import React, {FC, useEffect, useState} from "react";
import { Pagination } from 'antd'
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

type PropsType = {
  total: number
}

const ListPage: FC<PropsType> = (props: PropsType) => {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { total } = props

  const [searchParams] = useSearchParams()

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '') || 1
    setCurrent(page)
    const pageSize = parseInt(searchParams.get('pageSize') || '') || 10
    setPageSize(pageSize)
  }, [searchParams])

  const nav = useNavigate()
  const { pathname } = useLocation()
  // 跳转页面
  function handlePageChange(page: number, pageSize: number) {
    searchParams.set('page', page.toString())
    searchParams.set('pageSize', pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString()
    })
  }

  return <Pagination
    current={current}
    pageSize={pageSize}
    total={total}
    onChange={handlePageChange} />
}

export default ListPage