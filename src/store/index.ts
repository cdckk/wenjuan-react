import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'

export type StateType = {
  components: ComponentsStateType,
  pageInfo: PageInfoType
}

export default configureStore({
  reducer: {
    // 分模块
    user: userReducer,
    components: componentsReducer,
    pageInfo: pageInfoReducer
  }
})