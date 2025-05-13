import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import { DeleteOutlined, EyeInvisibleFilled, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { removeSelectedComponent, changeComponentHidden, toggleComponentLocked } from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentsInfo'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectId, selectedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}

  function handleDelete() {
    dispatch(removeSelectedComponent())
  }
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectId, isHidden: true }))
  }
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectId }))
  }
  return <Space>
    <Tooltip title="删除">
      <Button shape='circle' icon={<DeleteOutlined />} onClick={handleDelete}></Button>
    </Tooltip>
    <Tooltip title="隐藏">
      <Button shape='circle' icon={<EyeInvisibleFilled />} onClick={handleHidden}></Button>
    </Tooltip>
    <Tooltip title="锁定">
      <Button
        type={isLocked ? 'primary' : 'default'}
        shape='circle'
        icon={<LockOutlined />}
        onClick={handleLock}
      ></Button>
    </Tooltip>
  </Space>
}

export default EditToolbar