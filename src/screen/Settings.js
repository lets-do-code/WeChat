import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons, MaterialIcons, MaterialCommunityIcons, EvilIcons } from "react-native-vector-icons"
import { useNavigation } from '@react-navigation/native'
import { useData } from '../context/DataContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Settings = () => {

    const { auth, setAuth } = useData()
    const { authUserProfileData, setAuthUserProfileData } = useData()
    const { authUserId, setAuthUserId } = useData()
    const navigation = useNavigation()

    const removeUserId = async () => {
        try {
            await AsyncStorage.removeItem('userId');
            setAuthUserId(null);

            console.log('User ID removed from AsyncStorage');
        } catch (error) {
            console.error('Error removing user ID:', error);
        }
    };
    const handleLogout = () => {
        setAuth(false);
        removeUserId()
        navigation.navigate("Login")
    }

    const goBack = () => {
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <View style={styles.headercontent}>
                <View style={styles.headerContainer}>
                    <View style={styles.nameContainer}>
                        <TouchableOpacity onPress={goBack}>
                            <MaterialIcons name='arrow-back' size={22} color='#000000' />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconContainer}>
                        <View style={styles.header}>
                            <TouchableOpacity>
                                <Text style={styles.headerText}>Settings</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerIcon}>
                            <Ionicons name='search' size={22} color='#000000' style={styles.icon} />
                        </View>
                    </View>
                </View>
            </View>


            <View>

                <TouchableOpacity style={styles.logoutContainer}>

                    <EvilIcons name='user' size={30} color='grey' style={styles.profileIcon} />
                    <Text style={styles.logout}>{authUserProfileData.phone}</Text>

                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutContainer}>

                    <MaterialCommunityIcons name='logout' size={22} color='grey' style={styles.logoutIcon} />
                    <Text style={styles.logout}>Log out</Text>

                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({

    container: {
        flex: 1
    },

    headercontent: {
        backgroundColor: '#ffffff',
        paddingTop: 40,

    },

    headerContainer: {
        height: 60,
        flexDirection: 'row',
        alignContent: 'center',
        marginHorizontal: 16,

    },

    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        flex: 1,
        marginLeft: 10
    },
    headerText: {
        fontSize: 22,
        fontWeight: '400',
        color: '#000000',
    },

    headerIcon: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    logoutContainer: {
        margin: 16,
        flexDirection: 'row',
    },
    logout: {
        marginLeft: 10,
        color: 'grey',
        fontSize: 20,
        fontWeight: '600'
    },
    logoutIcon: {
        transform: [{ rotate: '180deg' }],
    }


})