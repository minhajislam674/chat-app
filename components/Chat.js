import React, {useEffect, useState, useCallback} from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { View, Platform, KeyboardAvoidingView,FlatList, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

import * as firebase from 'firebase';
import firebaseConfig from './utils/firebaseConfig';

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

// Get a reference to a collection
const chatMessagesRef = db.collection("messages");


export default function Chat({ route, navigation }) {

  //Use of the route.params object to access the passed "name" in Chat sreen
  const selectedColor = route.params.selectedColor;
  const name = route.params.name;

  const [messages, setMessages] = useState([]); 
  const [uid, setUid] = useState(0);
  const [loggedInText, setLoggedInText] = useState('Please wait, you are getting logged in');

  useEffect(() => {
    // Display the passed "name" in the navigation bar of Chat screen by using the navigation.setOptions function
    navigation.setOptions({ title: name });

    //Storing the query as "onCollectionChange" variable.
    const onCollectionChange = (querySnapshot => {
      const messages = [];
      // go through each document
      querySnapshot.docs.forEach(doc => {
        // get the QueryDocumentSnapshot's data
        var data = doc.data();
        messages.push({
          _id: data._id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: {
            _id: data.user._id,
            name: data.user.name,
            avatar: data.user.avatar
          }
        });
      });
      setMessages(messages);
    });

    // listen to authentication events
    const unsubscribeAuth = firebase.auth().onAuthStateChanged( async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
      setUid(user.uid);
      setLoggedInText("Hello, there!");


    })
    //Using onSnapshot method to listen for real-time updates.
    const unsubscribeUser = chatMessagesRef.orderBy('createdAt', 'desc').onSnapshot(onCollectionChange)

    //Component unmounts. Stops listening for real-time updates from Firestore. Stop listening for authentication events.
    return () => {
      unsubscribeUser();
      unsubscribeAuth();
    } 
  }, []);


// The useCallback hook takes an array of messages as an argument and appends the new messages to the array of existing messages using the setMessages.
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    addMessages(messages[0]);
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

  const addMessages =(messages) => {
    chatMessagesRef.add({
      _id: messages._id,
      text: messages.text,
      createdAt: messages.createdAt,
      user: {
         _id: uid,
         name: name,
         avatar: messages.user.avatar,
      }
    });
  }
 

    return (
      <View
        accessible={true}
        accessibilityLabel="Chat screen"
        style={[styles.container, {backgroundColor: selectedColor }]}
      > 
        {/* <Text> {loggedInText} </Text> */}

        <GiftedChat
          renderBubble={renderBubble}
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: uid,
            avatar: "https://placeimg.com/140/140/people",
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