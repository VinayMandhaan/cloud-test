import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux'
import store from './src/store'
import Routes from './src/routes/Routes';
import Toast from 'react-native-toast-message';
import Home from './src/screens/Home';
import AddPost from './src/screens/AddPost';
import Login from './src/screens/Login';


export default function App() {
  return (
    <Provider store={store}>
    <View style={styles.container}>
      <Login/>
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
