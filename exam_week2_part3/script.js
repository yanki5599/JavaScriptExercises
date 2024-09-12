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
    status: "sdf",
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

window.onload = () => {
  fillStatusLists();
  readSoldiersFromLoacl();
  loadSoldiers();
  showHomePage();
};

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
  }
}

function editSolider(id) {
  const solider = soldiers.find((s) => s.id === id);

  if (!solider) return;

  showEditPage();
  loadSoliderDetails();
}

function loadSoliderDetails() {}
