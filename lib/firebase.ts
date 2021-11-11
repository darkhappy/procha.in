import { initializeApp } from "firebase/app";
import { getAuth, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCyqgKy9xNOKgnOaVq32sb3YI4zP0BK7kg",
  authDomain: "procha-in.firebaseapp.com",
  projectId: "procha-in",
  storageBucket: "procha-in.appspot.com",
  messagingSenderId: "463947319907",
  appId: "1:463947319907:web:4b9007ac5830a040f3c656",
};

// Initialize firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new OAuthProvider("google.com");

export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export default firebaseApp;
