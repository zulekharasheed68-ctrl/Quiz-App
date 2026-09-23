var questions = [
    {
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Computer Processing User"
        ],
        answer: "Central Processing Unit"
    },

    {
        question: "Which device is used to type text into a computer?",
        options: [
            "Monitor",
            "Keyboard",
            "Mouse",
            "Printer"
        ],
        answer: "Keyboard"
    },

    {
        question: "Which of these is an operating system?",
        options: [
            "Google",
            "Windows",
            "Chrome",
            "Facebook"
        ],
        answer: "Windows"
    },

    {
        question: "What is the brain of the computer?",
        options: [
            "Monitor",
            "Keyboard",
            "CPU",
            "Mouse"
        ],
        answer: "CPU"
    },

    {
        question: "Which device is used to move the pointer on the screen?",
        options: [
            "Keyboard",
            "Printer",
            "Mouse",
            "Speaker"
        ],
        answer: "Mouse"
    },

    {
        question: "Which one is used to store data permanently?",
        options: [
            "RAM",
            "Hard Disk",
            "CPU",
            "Monitor"
        ],
        answer: "Hard Disk"
    },

    {
        question: "What does RAM stand for?",
        options: [
            "Read Access Memory",
            "Random Access Memory",
            "Run Access Memory",
            "Random Available Memory"
        ],
        answer: "Random Access Memory"
    },

    {
        question: "Which device displays information on the screen?",
        options: [
            "Monitor",
            "Keyboard",
            "Mouse",
            "Scanner"
        ],
        answer: "Monitor"
    },

    {
        question: "Which of the following is a web browser?",
        options: [
            "Microsoft Word",
            "Google Chrome",
            "Windows",
            "Windows Media Player"
        ],
        answer: "Google Chrome"
    },

    {
        question: "What is the full form of USB?",
        options: [
            "Universal Serial Bus",
            "United System Bus",
            "Universal System Board",
            "User Serial Bus"
        ],
        answer: "Universal Serial Bus"
    }
];


var currentQuestion = 0;
var score = 0;
var time = 10;
var timer;


// Get the main box
var box = document.querySelector(".box1");


// Start Quiz
document.querySelector(".start").addEventListener("click", function () {

    currentQuestion = 0;
    score = 0;

    showQuestion();

});


// Show Question
function showQuestion() {

    clearInterval(timer);

    time = 10;

    var q = questions[currentQuestion];

    box.innerHTML = `
        <div class="quiz-box">

            <h2>Question ${currentQuestion + 1} of ${questions.length}</h2>

            <h3>${q.question}</h3>

            <p class="timer">Time: <span id="time">${time}</span> seconds</p>

            <div class="options">

                <button class="option">${q.options[0]}</button>

                <button class="option">${q.options[1]}</button>

                <button class="option">${q.options[2]}</button>

                <button class="option">${q.options[3]}</button>

            </div>

            <p>Score: ${score}</p>

        </div>
    `;


    // Get all answer buttons
    var options = document.querySelectorAll(".option");


    options.forEach(function (button) {

        button.addEventListener("click", function () {

            checkAnswer(button);

        });

    });


    // Start timer
    timer = setInterval(function () {

        time--;

        document.getElementById("time").innerText = time;

        if (time === 0) {

            clearInterval(timer);

            nextQuestion();

        }

    }, 1000);

}


// Check Answer
function checkAnswer(button) {

    clearInterval(timer);

    var correctAnswer = questions[currentQuestion].answer;


    if (button.innerText === correctAnswer) {

        score = score + 10;

        button.style.backgroundColor = "green";
        button.style.color = "white";

    } else {

        button.style.backgroundColor = "red";
        button.style.color = "white";

    }


    // Disable all buttons
    var options = document.querySelectorAll(".option");

    options.forEach(function (btn) {

        btn.disabled = true;

        // Show correct answer
        if (btn.innerText === correctAnswer) {

            btn.style.backgroundColor = "green";
            btn.style.color = "white";

        }

    });


    // Go to next question after 1 second
    setTimeout(function () {

        nextQuestion();

    }, 1000);

}


// Next Question
function nextQuestion() {

    clearInterval(timer);

    currentQuestion++;


    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

}


// Show Final Result
function showResult() {

    box.innerHTML = `
        <div class="result">

            <h1>Quiz Completed 🎉</h1>

            <h2>Your Score</h2>

            <h1>${score} / 100</h1>

            <p>You answered all 10 questions.</p>

            <button class="restart">RESTART QUIZ</button>

        </div>
    `;


    document.querySelector(".restart").addEventListener("click", function () {

        currentQuestion = 0;
        score = 0;

        showQuestion();

    });

}