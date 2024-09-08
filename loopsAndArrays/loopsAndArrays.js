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

Mission2();
