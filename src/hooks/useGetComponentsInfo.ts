import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentsStateType, ComponentInfoType } from '../store/componentsReducer'

function useGetComponentInfo() {
  const components = useSelector<StateType>(state => state.components) as ComponentsStateType
  // console.log('0000', components)
  const { componentList = [], selectId } = components

  const selectedComponent = componentList.find(c => c.fe_id === selectId)

  return {
    componentList,
    selectId,
    selectedComponent
  } 
}

export default useGetComponentInfo