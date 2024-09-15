const SEC = 3;
const EVERY_SEC = 1000; //ms
const TIME_OUT = 3000; // ms

const colorBox = document.getElementById("colorBox");
const innerText = document.getElementById("innerText");
const timerSeconds = document.getElementById("timerSeconds");
const changeBtn = document.getElementById("changeColor");
const cancelBtn = document.getElementById("cancelChange");
const colorPicker = document.getElementById("colorInput");

let timerId = undefined;
let intervalId = undefined;
let seconds = SEC;

const rgba2hex = (rgba) =>
  `#${rgba
    .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
    .slice(1)
    .map((n, i) =>
      (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
        .toString(16)
        .padStart(2, "0")
        .replace("NaN", "")
    )
    .join("")}`;

function printSecondsTimer(sec) {
  timerSeconds.textContent = sec + "s";
}

function changeColor() {
  seconds = SEC;
  printSecondsTimer(seconds--);
  intervalId = setInterval(() => {
    printSecondsTimer(seconds--);
  }, EVERY_SEC);
  timerId = setTimeout(() => {
    setColorBox();
    timerSeconds.textContent = "";
    clearInterval(intervalId);
  }, TIME_OUT);
}

function setColorBox() {
  colorBox.style.backgroundColor = colorPicker.value;
  innerText.textContent = `selected color: ${rgba2hex(
    colorBox.style.backgroundColor
  )}`;
}
function cancelChange() {
  clearInterval(intervalId);
  clearTimeout(timerId);
  timerSeconds.textContent = "";
}

window.onload = () => {
  changeBtn.addEventListener("click", changeColor);
  cancelBtn.addEventListener("click", cancelChange);
};
