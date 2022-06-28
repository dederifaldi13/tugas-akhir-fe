import firebase from 'firebase/app';
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBt_m6eMypujDqUHh_yw1NQB--6X1erurc",
    authDomain: "nagatech-vps-admin.firebaseapp.com",
    projectId: "nagatech-vps-admin",
    storageBucket: "nagatech-vps-admin.appspot.com",
    messagingSenderId: "485507712077",
    appId: "1:485507712077:web:255505c8eb3a2fafc34804",
    measurementId: "G-VHDREYK7ZX"
};

export default firebase.initializeApp(firebaseConfig);