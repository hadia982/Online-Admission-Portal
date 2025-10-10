// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC1WW3_S3RdwqF3eiYbVs_erthcXn4u_7I",
  authDomain: "online-admission-portal-93dd0.firebaseapp.com",
  projectId: "online-admission-portal-93dd0",
  storageBucket: "online-admission-portal-93dd0.firebasestorage.app",
  messagingSenderId: "489980763897",
  appId: "1:489980763897:web:c3ed70839ddcfc47d20c28",
  measurementId: "G-YX65P5281J"
};

// Initialize Firebase
try {
  var  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
}
// const app = initializeApp(firebaseConfig);

// Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };