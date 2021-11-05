var numOfSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector(".reset");
var modeBtn = document.querySelectorAll(".mode");

let num = 0;

function init() {
  //mode buttons
  setUpModeButtons();
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
          let answer = color.style.backgroundColor;
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
        var clickedColor = e.target.style.backgroundColor;

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
      squares[i].style.backgroundColor = colors[i];
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
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
