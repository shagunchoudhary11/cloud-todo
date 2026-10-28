import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDRrKZJHJvi4Y5fEA3d5lUJzrHxrdjUcig',
  authDomain: 'to-do-app-31043.firebaseapp.com',
  projectId: 'to-do-app-31043',
  appId: '1:213058268610:web:0c4a1d49083b70294aba5b',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);