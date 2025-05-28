import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleFilled,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
  UndoOutlined,
  RedoOutlined
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { removeSelectedComponent, changeComponentHidden, toggleComponentLocked, copySelectedComponent, pasteCopiedComponent, moveComponent } from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentsInfo'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectId, componentList, selectedComponent, copiedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}
  const length = componentList.length
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectId)
  const isFirst = selectedIndex <= 0 // 第一个
  const isLast = selectedIndex + 1 >= length // 最后一个

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
  // 上移
  function moveUp() {
    if (isFirst) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
  }
  // 下移
  function moveDown() {
    if (isLast) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
  }
  // undo
  function undo() {
    dispatch(UndoActionCreators.undo())
  }
  // redo
  function redo() {
    dispatch(UndoActionCreators.redo())
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
    <Tooltip title="上移">
      <Button
        shape='circle'
        icon={<UpOutlined />}
        onClick={moveUp}
        disabled={isFirst}
      ></Button>
    </Tooltip>
    <Tooltip title="下移">
      <Button
        shape='circle'
        icon={<DownOutlined />}
        onClick={moveDown}
        disabled={isLast}
      ></Button>
    </Tooltip>
    <Tooltip title="撤销">
      <Button
        shape='circle'
        icon={<UndoOutlined />}
        onClick={undo}
      ></Button>
    </Tooltip>
    <Tooltip title="重做">
      <Button
        shape='circle'
        icon={<RedoOutlined />}
        onClick={redo}
      ></Button>
    </Tooltip>
  </Space>
}

export default EditToolbar