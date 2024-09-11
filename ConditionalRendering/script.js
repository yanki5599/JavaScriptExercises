import { users } from "./users.js";
import { cards, createCard } from "./cards.js";

let header, loginPage, homePage, errorModalSection;

const changeModeBtn = document.getElementById("changeModeBtn");
const logoutBtn = document.getElementById("logoutBtn");

function setGlobalElements() {
  errorModalSection = document.getElementById("errorModalSection");
  loginPage = document.getElementById("loginPage");
  header = document.querySelector("header");
  homePage = document.getElementById("homePage");
}

function isLoggedIn() {
  return localStorage.getItem("isLoggedIn");
}

function login(form) {
  const email = form["email"].value;
  const password = form["password"].value;

  if (users.find((u) => u.email === email && u.password === password)) {
    setLoggedIn();
    showHomePage();
  } else {
    showErrorMsgModal("Error", "invalid email or password");
  }
}

function setLoggedIn() {
  localStorage.setItem("isLoggedIn", true);
}
const hideErrorModal = () => {
  errorModalSection.style.display = "none";
};

function showErrorMsgModal(title, msg) {
  const errorModalSection = document.getElementById("errorModalSection");
  const errorModal = document.getElementById("errorModal");
  const modalTitle = errorModal.getElementsByClassName("modalTitle")[0];
  const modalMsg = errorModal.getElementsByClassName("modalMsg")[0];

  modalTitle.textContent = title;
  modalMsg.textContent = msg;

  errorModalSection.style.display = "flex";

  setTimeout(hideErrorModal, 15000);
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.reload();
}

function setListener(element, trigger, func, ...args) {
  element.addEventListener(trigger, (...args) => {
    func(...args);
  });
}

function showHomePage() {
  loginPage.style.display = "none";
  header.style.display = "block";
  homePage.style.display = "flex";
  document.body.style.height = "100%";

  renderCards();
}

function renderCards() {
  const cardsListDiv = document.getElementById("cardsList");
  console.log(cards);

  cards.forEach((card) => {
    const newCard = createCard(card.title, card.urlImage, card.desc);
    cardsListDiv.append(newCard);
  });
}

function showLoginPage() {
  loginPage.style.display = "flex";
  header.style.display = "none";
  homePage.style.display = "none";
  document.body.style.height = "100vh";
}

function changeThemeMode() {
  document.body.classList.toggle("darkMode");
}

document.addEventListener("DOMContentLoaded", () => {
  setGlobalElements();

  setListener(errorModalSection, "click", hideErrorModal);
  setListener(changeModeBtn, "click", changeThemeMode);
  setListener(logoutBtn, "click", logout);

  if (isLoggedIn()) showHomePage();
  else showLoginPage();

  const loginForm = document.getElementById("loginForm");
  setListener(loginForm, "submit", (e) => {
    e.preventDefault();
    login(e.target);
  });
});
