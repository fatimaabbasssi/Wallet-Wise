
import { initializeApp  } from "firebase/app";

//Authentication
import {
getAuth ,
createUserWithEmailAndPassword , 
signInWithEmailAndPassword,
onAuthStateChanged,
signOut,
GoogleAuthProvider,
signInWithPopup,
updatePassword,
updateProfile
} 
from "firebase/auth";


// Database | Firestore

import { 
getFirestore,
setDoc,
doc,
getDoc,
addDoc,
collection,
query,
where,
onSnapshot,
getDocs,
updateDoc,
serverTimestamp,
deleteDoc,

}
from "firebase/firestore";


//wallet wise
const firebaseConfig = {
  apiKey: "AIzaSyAerlklQ3bVD-oH3TPcDpNZVr-5nuJGwx0",
  authDomain: "wallet-wise-b4a36.firebaseapp.com",
  projectId: "wallet-wise-b4a36",
  storageBucket: "wallet-wise-b4a36.firebasestorage.app",
  messagingSenderId: "553293081806",
  appId: "1:553293081806:web:d6d09ae52e84420cc3349f"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
auth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged,
signOut,
GoogleAuthProvider,
signInWithPopup,
updatePassword,
updateProfile,
//Firestore database
db,
setDoc,
doc,
getDoc,
addDoc,
collection,
query,
where,
onSnapshot,
getDocs,
updateDoc,
serverTimestamp,
deleteDoc

}