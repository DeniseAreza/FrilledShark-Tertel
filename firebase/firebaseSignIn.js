// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxs0BM9nr5Fw2Yf9rJ3av1mskIRaUzLyE",
  authDomain: "frilled-shark-tertel.firebaseapp.com",
  projectId: "frilled-shark-tertel",
  storageBucket: "frilled-shark-tertel.appspot.com",
  messagingSenderId: "1009864641106",
  appId: "1:1009864641106:web:fc02320c51b0e2eeaa6d8b",
  measurementId: "G-KW3Q5YE9D2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// *

// ------------------------------
//         ALL QUERIES
// ------------------------------
// * check active user
export function checkActiveUser() {
    return new Promise(function (resolve, reject) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          resolve(user);
          // ...
        } else {
          // User is signed out
          // ...
          reject();
        }
      });
    })
  }
// *

// * for handling existing users
export function loginUser (email, password) {
    return new Promise (function (resolve, reject){ 
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        resolve();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject();
      });
    })
  }
  // *

  // * Sign out existing user
export function signOutUser() {
    return new Promise (function (resolve, reject){
      signOut(auth).then(() => {
        // Sign-out successful.
        resolve();
      }).catch((error) => {
        // An error happened.
        reject();
      });
    })
  }
  // *