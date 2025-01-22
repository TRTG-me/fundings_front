import { createSlice } from '@reduxjs/toolkit'
import { fundings } from '../thunks/fundings'

const initialState: any = {
    fundings: [],
}

export const fundingsSlice = createSlice({
    name: 'fundings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fundings.fulfilled, (state, action) => {
            state.fundings = action.payload
        })
    },
})

export default fundingsSlice.reducer