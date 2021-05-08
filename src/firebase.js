import  firebase from 'firebase/app';
import 'firebase/database'

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB-kboQ_2ChtsdjgTUNqokNdgQnucFHkIE",
    authDomain: "animelist-fb542.firebaseapp.com",
    databaseURL: "https://animelist-fb542-default-rtdb.firebaseio.com",
    projectId: "animelist-fb542",
    storageBucket: "animelist-fb542.appspot.com",
    messagingSenderId: "68443181916",
    appId: "1:68443181916:web:b1e9b057033154a12e6799"
  };
  // Initialize Firebase
  var fireDb= firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();