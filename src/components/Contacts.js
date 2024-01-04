import React from "react";
import { View, Text, StyleSheet } from "react-native";
const Contact = ({ contact }) => {

    return (
        <View style={styles.contactCon}>
            <View style={styles.imgCon}>
                <View style={styles.placeholder}>
                    <Text style={styles.txt}>{contact.phone.substring(0, 1)}
                    </Text>
                </View>
            </View>
            <View style={styles.contactDat}>
                <Text style={styles.name}>{contact.phone}</Text>
                {/* <Text style={styles.phoneNumber}>
                    {contact?.phoneNumbers[0]?.number}
                </Text> */}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    contactCon: {
        flex: 1,
        flexDirection: "row",
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: "#d9d9d9",
        paddingHorizontal: 16,
    },
    imgCon: {},
    placeholder: {
        width: 55,
        height: 55,
        borderRadius: 30,
        overflow: "hidden",
        backgroundColor: "#d9d9d9",
        alignItems: "center",
        justifyContent: "center",
    },
    contactDat: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: 5,
    },
    txt: {
        fontSize: 18,
    },
    name: {
        fontSize: 16,
    },
    phoneNumber: {
        color: "#888",
    },
});
export default Contact;