import React, { useState }  from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';


export default function Home({navigation}) {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#474056");

 /*Declaring function handlePress that uses the navigation.navigate to navigate to a new screen.
 It receives two arguments: the name of the screen to navigate to, "Chat" in this case and
 an object containing data that we want to pass to the new screen, in our case "name". */

  const handlePress = () => {
    navigation.navigate('Chat', {
      name,selectedColor,
    });
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const getColorStyle = (color) => {
    if (selectedColor === color) {
      return styles.selected;
    } else {
      return null;
    }
  };


    return (
      <View style={[styles.container, { backgroundColor: selectedColor }]}>
        <ImageBackground
            source={require("../assets/background.png")}
            style={styles.image}
        >
          <Text style={styles.title}>ChatMate</Text>

          <View style={styles.whiteContainer}>
            <TextInput
                    placeholder="Type your name"
                    style={styles.input}
                    //onChangeText prop is a prop of the TextInput component, and it is called every time the text in the TextInput field changes.
                    onChangeText={text => setName(text)}
                    value={name}
                     >
            </TextInput>
            <Text style={styles.chooseThemeText}>Choose your theme:</Text>
            <View style={styles.colorContainer}>
              <TouchableOpacity
                style={[styles.colorCircle, { backgroundColor: "#474056" }, getColorStyle("#474056"),]}
                onPress={() => handleColorSelect("#474056")}
              />
              <TouchableOpacity
                style={[styles.colorCircle, { backgroundColor: "#8A95A5"}, getColorStyle("#8A95A5") ]}
                onPress={() => handleColorSelect("#8A95A5")}
              />
              <TouchableOpacity
                style={[styles.colorCircle, { backgroundColor: "#B9C6AE"}, getColorStyle("#B9C6AE") ]}
                onPress={() => handleColorSelect("#B9C6AE")}
              />
            </View>

            {/* Button component has an onPress prop that is set to a previously declared function called handlePress. */}
            <TouchableOpacity
              style={styles.startChatButton}
              onPress={handlePress}> 
              <Text style={styles.startChatButtonText}> Start Chatting </Text>
            </TouchableOpacity>
          </View>

        </ImageBackground>

      </View>
    )
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      resizeMode: 'cover',
      paddingVertical: '10%',
    },
    title: {
      color: "#FFFFFF",
      fontSize: 45,
      lineHeight: 84,
      fontWeight: "600",
      textAlign: "center",
      marginBottom: 150,

    },
    input: {
      height: 40,
      borderColor: '#CCCCCC',
      borderWidth: 1,
      margin: 10,
      padding: 10,
      fontSize: 18,
      borderRadius: 5,
      backgroundColor: '#FFFFFF',
      shadowColor: '#000000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
    startChatButton: {
      backgroundColor: "#757083",
      borderRadius: 10,
      padding: 10,
      margin: 10,
      elevation: 2,
    },
    startChatButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
      textTransform: "uppercase"
    },

    whiteContainer: {
      width: "90%",
      backgroundColor: "#FFFFFF",
      padding: 30,

    },
    colorContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    colorCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      margin: 10,
      borderColor: 'white',
      borderWidth: 1,
      transform: [{ scale: 0.9 }],
  
    },
    selected: {
      opacity: 0.8,
      borderColor: 'orange',
      borderWidth: 1,
      transform: [{ scale: 1.1 }],
    },
    chooseThemeText: {
      color: "grey",
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center"
    }
  });