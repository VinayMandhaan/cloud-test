import AsyncStorage from '@react-native-async-storage/async-storage'
import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED } from '../actions/types'

const initalState = {
    isAuthenticated: null,
    loading: true,
    user: null,
}

export default function (state = initalState, action) {
    const { type, payload } = action
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                ...payload,
                loading:false,
                isAuthenticated:true
            }
        case LOGIN_SUCCESS:
            AsyncStorage.setItem('user',payload)
            console.log(payload)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
                user:payload.token
            }
        case LOGIN_FAIL:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                loading: false,
            }
        default:
            return state
    }
}