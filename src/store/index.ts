import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'

export type StateType = {
  // components: ComponentsStateType,
  components: StateWithHistory<ComponentsStateType>, // 增加了undo
  pageInfo: PageInfoType
}

export default configureStore({
  reducer: {
    // 分模块
    user: userReducer,
    // 没有undo
    // components: componentsReducer,
    // 增加了undo
    components: undoable(componentsReducer, {
      limit: 20, // 限制undo 20步
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectId',
        'components/changeSelectId',
      ])
    }),
    pageInfo: pageInfoReducer
  }
})