let boxes = document.querySelectorAll(".js-box");
let resetBtn = document.querySelector(".js-reset-btn");
let newBtn = document.querySelector(".js-new-btn");
let msgContainer = document.querySelector(".js-messageContainer");
let msg = document.querySelector(".msg");

let turnO = true; // PlayerX, PlayerO

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals  
];

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("O", "X"); // Remove color classes
  }
};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const checkDraw = () => {
  // Count filled boxes
  let filledBoxes = 0;
  for (let box of boxes) {
    if (box.innerText !== "") {
      filledBoxes++;
    }
  }
  // If all boxes are filled and no winner, it's a draw
  if (filledBoxes === 9) {
    return true;
  }
  return false;
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true; // Return true if there's a winner
      }
    }
  }
  return false; // Return false if no winner
};

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (turnO) {
      box.innerText = "O";
      box.classList.add("O"); // Add the class "O" for color
      turnO = false;
    } else {
      box.innerText = "X";
      box.classList.add("X"); // Add the class "X" for color
      turnO = true;
    }
    box.disabled = true;
    if (checkWinner()) {
      // If there's a winner, disable boxes and show winner message
      disableBoxes();
    } else if (checkDraw()) {
      // If it's a draw, show draw message
      gameDraw();
    }
  });
});

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
