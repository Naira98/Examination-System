const minutesClock = document.querySelector("#minutes");
const secondsClock = document.querySelector("#seconds");
const timeElem = document.querySelector(".timer");

export function countDownTimer(timeInSeconds, almostDone) {
  const originalTime = timeInSeconds;

  timer();
  let x = setInterval(timer, 1000);

  function timer() {
    if (timeInSeconds < 0) {
      clearInterval(x);
      return;
    }

    if (timeInSeconds <= almostDone) {
      timeElem.style.setProperty("--color-brand", "var(--color-error)");
    }

    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;

    timeInSeconds -= 1;

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    minutesClock.innerText = minutes;
    secondsClock.innerText = seconds;
    timeElem.style.setProperty("--angle", `${(360 * timeInSeconds) / originalTime}deg`);
  }
}
