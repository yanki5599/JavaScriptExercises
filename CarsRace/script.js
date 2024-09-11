const CARSMIN = 2;
const CARSMAX = 4;
const MIN_STEP = 1;
const MAX_STEP = 7;
const INTERVAL_MS = 2;

const app = { tracks: [], running: false };

function incrementStyleSidePx(numPx, inc) {
  return +numPx.slice(0, -2) + inc + "px";
}

class Car {
  constructor(racerName, imageIdx = 1) {
    if (![...Array(CARSMAX).keys()].includes(imageIdx - 1))
      throw new Error("imageIdx is out of range [1-4]!");
    this.idx = imageIdx;
    this.name = racerName;
    this.element = document.createElement("div");
    this.element.classList.add("car");
    this.element.style.backgroundImage = `url('/images/car${imageIdx}.png')`;

    // getDisplayedBackgroundImageWidth(this.element)
    //   .then((width) => (this.displayedImageWidth = width))
    //   .catch((error) => console.error(error));
  }
  async StartDriving() {
    this.startTime = new Date();
    this.timer = setInterval(() => this.#Drive(), INTERVAL_MS);
  }
  #Drive() {
    // move the car
    this.element.style.left = incrementStyleSidePx(
      this.element.style.left,
      this.randomStep()
    );

    const currentLeft = +this.element.style.left.slice(0, -2);
    const containerWidth = this.element.parentElement.clientWidth;
    const elementWidth = this.element.offsetWidth;
    const finishLineRight = window.getComputedStyle(
      this.element.parentElement.lastElementChild
    ).right;

    if (
      currentLeft + elementWidth >=
      containerWidth - parseInt(finishLineRight)
    ) {
      this.Stop();
      console.log();
    }
  }
  Stop() {
    clearInterval(this.timer);
    this.endTime = new Date();
  }
  randomStep() {
    return Math.random() * (MAX_STEP - MIN_STEP) + MIN_STEP;
  }
}

function setListener(element, trigger, func, ...args) {
  element.addEventListener(trigger, () => {
    func(...args);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const startRaceBtn = document.getElementById("startRace");
  const resetAppBtn = document.getElementById("resetRace");

  setListener(startRaceBtn, "click", Start);
  setListener(resetAppBtn, "click", resetApp);
});

function validateInput(input) {
  if (!input || !isCarsAmountInRange(input))
    return `cars amount out of range [${CARSMIN}-${CARSMAX}]`;

  if (input % 1 != 0) return "cars amount should be integer";

  return "";
}

const isCarsAmountInRange = (amount) =>
  +amount >= CARSMIN && +amount <= CARSMAX;

function Start() {
  const howManyCarsInput = document.getElementById("carAmountInput");
  const carsAmountVal = howManyCarsInput.value;

  const errors = validateInput(carsAmountVal);
  if (errors) {
    alert(errors);
    return;
  }

  //clear input
  howManyCarsInput.value = "";

  if (app.running) {
    resetApp();
  }
  app.running = true;
  setUpRaceTracks(+carsAmountVal);
  startRacing();

  app.checker = setInterval(() => {
    if (AreAllFinished()) raceFinished();
  }, 1000);
}

function resetApp() {
  const tracksElement = document.getElementById("tracks");
  tracksElement.replaceChildren();
  app.running = false;
  app.tracks = [];

  let list = document.querySelector("#raceResaults > ul");
  list.replaceChildren();
  resetButtonVisible(false);
}

function setUpRaceTracks(amount) {
  const tracksElement = document.getElementById("tracks");

  for (i in [...Array(amount).keys()]) {
    let trackObj = createTrack(+i + 1);
    tracksElement.append(trackObj.track);
    app.tracks.push(trackObj);
  }
}

function createTrack(index) {
  let newTrackElement = document.createElement("div");
  newTrackElement.classList.add("track");

  let newFinishLineElement = document.createElement("div");
  newFinishLineElement.classList.add("finish-line");

  let newCar = new Car(`Racer ${index}`, index);

  newTrackElement.append(newCar.element, newFinishLineElement);
  return {
    track: newTrackElement,
    car: newCar,
    finishLine: newFinishLineElement,
  };
}

function startRacing() {
  app.tracks.forEach((t) => t.car.StartDriving());
}

function AreAllFinished() {
  return app.tracks.every((t) => t.car.endTime);
}

function raceFinished() {
  clearInterval(app.checker); // stop checker if race finished

  let WinnersInOrder = calculateWinnersOrder();

  showResaults(WinnersInOrder);

  resetButtonVisible(true);
}

function calculateWinnersOrder() {
  return app.tracks
    .map((t, idx) => {
      return {
        carName: t.car.name,
        idx,
        time: calculateDrivingTime(t.car.startTime, t.car.endTime),
      };
    })
    .sort((c1, c2) => c1.time - c2.time);
}

function calculateDrivingTime(start, end) {
  return new Date(end - start).getTime() / 1000;
}

function showResaults(WinnersInOrder) {
  let list = document.querySelector("#raceResaults > ul");

  WinnersInOrder.forEach((c, i) => {
    const newLi = document.createElement("li");
    if (i == 0) newLi.style.color = "gold";
    newLi.textContent = `${c.carName}  -  מקום ${i + 1}, זמן:${c.time} שניות `;
    list.append(newLi);
  });
}

function resetButtonVisible(show = true) {
  const resetAppBtn = document.getElementById("resetRace");
  resetAppBtn.style.visibility = show ? "visible" : "hidden";
}
