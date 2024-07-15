// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1778YZpVuFuUdm63mCM47yhhRNdJvRmA",
  authDomain: "musicplayer-98a46.firebaseapp.com",
  projectId: "musicplayer-98a46",
  storageBucket: "musicplayer-98a46.appspot.com",
  messagingSenderId: "168366407236",
  appId: "1:168366407236:web:f65cbdff5776ae6cc80611",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const songDB = getStorage(app);
const txtDB = getFirestore(app);
export const auth = getAuth();
export default app;
export const db = getFirestore(app);

export { songDB, txtDB };
