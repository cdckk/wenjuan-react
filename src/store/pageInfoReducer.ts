import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'

export type PageInfoType = {
    title: string
    desc?: string
    js?: string
    css?: string,
    isPublished?: boolean
}

const INIT_STATE: PageInfoType = {
    title: '',
    desc: '',
    js: '',
    css: '',
    // isPublished: false
}

const pageInfoSlice = createSlice({
    name: 'pageInfo',
    initialState: INIT_STATE,
    reducers: {
        resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
            return action.payload
        },

        // 修改标题
        changePageTitle: (state: PageInfoType, action: PayloadAction<{title: string}>) => {
            const { title } = action.payload
            state.title = title
        },
        // changePageTitle: produce((draft: PageInfoType, action: PayloadAction<string>) => {
        //     console.log('action.payload', draft)
        //     draft.title = action.payload
        // })
    }
})

export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions

export default pageInfoSlice.reducer