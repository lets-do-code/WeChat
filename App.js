import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DataProvider } from "./src/context/DataContext"
import RouteNavigation from './src/navigation/RouteNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <DataProvider>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <RouteNavigation />
        </View>
      </DataProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
