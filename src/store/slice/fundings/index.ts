import { createSlice } from '@reduxjs/toolkit'
import { fundingsRefresh, fundingsStartBD, getFavorites } from '../../thunks/fundings'
import { IAllData } from '../../../common/types/fundings'



const initialState: IAllData = {
    fundings: [[], []],
    isLoading: false,
    favorites: []
}

export const fundingsSlice = createSlice({
    name: 'fundings',
    initialState,
    reducers: {
        updateFavoritesLocally: (state, action) => {
            state.favorites.push(action.payload)
        },
        removeFavoriteLocally: (state, action) => {
            state.favorites = state.favorites.filter(fav => fav.coin !== action.payload.coin);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fundingsRefresh.fulfilled, (state, action) => {

            state.isLoading = false
            console.log(action.payload)
            state.fundings = action.payload
        })
        builder.addCase(fundingsRefresh.pending, (state) => {
            state.isLoading = true

        })
        builder.addCase(fundingsStartBD.fulfilled, (state, action) => {
            state.fundings = action.payload
        })
        builder.addCase(getFavorites.fulfilled, (state, action) => {
            state.favorites = action.payload
        }
        )
    },
})

export const { removeFavoriteLocally } = fundingsSlice.actions
export const { updateFavoritesLocally } = fundingsSlice.actions
export default fundingsSlice.reducer