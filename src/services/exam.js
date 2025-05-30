import { countDownTimer } from "../utils/countdownTimer.js";

const progressBar = document.querySelector(".progressBar");
enableProgressBar();
function enableProgressBar() {
  progressBar.setAttribute("role", "progressbar");
  progressBar.setAttribute("aria-valuenow", 0);
  progressBar.setAttribute("aria-live", "polite");
}

let timer = 1.5 * 60 * 1000;

countDownTimer(timer);
