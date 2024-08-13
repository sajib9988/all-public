// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAqYpZVlK8hU352YYekQB9pLF6k2kaFxt4",
    authDomain: "study-session-12.firebaseapp.com",
    projectId: "study-session-12",
    storageBucket: "study-session-12.appspot.com",
    messagingSenderId: "655715189551",
    appId: "1:655715189551:web:dc47e9821c57361f7897da"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
 export default auth;