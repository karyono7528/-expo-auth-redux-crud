import { StatusBar, } from 'expo-status-bar';
import React, { useEffect, useMemo, useReducer } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/app/store';
import { Provider } from 'react-redux';
import { AuthContext } from './src/components/context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/SignIn';
import RegisterScreen from './src/screens/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import Post from './src/screens/Post';
import { initialLoginState, loginReducer } from './src/reducers/authReducer';
import { setToken, getToken, removeToken } from './src/utils/secureToken';

export default function App() {

  const Stack = createNativeStackNavigator();

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async foundUser => {
        const userName = foundUser[0].username;
        const userToken = String(foundUser[0].userToken);

        try {
          await setToken(userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'LOGIN', id: userName, token: userToken });
      },
      signOut: async () => {
        try {
          await removeToken();
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'LOGOUT' });
      },
      signUp: () => {
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await getToken();
      } catch (e) {
        console.log(e);
      }
      console.log('user token: ', userToken);
      console.log('user : ', loginState);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {
            loginState.userToken !== null ? (
              <Stack.Navigator initialRouteName='Post'>
                <Stack.Screen name="Post" component={Post} />
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
              </Stack.Navigator>
            )}
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}
