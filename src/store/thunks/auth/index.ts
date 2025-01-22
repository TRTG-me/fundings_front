import { createAsyncThunk } from "@reduxjs/toolkit";
import { IloginData, IRegisterData } from "../../../common/types/auth";
import { instance, instanceAuth } from "../../../utils/axios";


export const loginUser = createAsyncThunk(
    'auth/login',
    async (data: IloginData, { rejectWithValue }) => {
        try {
            const user = await instance.post('auth/login', data)
            if (
                user.data.status === 400 ||
                user.data.status === 401 ||
                user.data.status === 500
            )
                return
            sessionStorage.setItem('token', user.data.token)
            sessionStorage.setItem('name', user.data.user.firstName)
            return user.data
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    },
)
export const getPublicUser = createAsyncThunk(
    'auth/get-public-user-info',
   async (_, {rejectWithValue}) => {
        try {
        const user = await instanceAuth.get('auth/get-public-user-info')
        return user.data
        }catch(error:any) {
            if (error.response && error.response.data.message){
              return  rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message)
            }
        }
    }
)
export const registerUser = createAsyncThunk(
    'auth/register',
   async (data: IRegisterData, {rejectWithValue}) => {
        try {console.log("thunk!!!", data)
        const user = await instance.post('auth/register', data)
        console.log("thunk2", data)
        sessionStorage.setItem('token', user.data.token)
        sessionStorage.setItem('name', user.data.user.firstName)
        return user.data
        }catch(error:any) {
            if (error.response && error.response.data.message){
              return  rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message)
            }
        }
    }
)
export const updateUserInfo = createAsyncThunk(
    'users/update',
    async (data: any, { rejectWithValue }) => {
        try {
            const user = await instanceAuth.patch('users', data)
            sessionStorage.setItem('name', user.data.firstName)
            return user.data
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    },
)
export const updateUserPassword = createAsyncThunk(
    'users/change-password',
    async (data: {oldPassword: string, newPassword: string}, { rejectWithValue }) => {
        try {
           return await instanceAuth.patch('users/change-password', data)
            
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    },
)
export const DeleteUser = createAsyncThunk(
    'users/delete-user',
    async (_, { rejectWithValue }) => {
        try {
           return await instanceAuth.delete('users')
            
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    },
)