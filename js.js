// const Cell = () => {
//   let value = 0;

//   const markCell = (player) => {
//     value = player;
//   };
//   const getValue = () => value;

//   return { markCell, getValue };
// };

const Player = (name, mark) => {
  this.name = name;
  this.mark = mark;

  const getMark = () => mark;
  const getName = () => name;
  return { getMark, getName };
};

const Gameboard = (() => {
  const emptyCell = Player("", "");
  const array = [
    [emptyCell, emptyCell, emptyCell],
    [emptyCell, emptyCell, emptyCell],
    [emptyCell, emptyCell, emptyCell],
  ];

  const getBoard = () => array;

  // const markBoard = (player) => {
  //   const divCells = document.querySelectorAll(".divCell");

  //   divCells.forEach((e) => {
  //     e.addEventListener("click", (divCell) => {
  //       // console.log(divCell.target.dataset.column);
  //       const boardArray = Gameboard.getBoard();
  //       boardArray[divCell.target.dataset.row][divCell.target.dataset.column] =
  //         player;
  //       e.innerHTML =
  //         boardArray[divCell.target.dataset.row][
  //           divCell.target.dataset.column
  //         ].getMark();
  //     });
  //   });
  // };

  // const addArray = (player, row, column) => {
  //   if (array[row][column].getValue() === null) {
  //     array[row][column] = player;
  //   }
  // };

  const renderBoard = () => {
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("container-gameboard");
    boardContainer.style.width = "300px";
    boardContainer.style.height = "300px";

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < array.length; i++) {
      const divRow = document.createElement("div");
      divRow.classList.add("divRow");
      divRow.style.display = "grid";
      divRow.style.gridTemplateColumns = "1fr 1fr 1fr";
      divRow.style.height = "100px";
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < array.length; j++) {
        const divCell = document.createElement("div");
        divCell.classList.add("divCell");
        divCell.dataset.row = i;
        divCell.dataset.column = j;
        divCell.style.border = "solid";
        divRow.appendChild(divCell);
      }
      boardContainer.appendChild(divRow);
    }
    document.getElementById("gameboard").appendChild(boardContainer);
  };

  return { getBoard, renderBoard };
})();

const GameController = (() => {
  const player1 = Player("Player1", "X");
  const player2 = Player("Player2", "O");
  let currentPlayer;
  currentPlayer = player1;

  const continueBtn = document.querySelector(".continue");
  const endGameBtn = document.querySelector(".exit");
  const endMenu = document.querySelector(".endMenu");

  const changePlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkWin = () => {
    const rowCombo = [
      [0, 0, 0],
      [1, 1, 1],
      [2, 2, 2],
      [0, 1, 2],
      [0, 1, 2],
      [0, 1, 2],
      [0, 1, 2],
      [2, 1, 0],
    ];
    const columnCombo = [
      [0, 1, 2],
      [0, 1, 2],
      [0, 1, 2],
      [0, 0, 0],
      [1, 1, 1],
      [2, 2, 2],
      [0, 1, 2],
      [0, 1, 2],
    ];

    for (let i = 0; i < 8; i += 1) {
      if (
        Gameboard.getBoard()[rowCombo[i][0]][columnCombo[i][0]].getName() ===
          Gameboard.getBoard()[rowCombo[i][1]][columnCombo[i][1]].getName() &&
        Gameboard.getBoard()[rowCombo[i][1]][columnCombo[i][1]].getName() ===
          Gameboard.getBoard()[rowCombo[i][2]][columnCombo[i][2]].getName() &&
        Gameboard.getBoard()[rowCombo[i][0]][columnCombo[i][0]].getName() !== ""
      ) {
        document.querySelector(".winner").textContent = `${Gameboard.getBoard()[
          rowCombo[i][0]
        ][columnCombo[i][0]].getName()} Wins`;

        return true;
      }
    }
    return false;
  };
  const checkTie = () => {
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        if (Gameboard.getBoard()[i][j].getName() === "") return false;
      }
    }
    document.querySelector(".winner").textContent = ` Its a Tie!`;
    return true;
  };

  const popUp = () => {
    endMenu.classList.remove("notShow");
  };

  const blurBackground = () => {
    const containerMain = document.querySelector(".container-main");
    containerMain.classList.add("blur");
  };

  const MarkCell = () => {
    const divCells = document.querySelectorAll(".divCell");
    divCells.forEach((e) => {
      e.addEventListener("click", (divCell) => {
        // console.log(divCell.target.dataset.column);

        const boardArray = Gameboard.getBoard();
        if (
          boardArray[divCell.target.dataset.row][
            divCell.target.dataset.column
          ].getName() === ""
        ) {
          boardArray[divCell.target.dataset.row][
            divCell.target.dataset.column
          ] = currentPlayer;
          e.innerHTML =
            boardArray[divCell.target.dataset.row][
              divCell.target.dataset.column
            ].getMark();
          changePlayer();
          checkWin();
          if (checkWin()) {
            blurBackground();
            popUp();
          }
          if (checkTie()) {
            blurBackground();
            popUp();
          }
        }
      });
    });
  };

  const gameOver = () => {
    endGameBtn.addEventListener("click", () => {
      const gameOverDiv = document.createElement("div");
      gameOverDiv.classList.add("gameOver");
      gameOverDiv.textContent = "Game Over";
      document.body.appendChild(gameOverDiv);
    });
  };

  const playAgain = () => {
    continueBtn.addEventListener("click", () => {
      // hide end menu
      endMenu.classList.add("notShow");
      // resetboardArray
      const boardArray = Gameboard.getBoard();
      for (let i = 0; i < 3; i += 1) {
        boardArray[i] = [];
        for (let j = 0; j < 3; j += 1) {
          boardArray[i].push(Player("", ""));
          console.log("cell reset");
        }
      }
      // reset divCells
      const divCells = document.querySelectorAll(".divCell");
      divCells.forEach((e) => {
        e.innerHTML = "";
        console.log("Cell emptied");
      });
    });
  };

  const playRound = () => {
    Gameboard.renderBoard();
    MarkCell();
    gameOver();
    playAgain();
  };

  return { playRound };
})();

GameController.playRound();
