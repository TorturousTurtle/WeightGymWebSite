import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Import your testing Firebase configuration
import {firebaseConfig} from './firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Initialize Firebase with the testing configuration
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const db = getFirestore(firebase);
const storage = getStorage(firebase);
