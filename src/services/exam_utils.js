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
    });

    enableDisableMarkBtn();

    choices.append(div);
  }
}

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
