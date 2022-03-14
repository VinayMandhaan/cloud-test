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
                ...state,
                loading:false,
                posts:payload
            }
        case CREATE_POST:
            console.log(payload)
            return {
                ...state,
                posts: [payload,...state.posts ]
            }
        default:
            return state
    }
}