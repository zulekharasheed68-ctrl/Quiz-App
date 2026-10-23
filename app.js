
import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

function waitForUser() {
    return new Promise(function (resolve) {
        const unsubscribe = onAuthStateChanged(auth, function (user) {
            unsubscribe();
            resolve(user);
        });
    });
}

var questions = [
    {
        question: "What does CPU stand for?",
        options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Computer Processing User"],
        answer: "Central Processing Unit"
    },
    {
        question: "Which device is used to type text into a computer?",
        options: ["Monitor", "Keyboard", "Mouse", "Printer"],
        answer: "Keyboard"
    },
    {
        question: "Which of these is an operating system?",
        options: ["Google", "Windows", "Chrome", "Facebook"],
        answer: "Windows"
    },
    {
        question: "What is the brain of the computer?",
        options: ["Monitor", "Keyboard", "CPU", "Mouse"],
        answer: "CPU"
    },
    {
        question: "Which device is used to move the pointer on the screen?",
        options: ["Keyboard", "Printer", "Mouse", "Speaker"],
        answer: "Mouse"
    },
    {
        question: "Which one is used to store data permanently?",
        options: ["RAM", "Hard Disk", "CPU", "Monitor"],
        answer: "Hard Disk"
    },
    {
        question: "What does RAM stand for?",
        options: ["Read Access Memory", "Random Access Memory", "Run Access Memory", "Random Available Memory"],
        answer: "Random Access Memory"
    },
    {
        question: "Which device displays information on the screen?",
        options: ["Monitor", "Keyboard", "Mouse", "Scanner"],
        answer: "Monitor"
    },
    {
        question: "Which of the following is a web browser?",
        options: ["Microsoft Word", "Google Chrome", "Windows", "Windows Media Player"],
        answer: "Google Chrome"
    },
    {
        question: "What is the full form of USB?",
        options: ["Universal Serial Bus", "United System Bus", "Universal System Board", "User Serial Bus"],
        answer: "Universal Serial Bus"
    }
];

var currentQuestion = 0;
var score = 0;
var time = 10;
var timer;
var questionAnswered = false;

var box = document.querySelector(".box1");
var startButton = document.querySelector(".start");

if (startButton && box) {
    startButton.addEventListener("click", function () {
        currentQuestion = 0;
        score = 0;
        showQuestion();
    });
}

function showQuestion() {
    clearInterval(timer);
    time = 10;
    questionAnswered = false;

    var q = questions[currentQuestion];

    box.innerHTML = `
        <div class="quiz-box">
            <h2>Question ${currentQuestion + 1} of ${questions.length}</h2>
            <h3>${q.question}</h3>
            <p class="timer">Time: <span id="time">${time}</span> seconds</p>
            <div class="options">
                ${q.options.map(function (option) {
                    return `<button class="option">${option}</button>`;
                }).join("")}
            </div>
            <p>Score: ${score}</p>
        </div>
    `;

    var options = document.querySelectorAll(".option");

    options.forEach(function (button) {
        button.addEventListener("click", function () {
            checkAnswer(button);
        });
    });

    timer = setInterval(function () {
        time--;

        var timeDisplay = document.getElementById("time");

        if (timeDisplay) {
            timeDisplay.innerText = time;
        }

        if (time <= 0) {
            clearInterval(timer);
            questionAnswered = true;
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(button) {
    if (questionAnswered) {
        return;
    }

    questionAnswered = true;
    clearInterval(timer);

    var correctAnswer = questions[currentQuestion].answer;
    var options = document.querySelectorAll(".option");

    options.forEach(function (btn) {
        btn.disabled = true;

        if (btn.innerText === correctAnswer) {
            btn.style.backgroundColor = "green";
            btn.style.color = "white";
        }
    });

    if (button.innerText === correctAnswer) {
        score += 10;
    } else {
        button.style.backgroundColor = "red";
        button.style.color = "white";
    }

    setTimeout(function () {
        nextQuestion();
    }, 1000);
}

function nextQuestion() {
    clearInterval(timer);

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

async function showResult() {
    clearInterval(timer);

    box.innerHTML = `
        <div class="result">
            <h1>Quiz Completed 🎉</h1>
            <h2>Your Score</h2>
            <h1>${score} / 100</h1>
            <p>You answered all 10 questions.</p>
            <p id="saveStatus">Saving your result...</p>
            <button class="restart">RESTART QUIZ</button>
        </div>
    `;

    document.querySelector(".restart").addEventListener("click", function () {
        currentQuestion = 0;
        score = 0;
        showQuestion();
    });

    try {
        const user = await waitForUser();

        if (!user) {
            document.getElementById("saveStatus").textContent =
                "Please log in to save your history.";
            return;
        }

        await addDoc(collection(db, "users", user.uid, "quizHistory"), {
            score: score,
            totalQuestions: questions.length,
            total: questions.length * 10,
            percentage: score,
            createdAt: serverTimestamp()
        });

        document.getElementById("saveStatus").textContent =
            "Result saved successfully!";
    } catch (error) {
        console.error("Error saving quiz history:", error);

        document.getElementById("saveStatus").textContent =
            "Could not save result: " + error.message;
    }
}

const historyBtn = document.getElementById("historyBtn");

if (historyBtn) {
    historyBtn.addEventListener("click", function () {
        window.location.href = "history.html";
    });
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", async function () {
        try {
            await signOut(auth);
            window.location.href = "login.html";
        } catch (error) {
            console.error("Logout error:", error);
            alert("Logout failed: " + error.message);
        }
    });
}