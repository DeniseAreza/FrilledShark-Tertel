// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
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
              }, function(){
                console.log('No user Exist.');
              });

$('#signInBtn').click(signIn);
function signIn () {
    let userEmail = $('#login_username').val();
    let userPassword = $('#login_password').val();
    FirebaseSignIn.loginUser (userEmail, userPassword)
                .then(() => {
                    window.location.href = "/HTML/homepage.html";
                    console.log("Logged in");
                }, function() {
                    if (userEmail === '' || userPassword === '') {
                        $('.invalid-feedback').show();
                    }else{
                        $('.invalid-feedback').show();
                    }
                });
    
}

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