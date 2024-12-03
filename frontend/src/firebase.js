// Import necessary Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "ratnaauth.firebaseapp.com",
  projectId: "ratnaauth",
  storageBucket: "ratnaauth.appspot.com",
  messagingSenderId: "1017201036343",
  appId: "1:1017201036343:web:31db988601c6a7da5883b2",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);
auth.languageCode = "en"; // Optional: Set preferred language for auth UI

// Set up Google Authentication provider
const provider = new GoogleAuthProvider();

// Export the app, auth, and provider for use elsewhere
export { app, auth, provider };
