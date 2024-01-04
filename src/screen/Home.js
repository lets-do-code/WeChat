import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Header from "../components/Header"
import Navigation from "../navigation/Navigation"
import PopUp from '../components/PopUp';
import { useData } from '../context/DataContext';

export default function Home() {
    const { popUp, setPopUp } = useData()

    return (
        <View style={styles.container}>

            <Header />
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Navigation />
            </View>

            {popUp ? <PopUp /> : null}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
