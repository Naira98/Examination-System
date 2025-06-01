const openedQuestion = document.querySelector("#openedQuestion");
const previousBtn = document.querySelector("#previous");
const nextBtn = document.querySelector("#next");
const eraseBtn = document.querySelector("#eraseAnswer");
const markBtn = document.querySelector("#markQuestion");

async function run() {
  const questions = await questionsPromise;

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
      showQuestion(questions);
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
    showMarkedQuestions();
  });
}

run();
