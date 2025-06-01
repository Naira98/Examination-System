const markedQuestionsContainer = document.querySelector("#markedQuestions");

function showMarkedQuestions() {
  markedQuestionsContainer.innerHTML = "";

  markedQuestions.forEach((questionIndex) => {
    let div = document.createElement("div");
    div.innerText = `Question ${questionIndex + 1}`;
    div.classList.add("markedQuestion");

    div.addEventListener("click", () => {
      currentQuestionIndex = questionIndex;
      showQuestion(questions);
      enableDisablePrevNextBtns();
      openedQuestion.innerText = currentQuestionIndex + 1;
    });
    markedQuestionsContainer.append(div);
  });
}

function deleteMarkedQuestion() {}
