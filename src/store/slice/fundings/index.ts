import { createSlice } from '@reduxjs/toolkit'
import { fundingsRefresh, fundingsStartBD } from '../../thunks/fundings'
import { IAllData } from '../../../common/types/fundings'



const initialState: IAllData = {
    fundings: [[], []],
    isLoading: false
}

export const fundingsSlice = createSlice({
    name: 'fundings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fundingsRefresh.fulfilled, (state, action) => {

            state.isLoading = false
            console.log(action.payload)
            state.fundings = action.payload
        })
        builder.addCase(fundingsRefresh.pending, (state, action) => {
            state.isLoading = true

        })
        builder.addCase(fundingsStartBD.fulfilled, (state, action) => {
            state.fundings = action.payload
        })
    },
})



export default fundingsSlice.reducer