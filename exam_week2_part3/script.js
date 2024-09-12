import {
  CreateSoldiersStatusElements,
  createSoliderElement,
} from "./soldiers.js";

const HOME_PAGE_TITLE = "BATTALION FORCE MANAGEMENT";
const EDIT_PAGE_TITLE = "EDIT PERSONAL";

const headingTitle = document.getElementById("headerTitle");
const mainPage = document.getElementById("MainPage");
const editPage = document.getElementById("EditPage");

let soldiers = [
  {
    id: 1,
    fullName: "sdf",
    rank: "sdf",
    position: "sdf",
    platoon: "sdf",
    status: "Active",
    missionTime: "sdf",
  },
];

function readSoldiersFromLoacl() {
  soldiers = JSON.parse(localStorage.getItem("soldiers")) || [];
}

function saveSoldiers() {
  localStorage.setItem("soldiers", JSON.stringify(soldiers));
}

function fillStatusLists() {
  const soldiersStatusListAdd = document.getElementById(
    "soldiersStatusListAdd"
  );
  const soldiersStatusListEdit = document.getElementById(
    "soldiersStatusListEdit"
  );
  const optionArray1 = CreateSoldiersStatusElements();
  const optionArray2 = CreateSoldiersStatusElements();

  optionArray1.forEach((opt) => {
    soldiersStatusListAdd.append(opt);
  });
  optionArray2.forEach((opt) => {
    soldiersStatusListEdit.append(opt);
  });
}

function showHomePage() {
  headingTitle.textContent = HOME_PAGE_TITLE;
  mainPage.style.display = "block";
  editPage.style.display = "none ";
}

function showEditPage() {
  headingTitle.textContent = EDIT_PAGE_TITLE;
  mainPage.style.display = "none";
  editPage.style.display = "block ";
}

function loadSoldiers() {
  const table = document.getElementById("soldiersTable");

  const headers = table.firstElementChild;
  table.replaceChildren();
  table.append(headers);

  soldiers.forEach((s) => {
    table.appendChild(
      createSoliderElement.call(s, [removeSolider, editSolider])
    );
  });
}

function removeSolider(id) {
  const index = soldiers.findIndex((s) => s.id == id);
  if (index) {
    soldiers.splice(index, 1);
    saveSoldiers();
    loadSoldiers();
  }
}

function editSolider(id) {
  const solider = soldiers.find((s) => s.id === id);

  if (!solider) return;

  showEditPage();
  loadSoliderDetails(solider);
}

function loadSoliderDetails(solider) {
  const editForm = editPage.querySelector("form");

  editForm["fullName"].value = solider.fullName;
  editForm["rank"].value = solider.rank;
  editForm["position"].value = solider.position;
  editForm["platoon"].value = solider.platoon;
  editForm["status"].value = solider.status;
  editForm["missionTime"].value = solider.missionTime;
}

function setFormEL() {
  const addForm = mainPage.querySelector("form");

  addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addSolider(addForm);
  });
}

function generateId() {
  return "id" + Math.random().toString(16).slice(2) + new Date().getTime();
}

function addSolider(form) {
  const newSol = {
    id: generateId(),
    fullName: form["fullName"].value,
    rank: form["rank"].value,
    position: form["position"].value,
    platoon: form["platoon"].value,
    status: form["status"].value,
    missionTime: form["missionTime"].value,
  };
  form.reset();
  soldiers.push(newSol);
  saveSoldiers();
  loadSoldiers();
}

window.onload = () => {
  fillStatusLists();
  setFormEL();
  readSoldiersFromLoacl();
  loadSoldiers();
  showHomePage();
};
