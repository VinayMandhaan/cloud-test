import { React, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold, useFonts } from '@expo-google-fonts/montserrat'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import Toast from 'react-native-toast-message';




const Login = (props) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("eve.holt@reqres.in")
  const [password, setPassword] = useState("cityslicka")

  let [fontsLoaded, error] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold
  })

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }

  const checkValidation = () => {
    if(validateEmail(email) && email.length > 0 && password.length > 0){
      userLogin()
    }else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Kindly Fill All The Fields'
    });
    }
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


  const userLogin = () => {
    dispatch(login(email,password,props.navigation))
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems:'center' }}>
        <View>
          <TouchableOpacity>
            <Text style={styles.loginHeading}>Login</Text>
            <View style={styles.loginStyle}></View>
          </TouchableOpacity>
        </View>
      </View>


      <View style={{ margin: 40 }}>
        <Text style={styles.mainHeading}>Hello</Text>
        <Text style={styles.subHeading}>Welcome Back</Text>
      </View>
      <View>
        <View>
          <TextInput
            label="Email Address"
            value={email}
            onChangeText={email => setEmail(email)}
            style={{ backgroundColor: 'transparent', margin: 20, fontSize: 16, color: 'grey' }}
            underlineColor='grey'
            activeOutlineColor='black'
            selectionColor='black'
            activeUnderlineColor='black'
            theme={{ fonts: { regular: { fontFamily: 'Montserrat_400Regular' } } }}
          />
        </View>
        <View>
          <TextInput
            label="Password"
            value={password}
            onChangeText={password => setPassword(password)}
            style={{ backgroundColor: 'transparent', margin: 20, fontSize: 16, color: 'grey' }}
            underlineColor='grey'
            activeOutlineColor='black'
            selectionColor='black'
            activeUnderlineColor='black'
            secureTextEntry={true}
            theme={{ fonts: { regular: { fontFamily: 'Montserrat_400Regular' } } }}
          />
        </View>
      </View>
        <TouchableOpacity onPress={()=>checkValidation()} style={styles.btnStyle}>
            <Text style={styles.btnTxt}>SIGN IN</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    minHeight: Math.round(Dimensions.get('window').height)
  },
  loginHeading: {
      fontFamily:'Montserrat_400Regular'
  },
  loginStyle: {
    backgroundColor: 'black', 
    width: 40,
    height: 2, 
    marginTop: 5 
  },
  mainHeading:{
    fontFamily: 'Montserrat_400Regular', 
    fontSize: 28
  },
  subHeading: {
    fontFamily: 'Montserrat_700Bold', 
    fontSize: 28 
  },
  btnStyle: {
    backgroundColor: 'black',
    padding: 15,
    margin: 30,
    alignItems: 'center',
    borderRadius: 15
  },
  btnTxt: {
    color: 'white',
    fontSize: 16,
    fontFamily:'Montserrat_700Bold'
}
});

export default Login
