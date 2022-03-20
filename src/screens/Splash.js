import { React, useContext, useState } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native'
import { useEffect } from 'react/cjs/react.production.min'

const Splash = (props) => {
    const windowWidth = Dimensions.get("window").width
    const windowHeight = Dimensions.get("window").height

    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            <ImageBackground source={require('../../assets/background.jpeg')} imageStyle={{ opacity: 0.3 }} style={{ width: windowWidth, height: windowHeight, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ margin: 20 }}>
                    <Image style={{width:120, height:120}} source={require('../../assets/logo.png')}/>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Splash