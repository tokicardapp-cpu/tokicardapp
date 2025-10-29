// Firebase configuration module
// This module prevents Firebase from initializing until valid credentials are provided

import type { Firestore } from 'firebase/firestore';

// TODO: Replace with your Firebase configuration
// Get these values from your Firebase Console > Project Settings > General
const firebaseConfig = {
  apiKey: "AIzaSyAQxvWRGaKZDPR66ZSj3DOsAzo_KwPsA0o",
  authDomain: "toki-card.firebaseapp.com",
  projectId: "toki-card",
  storageBucket: "toki-card.firebasestorage.app",
  messagingSenderId: "8847209779",
  appId: "1:8847209779:web:29c8ef17a51ab1f135ba46"
};
// Check if Firebase config is valid (contains no placeholder values)
const isConfigValid = (): boolean => {
  return !Object.values(firebaseConfig).some(val => 
    typeof val === 'string' && (val.includes('YOUR_') || val.includes('_HERE'))
  );
};

export const isFirebaseConfigured = isConfigValid();

// Lazy initialization - only load Firebase SDK when config is valid
let db: Firestore | undefined;

const initializeFirebase = async () => {
  if (!isFirebaseConfigured) {
    return undefined;
  }

  try {
    const { initializeApp, getApps } = await import('firebase/app');
    const { getFirestore } = await import('firebase/firestore');
    
    // Initialize Firebase only if not already initialized
    if (!getApps().length) {
      const app = initializeApp(firebaseConfig);
      db = getFirestore(app);
    } else {
      const app = getApps()[0];
      db = getFirestore(app);
    }
    
    return db;
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    return undefined;
  }
};

// Export a function to get the database instance
export const getDb = async (): Promise<Firestore | undefined> => {
  if (db) return db;
  return await initializeFirebase();
};

// Export db as undefined if not configured (prevents immediate initialization)
export { db };
