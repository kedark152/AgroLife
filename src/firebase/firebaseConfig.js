import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCm7LQoCrKth5C1MDDBh0xZM4kJNcjcpKw',
  authDomain: 'agrolife-69d60.firebaseapp.com',
  projectId: 'agrolife-69d60',
  storageBucket: 'agrolife-69d60.appspot.com',
  messagingSenderId: '634105288333',
  appId: '1:634105288333:web:4b032446b2b789fa85f4c4',
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth();
