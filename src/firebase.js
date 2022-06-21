// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBid5RbkncEj-6NMu4CVqpwRyXZMLDFtsg",
  authDomain: "reels-70477.firebaseapp.com",
  projectId: "reels-70477",
  storageBucket: "reels-70477.appspot.com",
  messagingSenderId: "245251397915",
  appId: "1:245251397915:web:836e28e2f504972bc65bbe"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {
    comments : firestore.collection('comments'),
    users : firestore.collection('users'),
    posts : firestore.collection('posts'),
    getTimeStamp : firebase.firestore.FieldValue.serverTimestamp,
}

export const storage = firebase.storage()