// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore" 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuAuXmh9hIyYbxi5nzHmvMJkK4-CWonuE",
  authDomain: "fade-d286b.firebaseapp.com",
  projectId: "fade-d286b",
  storageBucket: "fade-d286b.firebasestorage.app",
  messagingSenderId: "587348483205",
  appId: "1:587348483205:web:bd2c1112b87f5661e09dec",
  measurementId: "G-D94CG7TB1G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);