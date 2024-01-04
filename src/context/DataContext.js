import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {

    const [popUp, setPopUp] = useState(false)
    const [auth, setAuth] = useState(false)
    const [authUserProfileData, setAuthUserProfileData] = useState()
    const [authUserId, setAuthUserId] = useState()
    const myProfileRoute = `http://192.168.215.132:8080/getUser/${authUserId}`;

    console.log('line 15', authUserId);

    const retrieveUserId = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (userId !== null) {
                console.log('Retrieved user ID:', userId);
                setAuthUserId(userId);
            } else {
                console.log('User ID not found in AsyncStorage');
                return null;
            }
        } catch (error) {
            console.error('Error retrieving user ID:', error);
            return null;
        }
    };

    const authUserProfile = async () => {
        try {
            const response = await fetch(myProfileRoute, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Status: ${response.status}`);
            }
            const result = await response.json();
            setAuthUserProfileData(result)
        } catch (err) {
            console.log('Error', err);
        }
    };

    console.log(authUserProfileData)

    useEffect(() => {

        retrieveUserId()
        authUserProfile();
    }, [authUserId]);

    return (
        <DataContext.Provider value={{
            popUp, setPopUp,
            auth, setAuth,
            authUserId, setAuthUserId,
            authUserProfileData, setAuthUserProfileData


        }}>
            {children}
        </DataContext.Provider>
    );
};
