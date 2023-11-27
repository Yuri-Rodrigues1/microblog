// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtHnH9tOlLH7wYUvnPuFjwaVqEEM-AoFs",
  authDomain: "microblog-df44c.firebaseapp.com",
  projectId: "microblog-df44c",
  storageBucket: "microblog-df44c.appspot.com",
  messagingSenderId: "74272419",
  appId: "1:74272419:web:8150013a23138a500af916"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
