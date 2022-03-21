import { React, useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../actions/posts';
import { PTSans_400Regular, PTSans_700Bold, useFonts } from '@expo-google-fonts/pt-sans'
import Header from '../components/Header';
import Toast from 'react-native-toast-message';


const AddPost = (props) => {
    const dispatch = useDispatch()
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    let postData = useSelector(state => state.posts.posts);

    const addPosts = () => {
        console.log(title.length)
        if (title.length > 0 && description.length > 0) {
            dispatch(addPost(postData.length + 1, title, description, props.navigation))
        } else {
            return Toast.show({
                type: 'error',
                text1: 'Error',
                text2: `Kindly fill all the fields.`
            });
        }
    }

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

    return (
        <View style={styles.container}>
            <Header title="Add Post" />
            <View style={styles.mainContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>TITLE</Text>
                    <TextInput
                        style={styles.inputStyle} placeholder={"Enter Title"}
                        onChangeText={(title) => setTitle(title)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Description</Text>
                    <TextInput
                        numberOfLines={4}
                        multiline={true}
                        style={styles.textStyle} placeholder={"Enter Description"}
                        onChangeText={(description) => setDescription(description)}

                    />
                </View>
            </View>
            <View style={styles.btnMainContainer}>
                <TouchableOpacity style={styles.btnContainer} onPress={() => addPosts()}>
                    <Text style={styles.btnTxt}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        minHeight: Math.round(Dimensions.get('window').height)
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
        fontFamily: 'PTSans_700Bold'
    },
    inputContainer: {
        margin: 10
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
        fontFamily: 'PTSans_700Bold'
    },
    inputLabel: {
        fontFamily:'PTSans_700Bold',
        margin: 10,
        color: '#442445'
    },
    inputStyle: {
        borderRadius: 10,
        backgroundColor: '#f1f2f6',
        height: 50,
        padding: 10
    },
    textStyle: {
        borderRadius: 10, 
        backgroundColor: '#f1f2f6', 
        padding: 10 
    },
    btnMainContainer: {
        position: 'absolute', 
        bottom: 20, 
        width: '100%'
    },
    btnContainer: {
        backgroundColor: '#442445', 
        padding: 20, 
        margin: 10, 
        alignItems: 'center', 
        borderRadius: 10
    },
    btnTxt: {
        color: 'white', 
        fontFamily:'PTSans_700Bold'
    }
})

export default AddPost