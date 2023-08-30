import React, { useState } from "react";
import "./App.css";

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // console.log(lines[i]);
      return squares[a];
    }
  }

  return null;
};

const Square = ({ value, onSquareClick }) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

const Board = ({ xIsNext, squares, onPlay }) => {
  const winner = calculateWinner(squares);
  console.log(squares);
  console.log(winner);
  let draw = 1;

  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) draw = 0;
  }

  let status;

  if (winner) {
    status = "WINNER : " + winner;
  } else if (winner == null && draw) {
    status = "GAME DRAW !";
  } else {
    status = "NEXT PLAYER : " + (xIsNext ? "X" : "O");
  }

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = [...squares];

    if (xIsNext) nextSquares[i] = "X";
    else nextSquares[i] = "O";
    onPlay(nextSquares);
  };

  return (
    <div className="wrapper">
      <div className="status">{status}</div>
      <div className="board_row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board_row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board_row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
};

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currMove, setCurrMove] = useState(0);
  const xIsNext = currMove % 2 === 0;
  const curr_square = history[currMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrMove(nextMove);
  };
  // console.log(history);
  const moves = history.map((squares, move) => {
    let msg;

    if (move > 0) msg = "Go to Move # " + move;
    else msg = "Go to Game Start";

    return (
      <li key={move}>
        <button className="msg" onClick={() => jumpTo(move)}>
          {msg}
        </button>
      </li>
    );
  });

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrMove(0);
  };

  return (
    <React.Fragment>
      <div className="game">
      <h1 className="heading">TIC TAC TOE</h1>

        <div className="game-board">
          <div>
            <Board
              xIsNext={xIsNext}
              squares={curr_square}
              onPlay={handlePlay}
            />
            <button className="reset-game" onClick={resetGame}>
              Reset Game
            </button>
          </div>
          <div>
            <div className="game-info">
              <ol>{moves}</ol>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Game;
