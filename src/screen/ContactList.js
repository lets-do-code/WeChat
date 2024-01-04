import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image } from "react-native";
import Contact from '../components/Contacts';
import * as Contacts from "expo-contacts";
import { Ionicons, MaterialIcons } from "react-native-vector-icons"
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useData } from "../context/DataContext";
const ContactsList = ({ navigation }) => {

    const [contacts, setContacts] = useState([]);
    const [activeSearch, setActiveSearch] = useState(false);
    const [textInput, setTextInput] = useState("");
    const { authUserId, setAuthUserId } = useData()


    const getAllUser = "http://192.168.215.132:8080/getAllUsers";

    const fetchUsers = async () => {
        try {
            const response = await axios.get(getAllUser)

            console.log(response.data)
            setContacts(response.data)
        }
        catch (err) {
            console.log(err)
        }

    }

    const handleUserChat = (item) => {
        const friendId = item._id
        const friendName = item.phone
        navigation.navigate('UserChat', {
            roomId: friendId > authUserId ? friendId + authUserId : authUserId + friendId,
            friendName: friendName,
            user1: authUserId,
            user2: friendId
        })

    }
    // useEffect(() => {
    //     fetchUsers()

    // }, [])
    useFocusEffect(
        React.useCallback(() => {
            fetchUsers();
        }, [])
    );

    // useEffect(() => {
    //     const fetchContacts = async () => {
    //         try {
    //             const { status } = await Contacts.requestPermissionsAsync();
    //             if (status === 'granted') {
    //                 const { data } = await Contacts.getContactsAsync();
    //                 const contactsWithPhoneNumbers = data.filter(contact => {
    //                     return (
    //                         contact.phoneNumbers &&
    //                         contact.phoneNumbers.length > 0
    //                     );
    //                 });

    //                 if (contactsWithPhoneNumbers.length > 0) {
    //                     setContacts(contactsWithPhoneNumbers);
    //                     console.log(contactsWithPhoneNumbers[0]);
    //                 }
    //             } else {
    //                 throw new Error('Permission denied for accessing contacts');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching contacts:', error);
    //         }
    //     };

    //     fetchContacts();
    // }, []);

    // const keyExtractor = (item, idx) => {
    //     return item?.id?.toString() || idx.toString();
    // };
    // const renderItem = ({ item, index }) => {
    //     return <Contact contact={item} />;

    // };

    const handleSearch = () => {
        setActiveSearch(true);
        console.log('Searching contacts')
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
                            {activeSearch ?
                                <TextInput

                                    placeholder="Search..."
                                    placeholderTextColor={"#000000"}
                                    onChangeText={(text) => setTextInput(text)}
                                    value={textInput}
                                    style={styles.inputText}
                                />

                                :
                                <Text style={styles.headerText}>Contacts</Text>
                            }
                        </View>
                        <View style={styles.headerIcon}>
                            <TouchableWithoutFeedback onPress={handleSearch}>
                                <Ionicons name='search' size={22} color='#000000' style={styles.icon} />
                            </TouchableWithoutFeedback>

                        </View>
                    </View>
                </View>
            </View>

            {/* <FlatList
                data={contacts}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                style={styles.list}

            /> */}

            <FlatList
                data={contacts}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (

                    item._id === authUserId ? null : (
                        <TouchableOpacity onPress={() => handleUserChat(item)}>
                            <Contact contact={item} />
                        </TouchableOpacity>
                    )
                )}
            />

        </View>

    );
};
const styles = StyleSheet.create({

    container: {
        flex: 1,

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
    inputText: {
        width: "90%",
        marginLeft: 10,
        fontSize: 18,
        fontWeight: '400',
        color: '#000000',
        borderBottomWidth: 1,
        borderColor: 'white',

    }
});
export default ContactsList;

