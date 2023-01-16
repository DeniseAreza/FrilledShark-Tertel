// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
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
const database = getDatabase(app);
// *

// * IMPORT
import * as FirebaseSignIn from './firebaseSignIn.js';
// *

// ------------------------------
//         ALL QUERIES
// ------------------------------
// * Sign in of user

FirebaseSignIn.checkActiveUser()
              .then((user) => {
                console.log(user.email)
                console.log(user.uid)

                const nameRef = ref(database, 'Users/' + user.uid);
                    onValue(nameRef, (data) => {
                        var name = data.val().name; 
                        document.getElementById("name").textContent= name;
                      });
              }, function(){
                console.log('No user Exist.');
                window.location.href = '/';
              });

// * Log out
$('#logoutBtn').click(logOutClicked);
function logOutClicked() {
    FirebaseSignIn.signOutUser()
            .then(() => {
                window.location.href = '/';
                console.log('signed out')
            }, function() {
                console.log('not yet signed out');
            });
}