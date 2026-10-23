
import { auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

const form = document.querySelector(".form");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await updateProfile(result.user, {
            displayName: name
        });

        alert("Account created successfully!");
        window.location.href = "login.html";

    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            alert("This email is already registered!");
        } else if (error.code === "auth/weak-password") {
            alert("Please choose a stronger password!");
        } else {
            alert(error.message);
        }
    }
});
