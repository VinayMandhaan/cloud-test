import { React, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { PTSans_400Regular, PTSans_700Bold, useFonts } from '@expo-google-fonts/pt-sans'
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
  const [finalState, setFinalState] = useState({})

  const onChange = (e, id, place, label) => {
    console.log(e, id, place)
    setState({
      ...state,
      [label]: e
    });
  };

  let [fontsLoaded, error] = useFonts({
    PTSans_400Regular,
    PTSans_700Bold
  })

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }

  const handleSubmit = async () => {
    var count = 0;
    var arrayLength = data.length;
    await data.map(val => {
      if (!state[val.label] && val.required) {
        return Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `${val.label} is required.`
        });
      } else {
        count = count + 1
      }
    })

    if (count === arrayLength) {
      userLogin()
    }

  }

  const handleRadio = (id) => {
    if (id === 1) {
      setIndex(1)
      setState({
        ...state,
        "Gender": "Male",
      })
    } else if (id === 2) {
      setIndex(2)
      setState({
        ...state,
        "Gender": "Female",
      })
    }

  }


  const userLogin = () => {
    dispatch(login(state, props.navigation))
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
                <TouchableOpacity style={styles.imgContainer} onPress={pickImage}>
                  <Image style={styles.userImg} source={require('../../assets/avatar.png')} />
                </TouchableOpacity>
              )
            case 'text':
              return (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>{val.label.toUpperCase()}</Text>
                  <TextInput style={styles.inputStyle} key={val.id} placeholder={val.placeholder} onChangeText={(e) => onChange(e, val.id, val.placeholder, val.label)} />
                </View>
              )
            case 'date':
              return (
                <View style={styles.dateContainer}>
                  <Text style={styles.inputLabel}>{val.label.toUpperCase()}</Text>
                  <DatePicker style={styles.dateStyle} placeholder={val.placeholder} onDateChange={(val) => {
                    setState({
                      ...state,
                      "Date of Birth": val
                    })
                  }} />
                </View>
              )
            case 'radio':
              return (
                <View style={styles.radioMainContainer}>
                  <Text style={styles.radioHeadingLabel}>{val.label.toUpperCase()}</Text>
                  <View style={styles.radioContainer}>

                    {
                      val.options.map((opt, i) => (
                        <View style={styles.radioBtn}>
                          <RadioButton
                            key={opt.key}
                            value={opt.key}
                            status={opt.id === index ? 'checked' : 'unchecked'}
                            onPress={() => handleRadio(opt.id)}
                          />
                          <Text style={styles.radioLabel}>{opt.label}</Text>
                        </View>
                      ))
                    }
                  </View>
                </View>
              )
          }
        })
      }
      <TouchableOpacity style={styles.btnContainer} onPress={() => handleSubmit()}>
        <Text style={styles.submitBtn}>Submit</Text>
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
  btnContainer: {
    backgroundColor: '#442445',
    padding: 20,
    margin: 10,
    alignItems: 'center',
    borderRadius: 10
  },
  submitBtn: {
    color: 'white',
    fontFamily: 'PTSans_700Bold'
  },
  radioMainContainer: {
    marginLeft: 10, 
    marginBottom: 5, 
    marginTop: 5, 
    marginRight: 10
  },
  radioHeadingLabel: {
    fontFamily: 'PTSans_700Bold', 
    margin: 8, 
    color: '#442445'
  },
  radioContainer: {
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-evenly'
  },
  radioBtn: {
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginRight: 8
  },
  radioLabel: {
    fontFamily: 'PTSans_400Regular'
  },
  imgContainer: {
    alignItems: 'center', 
    marginTop: 20 
  },
  userImg: {
    width:100,
    height:100
  },
  inputContainer: {
    margin:10
  },
  inputLabel: {
    fontWeight: 'bold', 
    margin: 10, 
    color: '#442445'
  },
  inputStyle: {
    borderRadius: 10, 
    backgroundColor: '#f1f2f6', 
    height: 50, 
    padding: 10
  },
  dateContainer: {
    marginLeft: 10, 
    marginBottom: 5, 
    marginTop: 5, 
    marginRight: 10
  },
  dateStyle: {
    width: '100%', 
    backgroundColor: '#f1f2f6'
  }
});

export default Login
