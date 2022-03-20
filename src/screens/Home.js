import { React, useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../actions/posts'
import { Ionicons } from '@expo/vector-icons';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold, useFonts } from '@expo-google-fonts/montserrat'
import Header from '../components/Header';


const Home = (props) => {
    const dispatch = useDispatch()
    let postData = useSelector(state => state.posts.posts);

    const getPostData = () => {
        dispatch(getPosts())
    }

    const renderData = ({ item }) => (
        <View style={styles.postContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.postTitle}>{item.title.toUpperCase()}</Text>
            </View>
            <Text style={styles.postBody}>{item.body}</Text>
        </View>
    )

    useEffect(() => {
        getPostData()
    }, [])

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
            <Header title="Home"/>
            <FlatList
                data={postData}
                renderItem={renderData}
            />
      <TouchableOpacity style={{ backgroundColor: '#442445', padding:20, margin:10, alignItems:'center', borderRadius:10 }} onPress={() => handleSubmit()}>
        <Text style={{color:'white', fontWeight:'bold'}}>Add New Post</Text>
      </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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
        fontFamily:'Montserrat_700Bold',
    },
    postContainer: {
        backgroundColor: 'white', 
        margin: 20, 
        padding: 15, 
        borderColor:'#442445',
        borderWidth:2
    },
    titleContainer: {
        display: 'flex', 
        marginBottom: 10
    },
    post:{
        fontFamily:'Montserrat_700Bold',
        marginRight: 2, 
        textAlign: 'center' 
    },
    postTitle:{
        color:'black',
        fontFamily:'Montserrat_600SemiBold'
    },
    postBody:{
        fontFamily:'Montserrat_400Regular'
    }

});


export default Home