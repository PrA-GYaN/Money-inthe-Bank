import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAewtt3Z5EYK1gwMYsxFZjpf7AmQ9Y-mEg",
    authDomain: "money-in-the-bank-30b81.firebaseapp.com",
    projectId: "money-in-the-bank-30b81",
    storageBucket: "money-in-the-bank-30b81.appspot.com",
    messagingSenderId: "122584974447",
    appId: "1:122584974447:web:028e62d6818f1c9ec8f99a",
    measurementId: "G-CM25HDXPSY"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  export { auth };
