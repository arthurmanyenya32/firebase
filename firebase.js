import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBLwuJCW28DR5k15wUxqAscYZajY0dIkUk",
    authDomain: "my-journal-26843.firebaseapp.com",
    databaseURL: "https://my-journal-26843.firebaseio.com",
    projectId: "my-journal-26843",
    storageBucket: "my-journal-26843.appspot.com",
    messagingSenderId: "271908753063",
    appId: "1:271908753063:web:e744eb7921423ad8a09582",
    measurementId: "G-H2JSZW1VG3"
};

firebase.initializeApp(firebaseConfig);
  

export default firebase;