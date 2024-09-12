function subsInString(string, substrings) {
  return substrings
    .map((sub) => (string.includes(sub) ? 1 : 0))
    .reduce((acc, curr) => acc + curr);
}

function isExpressionOk(string) {
  let counter = 0;

  for (let i = 0; i < string.length; i++) {
    let char = string.charAt(i);
    counter += char === "{" ? 1 : char === "}" ? -1 : 0;
    if (counter < 0) return false;
  }

  return counter == 0;
}
