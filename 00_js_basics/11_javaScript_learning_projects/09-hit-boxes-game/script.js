var clutter = "";
var timerVal = 3;
let hit;
let score = 0;
let targetNum;

document
  .querySelector(".playArea")
  .addEventListener("click", function (details) {
    targetNum = Number(details.target.textContent);
    scoreIncrement(targetNum, hit);
  });

function scoreIncrement(targetNum, hit) {
  if (targetNum === hit) {
    scoreupdate();
    hitVal();
    makeBubble();
  }
}

function scoreupdate() {
  score += 10;
  document.getElementById("score").textContent = score;
}

function hitVal() {
  hit = Math.floor(Math.random() * 10);
  document.getElementById("hitVal").textContent = hit;
}

function timer() {
  var timeint = setInterval(function () {
    if (timerVal > 0) {
      timerVal--;
      document.getElementById("time").textContent = timerVal;
    } else {
      clearInterval(timeint);
      document.querySelector(".playArea").innerHTML = `
       <div class="overContainer">
        <h1 class="over">Game Over</h1>
        <p class="finalScore">Your Score: ${score}</p>
        <p class="refreshNote">Refresh the page to play again</p>
        </div>
      `;
    }
  }, 1000);
}

function makeBubble() {
  clutter = ""; // Clear clutter before adding new bubbles
  for (let i = 0; i <= 407; i++) {
    let rn = Math.floor(Math.random() * 10);
    clutter += ` <div class="bubble">${rn}</div>`;
  }

  document.querySelector(".playArea").innerHTML = clutter;
}

// Initialize the game
hitVal();
makeBubble();
timer();
