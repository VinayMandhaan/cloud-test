import axios from 'axios'
import { LOGIN_SUCCESS, LOGIN_FAIL } from './types'


export const login = (email,password,navigation) => async dispatch => {
    try {
        const res = await axios({
            method:'POST',
            url:'https://reqres.in/api/login',
            data:{
                email:email,
                password:password
            }
        })
        if(res.data.token){
            dispatch({
                type: LOGIN_SUCCESS,
                payload:res.data
            })
            navigation.navigate('Home')
        }
    } catch (err) {
        console.log(err)
        dispatch({
            type: LOGIN_FAIL
        })
    }
}