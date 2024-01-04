import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const PopUp = () => {

    const navigation = useNavigation()

    const navigateToSetting = () => {
        navigation.navigate('Setting')
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={styles.listContainer}>
                    <Text style={styles.text}>New group</Text>

                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.listContainer}>
                    <Text style={styles.text}>New broadcast</Text>

                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.listContainer}>
                    <Text style={styles.text}>Linked devices</Text>

                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.listContainer}>
                    <Text style={styles.text}>Starred message</Text>

                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToSetting}>
                <View style={styles.listContainer}>
                    <Text style={styles.text}>Settings</Text>

                </View>
            </TouchableOpacity>


        </View>
    )
}

export default PopUp

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 100,
        right: 0,
        backgroundColor: '#ffffff',
        width: 160,
        borderRadius: 5,
        paddingVertical: 16
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        // borderWidth: 1,
        // borderColor: "red"
    },
    text: {
        fontSize: 16,
        color: "#000000"
    }
})