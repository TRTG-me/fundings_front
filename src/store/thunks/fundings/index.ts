import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../utils/axios";
import { IRefreshFundings } from "../../../common/types/fundings";

export const deleteBD = createAsyncThunk(
    'deleteBD',
    async (_, { rejectWithValue }) => {
        try {
            await instance.post('/D')

        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }

        }
    }
)
export const fundings = createAsyncThunk(
    'fundings',
    async (data: IRefreshFundings, { rejectWithValue }) => {
        try {
            const fundings = await instance.post('/H', data)
            console.log(fundings.data)
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