// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const songDB = getStorage(app);
const txtDB = getFirestore(app);
export const auth = getAuth();
export default app;
export const db = getFirestore(app);

export { songDB, txtDB };
