import React, { FC, MouseEvent } from "react"
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import useGetComponentInfo from "../../../hooks/useGetComponentsInfo"
import { useDispatch } from 'react-redux'
import classnames from 'classnames'

import QuestionTitle from "../../../components/QuestionComponents/QuestionTitle/Component"
import QuestionInput from "../../../components/QuestionComponents/QuestionInput/Component"

import { getComponentConfByType } from '../../../components/QuestionComponents/index' 

import { ComponentInfoType, changeSelectId } from '../../../store/componentsReducer'

import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'
import { moveComponent } from '../../../store/componentsReducer'

type PropsType = {
  loading: boolean
}

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null
  const { Component } = componentConf
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({loading}) => {
  const { componentList, selectId } = useGetComponentInfo()
  console.log('11', componentList, selectId)
  // const componentList = components.componentList
  const dispatch = useDispatch()

  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation() // 组织冒泡
    dispatch(changeSelectId({ componentList, selectId: id, copiedComponent: null }))
  }
  
  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '24px' }}>
      <Spin />
    </div>
  }

  // SortableContainer组件的items属性，需要每个item都有id
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })

  // 拖拽排序结束
  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    console.log('oldIndex, newIndex', oldIndex, newIndex)
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {
          // 隐藏的不显示，过滤一下
          componentList.filter(c => !c.isHidden).map((c) => {
            const { fe_id, isLocked } = c

            // 拼接classnames
            const wrapperDefaultClassName = styles['component-wrapper']
            const selectedClassName = styles.selected
            const lockedClassName = styles.locked
            const  wrapperClassName = classnames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectId,
              [lockedClassName]: isLocked
            })
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  className={wrapperClassName}
                  onClick={(e) => handleClick(e, fe_id)}
                >
                <div className={styles.component}>
                  {genComponent(c)}
                </div>
              </div>
              </SortableItem>
            )
          })
        }
        {/* <div className={styles['component-wrapper']}>
          <div className={styles.component}>
            <QuestionTitle />
          </div>
        </div>
        <div className={styles['component-wrapper']}>
          <div className={styles.component}>
            <QuestionInput />
          </div>
        </div> */}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas