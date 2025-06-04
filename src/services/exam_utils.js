/* Questions */
function showQuestion(questions) {
  questionNo.textContent = `${currentQuestionIndex + 1}.`;
  question.textContent = questions[currentQuestionIndex].question;
  choices.innerHTML = "";

  for (let answerIndex in questions[currentQuestionIndex].answers) {
    let div = document.createElement("div");

    div.classList.add("answer");
    if (choosenAnswers.get(currentQuestionIndex) == answerIndex) {
      div.classList.add("activeAnswer");
    }

    div.textContent = questions[currentQuestionIndex].answers[answerIndex].text;

    div.addEventListener("click", () => {
      removeActiveAnswer();
      choosenAnswers.set(currentQuestionIndex, answerIndex);
      eraseBtn.disabled = false;
      div.classList.add("activeAnswer");

      const activeSideBarQuestion = document.querySelector(
        ".activeSideBarQuestion > .circle > .answerIndicator"
      );
      activeSideBarQuestion.classList.add("answered");
    });

    enableDisableMarkBtn();

    choices.append(div);
  }
}

function updateActiveQuestionSideBar() {
  const sideBarQuestions = document.querySelectorAll(".sideBarQuestion");
  sideBarQuestions.forEach((e) => e.classList.remove("activeSideBarQuestion"));
  sideBarQuestions[currentQuestionIndex].classList.add("activeSideBarQuestion");
}

function renderNewQuestion(questions) {
  showQuestion(questions);
  enableDisablePrevNextBtns();
  openedQuestion.innerText = currentQuestionIndex + 1;
  updateActiveQuestionSideBar();
  enableDisableEraseBtn();
  enableDisableMarkBtn();
}

function removeActiveAnswer() {
  const activeAnswers = document.querySelectorAll(".activeAnswer");
  activeAnswers.forEach((e) => e.classList.remove("activeAnswer"));
}

/* Contols Bar */
function enableDisablePrevNextBtns() {
  previousBtn.disabled = currentQuestionIndex === 0;
  nextBtn.disabled = currentQuestionIndex === questions.length - 1;
}

function enableDisableEraseBtn() {
  eraseBtn.disabled = !choosenAnswers.has(currentQuestionIndex);
}

function enableDisableMarkBtn() {
  markBtn.disabled = markedQuestions.has(currentQuestionIndex);
}

function removeAnsweredQuestionSideBar() {
  const sideBarQuestions = document.querySelectorAll(".circle");
  sideBarQuestions[currentQuestionIndex].children[0].classList.remove(
    "answered"
  );
}

function getAnswers(questions) {
  const answers = [];

  questions.forEach((question, index) => {
    const selectedIndex = choosenAnswers.get(index);
    const selectedAnswer = question.answers[selectedIndex];

    answers.push({
      question: question.question,
      selectedAnswer: selectedAnswer ? selectedAnswer.text : null,
      isCorrect: selectedAnswer ? selectedAnswer.isCorrect : false,
      correctAnswer: question.answers.find((a) => a.isCorrect).text,
    });
  });

  return answers;
}

function markExam(examStatus) {
  const answers = getAnswers(questions);

  // Calculate exam summary
  const totalQuestions = questions.length;
  const answeredQuestions = Array.from(choosenAnswers.keys()).length;
  const markedQuestionsCount = markedQuestions.size;

  // Save full answers for review
  localStorage.setItem("answers", JSON.stringify(answers));

  // Save summary data for endExam.html
  const examSummary = {
    totalQuestions,
    answeredQuestions,
    markedQuestionsCount,
    examStatus,
  };

  localStorage.setItem("examSummary", JSON.stringify(examSummary));
}

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
