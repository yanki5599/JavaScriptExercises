// class Solider {
//   constructor(fullName, rank, position, platoon, status, missionTime) {
//     this.id = generateId();
//     this.fullName = fullName;
//     this.rank = rank;
//     this.position = position;
//     this.platoon = platoon;
//     this.status = status;
//     this.missionTime = missionTime;
//     this.element = createElement();
//   }

//   createElement() {
//     const trElement = document.createElement("tr");
//     trElement.id = this.id;

//     const tdElementName = document.createElement("td");
//     tdElementName.textContent = this.fullName;

//     const tdElementRank = document.createElement("td");
//     tdElementRank.textContent = this.rank;

//     const tdElementPosition = document.createElement("td");
//     tdElementPosition.textContent = this.position;

//     const tdElementPlatoon = document.createElement("td");
//     tdElementPlatoon.textContent = this.platoon;

//     const tdElementStatus = document.createElement("td");
//     tdElementStatus.textContent = this.status;

//     const actionsBtnWrapperTd = document.createElement("td");
//     const actionsBtnWrapperDiv = document.createElement("div");
//     actionsBtnWrapperDiv.classList.add("buttonsWrapper");

//     const removeBtn = document.createElement("button");
//     removeBtn.textContent = "Remove";

//     const missionBtn = document.createElement("button");
//     missionBtn.textContent = "Mission";

//     const editBtn = document.createElement("button");
//     editBtn.textContent = "Edit";

//     actionsBtnWrapperDiv.append(removeBtn, missionBtn, editBtn);
//     actionsBtnWrapperTd.append(actionsBtnWrapperDiv);

//     trElement.append(
//       tdElementName,
//       tdElementRank,
//       tdElementPosition,
//       tdElementPlatoon,
//       tdElementStatus,
//       actionsBtnWrapperTd
//     );
//     return trElement;
//   }
// }

export function createSoliderElement(removeBtnFunc, editBtnFunc) {
  const trElement = document.createElement("tr");
  trElement.id = this.id;

  const tdElementName = document.createElement("td");
  tdElementName.textContent = this.fullName;

  const tdElementRank = document.createElement("td");
  tdElementRank.textContent = this.rank;

  const tdElementPosition = document.createElement("td");
  tdElementPosition.textContent = this.position;

  const tdElementPlatoon = document.createElement("td");
  tdElementPlatoon.textContent = this.platoon;

  const tdElementStatus = document.createElement("td");
  tdElementStatus.textContent = this.status;

  const actionsBtnWrapperTd = document.createElement("td");
  const actionsBtnWrapperDiv = document.createElement("div");
  actionsBtnWrapperDiv.classList.add("buttonsWrapper");

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";

  const missionBtn = document.createElement("button");
  missionBtn.textContent = "Mission";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";

  actionsBtnWrapperDiv.append(removeBtn, missionBtn, editBtn);
  actionsBtnWrapperTd.append(actionsBtnWrapperDiv);

  removeBtn.addEventListener("click", () => removeBtnFunc(this.id));
  editBtn.addEventListener("click", () => editBtnFunc(this.id));

  trElement.append(
    tdElementName,
    tdElementRank,
    tdElementPosition,
    tdElementPlatoon,
    tdElementStatus,
    actionsBtnWrapperTd
  );
  return trElement;
}

export const SoliderStatus = Object.freeze({
  Active: Symbol("Active"),
  Reserve: Symbol("Reserve"),
  Retired: Symbol("Retired"),
});

function createStatusOptionElement(status) {
  const optionEl = document.createElement("option");
  optionEl.text = status;
  optionEl.value = status;

  return optionEl;
}

function getTextOfStatus(statusSymbol) {
  return statusSymbol.toString().slice(7, -1);
}

export function CreateSoldiersStatusElements() {
  return Object.keys(SoliderStatus).map((status) =>
    createStatusOptionElement(status)
  );
}

function generateId() {
  return "id" + Math.random().toString(16).slice(2) + new Date().getTime();
}
