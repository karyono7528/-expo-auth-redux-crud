import { StatusBar, } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import Post from './src/screens/Post';

function App() { 

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <Post/>
    </SafeAreaView>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
