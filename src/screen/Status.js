import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontAwesome5 } from "react-native-vector-icons"
import { useNavigation } from '@react-navigation/native'
import StatusData from "../data/StatusData"
const Status = () => {

    const [statusData, setStatusData] = useState(StatusData)

    const navigation = useNavigation()

    useEffect(() => {
        setStatusData(StatusData)
    }, [])


    const handleCameraStatus = () => {
        navigation.navigate('Camera')
        console.warn("Camera status")
    }
    const handleWriteStatus = () => {
        console.warn("Write status")
    }
    const combinedStatusData = [
        { 'title': 'Recent updates', data: statusData.filter(item => item.viewed === false) },
        { 'title': 'Viewed updates', data: statusData.filter(item => item.viewed === true) }
    ]


    return (
        <View style={styles.container}>
            <View style={styles.myStatusContainer}>
                <View>
                    <Image
                        source={require('../../assets/Founder.jpg')}
                        style={styles.myProfileImage}
                    />
                </View>
                <View>
                    <Text style={styles.myStatusHeading}>My status</Text>
                    <Text style={styles.myStatusSubHeading}>Tap to add status</Text>
                </View>
            </View>

            <View style={styles.allStatusContainer}>
                <FlatList
                    data={combinedStatusData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.viewedStatus}>{item.title}</Text>
                            <FlatList
                                data={item.data}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (

                                    <TouchableOpacity>
                                        <View style={styles.viewedStatusContainer}>
                                            <View>
                                                <Image
                                                    source={item.photo}
                                                    style={styles.myProfileImage}
                                                />
                                            </View>
                                            <View>
                                                <Text style={styles.myStatusHeading}>{item.name}</Text>
                                                <Text style={styles.myStatusSubHeading}>{item.time}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}
                />
            </View>



            <TouchableOpacity
                style={styles.writeStatusButton}
                onPress={handleWriteStatus}
            >
                <FontAwesome5 name="pen" size={18} color='black' />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.addNewStatusButton}
                onPress={handleCameraStatus}
            >
                <FontAwesome5 name="camera" size={22} color='black' />
            </TouchableOpacity>
        </View>
    )
}

export default Status

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    myStatusContainer: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    myProfileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16
    },
    myStatusHeading: {
        fontSize: 16,
        fontWeight: '600'
    },
    myStatusSubHeading: {
        fontSize: 14,
        color: 'grey'
    },
    viewedStatus: {
        fontSize: 14,
        fontWeight: '600',
        color: 'grey',
        marginVertical: 10,
        paddingHorizontal: 16,
    },
    viewedStatusContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,

    },

    writeStatusButton: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: "#000000",
        alignItems: 'center',
        justifyContent: "center",
        position: 'absolute',
        bottom: 100,
        right: 25,
        borderRadius: 15,
    },
    addNewStatusButton: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: "#000000",
        alignItems: 'center',
        justifyContent: "center",
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 20,
    },


})