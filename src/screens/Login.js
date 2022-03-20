import { React, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold, useFonts } from '@expo-google-fonts/montserrat'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import Toast from 'react-native-toast-message';
import data from '../../formData.json'
import DatePicker from 'react-native-datepicker'
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';

const Login = (props) => {
  const dispatch = useDispatch()
  const [state, setState] = useState({});
  const [date, setDate] = useState(new Date())
  const [index, setIndex] = useState(1)

  const onChange = (e, id, place, label) => {
    console.log(e, id, place)
    setState({
      ...state,
      [label]: e
    });
  };

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

  const handleSubmit = () => {
    data.map(val => {
      if (!state[val.label] && val.required) {
        console.log(`${val.label} is required`)
      }
    })
    console.log(state, 'SATE')
  }

  const handleRadio = (id) => {
    if (id === 1) {
      setIndex(1)
      setState({
        ...state,
        "Female": false,
        "Male": true
      })
    } else if (id === 2) {
      setIndex(2)
      setState({
        ...state,
        "Male": false,
        "Female": true
      })
    }

  }


  const userLogin = () => {
    dispatch(login(email, password, props.navigation))
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setState({
        ...state,
        'image': result.uri
      })
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Personal Info" />
      {
        data.map(val => {
          switch (val.type) {
            case 'image':
              return (
                <TouchableOpacity style={{ alignItems: 'center', marginTop:20 }} onPress={pickImage}>
                  <Image style={{ width: 100, height: 100 }} source={require('../../assets/avatar.png')} />
                </TouchableOpacity>
              )
            case 'text':
              return (
                <View style={{ margin: 10 }}>
                  <Text style={{ fontWeight: 'bold', margin: 10, color: '#442445' }}>{val.label.toUpperCase()}</Text>
                  <TextInput style={{ borderRadius: 10, backgroundColor: '#f1f2f6', height:50, padding:10 }} key={val.id} placeholder={val.placeholder} onChangeText={(e) => onChange(e, val.id, val.placeholder, val.label)} />
                </View>
              ) 
            case 'date':
              return (
              <View style={{marginLeft:10, marginBottom:5 , marginTop:5, marginRight:10}}>
                <Text style={{ fontWeight: 'bold', margin: 10, color: '#442445' }}>{val.label.toUpperCase()}</Text>
                <DatePicker  style={{width:'100%', backgroundColor:'#f1f2f6'}} placeholder={val.placeholder} onDateChange={(val) => {
                  setState({
                    ...state,
                    ['date']: val
                  })
                }} />
              </View>
              ) 
            case 'radio':
              return (
                <View style={{marginLeft:10, marginBottom:5 , marginTop:5, marginRight:10}}>
                  <Text style={{ fontWeight: 'bold', margin: 8, color: '#442445' }}>{val.label.toUpperCase()}</Text>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-evenly'}}>
                  
                  {
                    val.options.map((opt, i) => (
                      <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginRight:8}}>
                        <RadioButton
                          key={opt.key}
                          value={opt.key}
                          status={opt.id === index ? 'checked' : 'unchecked'}
                          onPress={() => handleRadio(opt.id)}
                        />
                        <Text>{opt.label}</Text>
                      </View>
                    ))
                  }
                </View>
                </View>
              )
          }
        })
      }
      <TouchableOpacity style={{ backgroundColor: '#442445', padding:20, margin:10, alignItems:'center', borderRadius:10 }} onPress={() => handleSubmit()}>
        <Text style={{color:'white', fontWeight:'bold'}}>Submit</Text>
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
    fontFamily: 'Montserrat_400Regular'
  },
  loginStyle: {
    backgroundColor: 'black',
    width: 40,
    height: 2,
    marginTop: 5
  },
  mainHeading: {
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
    fontFamily: 'Montserrat_700Bold'
  }
});

export default Login
