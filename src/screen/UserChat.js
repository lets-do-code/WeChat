import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, BackHandler, Linking } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { MaterialIcons, MaterialCommunityIcons, Feather } from "react-native-vector-icons"
import { useNavigation } from '@react-navigation/native'
import io from 'socket.io-client';
import axios from 'axios';
import { useData } from '../context/DataContext';


const socket = io('http://192.168.215.132:8080');

const UserChat = ({ route }) => {
    const [online, setOnline] = useState(false)
    const [inputText, setInputText] = useState('')
    const [chat, setChat] = useState([])

    const roomId = route?.params?.roomId
    const userName = route?.params?.friendName
    const user1 = route?.params?.user1
    const user2 = route?.params?.user2


    const [friendName, setFriendName] = useState(userName)

    const { authUserId, setAuthUserId } = useData()
    const flatListRef = useRef(null);
    const navigation = useNavigation()


    const chatFetcher = async () => {

        try {
            const data = await axios.post("http://192.168.215.132:8080/userChat", {
                "roomId": roomId,
            })
            setChat(data.data.messages)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        chatFetcher()
        socket.on('chat-message', async (msg) => {
            setChat([...chat, msg]);
            await chatFetcher()
        });

        return () => {
            socket.off('chat-message');
        };
    }, []);

    useEffect(() => {
        const backAction = () => {
            navigation.navigate('Home');
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [navigation]);


    const handleCamera = () => {
        navigation.navigate('Camera')
    }

    const goBack = () => {
        navigation.goBack()
    }

    const sendMessage = () => {
        if (inputText.trim() !== '') {
            const newMessage = {
                roomId: roomId,
                message: inputText,
                senderId: authUserId,
                user1: user1,
                user2: user2
            };
            socket.emit('chat-message', newMessage); // Emit 'newMessage' instead of 'message'
            setChat([...chat, newMessage]);
            setInputText('');
            flatListRef.current.scrollToEnd({ animated: true });
        }
    };

    const makePhoneCall = () => {
        const phoneNumber = '79831277644'; // Replace with the phone number you want to call

        Linking.openURL(`tel:${phoneNumber}`)
            .catch((error) => {
                console.log('Error making phone call:', error);
            });
    };

    return (
        <View style={styles.container} >

            <View style={styles.headerContainer}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={goBack}>
                        <MaterialIcons name='arrow-back' size={22} color='black' />
                    </TouchableOpacity>
                    <Image
                        source={require("../../assets/Founder.jpg")}
                        style={styles.image}
                    />

                </View>
                <View style={styles.iconContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity>
                            <Text style={styles.headerText} numberOfLines={1}>{friendName}</Text>
                        </TouchableOpacity>
                        {online ? <Text style={styles.status}>online</Text> : null}
                    </View>
                    <View style={styles.headerIcon}>
                        <Feather name='video' size={22} color='black' style={styles.icon} />
                        <Feather name='phone' size={20} color='black' style={styles.icon} onPress={makePhoneCall} />
                        <MaterialCommunityIcons name='dots-vertical' size={22} color='black' style={styles.icon} />
                    </View>
                </View>
            </View>


            <View style={styles.chatSection}>
                <ImageBackground
                    source={require('../../assets/newbgjpg.jpg')}
                    // source={require('../../assets/Founder.jpg')}
                    style={styles.backgroundImage}
                >
                    <FlatList
                        ref={flatListRef}
                        data={chat}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={item.senderId === authUserId ? styles.userMessage : styles.otherMessage}>
                                <Text style={item.senderId === authUserId ? styles.userMessageText : styles.otherMessageText}>{item.message}</Text>
                            </View>
                        )}
                        contentContainerStyle={styles.messageContainer}
                        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
                    />
                </ImageBackground>

            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputWithCamera}>
                    <TextInput
                        style={styles.input}
                        placeholder="Message"
                        placeholderTextColor="#000000"
                        numberOfLines={1}
                        value={inputText}
                        onChangeText={(text) => setInputText(text)}
                    />
                    <View style={styles.camera}>
                        <TouchableOpacity onPress={handleCamera}>
                            <Feather name='camera' size={22} color='#000000' style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.sendIcon}>
                    <TouchableOpacity onPress={sendMessage}>
                        <MaterialIcons name='send' size={30} color='black' style={styles.rotateIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}

export default UserChat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 40,
    },

    headerContainer: {
        height: 60,
        flexDirection: 'row',
        alignContent: 'center',
        marginHorizontal: 16
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 40,
        height: 40,
        backgroundColor: 'grey',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8
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
        color: 'black',
    },
    status: {
        fontSize: 10,
        color: 'white',
    },
    headerIcon: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginLeft: 20
    },


    // Chat section stylesSheets

    chatSection: {
        flex: 1,
    },

    messageContainer: {
        padding: 16,
        paddingBottom: 0,
        height: "100%",
        backgroundColor: '#e4e6eb',
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#1b74e4',
        padding: 8,
        marginVertical: 2,
        maxWidth: '70%',
        borderRadius: 8,

    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#bcc0c4',
        padding: 8,
        marginVertical: 3,
        maxWidth: '70%',
        borderRadius: 8,
    },
    userMessageText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    otherMessageText: {
        color: '#000000',
        fontSize: 16,
    },


    inputContainer: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        gap: 5,
        backgroundColor: '#e4e6eb',
    },

    input: {
        color: '#000000',
        flex: 1,
        backgroundColor: 'transparent',
        fontSize: 16,
        paddingLeft: 10,

    },

    inputWithCamera: {
        flex: 1,
        flexDirection: "row",
        height: 45,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 30,
        paddingHorizontal: 10,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },

    sendIcon: {
        height: 45,
        width: 45,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 22.5,
        padding: 5
    },

    backgroundImage: {
        height: "100%",
    },
    rotateIcon: {
        transform: [{ rotate: '340deg' }],
    },
})