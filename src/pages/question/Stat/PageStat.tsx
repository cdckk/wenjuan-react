import React, { FC, useState } from 'react'
import { getQuestionStatListService } from '../../../services/stat'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { Typography, Spin } from 'antd'
import { divide } from 'lodash'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

const PageStat: FC<PropsType> = (props: PropsType) => {
  const { id = '' } = useParams()
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])
  const {} = props
  const { loading } = useRequest(async () => {
    const res = await getQuestionStatListService(id, { page: 1, pageSize: 10 })
    return res
  }, {
    onSuccess(res) {
      const { total, list = [] } = res
      setTotal(total)
      setList(list)
    }
  })

  return <div>
    <Title level={3}>答卷数量：{!loading && total}</Title>
    {loading && (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    )}
  </div>
}

export default PageStat