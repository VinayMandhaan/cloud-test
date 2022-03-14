import { React, useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../actions/posts';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold, useFonts } from '@expo-google-fonts/montserrat'



const AddPost = (props) => {
    const dispatch = useDispatch()
    const [id, setId] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    let postData = useSelector(state => state.posts.posts);

    const addPosts = () => {
        dispatch(addPost(postData.length + 1, title, description))
    }

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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons onPress={() => props.navigation.navigate('Home')} name="arrow-back-circle-outline" size={32} color="black" />
                <Text style={styles.mainHeading}>ADD POSTS</Text>
                <Text></Text>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={{ backgroundColor: 'white' }}
                        mode="outlined"
                        label={"POST TITLE"}
                        value={title}
                        onChangeText={(title) => setTitle(title)}
                        placeholder={"ENTER TITLE"}
                        activeOutlineColor='grey'
                    theme={{ fonts: { regular: { fontFamily: 'Montserrat_400Regular' } } }}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={{ backgroundColor: 'white' }}
                        mode="outlined"
                        label={"POST DESCRIPTION"}
                        value={description}
                        onChangeText={(description) => setDescription(description)}
                        placeholder={"ENTER DESCRIPTION"}
                        activeOutlineColor='grey'
                        multiline={true}
                        numberOfLines={4}
                    theme={{ fonts: { regular: { fontFamily: 'Montserrat_400Regular' } } }}
                    />
                </View>
                <TouchableOpacity onPress={() => addPosts()} style={styles.postButton}>
                    <Text style={styles.btnTxt}>POST</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 20
    },
    mainHeading: {
        fontSize: 18,
        fontFamily:'Montserrat_700Bold'
    },
    inputContainer: {
        margin: 30,
        marginBottom: 10,
        marginTop: 10
    },
    postButton: {
        backgroundColor: 'black',
        padding: 10,
        margin: 30,
        alignItems: 'center',
        borderRadius: 15
    },
    btnTxt: {
        color: 'white',
        fontSize: 16,
        fontFamily:'Montserrat_700Bold'
    }
})

export default AddPost