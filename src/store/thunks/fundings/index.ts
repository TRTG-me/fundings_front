import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../utils/axios";
import { IRefreshFundings } from "../../../common/types/fundings";

export const deleteBD = createAsyncThunk(
    'deleteBD',
    async (_, { rejectWithValue }) => {
        try {
            await instance.get('/deleteBD')

        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }

        }
    }
)
export const fundingsRefresh = createAsyncThunk(
    'fundingsRefresh',
    async (data: { days: number }, { rejectWithValue }) => {
        try {
            const fundings = await instance.post('/refresh', data)
            return fundings.data

        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }

        }
    }
)
export const fundingsStartBD = createAsyncThunk(
    'fundingsStartBD',
    async (_, { rejectWithValue }) => {
        try {
            const fundings = await instance.get('/getBD')
            return fundings.data

        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }

        }
    }
)
export const getFavorites = createAsyncThunk(
    'getFavorites',
    async (_, { rejectWithValue }) => {
        try {
            const fundings = await instance.get('/getFavorites')
            return fundings.data

        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }

        }
    }
)

export const addFavorites = createAsyncThunk(
    'addFavorites',
    async (data: { coin: string }, { rejectWithValue }) => {
        try {
            await instance.post('/addFavor', data)


        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }

        }
    }
)
export const deleteFavorites = createAsyncThunk(
    'deleteFavorites',
    async (data: { coin: string }, { rejectWithValue }) => {
        try {
            await instance.post('/deleteFavor', data)


        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }

        }
    }
)
export const getSingle = createAsyncThunk(
    'getSingle',
    async (data: { coin: string }, { rejectWithValue }) => {
        try {
            const fundings = await instance.post('/singleElement', data)

            return fundings.data

        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }

        }
    }
)
export const getCoins = createAsyncThunk(
    'getCoins',
    async (_, { rejectWithValue }) => {
        try {
            const fundings = await instance.get('/getCoins')
            return fundings.data

        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }

        }
    }
)
export const getSettings = createAsyncThunk(
    'getSettings',
    async (_, { rejectWithValue }) => {
        try {
            const fundings = await instance.get('/getSettings')
            return fundings.data

        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }

        }
    }
)