import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

let app;
let dbInstance = null;
let authInstance = null;

try {
  // Fallback configuration matching the project's Firebase setup
  const firebaseConfig = {
    projectId: "balmy-haven-5vxch",
    appId: "1:943077997436:web:1b81c0ece704f384e382f9",
    apiKey: "AIzaSyAmOrj3Elh5VTiZYXUcuHN_DrV3kS1qKJc",
    authDomain: "balmy-haven-5vxch.firebaseapp.com",
    storageBucket: "balmy-haven-5vxch.firebasestorage.app",
    messagingSenderId: "943077997436"
  };

  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }

  dbInstance = getFirestore(app, "ai-studio-antimodernfurnit-710d3189-8309-4d78-9061-75857e104adc");
  authInstance = getAuth(app);
} catch (err) {
  console.warn('Firebase initialization notice:', err);
}

export const db = dbInstance;
export const auth = authInstance;

// Attach to window for the MonitoringService to access easily without circular imports
if (typeof window !== 'undefined') {
  window.firebaseDb = db;
}

