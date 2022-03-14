import { React, useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../actions/posts'
import { Ionicons } from '@expo/vector-icons';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold, useFonts } from '@expo-google-fonts/montserrat'


const Home = (props) => {
    const dispatch = useDispatch()
    let postData = useSelector(state => state.posts.posts);

    const getPostData = () => {
        dispatch(getPosts())
    }

    const renderData = ({ item }) => (
        <View style={styles.postContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.post}>{item.id}.</Text>
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
            <View style={styles.header}>
                <Ionicons name="arrow-back-circle-outline" size={32} color="black" />
                <Text style={styles.mainHeading}>POSTS</Text>
                <Ionicons onPress={()=>props.navigation.navigate('AddPost')} name="add-circle-outline" size={32} color="black" />
            </View>
            <FlatList
                data={postData}
                renderItem={renderData}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
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
        alignItems: 'center', 
        borderRadius: 15, 
        elevation: 2 
    },
    titleContainer: {
        display: 'flex', 
        flexDirection: 'row',
        marginBottom: 10
    },
    post:{
        fontFamily:'Montserrat_700Bold',
        marginRight: 2, 
        textAlign: 'center' 
    },
    postTitle:{
        textAlign: 'center', 
        fontFamily:'Montserrat_600SemiBold'
    },
    postBody:{
        textAlign: 'center',
        fontFamily:'Montserrat_400Regular'
    }

});


export default Home