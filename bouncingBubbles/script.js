BUBBLES = 15;

const STATUS = {
  RIGHT_UP: [1, -1],
  RIGHT_DOWN: [1, 1],
  LEFT_UP: [-1, -1],
  LEFT_DOWN: [-1, 1],
};

class Bubble {
  TICK = 20;
  FACTOR = 10;
  WIDTH = 100;
  HEIGHT = 100;
  constructor() {
    this.element = document.createElement("div");
    document.body.append(this.element);
    this.element.classList.add("bubble");
    this.element.style.backgroundColor = this.randomColor();
    this.element.style.width = this.WIDTH + "px";
    this.element.style.height = this.HEIGHT + "px";
    this.element.style.borderRadius = "100%";
    this.element.style.position = "absolute";
    this.randomPos();
    this.startMoving();
  }
  randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
  randomPos() {
    let w =
      Math.random() * (this.element.parentElement.clientWidth - this.WIDTH);

    this.element.style.left = w + "px";

    let h =
      Math.random() * (this.element.parentElement.clientHeight - this.HEIGHT);

    this.element.style.top = h + "px";
  }
  startMoving() {
    this.status = STATUS[Object.keys(STATUS)[Math.floor(Math.random() * 4)]];
    this.interval = setInterval(() => {
      this.element.style.left =
        +this.element.style.left.slice(0, -2) +
        this.status[0] * this.FACTOR +
        "px";
      this.element.style.top =
        +this.element.style.top.slice(0, -2) +
        this.status[1] * this.FACTOR +
        "px";

      checkWalls.call(this);
    }, this.TICK);
  }
}

function checkWalls() {
  const parentWidth = this.element.parentElement.clientWidth;
  const parentHeight = this.element.parentElement.clientHeight;

  let newStatus = [0, 0];
  const addVector = (list1, list2) => {
    list1[0] += list2[0];
    list1[1] += list2[1];
  };

  if (+this.element.style.left.slice(0, -2) + this.WIDTH + 10 >= parentWidth)
    addVector(newStatus, rightWallTouched(this));

  if (+this.element.style.left.slice(0, -2) <= 0)
    addVector(newStatus, leftWallTouched(this));

  if (+this.element.style.top.slice(0, -2) <= 0)
    addVector(newStatus, topWallTouched(this));

  if (+this.element.style.top.slice(0, -2) + this.HEIGHT + 10 >= parentHeight)
    addVector(newStatus, BottomWallTouched(this));

  if (JSON.stringify(newStatus) != "[0,0]") {
    this.status = newStatus;
    this.element.style.backgroundColor = this.randomColor();
  }
}
function rightWallTouched(bubble) {
  return [-1, bubble.status[1]];
}
function leftWallTouched(bubble) {
  return [1, bubble.status[1]];
}
function topWallTouched(bubble) {
  return [bubble.status[0], 1];
}
function BottomWallTouched(bubble) {
  return [bubble.status[0], -1];
}

window.onload = () => {
  fillBubbles(BUBBLES);
};

function fillBubbles(num) {
  for (let i = 0; i < num; i++) {
    new Bubble();
  }
}
