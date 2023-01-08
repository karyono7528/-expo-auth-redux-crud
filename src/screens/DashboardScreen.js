import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import {  useDispatch } from 'react-redux';
import { setSignOut } from '../reducers/authReducer';
// import * as SecureStore from 'expo-secure-store';

const DashboardScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const SignOut = async () => {
        try {
            await SecureStore.deleteItemAsync('token');
            dispatch(setSignOut());            
        } catch (error) {
            console.log("Error : ", error);
        }
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }}>
            <Text>
                Wellcome to Dashboard, 
            </Text>
          
            <TouchableOpacity
                style={{ backgroundColor: 'red', paddingHorizontal: 50, paddingVertical: 15, margin: 10 }}
                onPress={() => dispatch(setSignOut())}
            >
                <Text style={{ color: 'white' }}>Sign out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DashboardScreen
