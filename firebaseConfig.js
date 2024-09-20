// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnfm7R0pAIxzLM7syz-4xL8YzZGgWF5Zk",
  authDomain: "todosapp-5e106.firebaseapp.com",
  projectId: "todosapp-5e106",
  storageBucket: "todosapp-5e106.appspot.com",
  messagingSenderId: "621249626273",
  appId: "1:621249626273:web:7df81113a99bb61bb770e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;