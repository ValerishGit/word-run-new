// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfkbOxGpZ27SuqQxLdrPXgOMVmm1Szs50",
  authDomain: "word-run-cef4e.firebaseapp.com",
  projectId: "word-run-cef4e",
  storageBucket: "word-run-cef4e.appspot.com",
  messagingSenderId: "11516846079",
  appId: "1:11516846079:web:d99da391bc5a291e8111ca",
  measurementId: "G-F9RGDFLWV3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app);
