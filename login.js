
import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

const form = document.querySelector(".form");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);

        alert("Login successful!");
        window.location.href = "home.html";

    } catch (error) {
        if (error.code === "auth/invalid-credential") {
            alert("Incorrect email or password!");
        } else {
            alert(error.message);
        }
    }
});
