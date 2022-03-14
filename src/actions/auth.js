import axios from 'axios'
import { LOGIN_SUCCESS, LOGIN_FAIL } from './types'
import Toast from 'react-native-toast-message';



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
        Toast.show({
            type: 'success',
            text1: 'Login',
            text2: 'User Logged In 👋'
          });
        if(res.data.token){
            Toast.show({
                type: 'success',
                text1: 'Login',
                text2: 'User Logged In 👋'
              });
            dispatch({
                type: LOGIN_SUCCESS,
                payload:res.data
            })
            navigation.navigate('Home')
        }
    } catch (err) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Incorrect Email or Password'
        });
        console.log(err,'ERROR')
        dispatch({
            type: LOGIN_FAIL
        })
    }
}