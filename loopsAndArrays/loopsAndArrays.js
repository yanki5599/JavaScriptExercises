function printArrow(num, direction = true) {
  console.log(
    (!direction ? "<" : "") + "-".repeat(num) + (direction ? ">" : "")
  );
}

function Mission2() {
  let user = prompt("enter a num: ");
  let arr = [];
  while (user != 0) {
    arr.push(+user);
    user = prompt("enter a num: ");
  }

  if (arr.length == 0) {
    console.log(`length = `, arr.length);
    exit(0);
  }
  console.log(
    `max is: ${arr.reduce((acc, curr) => (acc = acc > curr ? acc : curr))}`
  );
  console.log(`input is: `, arr);
  console.log(`length is : ${arr.length}`);
  console.log(`sum is: ${arr.reduce((acc, curr) => acc + curr)}`);
  console.log(`avg is: ${arr.reduce((acc, curr) => acc + curr) / arr.length}`);
  console.log(
    `item in 4th place or last place is: ` + arr.length >= 4
      ? arr[3]
      : arr[arr.length - 1]
  );
}

function createTriangle(num) {
  let res = [];
  for (let i = 1; i <= num; i++) {
    res.push("*".repeat(i));
  }
  return res;
}

function printTriangel(num) {
  console.log(createTriangle(num).join("\n"));
}

printTriangel(5);
function printReverseTriangle(num) {
  console.log(createTriangle(num).reverse().join("\n"));
}

function printMultiplicationTable(n) {
  let table = [];
  let firstRow = Array.from({ length: n }, (_, i) => i + 1);
  table.push(firstRow);
  firstRow.slice(1).forEach((number) => {
    table.push(firstRow.map((i) => number * i));
  });

  table.forEach((row) => console.log(...row));
}
//printMultiplicationTable(5);

function printReverseNumber(number) {
  console.log((number + "").split("").reverse().join(""));
}

//printReverseNumber(123);

function Mission7(string) {
  if (!string) return string;
  if (string.trim() === "") return " ";
  return string.trim();
}

console.log(Mission7(""));

function Mission8() {
  let list1 = [1, 2, 3, 4];
  let list2 = [5, 6, 7, 8];

  function list3(list1, list2) {
    let res = Array(list1.length);

    const multi = (list) => list.reduce((acc, curr) => acc * curr, 1);
    const sum = (list) => list.reduce((acc, curr) => acc + curr, 0);

    res = list1.map((el) => (multi(list1) / el) * sum(list2));
    return res;
  }
  console.log(list3(list1, list2));
}

Mission8();
