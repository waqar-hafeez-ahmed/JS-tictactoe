// let turnAudio = new Audio("ting.mp3");
let music = new Audio("music.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isGameover = false;
var x = window.matchMedia("(max-width: 800px)");

// to change player turn
const changeTurn = () => {
  turn === "X" ? (turn = "0") : (turn = "X");
};

// to check the winner
const checkWin = () => {
  let checkBox = document.getElementsByClassName("boxtext");
  //   we will create all possible win grids
  let wins = [
    [0, 1, 2, 2.5, 5, 0, 9, 0],
    [3, 4, 5, 2.5, 15, 0, 30, 3],
    [6, 7, 8, 2.5, 25, 0, 50, 6],
    [0, 3, 6, -7.5, 15, 90, 30, -17.5],
    [1, 4, 7, 2.5, 15, 90, 30, 2.5],
    [2, 5, 8, 12.5, 15, 90, 30, 22.5],
    [0, 4, 8, 2.5, 15, 45, 27, 0],
    [2, 4, 6, 2.5, 15, 135, 30, 2],
  ];

  //  We will receive an ARRAY of class "boxtext". Now we will compare!! Innertext of checkbox ( first element of any possiblity, as e[0] will return first element of possiblity and it will become checkBox[0] in first case and visevera.)
  //  And we will check if innertext is not empty. camparing one will compare all.
  wins.forEach((e) => {
    if (
      checkBox[e[0]].innerText === checkBox[e[1]].innerText &&
      checkBox[e[2]].innerText === checkBox[e[1]].innerText &&
      checkBox[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        checkBox[e[0]].innerText + " Won";
      isGameover = true;
      document
        .querySelector(".imgbox")
        .getElementsByTagName("img")[0].style.width = "200px";
      if (x.matches) {
        document.querySelector(
          ".line"
        ).style.transform = `translate(${e[7]}vw, ${e[6]}vw ) rotate(${e[5]}deg)`;
        document.querySelector(".line").style.width = "55vw";
      } else {
        document.querySelector(
          ".line"
        ).style.transform = `translate(${e[3]}vw, ${e[4]}vw ) rotate(${e[5]}deg)`;
        document.querySelector(".line").style.width = "25vw";
      }
      gameover.play();
      music.play();
    }
  });
};

//  Logic of the game.
let boxes = document.getElementsByClassName("box");
// it will create array of all elements with classname box.
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");

  element.addEventListener("click", () => {
    if (!isGameover) {
      if (boxtext.innerText === "") {
        boxtext.innerText = turn;
        changeTurn();
        let info = document.getElementsByClassName("info")[0];
        checkWin();
        if (!isGameover) {
          info.innerText = "Turn for " + turn;
        }
        //to play audio when click on a cell
        let turnAudio = new Audio("ting.mp3");
        turnAudio.play();
      }
    }
  });
});

// Add reset logics.
let reset = document.getElementById("reset");
reset.addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");

  Array.from(boxtexts).forEach((elements) => {
    elements.innerText = "";
  });

  turn = "X";
  music.pause();
  isGameover = false;
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width =
    "0px";
  document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
  document.querySelector(".line").style.width = "0";
});
