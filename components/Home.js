import React, { useState }  from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


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
      <View accessible={true} style={[styles.container, { backgroundColor: selectedColor }]}>
        <ImageBackground
            source={require("../assets/ChatMate-01.jpg")}
            style={styles.image}
        >
          <Text style={styles.title}></Text>

          <View style={styles.whiteContainer}>
            <View style={styles.inputWrapper}>
              <Icon name="user" size={20} color="#757080" />
              <TextInput
                accessibilityLabel="Name Input field"
                accessibilityHint="Let you type your name"
                placeholder="Type your name"
                style={styles.input}
                //onChangeText prop is a prop of the TextInput component, and it is called every time the text in the TextInput field changes.
                onChangeText={text => setName(text)}
                value={name}
                >
              </TextInput>

            </View>

            <Text
              accessibilityLabel="Choose your theme"
              style={styles.chooseThemeText}
              >
                Choose your theme:
            </Text>
            <View style={styles.colorContainer}>
              <TouchableOpacity
                accessibilityLabel="Color circle"
                accessibilityHint="Selects the black color background theme"
                style={[styles.colorCircle, { backgroundColor: "#4A454D" }, getColorStyle("#4A454D"),]}
                onPress={() => handleColorSelect("#4A454D")}
              />
              <TouchableOpacity
                accessibilityLabel="Color circle"
                accessibilityHint="Selects the grey color background theme"
                style={[styles.colorCircle, { backgroundColor: "#91A182"}, getColorStyle("#91A182") ]}
                onPress={() => handleColorSelect("#91A182")}
              />
              <TouchableOpacity
                accessibilityLabel="Color circle"
                accessibilityHint="Selects the olive green color background theme"
                style={[styles.colorCircle, { backgroundColor: "#2F444F"}, getColorStyle("#2F444F") ]}
                onPress={() => handleColorSelect("#2F444F")}
              />
            </View>

            {/* Button component has an onPress prop that is set to a previously declared function called handlePress. */}
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Start Chatting"
              accessibilityHint="Navigates to the Chat screen"
              accessibilityRole="button"
              style={[styles.startChatButton, { backgroundColor: selectedColor} ]}
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
      margin: 10,
      left: 20,
      top: -40,
      fontSize: 18,
      borderRadius: 5,
      zIndex: 100,
    },

    inputWrapper: {
      height: 40,
      borderColor: '#CCCCCC',
      borderWidth: 1,
      margin: 10,
      padding: 10,
      borderRadius: 5,
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