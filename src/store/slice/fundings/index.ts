import { createSlice } from '@reduxjs/toolkit'
import { fundingsRefresh, fundingsStartBD, getCoins, getFavorites, getSettings, getSingle } from '../../thunks/fundings'
import { IAllData } from '../../../common/types/fundings'



const initialState: IAllData = {
    fundings: [[], []],
    isLoading: false,
    favorites: [[], []],
    single: [[], []],
    coins: [],
    settings: []
}

export const fundingsSlice = createSlice({
    name: 'fundings',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fundingsRefresh.fulfilled, (state, action) => {

            state.isLoading = false
            state.fundings = action.payload
        })
        builder.addCase(getSingle.fulfilled, (state, action) => {
            state.single = action.payload
        })
        builder.addCase(fundingsRefresh.pending, (state) => {
            state.isLoading = true

        })
        builder.addCase(fundingsStartBD.fulfilled, (state, action) => {
            state.fundings = action.payload
        })
        builder.addCase(getCoins.fulfilled, (state, action) => {
            state.coins = action.payload
        })
        builder.addCase(getFavorites.fulfilled, (state, action) => {
            state.favorites = action.payload
        }
        )
        builder.addCase(getSettings.fulfilled, (state, action) => {
            state.settings = action.payload
        }
        )

    },
})

// export const { removeFavoriteLocally } = fundingsSlice.actions
// export const { updateFavoritesLocally } = fundingsSlice.actions
export default fundingsSlice.reducer