import React, {useEffect} from 'react';

import { ImageBackground, StyleSheet, View, Text, Button, TextInput } from 'react-native';

export default function Chat({ route, navigation }) {
  //Use of the route.params object to access the passed "name" in Chat sreen
  const selectedColor = route.params.selectedColor;
  const name = route.params.name;

  useEffect(() => {
    // Display the passed "name" in the navigation bar of Chat screen by using the navigation.setOptions function
    navigation.setOptions({ title: name });
  });

    return (
      <View style={[styles.container, {backgroundColor: selectedColor }]}>
          <Text style={styles.textColor}> Hello {name}!</Text>
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