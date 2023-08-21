import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHKuquqr84Q0Xn9usaJ3zQZNVy2dC0ZX0",
  authDomain: "todo-firebase-60046.firebaseapp.com",
  projectId: "todo-firebase-60046",
  storageBucket: "todo-firebase-60046.appspot.com",
  messagingSenderId: "968346789335",
  appId: "1:968346789335:web:91130833c8bf65c5ee5792"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export {auth,db}


// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firebase-firestore";
// import firebaseConfig from "./config";

// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();
// const db = firebase.firestore();

// export {auth, db}