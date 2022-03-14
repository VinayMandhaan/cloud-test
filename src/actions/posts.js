import { CREATE_POST, GET_POST } from './types'
import axios from 'axios';


export const getPosts = () => async dispatch => {
    try{
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
            console.log(res.data.length,'POSTS')
            if(res.data.length > 0){
                dispatch({
                    type:GET_POST,
                    payload:res.data
                })
            }
        })
    }catch(err){
        console.log(err)
    }
}

export const addPost = (id,title,desc) => async dispatch => {
    try{
        const data = {
            id:id,
            title:title,
            body:desc
        }
        dispatch({
            type:CREATE_POST,
            payload:data
        })

    }catch(err){
        console.log(err)
    }
}