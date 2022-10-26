
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLcaeqlNrfvfFk_VDNPmTbxFLKrRp_KxI",
  authDomain: "e-commerce-app-c16ec.firebaseapp.com",
  projectId: "e-commerce-app-c16ec",
  storageBucket: "e-commerce-app-c16ec.appspot.com",
  messagingSenderId: "767928057939",
  appId: "1:767928057939:web:41944cc272ab92939046a6",
  measurementId: "G-CJG471P684"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
//const analytics = getAnalytics(app);
