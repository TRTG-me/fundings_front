import { createSlice } from '@reduxjs/toolkit'

import { getWatchlistElements } from '../../thunks/watchlist'

const initialState: any = {
    assets: [],
}

export const watchListSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getWatchlistElements.fulfilled, (state, action) => {
            state.assets= action.payload
        })
     
    },
})

export default watchListSlice.reducer