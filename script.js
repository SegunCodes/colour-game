var numOfSquares = 6;
var colors = [];
var pickedColor;
let playHexMode;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector(".reset");
var modeBtn = document.querySelectorAll(".mode");
let playModeSwitch = document.querySelectorAll(".play-mode");
let playModeText = document.getElementById("play-mode-text");

let num = 0;

function init() {
  //mode buttons
  setUpModeButtons();
  setPlayMode();
  setUpSquares();
  reset();
}
init();

function setUpModeButtons() {
  for (var i = 0; i < modeBtn.length; i++) {
    modeBtn[i].addEventListener("click", function () {
      modeBtn[0].classList.remove("selected");
      modeBtn[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? (numOfSquares = 3) : (numOfSquares = 6);
      reset();
    });
  }
}

// switch play mode
function setPlayMode() {
  for (var i = 0; i < playModeSwitch.length; i++) {
    playModeSwitch[i].addEventListener("click", function () {
      playModeSwitch[0].classList.remove("selected-mode");
      playModeSwitch[1].classList.remove("selected-mode");
      this.classList.add("selected-mode");

      if (this.textContent === "HEX") {
        playHexMode = true;
        playModeText.textContent = "HEX";
      } else {
        playHexMode = false;
        playModeText.textContent = "RGB";
      }
      reset();
    });
  }
}

function setUpSquares() {
  for (var i = 0; i < squares.length; i++) {
    //add click listeners to squares
    squares.forEach((square) => {
      square.addEventListener("click", (e) => {
        if (num === 1) {
          return;
        }
        num = 1;
        squares.forEach((color) => {
          let answer = playHexMode
            ? convertRgbString(color.style.backgroundColor)
            : color.style.backgroundColor;

          if (answer == pickedColor) {
            color.innerHTML = `<svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="check"
                class="svg-inline--fa fa-check fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path
                fill="currentColor"
                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                ></path>
            </svg>`;
          }
        });

        // if (square.style.backgroundColor === pickedColor) {
        //   console.log(square);
        // }

        resetBtn.textContent = "Play Again?";

        //grab color of clicked square
        var clickedColor = playHexMode
          ? convertRgbString(e.target.style.backgroundColor)
          : e.target.style.backgroundColor;

        //compare color to picked color
        if (clickedColor === pickedColor) {
          e.target.innerHTML = `<svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="check"
            class="svg-inline--fa fa-check fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
        >
            <path
            fill="currentColor"
            d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
            ></path>
        </svg>`;
          // changeColors(clickedColor);
          h1.style.backgroundColor = clickedColor;
        } else {
          e.target.innerHTML = `<svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="times"
            class="svg-inline--fa fa-times fa-w-11"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 352 512"
        >
            <path
            fill="currentColor"
            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
            ></path>
        </svg>`;
        }

        console.log();
      });
    });
  }
}

function reset() {
  num = 0;
  //generate all new color
  colors = generateRandomColors(numOfSquares);
  //pick a new random color from array
  pickedColor = pickColor();

  //change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  resetBtn.textContent = "Change Colours";
  //change colors of squares
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      // set square background color based on play mode
      playHexMode
        ? (squares[i].attributes[
            "style"
          ].textContent = `background-color:${colors[i]}`)
        : (squares[i].style.backgroundColor = colors[i]);
      squares[i].innerHTML = "";
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelblue";
}

resetBtn.addEventListener("click", reset);

//function to change all colors to correct answer
function changeColors(color) {
  //loop through all color
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  //make an array
  var arr = [];
  //add num random colors to array
  for (var i = 0; i < num; i++) {
    //get random color and push into array
    arr.push(randomColor());
  }
  //return d array
  return arr;
}
function randomColor() {
  //pick a red from 0-255
  var r = Math.floor(Math.random() * 256);
  //pick a blue from 0-255
  var g = Math.floor(Math.random() * 256);
  //pick a green from 0-255
  var b = Math.floor(Math.random() * 256);
  // "rgb(r, g, b)"

  // return color format based on play mode
  return playHexMode
    ? convertRgbToHex(r, g, b)
    : "rgb(" + r + ", " + g + ", " + b + ")";
}

function hexValue(x) {
  var hex = x.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function convertRgbToHex(r, g, b) {
  return `#${hexValue(r)}${hexValue(g)}${hexValue(b)}`;
}

function convertRgbString(clickedColor) {
  const splitted = clickedColor
    ?.replace("rgb(", "")
    .replace(")", "")
    .split(",");
  const r = parseInt(splitted[0], 10);
  const g = parseInt(splitted[1], 10);
  const b = parseInt(splitted[2], 10);

  return convertRgbToHex(r, g, b);
}
