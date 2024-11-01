// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBEk1HAwmaFcnLMLmVlJCDg9y-lQ_03LnE",
  authDomain: "ecommerce-f202c.firebaseapp.com",
  projectId: "ecommerce-f202c",
  storageBucket: "ecommerce-f202c.appspot.com",
  messagingSenderId: "1045288775845",
  appId: "1:1045288775845:web:5bab16f8d5ac3c36b45d4c",
  measurementId: "G-5KLDS4KWXD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };