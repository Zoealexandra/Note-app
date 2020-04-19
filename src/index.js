import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5uhvhm-jS6LqqeQsIeNZ480e0Z_Znmaw",
  authDomain: "evernote-clone-330c8.firebaseapp.com",
  databaseURL: "https://evernote-clone-330c8.firebaseio.com",
  projectId: "evernote-clone-330c8",
  storageBucket: "evernote-clone-330c8.appspot.com",
  messagingSenderId: "751539435435",
  appId: "1:751539435435:web:37a3f476fed3c6ad6a44ee",
  measurementId: "G-VWX8D8PW2Y"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('evernote-container')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
