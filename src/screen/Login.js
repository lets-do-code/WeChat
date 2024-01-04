import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useData } from '../context/DataContext';
import { Link, useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Login = () => {

    const { auth, setAuth } = useData()
    const { authUserId, setAuthUserId } = useData()
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const [haveAcc, setHaveAcc] = useState(true)

    const navigation = useNavigation()

    const login_URL = "http://192.168.215.132:8080/login";
    const register_URL = "http://192.168.215.132:8080/register";

    const saveUserId = async (userId) => {
        try {
            await AsyncStorage.setItem('userId', userId.toString());
            setAuthUserId(userId)

            console.log('User ID saved successfully:', userId);
        } catch (error) {
            console.error('Error saving user ID:', error);
        }
    };

    const handleSign = () => {
        setHaveAcc(false)
    }
    const handlelog = () => {
        setHaveAcc(true)
    }

    const handleSignUp = async () => {
        const signupData = {
            name,
            phone,
            password
        };

        console.log(signupData)
        try {
            const response = await axios.post(register_URL, signupData)
            saveUserId(response.data.userId);
            setAuth(true)
        }
        catch (err) {
            console.log(err)
        }


    }


    const handleLogin = async () => {
        const loginData = {
            phone,
            password
        };

        try {
            const response = await fetch(login_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            });


            if (!response.ok) {
                throw new Error(`Invalid password, Status: ${response.status}`);
            }

            const jsonRes = await response.json();
            console.log(jsonRes)
            saveUserId(jsonRes.id);
            setAuth(true)
            console.log(jsonRes.message);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    console.log(authUserId)


    return (
        <View style={styles.container}>
            <Text style={styles.title}>WeChat</Text>
            {haveAcc ? ''
                :
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="grey"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />}
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="grey"
                value={phone}
                onChangeText={(text) => setPhone(text)}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="grey"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
            />

            {haveAcc ? (
                <View style={styles.login} >
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>


                        <Text>Dont have an account? </Text>
                        <Text style={styles.buttonText} onPress={handleSign}>Sign up</Text>
                    </View>
                </View>
            ) :
                (

                    <View style={styles.login} >
                        <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
                            <Text style={styles.buttonText}>Signup</Text>
                        </TouchableOpacity>

                        <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>


                            <Text style={{ textAlign: 'center' }}>Already have an account? </Text>
                            <Text style={styles.buttonText} onPress={handlelog}>log in</Text>
                        </View>
                    </View>
                )
            }


        </View>
    );
};

export default Login;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#000000',
        width: '100%',
        marginBottom: 15,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    loginButton: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        padding: 15,
    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    login: {
        width: '100%',
        alignItems: 'center'
    }
});

