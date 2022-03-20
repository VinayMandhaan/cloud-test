import { React, useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux'
import store from './src/store'
import Routes from './src/routes/Routes';
import Toast from 'react-native-toast-message';
import Home from './src/screens/Home';
import AddPost from './src/screens/AddPost';
import Login from './src/screens/Login';
import Splash from './src/screens/Splash';


export default function App() {
  const [displaySplash, setDisplaySplash] = useState(true)
  useEffect(() => {
    renderSplash()
  },[])

  const renderSplash = () => {
    setTimeout(() => {
      setDisplaySplash(!displaySplash)
    }, 3000);
  }
  return (
    displaySplash ? <Splash/> :     
    <Provider store={store}>
    <View style={styles.container}>
      <Routes/>
      <Toast />
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:StatusBar.currentHeight,
  },
});
