import { createSlice } from "@reduxjs/toolkit";
import { setToken,getToken,clearToken } from "@/utils";
import {loginAPI , getProfileAPI} from '@/api/user'

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    reducers: {
        setUserToken: (state,action) => {
            state.token = action.payload
            setToken(action.payload)
        },
        setUserInfo: (state,action) => {
            state.userInfo = action.payload
        },
        clearUserInfo: (state) => {
            state.token = ''
            state.userInfo = {}
            clearToken()
        }
    }
})

const {setUserToken , setUserInfo , clearUserInfo} = userStore.actions

const userReducer = userStore.reducer

//用户token
const fetchUserToken = (formData) => {
    return async(dispatch) => {
        const res = await loginAPI(formData)
        dispatch(setUserToken(res.data.token))
    }
}
//用户个人信息
const getUserInfo = () => {
    return async(dispatch) => {
        const res = await getProfileAPI()
        dispatch(setUserInfo(res.data))
    }
}
export {fetchUserToken ,  getUserInfo , setUserToken , clearUserInfo}

export default userReducer