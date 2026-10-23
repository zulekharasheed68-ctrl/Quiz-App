
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDobb2d5bXSA7blleKt2hcSHsBNW53arTI",
  authDomain: "quiz-app-bdabf.firebaseapp.com",
  projectId: "quiz-app-bdabf",
  storageBucket: "quiz-app-bdabf.firebasestorage.app",
  messagingSenderId: "511406457922",
  appId: "1:511406457922:web:bca5fb73335081844a99db",
  measurementId: "G-FB126T09GZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
