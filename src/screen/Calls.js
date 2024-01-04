import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Fontisto, MaterialIcons, MaterialCommunityIcons } from "react-native-vector-icons"
import Data from "../data/ChatData"

const Calls = () => {

    const [callsData, setCallsData] = useState(Data)

    // console.log(callsData)
    useEffect(() => {
        setCallsData(Data)
    }, [])


    const handleNewCall = () => {
        console.warn('Add new call')
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={styles.callContainer}>
                    <View style={styles.linkContainer}>
                        <Fontisto name="link" size={22} color="black" />
                    </View>
                    <View >
                        <Text style={styles.callLink}>Create call link</Text>
                        <Text style={styles.callSubText}>Share a link for your whatsapp call</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Text style={styles.recentCallText}>Recent</Text>
            <FlatList
                data={callsData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <View style={styles.callContainer}>
                            <Image
                                source={item.photo}
                                style={styles.image}
                            />
                            <View style={styles.callContentContainer}>
                                <View>
                                    <Text style={styles.callName}>{item.name}</Text>
                                    <View style={styles.callDetails}>
                                        <MaterialCommunityIcons name="call-received" size={15} color="grey" />
                                        <Text style={styles.callTime}>{item.time}</Text>
                                    </View>
                                </View>

                                <View>
                                    <MaterialIcons name="call" size={22} color="grey" />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity
                style={styles.addNewCallButton}
                onPress={handleNewCall}
            >

                <MaterialIcons name="add-call" size={24} color="black" />

            </TouchableOpacity>
        </View>
    )
}

export default Calls

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    callContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    linkContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#000000",
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16
    },
    callLink: {
        fontSize: 16,
        fontWeight: '600'
    },
    callSubText: {
        fontSize: 14,
        color: 'grey'
    },
    recentCallText: {
        fontSize: 14,
        fontWeight: '600',
        marginHorizontal: 16,
        marginVertical: 8,
        color: 'grey'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16
    },
    callName: {
        fontSize: 16,
        fontWeight: '600',
    },
    callContentContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    callDetails: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    callTime: {
        fontSize: 14,
        color: 'grey',
        marginLeft: 5
    },
    addNewCallButton: {
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
    }
})