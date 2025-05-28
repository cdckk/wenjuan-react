import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentsStateType, ComponentInfoType } from '../store/componentsReducer'

function useGetComponentInfo() {
  const components = useSelector<StateType>(state => state.components.present) as ComponentsStateType
  // console.log('0000', components)
  const { componentList = [], selectId, copiedComponent } = components

  const selectedComponent = componentList.find(c => c.fe_id === selectId)

  return {
    componentList,
    selectId,
    selectedComponent,
    copiedComponent
  } 
}

export default useGetComponentInfo