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
import Header from '../components/Header';

const Login = (props) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("eve.holt@reqres.in")
  const [password, setPassword] = useState("cityslicka")
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
                <TouchableOpacity onPress={pickImage}>
                  <Text>IMAGE</Text>
                </TouchableOpacity>
              )
            case 'text':
              return (
                <TextInput key={val.id} placeholder={val.placeholder} label={val.label} onChangeText={(e) => onChange(e, val.id, val.placeholder, val.label)} />
              )
            case 'date':
              return <DatePicker date={date} onDateChange={(val) => {
                setState({
                  ...state,
                  ['date']: val
                })
              }} />
            case 'radio':
              return (
                <>
                  {
                    val.options.map((opt, i) => (
                      <>
                        <Text>{opt.label}</Text>
                        <RadioButton
                          key={opt.key}
                          value={opt.key}
                          status={opt.id === index ? 'checked' : 'unchecked'}
                          onPress={() => handleRadio(opt.id)}
                        />
                      </>
                    ))
                  }
                </>
              )
          }
        })
      }
      <TouchableOpacity style={{ backgroundColor: 'red' }} onPress={() => handleSubmit()}>
        <Text>HEY</Text>
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
