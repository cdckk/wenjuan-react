import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'

export type StateType = {
  components: ComponentsStateType
}

export default configureStore({
  reducer: {
    // 分模块
    user: userReducer,
    components: componentsReducer
  }
})