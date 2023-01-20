# ChatMate App

> ChatMate is an app for mobile devices built using React Native. The app will provide users
> with a chat interface and options to share images and their location.

<img
  src="/assets/Screenshot_1674244270.png"
  alt="Alt text"
  title="Optional title"
  style="display: inline-block; width: 250px">
<img
  src="/assets/Screenshot_1674244293.png"
  alt="Alt text"
  title="Optional title"
  style="display: inline-block; width: 250px">


## Key Features

- A page where users can enter their name and choose a background color for the chat screen
  before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images
  and location data.
- Data gets stored online and offline.

## Built with

- React Native
- Expo
- Gifted Chat
- Firebase

## Dependencies

- expo
- expo-image-picker
- expo-location
- expo-camera
- firebase
- react
- react-dom
- react-native
- react-native-gifted-chat
- react-native-keyboard-spacer
- react-native-maps
- react-native-safe-area-context
- react-native-screens
- react-navigation
- react-navigation-stack
- react-native-vector-icons

## Getting started

1. Fork or download directly this repo.
2. Install Expo globally `npm install --global expo-cli`
3. `npm install` or `yarn install` on the terminal to install all dependencies.
4. Install an emulator on desktop or Expo Go on your smartphone.
5. To start the app, run expo start or npm start

## Database configuration

1. Go to the Firebase Console (https://console.firebase.google.com/) and create a new project in test mode.In your project's directory, run the following command to install Firebase:
   `npm install firebase@8.10.1`
2. At the top of your Chat.js file, import Firebase:
   `import * as firebase from 'firebase';`
3. In the Firebase Console, navigate to Project Settings and register your application.

4. Copy the firebaseConfig object received in the last step and store it in a variable in your Chat.js file:

```
const firebaseConfig = {
 apiKey: 'your-api-key',
 authDomain: 'your-authdomain',
 databaseURL: 'your-database-url',
 projectId: 'your-project-id',
 storageBucket: 'your-storage-bucket',
 messagingSenderId: 'your-messaging-sender-id',
 appId: 'your-app-id',
};
```

5. Initialize Firebase in your Chat.js file:

```
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
```

6. Create a reference to the collection in Firestore:

```
const db = firebase.firestore();
const chatMessagesRef = db.collection("messages");
```

## Contributing

1. Fork it (<https://github.com/minhajislam674/chat-app/fork>)
2. Create your feature branch (`git checkout -b features`)
3. Commit your changes (`git commit -am 'Add some features'`)
4. Push to the branch (`git push origin features`)
5. Create a new Pull Request
