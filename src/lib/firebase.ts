import { getApps, initializeApp } from 'firebase/app';
import { getStorage, ref } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: 'moskin-70c3b.appspot.com',
  messagingSenderId: '330582475127',
  appId: '1:330582475127:web:99bf3e6138931525e2e172',
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const storage = getStorage(app);

export const storageRef = (token: string) => ref(storage, token);
