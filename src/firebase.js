// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1luaJ4oXScdiDMV3iVgdCEsi5B6E5INo",
  authDomain: "my-react-app-a5752.firebaseapp.com",
  projectId: "my-react-app-a5752",
  storageBucket: "my-react-app-a5752.firebasestorage.app",
  messagingSenderId: "94720683188",
  appId: "1:94720683188:web:edbb048ada180b0ca3bbe1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();