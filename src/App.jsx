import { useState } from "react";
import "./App.css";
import Square from "./components/Square";
import { useEffect } from "react";
import { Patterns } from "./components/Pattern";
import WinnerScreen from "./components/WinnerScreen";

// game sounds initialize
const click = new Audio("./click.mp3");
const gameWinnerSound = new Audio("./win.wav");
const restartSound = new Audio("./restart.wav");

// game sound functions
const clickPlay = () => {
  click.play();
};

const gameWinner = () => {
  gameWinnerSound.play();
};

const gameRestart = () => {
  restartSound.play();
};

const App = () => {
  // box index
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  // player turn
  const [player, setPlayer] = useState("O");
  // result
  const [result, setResult] = useState({ winner: "none", state: "none" });
  // checkwin
  const [won, setWin] = useState(false);

  useEffect(() => {
    checkWin();
    checkIfTie();
    if (player == "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board]);

  // render winner
  useEffect(() => {
    if (result.state != "none") {
      setWin(true);
      gameWinner();
      // alert(`Game Finished! Winning Player: ${result.winner}`);
    }
  }, [result]);

  // handling click on box
  const handleClick = (square) => {
    clickPlay();
    setBoard(
      board.map((val, idx) => {
        if (idx == square && val == "") {
          return player;
        }
        return val;
      })
    );
  };

  // checking winners
  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({ winner: player, state: "Won" });
      }
    });
  };

  // restart
  const restartGame = () => {
    gameRestart();
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setWin(!won);
    setPlayer("O");
  };

  // checking for tie
  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "No One", state: "Tie" });
    }
  };

  return (
    <div className="App">
      <div className="board">
        <h1 className="title">
          Let's Play <br /> Tic Tac Toe
        </h1>
        <div className="row">
          <Square chooseSquare={() => handleClick(0)} val={board[0]} />
          <Square chooseSquare={() => handleClick(1)} val={board[1]} />
          <Square chooseSquare={() => handleClick(2)} val={board[2]} />
        </div>
        <div className="row">
          <Square chooseSquare={() => handleClick(3)} val={board[3]} />
          <Square chooseSquare={() => handleClick(4)} val={board[4]} />
          <Square chooseSquare={() => handleClick(5)} val={board[5]} />
        </div>
        <div className="row">
          <Square chooseSquare={() => handleClick(6)} val={board[6]} />
          <Square chooseSquare={() => handleClick(7)} val={board[7]} />
          <Square chooseSquare={() => handleClick(8)} val={board[8]} />
        </div>
        {/* {!won ? (
          <button onClick={restartGame} style={{ marginTop: "20px" }}>
            Restart
          </button>
        ) : null} */}
      </div>
      {won ? (
        <WinnerScreen playerWon={result.winner} restartGame={restartGame} />
      ) : null}
    </div>
  );
};

export default App;
