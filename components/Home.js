import React, { useState }  from 'react';

import { View, Text, Button, TextInput } from 'react-native';

export default function Home({navigation}) {
  const [name, setName] = useState("");

 /*Declaring function handlePress that uses the navigation.navigate to navigate to a new screen.
 It receives two arguments: the name of the screen to navigate to, "Chat" in this case and
 an object containing data that we want to pass to the new screen, in our case "name". */

  const handlePress = () => {
    navigation.navigate('Chat', {
      name,
    });
  };

    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hello Screen1!</Text>
        <TextInput
                placeholder="Type a message..."
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
    //onChangeText prop is a prop of the TextInput component, and it is called every time the text in the TextInput field changes.
                onChangeText={text => setName(text)}
                value={name}>
         </TextInput>

    {/* Button component has an onPress prop that is set to a previously declared function called handlePress. */}

        <Button
          title="Go to Screen 2"
          onPress={handlePress}
        />
      </View>
    )
  }