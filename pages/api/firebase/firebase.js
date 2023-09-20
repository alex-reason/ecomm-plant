// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhYkLGcPCHQX0Z8IG_oLlD2_aTIlnQeC4",
    authDomain: "tracker-rn.firebaseapp.com",
    projectId: "tracker-rn",
    storageBucket: "tracker-rn.appspot.com",
    messagingSenderId: "466178764767",
    appId: "1:466178764767:web:09fb5a6a4c7d3f1e169e6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);