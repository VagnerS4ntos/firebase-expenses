import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'next-firebase-b1a8c.firebaseapp.com',
  projectId: 'next-firebase-b1a8c',
  storageBucket: 'next-firebase-b1a8c.appspot.com',
  messagingSenderId: '429045068926',
  appId: '1:429045068926:web:b4ae8567ab7e2efb4b142f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
