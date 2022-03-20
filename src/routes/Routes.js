import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux'
import Home from '../screens/Home';
import AddPost from '../screens/AddPost';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();


const Routes = () => {
    let isAuth = useSelector(state => state.auth.isAuthenticated);
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    isAuth ? (
                        <>
                            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                            <Stack.Screen name="AddPost" component={AddPost} options={{ headerShown: false }} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes