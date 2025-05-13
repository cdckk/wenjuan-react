import React, { FC } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentsInfo";
import { getComponentConfByType, ComponentPropsType } from "../../../components/QuestionComponents";
import { changeComponentProps } from "../../../store/componentsReducer";
import { useDispatch } from 'react-redux'

const NoProp:FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp:FC = () => {
  const dispatch = useDispatch()
  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null) return <NoProp />
  const { type, props, isLocked } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return <NoProp />

  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return
    const { fe_id } = selectedComponent

    console.log('newProps', fe_id, newProps)

    dispatch(changeComponentProps({fe_id, newProps}))
  }

  const { PropComponent } = componentConf
  return <PropComponent {...props} onChange={changeProps} disabled={isLocked} />
}

export default ComponentProp