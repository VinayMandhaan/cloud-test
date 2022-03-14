import { LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/types'

const initalState = {
    isAuthenticated: null,
    loading: true,
    user: null,
}

export default function (state = initalState, action) {
    const { type, payload } = action
    switch (type) {
        case LOGIN_SUCCESS:
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