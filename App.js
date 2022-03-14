import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Home from './src/screens/Home';
import { Provider } from 'react-redux'
import store from './src/store'
import AddPosts from './src/screens/AddPost';
import Routes from './src/routes/Routes';

export default function App() {
  return (
    <Provider store={store}>
    <View style={styles.container}>
      <Routes/>
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
