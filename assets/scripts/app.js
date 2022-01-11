const listWord = [
  ["Hangman", "That game you are playing right now."],
  ["Thomas Hj", "About the creator of this game."],
  ["HTML", "Markup language for creating Web pages."],
  ["CSS", "Wep page styles"],
  ["PHP", "A very popular server scripting language."],
  ["JavaScript", "Make web-page dynamic without reload the web page."],
  [
    "Java",
    "Run 15 billion devices.\nA program can be run in Windows, Linux and Mac",
  ],
  ["SoloLearn", "A company that everyone can code for fun and share."],
  ["Love", "What is ?\nBaby don't hurt me\nDon't hurt me\nNo more"],
  ["Document", "A lot of text in the a file."],
  ["Playground", "There school kids go to."],
  ["Run", "Usain bolt."],
  ["Code", "var hw = 'Hello World';"],
  ["Samsung", "A company create Phone, Tv, Monitor, SDD, Memory chip..."],
  ["Super Mario", "A very popular game in Nintendo 64 that have red hat."],
  ["Star", "Super Mario like to get."],
  ["Clock", "14:12 or 14pm"],
  ["Binary Clock", "A clock that only use 0 or 1."],
  ["Sword", "Link from Zelda have on the hand."],
  ["Girl", "Not boy but ?"],
  ["Boy", "Not girl but ?"],
  ["Female", "Other name as girl."],
  ["Male", "Other name as boy."],
  ["Smartphone", "Something you've always on you."],
];

const [word, tips] =
  listWord[Math.trunc(Math.random() * (listWord.length - 1))];

let playerFalse = 0;
let playerTrue = 0;

// console.log(word);

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
  }
};

// **THIS BE SHOULD DELETE**
const playerModel = () => {
  ++playerFalse;
  switch (playerFalse) {
    case 1:
      document.querySelector("#g0").setAttribute("data", "true");
      break;

    case 2:
      document.querySelector("#g1").setAttribute("data", "true");
      break;

    case 3:
      document.querySelector("#g2").setAttribute("data", "true");
      break;

    case 4:
      document.querySelector("#g3").setAttribute("data", "true");
      hint();
      break;

    case 5:
      document.querySelector("#g4").setAttribute("data", "true");
      break;

    case 6:
      document.querySelector("#g5").setAttribute("data", "true");
      break;

    case 7:
      document.querySelector("#g5").setAttribute("l", "true");
      break;

    case 8:
      document.querySelector("#g5").setAttribute("r", "true");
      break;

    case 9:
      document.querySelector("#g6").setAttribute("data", "true");
      document.querySelector("#g6").setAttribute("l", "true");
      break;

    case 10:
      document.querySelector("#g6").setAttribute("r", "true");
      endGame(false);
      break;
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

//END GAME
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

playBtn.addEventListener("click", startGame);
