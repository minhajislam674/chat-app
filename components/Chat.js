import React, {useEffect, useState, useCallback} from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { StyleSheet } from 'react-native';

export default function Chat({ route, navigation }) {
  //Use of the route.params object to access the passed "name" in Chat sreen
  const selectedColor = route.params.selectedColor;
  const name = route.params.name;

  const [messages, setMessages] = useState([]); 


  useEffect(() => {
    // Display the passed "name" in the navigation bar of Chat screen by using the navigation.setOptions function
    navigation.setOptions({ title: name });

    setMessages([
      {
        _id: 1,
         text: 'Hello developer',
         createdAt: new Date(),
         user: {
           _id: 2,
           name: 'React Native',
           avatar: 'https://placeimg.com/140/140/any',
        }
      },
      {
        _id: 2,
        text: 'You joined the chat',
        createdAt: new Date(),
        system: true,
       },
    ])
  }, []);



// The useCallback hook takes an array of messages as an argument and appends the new messages to the array of existing messages using the setMessages.
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [messages])

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
          },
        }}
      />
    );
  };



    return (
      <View
        accessible={true}
        accessibilityLabel="Chat screen"
        style={[styles.container, {backgroundColor: selectedColor }]}
      >
        <GiftedChat
          renderBubble={renderBubble}
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === "android" ? (<KeyboardAvoidingView behavior='height' />) : null }
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