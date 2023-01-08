import React from 'react';

import { ImageBackground, StyleSheet, View, Text, Button, TextInput } from 'react-native';

export default function Chat({ route, navigation }) {
  //Use of the route.params object to access the passed "name" in Chat sreen
  const name = route.params.name;
  const selectedColor = route.params.selectedColor;

  // Display the passed "name" in the navigation bar of Chat screen by using the navigation.setOptions function
  navigation.setOptions({title: name});

    return (
      <View style={[styles.container, {backgroundColor: selectedColor }]}>
          <Text style={styles.textColor}> Hello!</Text>
      </View>
    )
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black"
    },
    textColor: {
      color: "white"
    }
  });