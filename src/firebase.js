import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyB-20e7zVtnlfOPA_pcxmB9KDxOnLMquxo',
  authDomain: 'gardengram-b2bb2.firebaseapp.com',
  projectId: 'gardengram-b2bb2',
  storageBucket: 'gardengram-b2bb2.appspot.com',
  messagingSenderId: '230762970232',
  appId: '1:230762970232:web:e1f012a346ef5ba02bc18d',
  measurementId: 'G-L55DLR5RDW'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
