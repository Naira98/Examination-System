const username = document.querySelector(".username");
const minutesClock = document.querySelector("#minutes");
const secondsClock = document.querySelector("#seconds");
const timeElem = document.querySelector(".timer");
const questionsContainer = document.querySelector(".questions");

/* Name */
const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

username.innerHTML = `
  <div class="bg-gray-300 text-gray-700 rounded-md text-center mr-2 flex justify-center items-center w-7 h-7">
    ${registeredUser.firstName.slice(0, 1).toUpperCase()} 
  </div>
  <div>
    ${capitalizeFirstLetter(registeredUser.firstName)} 
    ${capitalizeFirstLetter(registeredUser.lastName)}
  </div>
`;

/* Timer */
let timeInSeconds = 1.5 * 60;
let almostDone = 30;

const originalTime = timeInSeconds;

timer();
// let x = setInterval(timer, 100);

function timer() {
  if (timeInSeconds < 0) {
    clearInterval(x);
    window.location.href = "./timeOut.html";
    return;
  }

  if (timeInSeconds <= almostDone) {
    timeElem.style.setProperty("--color-brand", "var(--color-error)");
  }

  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds % 60;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  minutesClock.innerText = minutes;
  secondsClock.innerText = seconds;
  timeElem.style.setProperty(
    "--angle",
    `${(360 * timeInSeconds) / originalTime}deg`
  );

  timeInSeconds -= 1;
}

/* Questions */
async function run() {
  const questions = await questionsPromise;

  questions.forEach((_, i) => {
    const div = document.createElement("div");
    div.classList.add("sideBarQuestion");
    div.innerText = `• Question ${i + 1}`;

    div.addEventListener("click", () => {
      currentQuestionIndex = i;
      renderNewQuestion(questions);
    });

    questionsContainer.append(div);
  });
  updateActiveQuestionSideBar();
}
run();
