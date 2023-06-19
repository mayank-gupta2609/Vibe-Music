// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOa8gAqMZThG--vS2af6VwtlVe7kDnJtM",
  authDomain: "musicapp-2ca91.firebaseapp.com",
  projectId: "musicapp-2ca91",
  storageBucket: "musicapp-2ca91.appspot.com",
  messagingSenderId: "770798058459",
  appId: "1:770798058459:web:3fde97740c5d8a6d89c5fe",
  measurementId: "G-RTZXS4XK0G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage()
const db = getFirestore(app)
const auth = getAuth(app)

export { app, storage, analytics, db, auth }