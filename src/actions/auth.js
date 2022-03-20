import axios from 'axios'
import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED } from './types'
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage'


export const loadUser = () => async dispatch => {
    try{
        var userData =  await AsyncStorage.getItem('user')
        if(userData){
            dispatch({
                type:USER_LOADED,
                payload:userData
            })
        }
    }catch(err){
        console.log(err)
    }
}


export const login = (data, navigation) => async dispatch => {
    try {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: JSON.stringify(data)
        })
        Toast.show({
            type: 'success',
            text1: 'Login',
            text2: 'User Logged In 👋'
        });
        navigation.navigate('Home')
    } catch (err) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Incorrect Email or Password'
        });
        console.log(err, 'ERROR')
        dispatch({
            type: LOGIN_FAIL
        })
    }
}