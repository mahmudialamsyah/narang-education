import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration - Replace with your own Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDNayB3vwFUCigfVnz5aZgj13KISdDPjvQ",
  authDomain: "narangeducation-2f1f3.firebaseapp.com",
  projectId: "narangeducation-2f1f3",
  storageBucket: "narangeducation-2f1f3.firebasestorage.app",
  messagingSenderId: "989850403030",
  appId: "1:989850403030:web:7c844de0fb874e457e8977"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
