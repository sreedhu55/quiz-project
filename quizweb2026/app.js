const quizdata = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris"
  },
  {
    question: "Who is the CEO of Tesla?",
    options: ["Larry Page", "Jeff Bezos", "Elon Musk", "Mark Zuckerberg"],
    answer: "Elon Musk"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Neptune", "Mars", "Jupiter", "Saturn"],
    answer: "Jupiter"
  },
  {
    question: "What is the currency of Japan?",
    options: ["Euro", "USD", "Yen", "Peso"],
    answer: "Yen"
  }
];

// DOM elements
const questionNumber = document.getElementById("question-number");
const questionEl = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

// Load question
function loadQuestion() {
  clearInterval(timer);
  timeLeft = 30;
  timerEl.textContent = `Time Left : ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time Left : ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);
      nextBtn.disabled = false;
    }
  }, 1000);

  nextBtn.disabled = true;

  const currentQuiz = quizdata[currentQuestion];
  questionNumber.textContent = `Question ${currentQuestion + 1} of ${quizdata.length}`;
  questionEl.textContent = currentQuiz.question;

  optionButtons.forEach((btn, index) => {
    btn.textContent = currentQuiz.options[index];
    btn.style.backgroundColor = "#9e7a2c";
    btn.disabled = false;

    btn.onclick = () => selectAnswer(btn);
  });
}

// Select answer
function selectAnswer(button) {
  const selectedAnswer = button.textContent;
  const correctAnswer = quizdata[currentQuestion].answer;

  optionButtons.forEach(btn => (btn.disabled = true));

  if (selectedAnswer === correctAnswer) {
    button.style.backgroundColor = "green";
    score++;
  } else {
    button.style.backgroundColor = "red";
    optionButtons.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.style.backgroundColor = "green";
      }
    });
  }

  clearInterval(timer);
  nextBtn.disabled = false;
}

// Next button
nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < quizdata.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// Show result
function showResult() {
  clearInterval(timer);

  questionNumber.classList.add("hide");
  questionEl.classList.add("hide");
  document.querySelector(".options").classList.add("hide");
  document.querySelector(".footer").classList.add("hide");

  resultEl.classList.remove("hide");
  scoreEl.textContent = `${score} / ${quizdata.length}`;
}

// Start quiz
loadQuestion();
