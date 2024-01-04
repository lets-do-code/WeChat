import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { MaterialCommunityIcons } from "react-native-vector-icons"
import Chats from "../screen/Chats"
import Calls from "../screen/Calls"
import Status from "../screen/Status"
import Community from "../screen/Community"


const Tab = createMaterialTopTabNavigator();

const Navigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='Chats'
            screenOptions={{
                tabBarActiveTintColor: '#000000',
                tabBarIndicatorStyle: {
                    backgroundColor: '#000000'
                },
                tabBarLabelStyle: {
                    fontWeight: 'bold'
                },
                tabBarStyle: {
                    backgroundColor: '#ffffff'
                }
            }}
        >
            <Tab.Screen
                name='Community'
                component={Community}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name='account-group' size={24} color={color} style={styles.icon} />
                    ),
                    tabBarLabelStyle: styles.tabBarLabel,
                }}
            />
            <Tab.Screen
                name='Chats'
                component={Chats}
            />
            <Tab.Screen
                name='Status'
                component={Status}
            />
            <Tab.Screen
                name='Calls'
                component={Calls}
            />
        </Tab.Navigator>
    )
}

export default Navigation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBarLabel: {
        display: 'none'
    }
})