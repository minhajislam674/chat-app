import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Chat({ route, navigation }) {
  //Use of the route.params object to access the passed "name" in Chat sreen
  const name = route.params.name;

  // Display the passed "name" in the navigation bar of Chat screen by using the navigation.setOptions function
  navigation.setOptions({title: name});

    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hello, {name}!</Text>
      </View>
    )
  }