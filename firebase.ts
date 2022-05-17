// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBok7OgE6i_Q4OttH7pbtWmXC7-ee9iPZM',
    authDomain: 'netflix-clone-b5d29.firebaseapp.com',
    projectId: 'netflix-clone-b5d29',
    storageBucket: 'netflix-clone-b5d29.appspot.com',
    messagingSenderId: '1083637690697',
    appId: '1:1083637690697:web:25c0ed33ba7c3a5c716a98',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
