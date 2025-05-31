const minutesClock = document.querySelector(".minutes");
const secondsClock = document.querySelector(".seconds");
const timeElem = document.querySelector(".timer");

export function countDownTimer(time, almostDone) {
  const originalTime = time;

  timer();
  let x = setInterval(timer, 1000);

  function timer() {
    if (time < 0) {
      clearInterval(x);
      return;
    }

    if (time <= almostDone) {
      timeElem.style.setProperty("--color-brand", "var(--color-error)");
    }

    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    time -= 1;

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    minutesClock.innerText = minutes;
    secondsClock.innerText = seconds;
    timeElem.style.setProperty("--angle", `${(360 * time) / originalTime}deg`);
  }
}
