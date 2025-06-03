const question = document.querySelector(".question");
const questionNo = document.querySelector(".questionNo");
const choices = document.querySelector(".choices");

let currentQuestionIndex = 0;
const choosenAnswers = new Map();
const markedQuestions = new Set();

var questionsPromise = fetch("../data/questions.json").then(async (res) => {
  let questions = await res.json();
  questions = shuffleQuestions(questions);
  showQuestion(questions);

  window.questions = questions;

  return questions;
});

function shuffleQuestions(questions) {
  let currentIndex = questions.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [questions[currentIndex], questions[randomIndex]] = [
      questions[randomIndex],
      questions[currentIndex],
    ];
  }
  return questions;
}
