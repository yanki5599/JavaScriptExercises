export function Mission1(array) {
  return array.filter((num) => num % 2 == 0);
}

export function Mission2(string) {
  const words = string.trim().split(" ");
  return words.filter((word) => word.length == 4).length;
}

export function Mission3(matrix) {
  return matrix.flat();
}

export function Mission4(array) {
  const isAscending = (arr) => arr.every((x, i) => i === 0 || x >= arr[i - 1]);
  const isDescending = (arr) => arr.every((x, i) => i === 0 || x <= arr[i - 1]);

  //NOTE:if all elements are the same defual behavior is isAsending...

  return isAscending(array) ? 1 : isDescending(array) ? 2 : 0;
}
