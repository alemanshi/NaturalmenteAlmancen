import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAsu7WYSIZ38n0uEONjfymTWURDIfg99Ic",
    authDomain: "e-commerce-11950.firebaseapp.com",
    projectId: "e-commerce-11950",
    storageBucket: "e-commerce-11950.firebasestorage.app",
    messagingSenderId: "732859904178",
    appId: "1:732859904178:web:75833845dee612b47019ab"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;

