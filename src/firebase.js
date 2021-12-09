// Firebase k liye npm install firebase aur sudo npm install -g firebase-tools

import firebase from "firebase" ;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  info: "Add your own firebaseConfig"
};

// Initialize firebase app
const firebaseApp = firebase.initializeApp(firebaseConfig) ;
// Initialize database 
const db = firebaseApp.firestore() ;
// Helps in authorisation (sign in / sign up)
const auth = firebase.auth() ;

export {db , auth} ;
