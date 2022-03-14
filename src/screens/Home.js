import { React, useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../actions/posts'


const Home = () => {
    const dispatch = useDispatch()
    let postData = useSelector(state => state.posts.posts);

    const getPostData = () => {
        dispatch(getPosts())
    }

    const renderData = ({ item }) => (
        <View style={{ backgroundColor: 'white', margin: 20, padding: 15, alignItems: 'center', borderRadius:15, elevation:2 }}>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom:10 }}>
                <Text style={{ fontWeight: 'bold', marginRight: 2, textAlign: 'center' }}>{item.id}.</Text>
                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{item.title.toUpperCase()}</Text>
            </View>
            <Text style={{ textAlign: 'center' }}>{item.body}</Text>
        </View>
    )

    useEffect(() => {
        getPostData()
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>POSTS</Text>
            </View>
            <FlatList
                data={postData}
                renderItem={renderData}
            />
        </View>
    )
}

export default Home