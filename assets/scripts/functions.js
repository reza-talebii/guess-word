const startGame = () => {
  document.querySelector("#home").classList.add("h");
  creatKeyboard();
  creatWordItem();
};

//CREAT KEYBOARD
const creatKeyboard = () => {
  const keyboard = document.querySelector("#keybord");

  for (let index = 97; index < 123; index++) {
    const key = document.createElement("span");
    key.className = "b";
    key.setAttribute("data", "");
    key.innerHTML = String.fromCharCode(index);
    keyboard.append(key);
  }
};

//CREAT WORD ITEM
const creatWordItem = () => {
  const letter = document.querySelector("#letter");
  let itemID = 0;

  word.split("").map(() => {
    const item = document.createElement("span");
    item.id = itemID++;
    item.className = "l";
    item.innerHTML = "&nbsp";
    letter.append(item);
  });

  userGuess();
};

//USER CHOSE
const userGuess = () => {
  const keyWordBtn = document.querySelectorAll(".b");

  keyWordBtn.forEach((key) => {
    key.addEventListener("click", (e) => {
      const clicked = e.target;
      let trueOrFalse = 0;

      //CHECK = If the guess was more than once in the word
      word.split("").forEach((w) => {
        if (w.toLowerCase().includes(clicked.innerHTML.toLowerCase()))
          trueOrFalse += 1;
      });

      trueORfalse(trueOrFalse, clicked);
    });
  });
};

//TRUE & FALSE USER CHOSE
const trueORfalse = (number, clicked) => {
  if (number) {
    playerTrue += number;

    //CHECK = IS PLAYER WIN ?
    if (word.length == playerTrue) endGame(true);

    //ADD TRUE WORD GUESS IN THE ITEM WORD   */
    !(function () {
      const itemsWord = document.querySelectorAll(".l");
      const wordGuess = clicked.innerHTML.toLowerCase();
      clicked.setAttribute("data", true);

      word.split("").map((w, index) => {
        if (w.toLowerCase() == wordGuess) itemsWord[index].innerHTML = w;
      });
    })();
  } else {
    clicked.setAttribute("data", false);
    showFigure();
  }
};

// SHOW FIGURE PART
const showFigure = () => {
  //CHECK END USER CHANCE
  if (playerFalse < 9) {
    ++playerFalse;
    const figurePart = document.querySelector(
      `.figure-part[data-show="${playerFalse}"]`
    );
    figurePart.style.display = "block";
  } else {
    endGame(false);
  }
};

//HINT
const hint = () => {
  const hintBtn = document.querySelector("#hintButton");
  const hintContainer = document.querySelector("#hint");
  hintBtn.setAttribute("data", true);
  //SHOW HINT & TIPS
  hintBtn.addEventListener("click", () => {
    hintContainer.style.display = "block";
    hintContainer.querySelector("#hintText").innerHTML = tips;
  });
  //CLOSE HINT
  const exit = document.querySelector(".exit");
  exit.addEventListener("click", (e) => {
    hintBtn.setAttribute("data", true);
    hintContainer.style.display = "none";
  });
};

//***********EDIT**************
const endGame = (status) => {
  const resultContent = document.querySelector("#result");
  const title = resultContent.querySelector(".title");
  const body = resultContent.querySelector(".body");
  const tryAgainBtn = resultContent.querySelector(".button");

  resultContent.classList.remove("h");
  resultContent.setAttribute("data", status);

  if (status) {
    title.innerHTML = "You Win!";
    body.innerHTML = `Congratulations, you found the word! <br/> Good Job!`;
  } else {
    title.innerHTML = "You Lose!";
    body.innerHTML = `CThe word was <br/> "${word}" <br/> Better luck next time.`;
  }
  //   tryAgainBtn.addEventListener("click", () => window.location.reload());
};
