const question = document.querySelector(".question");
const questionNo = document.querySelector(".questionNo");
const choices = document.querySelector(".choices");
const numberOfQuestions = document.querySelector("#numberOfQuestions");

let currentQuestionIndex = 0;
const choosenAnswers = new Map();
const markedQuestions = new Set();

var questionsPromise = fetch("../data/questions.json").then(async (res) => {
  let questions = await res.json();
  questions = shuffleQuestions(questions);
  numberOfQuestions.innerText = `/ ${questions.length}`;
  showQuestion(questions);

  window.questions = questions;

  return questions;
});
