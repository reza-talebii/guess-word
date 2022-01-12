const startGame = () => {
  //CHECK = USER COMPLETE GAME
  if (listWord.length < 1) {
    completeGame();
  } else {
    document.querySelector("#home").classList.add("h");
    //DELETE SPACE
    word = word.split(" ").join("");
    creatKeyboard();
    creatWordItem();
  }
};

//CREAT KEYBOARD
const creatKeyboard = () => {
  const keyboard = document.querySelector("#keybord");
  //RESET CONTENT
  keyboard.innerHTML = "";

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
  let itemID = 0;
  const letter = document.querySelector("#letter");
  //RESET LETTER
  letter.innerHTML = "";
  console.log(word);
  word.split("").map(() => {
    const item = document.createElement("span");
    item.id = itemID++;
    item.className = "l";
    item.innerHTML = "&nbsp";
    letter.append(item);
  });

  userGuess();
};

//USER CHOSE WORD
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
  if (playerFalse++ < 9) {
    //SHOW HINT
    if (playerFalse == 4) hint();
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
  exit.addEventListener("click", () => {
    hintBtn.setAttribute("data", true);
    hintContainer.style.display = "none";
  });
};

//END GAME
const endGame = (status) => {
  resultContent.classList.remove("h");
  resultContent.setAttribute("data", status);

  if (status) {
    title.innerHTML = "شما بردید!";
    body.innerHTML = `تبریک میگم, شما کلمه رو پیدا کردید! <br/> کارت عالی بود!`;
  } else {
    title.innerHTML = "شما باختید!";
    body.innerHTML = `اون کلمه بود <br/> "${word}" <br/>تلاش بهتری کنید .`;
  //NEXT WORD
  tryAgainBtn.addEventListener("click", () => {
    resultContent.classList.add("h");
    resetGame();
  });
};

//IF USER WIN SHOW THAT NEXT WORD
const resetGame = () => {
  //RESET WORD & TIPS
  const nextWord = () => {
    try {
      //********bug******* */
      [word, tips] =
        listWord[Math.trunc(Math.random() * (listWord.length - 1))];
    } catch (error) {
      console.log(error);
    }
  };
  //RESET HINT
  const resetHint = () => {
    const hintBtn = document.querySelector("#hintButton");
    hintBtn.setAttribute("data", false);
  };
  //RESET PLAYER POINT
  const resetPoint = () => {
    playerFalse = 0;
    playerTrue = 0;
  };
  //RESET FIGURE
  const resetFigure = () => {
    const figures = document.querySelectorAll(".figure-part");
    figures.forEach((figure) => (figure.style.display = "none"));
  };
  deletePrevWord();
  nextWord();
  resetHint();
  resetPoint();
  resetFigure();
  startGame();
};

//DELETE PREV WORD
const deletePrevWord = () => {
  listWord.map((Iterable, index) => {
    Iterable.map((w) => {
      if (w == word) listWord.splice(index, 1);
    });
  });
};

//COMPLETE GAME
const completeGame = () => {
  resultContent.classList.remove("h");
  resultContent.setAttribute("data", "true");
  title.innerHTML = "شما بازی رو تمام کردید!";
  body.innerHTML = `تبریک میگم, شما کلمه رو پیدا کردید! <br/> کارت عالی بود!`;
  tryAgainBtn.addEventListener("click", () => window.location.reload());
};
