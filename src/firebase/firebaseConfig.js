
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwdd6mWXQFS-UvzftRy-jhi4dmjUqhLhs",
  authDomain: "project-e0da8.firebaseapp.com",
  projectId: "project-e0da8",
  storageBucket: "project-e0da8.appspot.com",
  messagingSenderId: "8318937023",
  appId: "1:8318937023:web:fb6e6cf964c32e5dd5630a",
  measurementId: "G-GDMXSD2XR5",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
