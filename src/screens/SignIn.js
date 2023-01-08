
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { Users } from '../model/user';
import { AuthContext } from '../components/context';

const SignIn = () => {   
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useContext(AuthContext);

    const loginHandle = async () => {
        const foundUser = Users.filter(item => {
            return username == item.username && password == item.password;
        });

        if (username.length == 0 || password.length == 0) {
            Alert.alert(
                'Wrong Input!',
                'Username or password field cannot be empty.',
                [{ text: 'Okay' }],
            );
            return;
        }

        if (foundUser?.length == 0) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                { text: 'Okay' },
            ]);
            return;
        }
        try {
            signIn(foundUser);           
        } catch (error) {
            console.log("Error : ", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 20, fontSize: 15 }}>Login Screen</Text>
            <TextInput
                label="Username"
                style={styles.input}
                value={username}
                onChangeText={(text) => setUsername(text)}
                mode="outlined"
            />
            <TextInput
                label="Author"
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                mode="outlined"
            />
            <TouchableOpacity onPress={loginHandle} style={styles.btn}>
                <Text style={styles.text}>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    btn: {
        backgroundColor: 'blue',
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 10
    },
    input: {
        height: 40,
        width: 190,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    text: {
        color: 'white',
        fontSize: 20
    }
})
