import { countDownTimer } from "../utils/countdownTimer.js";
import { shuffleQuestions } from "../utils/questions.js";

const question = document.querySelector(".question");
const questionNo = document.querySelector(".questionNo");
const choices = document.querySelector(".choices");
const previousBtn = document.querySelector("#previous");
const nextBtn = document.querySelector("#next");
const openedQuestion = document.querySelector("#openedQuestion");
const numberOfQuestions = document.querySelector("#numberOfQuestions");

let timeInSeconds = 1.5 * 60;
let currentQuestionIndex = 0;

// countDownTimer(timeInSeconds, 30);

/* Questions */
let res = await fetch("/src/data/questions.json");
let questions = await res.json();
const answersMap = new Map();

questions = shuffleQuestions(questions);
showQuestion(currentQuestionIndex);

enableDisableBtns();
numberOfQuestions.innerText = `/ ${questions.length}`;

previousBtn.addEventListener("click", () => {
  currentQuestionIndex -= 1;
  showQuestion(currentQuestionIndex);
  enableDisableBtns();
  openedQuestion.innerText = currentQuestionIndex + 1;
});
nextBtn.addEventListener("click", () => {
  currentQuestionIndex += 1;
  showQuestion(currentQuestionIndex);
  enableDisableBtns();
  openedQuestion.innerText = currentQuestionIndex + 1;
});

function showQuestion(questionIndex) {
  questionNo.innerText = `${questionIndex + 1}.`;
  question.innerText = questions[questionIndex].question;
  choices.innerHTML = "";

  for (let answerIndex in questions[questionIndex].answers) {
    let div = document.createElement("div");

    div.classList.add("answer");
    if (answersMap.get(questionIndex)) {
      div.classList.add("activeAnswer");
    }

    div.textContent = questions[questionIndex].answers[answerIndex].text;

    div.addEventListener("click", () => {
      const activeAnswers = document.querySelectorAll(".activeAnswer");
      activeAnswers.forEach((e) => e.classList.remove("activeAnswer"));

      answersMap.set(questionIndex, answerIndex);
      div.classList.add("activeAnswer");
    });

    choices.append(div);
  }
}

function enableDisableBtns() {
  previousBtn.disabled = currentQuestionIndex === 0;
  nextBtn.disabled = currentQuestionIndex === questions.length - 1;
}
