import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
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
export const auth = getAuth();
export const dbService = getFirestore();
export const GoogleAuth = new GoogleAuthProvider();
export const signPopup = (provider) => {
  return signInWithPopup(auth, provider);
};
export const CreateUser = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

export const SignUser = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};
