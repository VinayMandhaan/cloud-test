import { React, useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../actions/posts'
import { Ionicons } from '@expo/vector-icons';


const Home = () => {
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


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="arrow-back-circle-outline" size={32} color="black" />
                <Text style={styles.mainHeading}>POSTS</Text>
                <Ionicons name="add-circle-outline" size={32} color="black" />
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
        fontWeight: 'bold'
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
        fontWeight: 'bold', marginRight: 2, textAlign: 'center' 
    },
    postTitle:{
        textAlign: 'center', fontWeight: 'bold'
    },
    postBody:{
        textAlign: 'center'
    }

});


export default Home