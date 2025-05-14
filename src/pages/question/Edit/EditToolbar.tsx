import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import { DeleteOutlined, EyeInvisibleFilled, LockOutlined, CopyOutlined, BlockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { removeSelectedComponent, changeComponentHidden, toggleComponentLocked, copySelectedComponent, pasteCopiedComponent } from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentsInfo'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectId, selectedComponent, copiedComponent } = useGetComponentInfo()
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
  // 复制
  function copy() {
    dispatch(copySelectedComponent())
  }
  // 粘贴
  function paste() {
    dispatch(pasteCopiedComponent())
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
    <Tooltip title="复制">
      <Button shape='circle' icon={<CopyOutlined />} onClick={copy}></Button>
    </Tooltip>
    <Tooltip title="粘贴">
      <Button
        shape='circle'
        icon={<BlockOutlined />}
        onClick={paste}
        disabled={copiedComponent == null}
      ></Button>
    </Tooltip>
  </Space>
}

export default EditToolbar