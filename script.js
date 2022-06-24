let solutionColorArray = [];
let userColorArray = [];
let left = 1;
let right = 0;
let resetEnabled = false;
function shuffleArr(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var rand = Math.floor(Math.random() * (i + 1));
    [array[i], array[rand]] = [array[rand], array[i]];
  }
}

function createLayout() {
  document.querySelector(".btn").style.display = "none";
  document.querySelector(".showMsg").style.display = "none";
  let container = document.getElementsByClassName("container")[0];
  for (let i = 5; i >= 1; i--) {
    let rowWrapper = document.createElement("div");
    rowWrapper.className = "allRows";
    rowWrapper.id = i;
    for (let j = 1; j <= 5; j++) {
      let rowEach = document.createElement("div");
      rowEach.id = `${i + "" + j}`;
      rowWrapper.append(rowEach);
    }
    let msg = document.createElement("span");
    msg.id = i + "-sol";
    msg.className = "solution";
    rowWrapper.append(msg);
    container.append(rowWrapper);
  }
  let palleteClass = document.getElementsByClassName("colorChoose");
  for (let i = 0; i < palleteClass.length; i++) {
    let color = getRandomColor();
    palleteClass[i].style.backgroundColor = color;
    solutionColorArray.push(color);
  }
  shuffleArr(solutionColorArray);
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const rgb2hex = (rgb) =>
  `#${rgb
    .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    .slice(1)
    .map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
    .join("")}`;

function checkColor(leftNew) {
  let count = 0;
  for (let i = 0; i < 5; i++) {
    if (solutionColorArray[i] === userColorArray[i]) {
      count++;
    }
  }
  document.getElementById(
    `${leftNew}-sol`
  ).innerText = `${count} placed in correct position`;
  if (count === 5) {
    document.querySelector(".showMsg").style.display = "block";
    document.querySelector(".showMsg").innerHTML =
      "<b>Great!! You found out the pattern</b>";
    resetEnabled = true;
    document.querySelector(".btn").style.display = "block";
    return;
  }
  if (left === 5) {
    resetEnabled = true;
    document.querySelector(".btn").style.display = "block";
    document.querySelector(".showMsg").style.display = "block";
    document.querySelector(".showMsg").innerHTML = "<b>OOPS! Try again :(</b>";
  }
}

function resetLayout() {
  document.getElementsByClassName("container")[0].innerHTML = "";
  userColorArray = [];
  solutionColorArray = [];
  createLayout();
  left = 1;
  right = 0;
  resetEnabled = false;
}

createLayout();

document.querySelector(".pallete").addEventListener("click", (e) => {
  if (resetEnabled) return;
  if (e.target.className !== "colorChoose") return;
  right++;
  document.getElementById(left + "" + right).style.backgroundColor =
    e.target.style.backgroundColor;
  userColorArray.push(rgb2hex(e.target.style.backgroundColor).toUpperCase());
  if (right === 5) {
    checkColor(left);
    userColorArray = [];
    left++;
    right = 0;
  }
});
