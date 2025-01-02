// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sopieemart.firebaseapp.com",
  projectId: "sopieemart",
  storageBucket: "sopieemart.firebasestorage.app",
  messagingSenderId: "977507033733",
  appId: "1:977507033733:web:65ce3c9804330f21dc3fec"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);