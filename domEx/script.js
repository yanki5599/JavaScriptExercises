const body = document.body;

const h1MouseOut = document.createElement("h1");
h1MouseOut.innerText = "Mouse out";
body.append(h1MouseOut);

h1MouseOut.addEventListener("mouseenter", (e) => {
  e.target.textContent = "Mouse in";
});

h1MouseOut.addEventListener("mouseout", (e) => {
  e.target.textContent = "Mouse out";
});

h1MouseOut.addEventListener("click", (e) => {
  e.target.style.cssText = `
  color:red;
  background-color:blue;
  text-decoration: underline overline #FF3028;`;
});

// 2

let box = document.createElement("div");

box.style.cssText = `
width: 500px;
height:500px;
background-color: green;
visibility:visible;`;

body.append(box);

let selectColor = document.createElement("select");

let optionRed = document.createElement("option");
optionRed.value = "red";
optionRed.text = "red";
let optionGreen = document.createElement("option");
optionGreen.value = "green";
optionGreen.text = "green";
let optionBlue = document.createElement("option");
optionBlue.value = "blue";
optionBlue.text = "blue";

selectColor.append(optionBlue, optionGreen, optionRed);
body.append(selectColor);

let changeColorBtn = document.createElement("button");
body.append(changeColorBtn);
changeColorBtn.textContent = "change color";
changeColorBtn.addEventListener("click", () => {
  box.style.backgroundColor = selectColor.value;
});

// switch hidden
let hideBoxBtn = document.createElement("button");
hideBoxBtn.textContent = "hide box";
hideBoxBtn.addEventListener("click", () => {
  if (box.style.visibility == "visible") {
    box.style.visibility = "hidden";
    hideBoxBtn.textContent = "show box";
  } else {
    box.style.visibility = "visible";
    hideBoxBtn.textContent = "hide box";
  }
});
body.append(hideBoxBtn);

// input color

let inputColor = document.createElement("input");
inputColor.placeholder = "red of #123456";

let addColorBtn = document.createElement("button");
addColorBtn.textContent = "add color";

body.append(inputColor, addColorBtn);
addColorBtn.addEventListener("click", () => {
  let newOption = document.createElement("option");
  newOption.text = inputColor.value;
  newOption.value = inputColor.value;

  selectColor.append(newOption);
  inputColor.value = "";
});

// 3

let divEl = document.createElement("div");
let divText = document.createElement("p");
divText.textContent = "this is text";
divEl.append(divText);
body.append(divEl);
