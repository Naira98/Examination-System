import { countDownTimer } from "../utils/countdownTimer.js";
import { shuffleQuestions } from "../utils/questions.js";

const question = document.querySelector(".question");
const questionNo = document.querySelector(".questionNo");
const choices = document.querySelector(".choices");

let timeInSeconds = 1.5 * 60;
let currentQuestionIndex = 0;

// countDownTimer(timeInSeconds, 30);

let res = await fetch("/src/data/questions.json");
let questions = await res.json();
const answersMap = new Map();

questions = shuffleQuestions(questions);

questionNo.innerText = `${currentQuestionIndex + 1}.`;
question.innerText = questions[currentQuestionIndex].question;

for (let answerIndex in questions[currentQuestionIndex].answers) {
  let div = document.createElement("div");
  div.classList.add("answer");
  div.textContent = questions[currentQuestionIndex].answers[answerIndex].text;
  choices.append(div);

  div.addEventListener("click", () => {
    const activeAnswers = document.querySelectorAll(".activeAnswer");
    answersMap.set(currentQuestionIndex, answerIndex);
    activeAnswers.forEach((e) => e.classList.remove("activeAnswer"));
    div.classList.add("activeAnswer");
  });
}
