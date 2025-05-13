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
    dispatch(changeSelectId({ componentList, selectId: id }))
  }
  
  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '24px' }}>
      <Spin />
    </div>
  }
  return <div className={styles.canvas}>
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
        return <div
            key={fe_id}
            className={wrapperClassName}
            onClick={(e) => handleClick(e, fe_id)}
          >
          <div className={styles.component}>
            {genComponent(c)}
          </div>
        </div>
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
}

export default EditCanvas