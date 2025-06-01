import { countDownTimer } from "../utils/countdownTimer.js";
import { shuffleQuestions } from "../utils/questions.js";

const question = document.querySelector(".question");
const questionNo = document.querySelector(".questionNo");
const choices = document.querySelector(".choices");
const previousBtn = document.querySelector("#previous");
const nextBtn = document.querySelector("#next");
const openedQuestion = document.querySelector("#openedQuestion");
const numberOfQuestions = document.querySelector("#numberOfQuestions");
const eraseBtn = document.querySelector("#eraseAnswer");
const markBtn = document.querySelector("#markQuestion");

let timeInSeconds = 1.5 * 60;
let currentQuestionIndex = 0;

countDownTimer(timeInSeconds, 30);

/* Questions */
let res = await fetch("/src/data/questions.json");
let questions = await res.json();
const choosenAnswers = new Map();
const markedQuestions = new Set();

questions = shuffleQuestions(questions);
showQuestion(currentQuestionIndex);

numberOfQuestions.innerText = `/ ${questions.length}`;
enableDisablePrevNextBtns();

let prevNextBtn = [
  {
    btn: previousBtn,
    operation: () => {
      currentQuestionIndex -= 1;
    },
  },
  {
    btn: nextBtn,
    operation: () => {
      currentQuestionIndex += 1;
    },
  },
];

for (let { btn, operation } of prevNextBtn) {
  btn.addEventListener("click", () => {
    operation();
    showQuestion(currentQuestionIndex);
    enableDisablePrevNextBtns();
    openedQuestion.innerText = currentQuestionIndex + 1;
  });
}

eraseBtn.addEventListener("click", () => {
  choosenAnswers.delete(currentQuestionIndex);
  removeActiveAnswer();
});

markBtn.addEventListener("click", () => {
  markedQuestions.add(currentQuestionIndex);
  enableDisableMarkBtn();
});

/* ------- Question, Choices, EventListener to answer question ------- */
function showQuestion(questionIndex) {

  questionNo.textContent = `${questionIndex + 1}.`;
  question.textContent = questions[questionIndex].question;
  choices.innerHTML = "";

  for (let answerIndex in questions[questionIndex].answers) {
    let div = document.createElement("div");

    div.classList.add("answer");
    if (choosenAnswers.get(questionIndex) == answerIndex) {
      div.classList.add("activeAnswer");
    }

    div.textContent = questions[questionIndex].answers[answerIndex].text;

    div.addEventListener("click", () => {
      removeActiveAnswer();
      choosenAnswers.set(questionIndex, answerIndex);
      eraseBtn.disabled = false;
      div.classList.add("activeAnswer");
    });

    choices.append(div);
  }
}

function enableDisablePrevNextBtns() {
  previousBtn.disabled = currentQuestionIndex === 0;
  nextBtn.disabled = currentQuestionIndex === questions.length - 1;
}

function removeActiveAnswer() {
  const activeAnswers = document.querySelectorAll(".activeAnswer");
  activeAnswers.forEach((e) => e.classList.remove("activeAnswer"));
}

function enableDisableMarkBtn() {
  markBtn.disabled = markedQuestions.has(currentQuestionIndex);
}
