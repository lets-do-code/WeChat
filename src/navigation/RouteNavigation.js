import { createStackNavigator } from '@react-navigation/stack';
import UserChat from '../screen/UserChat';
import Home from '../screen/Home';
import Settings from '../screen/Settings';
import Login from '../screen/Login';
import { useData } from '../context/DataContext';
import Camera from '../components/Camera';
import Contact from '../components/Contacts';
import ContactsList from '../screen/ContactList';

const Stack = createStackNavigator();

const RouteNavigation = () => {

    const { auth, setAuth } = useData()


    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // Hide the header for the entire stack
            }}
        >
            {auth ?
                <>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="UserChat" component={UserChat} />
                    <Stack.Screen name="Setting" component={Settings} />
                    <Stack.Screen name="Camera" component={Camera} />
                    <Stack.Screen name="Contact" component={ContactsList} />

                </>
                :
                <Stack.Screen name="Login" component={Login} />}

        </Stack.Navigator>
    );
}
export default RouteNavigation