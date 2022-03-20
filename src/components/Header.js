import { React, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput, RadioButton } from 'react-native-paper';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold, useFonts } from '@expo-google-fonts/montserrat'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import Toast from 'react-native-toast-message';
import data from '../../formData.json'
import DatePicker from 'react-native-datepicker'
import * as ImagePicker from 'expo-image-picker';


const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor:'#442445',
        padding:20
    },
    headerText:{
        textAlign:'center',
        color:'white',
        fontWeight:'bold',
        fontSize:18
    }
})

export default Header