import { StatusBar } from 'expo-status-bar';
import { LogBox } from "react-native";
import * as React from 'react';

// import the screens
import Home from './components/Home';
import Chat from './components/Chat';


LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
  `Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead`,
  "Cannot connect to Metro",
  "Non-serializable values were found in the navigation state",
]);

// import react native gesture handler
import 'react-native-gesture-handler';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Create the navigator
const Stack = createStackNavigator();
  
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
      >
        <Stack.Screen
          name='Home'
          component={Home}
        />
        <Stack.Screen
          name='Chat'
          component={Chat}
        />
      </Stack.Navigator>

    </NavigationContainer>

  );
}

