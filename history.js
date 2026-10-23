import { auth, db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

const historyBody = document.getElementById("historyBody");
const message = document.getElementById("message");

onAuthStateChanged(auth, async function (user) {
    if (!user) {
        message.textContent = "Please log in to view your quiz history.";
        window.location.href = "login.html";
        return;
    }

    try {
        message.textContent = "Loading your history...";
        historyBody.innerHTML = "";

        const historyRef = collection(
            db,
            "users",
            user.uid,
            "quizHistory"
        );

        const snapshot = await getDocs(historyRef);

        if (snapshot.empty) {
            message.textContent = "No quiz history found yet.";
            return;
        }

        const records = snapshot.docs.map(function (doc) {
            return doc.data();
        });

        records.sort(function (a, b) {
            const dateA = a.createdAt?.toMillis?.() || 0;
            const dateB = b.createdAt?.toMillis?.() || 0;

            return dateB - dateA;
        });

        records.forEach(function (data) {
            const row = document.createElement("tr");

            const dateCell = document.createElement("td");

            dateCell.textContent = data.createdAt?.toDate
                ? data.createdAt.toDate().toLocaleString()
                : "Date unavailable";

            const marksCell = document.createElement("td");

            marksCell.textContent = `${data.score ?? 0} / ${data.total ?? 100}`;

            const correctCell = document.createElement("td");

            const correctAnswers = data.correctAnswers ??
                Math.round((data.score ?? 0) / 10);

            correctCell.textContent = `${correctAnswers} / 10`;

            row.appendChild(dateCell);
            row.appendChild(marksCell);
            row.appendChild(correctCell);

            historyBody.appendChild(row);
        });

        message.textContent = "";

    } catch (error) {
        console.error("History loading error:", error.code, error.message);

        message.textContent =
            "Unable to load history: " + error.message;
    }
});