// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB1Rk0Iooq72VYnvlt3mwuMhpWgVfGh3gI",
  authDomain: "water-project-d220c.firebaseapp.com",
  projectId: "water-project-d220c",
  storageBucket: "water-project-d220c.firebasestorage.app",
  messagingSenderId: "761899371073",
  appId: "1:761899371073:web:023dd5b1b96f20b97414c0",
  measurementId: "G-PMS833JN1V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;