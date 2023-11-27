import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUlXr8Dzp0rp7s8q3tOrhnoxHprl-y84w",
  authDomain: "blog-app-7012c.firebaseapp.com",
  projectId: "blog-app-7012c",
  storageBucket: "blog-app-7012c.appspot.com",
  messagingSenderId: "1096673332629",
  appId: "1:1096673332629:web:b7f99a60a7de9ba2cdfa9c"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
