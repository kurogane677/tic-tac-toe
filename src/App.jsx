import { useState } from "react";

//Creatae square component
// eslint-disable-next-line react/prop-types
const Square = ({ value, onSquareClick }) => {
  // Lifting State up
  // Memindahkan state ke parent komponen
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(x) {
    if (squares[x] || calculateWinnter(squares)) return;
    // Bikin array yang bernilai sama seperti squares
    const nextSquares = squares.slice();
    nextSquares[x] = xIsNext ? "X" : "O";

    onPlay(nextSquares);
  }

  const winner = calculateWinnter(squares);
  let status = winner
    ? `Winner ${winner}`
    : `Next player ${xIsNext ? "X" : "O"}`;

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  // Buat array dalam array 9 buah yang diisi null
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    // Menambah duplikat array dari History, dan menambahkan array baru di akhir
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description = "";
    if (move > 0) {
      description = `Go to Move #${move}`;
    } else {
      description = "Go To Start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Logika
function calculateWinnter(squares) {
  // Aturan menang
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
    // Destruction object
    const [satu, dua, tiga] = lines[i];

    if (
      squares[satu] &&
      squares[satu] === squares[dua] &&
      squares[satu] === squares[tiga]
    ) {
      return squares[satu];
    }
  }
  return false;
}
