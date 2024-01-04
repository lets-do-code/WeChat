import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Data from '../data/ChatData'
import { MaterialCommunityIcons } from "react-native-vector-icons"
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useData } from '../context/DataContext'
import { useFocusEffect } from '@react-navigation/native';


const Chats = ({ navigation }) => {

    const [chatData, setChatData] = useState()
    const { authUserId, setAuthUserId } = useData()
    const getUserWithChat = "http://192.168.215.132:8080/userWithChat";


    const fetchUsersWithChat = async () => {
        try {
            const response = await axios.post(getUserWithChat, {
                userId: authUserId
            })

            setChatData(response.data.user)
        }
        catch (err) {
            console.log(err)
        }

    }

    useFocusEffect(
        React.useCallback(() => {

            fetchUsersWithChat();
        }, [fetchUsersWithChat])
    );

    const handleUserChat = (item) => {
        const friendId = item._id
        const friendName = item.phone

        navigation.navigate('UserChat', {
            roomId: friendId > authUserId ? friendId + authUserId : authUserId + friendId,
            friendName: friendName
        })

    }


    const handleNewChat = () => {
        navigation.navigate('Contact')

    }




    return (
        <View style={styles.container}>
            <FlatList
                data={chatData}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (

                    <TouchableOpacity onPress={() => handleUserChat(item)}>
                        <View style={styles.chatContainer}>
                            <Image
                                // source={item.photo}
                                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdjcxLf8Le8mfRuUcsVDEhWu-Ms58P32m7NpwqeTxusY1AVOLSjmgFFgqJsMdKqj0fLHg&usqp=CAU" }}
                                style={styles.chatImage}
                            />
                            <View style={styles.chatContent}>
                                <View style={styles.chatHeader}>
                                    <Text
                                        style={styles.chatName}
                                        numberOfLines={1}
                                    >
                                        {item.phone}

                                    </Text>
                                    <Text style={styles.chatTime}>{item.time}</Text>
                                </View>
                                <View style={styles.message}>
                                    <Text
                                        style={styles.chatMessage}
                                        numberOfLines={1}
                                    >
                                        {item.lastMessage}
                                    </Text>
                                    {item.totalUnread > 0 && (
                                        <View style={styles.unreadContainer}>
                                            <Text style={styles.totalUnread}>{item.totalUnread}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity
                style={styles.addNewChatButton}
                onPress={handleNewChat}
            >
                <MaterialCommunityIcons name="android-messages" size={25} color="black" />
            </TouchableOpacity>
        </View>

    )
}

export default Chats

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#d9d9d9",
    },

    chatImage: {
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatContent: {
        flex: 5,
        borderBottomWidth: 0,
        marginLeft: 16,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    chatName: {
        fontSize: 16,
        fontWeight: 'bold',
        width: '80%'
    },
    chatTime: {
        fontSize: 12,
        color: '#A0A09E'
    },
    message: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    chatMessage: {
        fontSize: 14,
        color: '#A0A09E',
        width: '95%'
    },
    unreadContainer: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: "grey",
        alignItems: 'center',
        justifyContent: 'center',
    },

    totalUnread: {
        fontSize: 10,
        color: '#fff',
        fontWeight: '600'
    },
    addNewChatButton: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#000000',
        alignItems: 'center',
        justifyContent: "center",
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 20,
        transform: [{ rotateY: '180deg' }]
    },
})