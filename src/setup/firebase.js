import firebase from 'firebase/app';
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBxx0_OBird13mfXVG_q98bzooPTK0kbR8",
    authDomain: "rdcuy-49bae.firebaseapp.com",
    projectId: "rdcuy-49bae",
    storageBucket: "rdcuy-49bae.appspot.com",
    messagingSenderId: "1009564832851",
    appId: "1:1009564832851:web:886ad8e4ffd2cbe1cfe2a6"
  };

export default firebase.initializeApp(firebaseConfig);