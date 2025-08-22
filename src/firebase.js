import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAKQRGcwsnzb3t0ePinK6UxI-Yfmzmz_b8",
  authDomain: "fcmm-app.firebaseapp.com",
  projectId: "fcmm-app",
  storageBucket: "fcmm-app.firebasestorage.app",
  messagingSenderId: "166545466380",
  appId: "1:166545466380:web:40f743a85c9eb93ed0fa29",
  measurementId: "G-2VCBT7EDB9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
