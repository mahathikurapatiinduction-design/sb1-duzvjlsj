// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

function useEnvOr(defaultValue: string, envValue: string | undefined) {
  if (!envValue) return defaultValue;
  const v = envValue.trim();
  if (v === '' || v.includes('your-project') || v.includes('...')) return defaultValue;
  return v;
}

const firebaseConfig = {
  apiKey: useEnvOr("AIzaSyB1Rk0Iooq72VYnvlt3mwuMhpWgVfGh3gI", import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: useEnvOr("water-project-d220c.firebaseapp.com", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: useEnvOr("water-project-d220c", import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: useEnvOr("water-project-d220c.firebasestorage.app", import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: useEnvOr("761899371073", import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: useEnvOr("1:761899371073:web:023dd5b1b96f20b97414c0", import.meta.env.VITE_FIREBASE_APP_ID),
  measurementId: useEnvOr("G-PMS833JN1V", import.meta.env.VITE_FIREBASE_MEASUREMENT_ID)
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;