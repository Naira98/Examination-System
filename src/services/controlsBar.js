const openedQuestion = document.querySelector("#openedQuestion");
const numberOfQuestions = document.querySelector("#numberOfQuestions");
const previousBtn = document.querySelector("#previous");
const nextBtn = document.querySelector("#next");
const eraseBtn = document.querySelector("#eraseAnswer");
const markBtn = document.querySelector("#markQuestion");
const markedQuestionsContainer = document.querySelector("#markedQuestions");

async function run() {
  const questions = await questionsPromise;

  numberOfQuestions.innerText = `/ ${questions.length}`;

  enableDisablePrevNextBtns();

  previousBtn.addEventListener("click", () => {
    currentQuestionIndex -= 1;
    renderNewQuestion(questions);
  });

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex += 1;
    renderNewQuestion(questions);
  });

  eraseBtn.addEventListener("click", () => {
    choosenAnswers.delete(currentQuestionIndex);
    removeActiveAnswer();
    enableDisableEraseBtn();
    removeAnsweredQuestionSideBar(currentQuestionIndex);
  });

  markBtn.addEventListener("click", () => {
    markedQuestions.add(currentQuestionIndex);
    enableDisableMarkBtn();
    showMarkedQuestions();
  });
}

run();

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
      renderNewQuestion(questions);
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
