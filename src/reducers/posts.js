import { GET_POST, CREATE_POST } from '../actions/types'

const initalState = {
    posts: [],
    loading: true,
}

export default function (state = initalState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_POST:
            return {
                ...state
            }
        case CREATE_POST:
            return {
                ...state
            }
        default:
            return state
    }
}