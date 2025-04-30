import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
let app;
let database;

// Check if we're in a browser environment and Firebase isn't already initialized
if (typeof window !== "undefined") {
  try {
    app = initializeApp(firebaseConfig);
    database = getDatabase(app);
  } catch (error) {
    console.error("Firebase initialization error", error);
  }
}

// Function to update robot movement state
export const updateRobotMovement = async (movement: string) => {
  if (!database) return;
  try {
    await set(ref(database, 'movement'), movement);
    return true;
  } catch (error) {
    console.error("Error updating robot movement:", error);
    return false;
  }
};

// Function to update laser state
export const updateLaserState = async (action: string) => {
  if (!database) return;
  try {
    await set(ref(database, 'laser'), action);
    return true;
  } catch (error) {
    console.error("Error updating laser state:", error);
    return false;
  }
};

// Function to update profiling state
export const updateProfilingState = async (state: string) => {
  if (!database) return;
  try {
    await set(ref(database, 'profiling'), state);
    return true;
  } catch (error) {
    console.error("Error updating profiling state:", error);
    return false;
  }
};

export { database };