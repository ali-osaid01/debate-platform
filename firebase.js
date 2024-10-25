import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAW_qOt-80N70-Esj1cd8GocVaRIlRl1KU",
  authDomain: "virtual-debate-3ad36.firebaseapp.com",
  projectId: "virtual-debate-3ad36",
  storageBucket: "virtual-debate-3ad36.appspot.com",
  messagingSenderId: "906564534765",
  appId: "1:906564534765:web:94cf40f2dd4526bf6827e4",
  measurementId: "G-C9L3QZ5P4B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
