import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Home from './components/Home';
import Chat from './components/Chat';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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

