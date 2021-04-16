const input = document.querySelector("#input");
const result = document.querySelector("#result");
const error = document.querySelector("#error");
const regex = /([0-9]+:)+[0-9]+/gim;

function printResult(text) {
  error.classList.add("off");
  result.classList.remove("off");
  result.innerText = text;
}

function printError(text) {
  error.classList.remove("off");
  result.classList.add("off");
  result.innerText = text;
}

function lpad0(number) {
  return `${number}`.length === 1 ? `0${number}` : `${number}`;
}

function handleInputChange(e) {
  e.preventDefault();
  const text = e.target.value;
  var found = text.match(regex);

  if (found === null) {
    printError("No Time Data");
    return;
  }

  const totalSeconds = found.reduce((sum, time) => {
    const splited = time.split(":");
    if (splited.length === 2) {
      // M:S
      sum += +splited[0] * 60 + +splited[1];
    } else if (splited.length === 3) {
      // H:M:S
      sum += +splited[0] * 60 * 60 + +splited[1] * 60 + +splited[2];
    }
    return sum;
  }, 0);

  const MM = lpad0(Math.floor(totalSeconds / 60));
  const SS = lpad0(totalSeconds % 60);
  printResult(`Total ${MM}:${SS}`);
}

function init() {
  console.log(input);
  input.addEventListener("input", handleInputChange);
}

init();
