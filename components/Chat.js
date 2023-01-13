import React, {useEffect, useState, useCallback} from 'react';
import { GiftedChat, Bubble, InputToolbar  } from 'react-native-gifted-chat';
import { View, Platform, KeyboardAvoidingView,FlatList, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
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
  const [isConnected, setIsConnected] = useState();

  const saveMessages = async () => {
    try {
      const jsonMessages = JSON.stringify(messages)
      await AsyncStorage.setItem('messages', jsonMessages);
      console.log("Saving messages: ", jsonMessages);
    } catch (error) {
      console.log(error.message);
    }
  }

  const getMessages = async () => {
    let messages = "";
    try {
      messages = await AsyncStorage.getItem("messages") || [];
      console.log("called set state for messages", messages);
      const jsonMessages = JSON.parse(messages);
      setMessages(jsonMessages);
    } catch (error) {
      console.log(error.message);
    }
  }
  const deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
      setMessages([]);
      
    } catch (error) {
      console.log(error.message);
    }
  }


  useEffect(() => {
    // Display the passed "name" in the navigation bar of Chat screen by using the navigation.setOptions function
    navigation.setOptions({ title: name });
    getMessages();
    
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        setIsConnected(true);
        console.log('online');
      } else {
        setIsConnected(false);
        console.log('offline');
      }
    });

    // listen to authentication events
    const unsubscribeAuth = firebase.auth().onAuthStateChanged( async (user) => {
      if (!user ) {
        await firebase.auth().signInAnonymously();
      }
      setUid(user.uid);
      setLoggedInText("Hello, there!");
    })

    //Using onSnapshot method to listen for real-time updates.
    const unsubscribeUser = chatMessagesRef.orderBy('createdAt', 'desc').onSnapshot(onCollectionChange);

    //Component unmounts. Stops listening for real-time updates from Firestore. Stop listening for authentication events.
    return () => {
      unsubscribeUser();
      unsubscribeAuth();
    } 
  }, []);


  //Storing the query as "onCollectionChange" variable.
  const onCollectionChange = (querySnapshot => {
    if (!isConnected) { 
      return;
    }
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

// The useCallback hook takes an array of messages as an argument and appends the new messages to the array of existing messages using the setMessages.
  const onSend = useCallback((messages = []) => {
    console.log("onSend function is called")
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    addMessages(messages[0]);
    saveMessages(messages[0]);
  }, [messages])

//Adding messages to Firestore
  const addMessages = (messages) => {
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
  //Hides input when offline
  const renderInputToolbar =(props) => {
    if (isConnected) {
      return(
        <InputToolbar
        {...props}
        />
      );
    }
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
          renderInputToolbar={renderInputToolbar}
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