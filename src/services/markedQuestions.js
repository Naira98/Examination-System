const markedQuestionsContainer = document.querySelector("#markedQuestions");

function showMarkedQuestions() {
  markedQuestionsContainer.innerHTML = "";

  markedQuestions.forEach((questionIndex) => {
    let div = document.createElement("div");
    div.innerHTML = `
      <div id="q${questionIndex}" class="markedQuestion">
        <span>Question ${questionIndex + 1}</span>
        <span class="trashIcon"> <i class="fa-solid fa-trash"></i> </span>
      </div>
    `;

    div.addEventListener("click", () => {
      currentQuestionIndex = questionIndex;
      showQuestion(questions);
      enableDisablePrevNextBtns();
      openedQuestion.innerText = currentQuestionIndex + 1;
    });

    markedQuestionsContainer.append(div);

    document
      .querySelector(`#q${questionIndex} > .trashIcon`)
      .addEventListener("click", (e) => {
        e.stopPropagation();
        deleteMarkedQuestion(questionIndex);
      });
  });
}

function deleteMarkedQuestion(questionIndex) {
  markedQuestions.delete(questionIndex);
  showMarkedQuestions();
  enableDisableMarkBtn();
}
