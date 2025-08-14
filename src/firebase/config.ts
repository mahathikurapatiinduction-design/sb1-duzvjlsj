// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB1Rk0Iooq72VYnvlt3mwuMhpWgVfGh3gI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "water-project-d220c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "water-project-d220c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "water-project-d220c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "761899371073",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:761899371073:web:023dd5b1b96f20b97414c0",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-PMS833JN1V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;