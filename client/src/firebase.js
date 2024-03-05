// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "kaleidoscope-5f8c1.firebaseapp.com",
  projectId: "kaleidoscope-5f8c1",
  storageBucket: "kaleidoscope-5f8c1.appspot.com",
  messagingSenderId: "2540542476",
  appId: "1:2540542476:web:8ca333c33eb72807006c29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app