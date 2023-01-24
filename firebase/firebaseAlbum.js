// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, onValue, onChildAdded } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
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

// * Retrieval of Pictures
const mediaRef = ref(database, 'Media');
onChildAdded(mediaRef, (data) => {
    var mediaTitle = data.val().title;
    var mediaDescription = data.val().description;
    var mediaPicture = data.val().picture;
    var mediaDateRaw = data.val().date;

    const date = new Date(mediaDateRaw);
    const newDate = date.toDateString();

    $('#table_media').prepend(
          '<div class="card mt-3">'
        + '<div class="card-body">'
        + '<div class="row">'
        + '<div class="col-sm mt-3">'
        + '<img src='+ mediaPicture +' alt="" class="img-fluid">'
        + '</div>'
        + '<div class="col-sm mt-3">'
        + '<h1>'+ mediaTitle +'</h1>'
        + '<small class="text-muted">'+ newDate +'</small>'
        + '<p>'+ mediaDescription +'</p>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
    )
})