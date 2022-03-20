import { React, useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../actions/posts';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold, useFonts } from '@expo-google-fonts/montserrat'
import Header from '../components/Header';



const AddPost = (props) => {
    const dispatch = useDispatch()
    const [id, setId] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    let postData = useSelector(state => state.posts.posts);

    const addPosts = () => {
        dispatch(addPost(postData.length + 1, title, description, props.navigation))
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
            <Header title="Add Post" />
            <View style={styles.mainContainer}>
                <View style={styles.inputContainer}>
                    <Text style={{ fontWeight: 'bold', margin: 10, color: '#442445' }}>TITLE</Text>
                    <TextInput
                        style={{ borderRadius: 10, backgroundColor: '#f1f2f6', height: 50, padding: 10 }} placeholder={"Enter Title"}
                        onChangeText={(title) => setTitle(title)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={{ fontWeight: 'bold', margin: 10, color: '#442445' }}>Description</Text>
                    <TextInput
                        numberOfLines={4}
                        multiline={true}
                        style={{ borderRadius: 10, backgroundColor: '#f1f2f6', padding: 10 }} placeholder={"Enter Description"}
                        onChangeText={(description) => setDescription(description)}

                    />
                </View>
            </View>
            <View style={{position:'absolute', bottom:20, width:'100%'}}>
                <TouchableOpacity style={{ backgroundColor: '#442445', padding:20, margin:10, alignItems:'center', borderRadius:10 }} onPress={() => handleSubmit()}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
                </TouchableOpacity>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontFamily: 'Montserrat_700Bold'
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
        fontFamily: 'Montserrat_700Bold'
    }
})

export default AddPost