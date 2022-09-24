import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyClHvtHrerc5qSCROQOXKd5nlmWIVfIyBw",
    authDomain: "social-media-app-c2be9.firebaseapp.com",
    projectId: "social-media-app-c2be9",
    storageBucket: "social-media-app-c2be9.appspot.com",
    messagingSenderId: "900963336027",
    appId: "1:900963336027:web:384af28cde2525011c247e"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
