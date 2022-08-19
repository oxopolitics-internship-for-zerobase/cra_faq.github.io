import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB0BSlU8s4G5PEnk6guraYVScT7ynBVMXk',
  authDomain: 'oxoqna.firebaseapp.com',
  projectId: 'oxoqna',
  storageBucket: 'oxoqna.appspot.com',
  messagingSenderId: '434224691922',
  appId: '1:434224691922:web:96fe96fe1fce9d060ecb0b',
};

export const app = initializeApp(firebaseConfig);
export const authService = getAuth();
export const dbService = getFirestore();
