import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from './utils'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'

export type ComponentInfoType = {
  fe_id: string,
  type: string,
  title: string,
  isHidden?: boolean,
  isLocked?: boolean,
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectId: string,
  componentList: Array<ComponentInfoType>,
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  selectId: '',
  componentList: [],
  copiedComponent: null
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    // 修改selectId
    changeSelectId: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    // changeSelectId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
    //   draft.selectId = action.payload
    // })

    // 添加新组建
    addComponent: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload

      const { selectId, componentList } = state
      const index = componentList.findIndex(c => c.fe_id === selectId)

      // 未选中任何组件
      if (index < 0) {
        state.componentList.push(newComponent)
      } else {
        // 选中了组件，插入到index后面
        state.componentList.splice(index + 1, 0, newComponent)
      }

      state.selectId = newComponent.fe_id
    },

    // 修改组件属性
    changeComponentProps: (state: ComponentsStateType, action: PayloadAction<{ fe_id: string, newProps: ComponentPropsType }>) => {
      const { fe_id, newProps } = action.payload

      const curComp = state.componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.props = {
          ...curComp.props,
          ...newProps
        }
      }
    },

    // 删除
    removeSelectedComponent: (state: ComponentsStateType) => {
      const { selectId: removeId, componentList = [] } = state

      // 重新计算 selectId
      const newSelectedId = getNextSelectedId(removeId, componentList)
      state.selectId = newSelectedId
      const index = componentList.findIndex(c => c.fe_id === removeId)
      componentList.splice(index, 1)
    },

    // 隐藏和显示
    changeComponentHidden: (state: ComponentsStateType, action: PayloadAction<{ fe_id: string, isHidden: boolean }>) => {
      const { componentList = [] } = state
      const { fe_id, isHidden } = action.payload

      // 重新计算 selectId
      let newSelectedId = ''
      if (isHidden) {
        // 要隐藏
        newSelectedId = getNextSelectedId(fe_id, componentList)
      } else {
        // 要显示
        newSelectedId = fe_id
      }
      // const newSelectedId = getNextSelectedId(fe_id, componentList)
      state.selectId = newSelectedId

      const curComp = componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.isHidden = isHidden
      }
    },

    // 锁定/解锁
    toggleComponentLocked: (state: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
      const { fe_id } = action.payload
      const { componentList = [] } = state
      const curComp = componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.isLocked = !curComp.isLocked
      }
    },

    // 拷贝当前选中的组件
    copySelectedComponent: (state: ComponentsStateType) => {
      const { selectId, componentList = [] } = state
      const selectedComponent = componentList.find(c => c.fe_id === selectId)
      if (selectedComponent == null) return
      state.copiedComponent = cloneDeep(selectedComponent) // 深拷贝
    },

    // 粘贴组件
    pasteCopiedComponent: (state: ComponentsStateType) => {
      const { copiedComponent } = state
      if (copiedComponent == null) return
      // 要把fe_id修改了
      copiedComponent.fe_id = nanoid()
      // 插入copiedComponent
      insertNewComponent(state, copiedComponent)
    },

    // 修改组件标题
    changeComponentTitle: (state: ComponentsStateType, action: PayloadAction<{ fe_id: string, title: string }>) => {
      const { fe_id, title } = action.payload
      const curComp = state.componentList.find(c => c.fe_id === fe_id)
      if (curComp) curComp.title = title
    },

    // 移动组件位置
    moveComponent: (state: ComponentsStateType, action: PayloadAction<{ oldIndex: number, newIndex: number }>) => {
      const { componentList: curComponentList } = state
      const { oldIndex, newIndex} = action.payload
      state.componentList = arrayMove(curComponentList, oldIndex, newIndex)
    }
  }
})

export const {
  resetComponents,
  changeSelectId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  changeComponentTitle,
  moveComponent
} = componentsSlice.actions

export default componentsSlice.reducer