///=================[1]=============================
function successPromise() {
  return new Promise((resolve, reject) => {
    resolve("success!");
  });
}

successPromise().then((res) => console.log(res));
///=================[2]=============================
function GetFullName(fname, lname) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${fname} ${lname}`);
    }, 1000);
  });
}

GetFullName("jacob", "gottlib").then((res) => console.log(res));

///=================[3]=============================

function addFive(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num + 5);
    }, 500);
  });
}
function multiplyByTwo(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * 2);
    }, 500);
  });
}

function subtractTen(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num - 10);
    }, 500);
  });
}

addFive(4).then((res) =>
  multiplyByTwo(res).then((res) =>
    subtractTen(res).then((res) => console.log(res))
  )
);

///=================[4]=============================
function divide(num1, num2) {
  return new Promise((resolve, reject) => {
    if (num2 === 0) reject("cannot divide by zero!");
    setTimeout(() => {
      resolve(num1 / num2);
    }, 500);
  });
}

divide(1, 0)
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

///=================[5]=============================
///====[2]=========

async function awaitedEx2() {
  let fullname = await GetFullName("jacob", "gottlib");
  console.log("awaited fullname: " + fullname);
}
awaitedEx2();
//====[3]======

async function awaitedEx3() {
  try {
    let res = await addFive(4);
    res = await multiplyByTwo(res);
    res = await subtractTen(res);
    console.log("awaited: " + res);
  } catch (err) {
    console.error(err);
  }
}

awaitedEx3();

///=================[6]=============================
///=======[4]=====

async function awaitedEx4() {
  try {
    let res = await divide(1, 3);
    console.log("awaited divide: " + res);
  } catch (err) {
    console.error(err);
  }
}

awaitedEx4();
