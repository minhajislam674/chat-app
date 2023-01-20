import React from "react"
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import PropTypes from "prop-types";
import { useActionSheet } from '@expo/react-native-action-sheet';
import { connectActionSheet } from "@expo/react-native-action-sheet";
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { Camera  } from 'expo-camera';
import * as Location from 'expo-location';



export default function CustomActions({ onSend })  {
    const { showActionSheetWithOptions } = useActionSheet();

  
  
    const pickImage = async () => {
      const {status} = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: MediaLibrary.MediaType.Images,
        }).catch(error => console.log(error))
  
        if (!result.canceled) {
          setImage(result)
        }
      } else {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  
    const takePhoto = async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.canceled) {
            return
        }
      } else {
        alert('Sorry, we need camera permission to take a photo!');
      }
  
    }
  
    const getLocation = async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      try {
        if (status === "granted") {
          const result = await Location.getCurrentPositionAsync({});
  
          if (result) {
            onSend({
              location: {
                longitude: result.coords.longitude,
                latitude: result.coords.latitude,
              },
            });
          }
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    

    const onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        console.log('user wants to pick an image');
                        return pickImage();
                    case 1:
                        console.log('user wants to take a photo');
                        return takePhoto();
                    case 2:
                        console.log('user wants to get their location');
                        return getLocation();
                    default:
                }
            },
        );
    }
    
    return (
        <TouchableOpacity
        style={[styles.container]}
        accessible={true}
        accessibilityLabel="More options"
        accessibilityHint="Let’s you choose to send an image or your geolocation."
        onPress={onActionPress}>
            <View style={[styles.wrapper ]}>
                <Text style={[styles.iconText]}>+</Text>
            </View>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    container: {
      width: 26,
      height: 26,
      marginLeft: 10,
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 13,
      borderColor: '#b2b2b2',
      borderWidth: 2,
      flex: 1,
    },
    iconText: {
      color: '#b2b2b2',
      fontWeight: 'bold',
      fontSize: 14,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
   });



  CustomActions = connectActionSheet(CustomActions);