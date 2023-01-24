// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getAuth, signOut} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
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

// * VARIABLES AND REFERENCES
var letterTitle = document.getElementById('letterTitle');
var letterBody = document.getElementById('letterBody');
// *

// ------------------------------
//         ALL QUERIES
// ------------------------------

// * Check Active User and Post Letter
$('#postLetter').click(postLetter);
function postLetter(){
    FirebaseSignIn.checkActiveUser()
    .then((user) => {
      console.log(user.email)
      console.log(user.uid)
      
      if (user.uid == 'MttntLN41ybVZhZCvV48onZ6SxC2') {
        var rawDate = new Date();
        const letterDate = rawDate.toDateString();

        const postListRef = ref(database, 'Users/' + user.uid + '/letters');
        const newPostRef = push(postListRef);
        set(newPostRef, {
            title: letterTitle.value,
            letterBody: letterBody.value,
            date: letterDate,
            name: 'Denise'
        });
              
        alert("Succesfully sent!");
      } else {
        var rawDate = new Date();
        const letterDate = rawDate.toDateString();

        const postListRef = ref(database, 'Users/' + 'wMgMpS9U4KfhCVqOwhJC1Uj45fM2' + '/letters');
        const newPostRef = push(postListRef);
        set(newPostRef, {
            title: letterTitle.value,
            letterBody: letterBody.value,
            date: letterDate,
            name: 'Jayce'
        });
        alert("Succesfully sent!");
      }
        
    }, function(){
      console.log('No user Exist.');
      window.location.href = '/';
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