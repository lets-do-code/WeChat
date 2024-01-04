import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather, MaterialIcons, MaterialCommunityIcons } from "react-native-vector-icons"
import { useData } from "../context/DataContext"
import { useNavigation } from '@react-navigation/native'
const header = () => {

    const { popUp, setPopUp } = useData()
    const navigation = useNavigation()
    const handleCamera = () => {
        navigation.navigate('Camera')
    }
    const handlePopUp = () => {
        setPopUp(!popUp)
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>WeChat</Text>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={handleCamera}>
                        <Feather name='camera' size={22} color='#000000' style={styles.icon} />
                    </TouchableOpacity>
                    <MaterialIcons name='search' size={22} color='#000000' style={styles.icon} />
                    <TouchableOpacity onPress={handlePopUp}>
                        <MaterialCommunityIcons name='dots-vertical' size={22} color='#000000' style={styles.icon} />

                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default header

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        paddingTop: 60,
        paddingBottom: 8,

    },
    headerContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16
    },

    headerText: {
        fontSize: 22,
        fontWeight: '500',
        color: '#000000',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginLeft: 20
    }
})