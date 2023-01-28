// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getAuth, signOut} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js"
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
const storage = getStorage(app);
// *

// * IMPORT
import * as FirebaseSignIn from './firebaseSignIn.js';
// *

// * VARIABLES AND REFERENCES
var files = [];
var reader = new FileReader();

var mediaTitle = document.getElementById('mediaTitle');
var mediaDescription = document.getElementById('mediaDescription');
var datepicker = document.getElementById('datepicker');
var mediaFile = document.getElementById('mediaFile');
var mediaName = document.getElementById('mediaName');

mediaFile.onchange = e => {
    files = e.target.files;
    reader.readAsDataURL(files[0]);
}
// *

// ------------------------------
//         ALL QUERIES
// ------------------------------

// * Check Active User
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

// * Post
$('#postMedia').click(postClicked);
function postClicked() {
        var progressBar = document.getElementById('progress');
        var imageToUpload = files[0];
        
        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = sRef(storage, 'images/' + mediaFile.files[0].name);
        const uploadTask = uploadBytesResumable(storageRef, imageToUpload);
        
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressBar.value = progress;
            switch (snapshot.state) {
                case 'paused':
                console.log('Upload is paused');
                break;
                case 'running':
                console.log('Upload is running');
                break;
            }
            }, 
            (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
                case 'storage/canceled':
                // User canceled the upload
                break;
        
                // ...
        
                case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
            }, 
            () => {
                // Upload completed successfully, now we can get the download URL
                alert("Uploaded successfully!")
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const postListRef = ref(database, 'Media/');
                    const newPostRef = push(postListRef);
                    set(newPostRef, {
                        title: mediaTitle.value,
                        description: mediaDescription.value,
                        date: datepicker.value,
                        picture : downloadURL,
                        name : mediaName.value
                    });
                });
            }
        );
}