// import { useState } from "react";
// import "./App.css"
// import Board from './Components/Board'
// import Square from "./Components/Square";
// function App() {
//   const [history, setHistory] = useState([{squares: Array(9).fill(null)}])
//   const [xIsNext, setXIsNext] = useState(true);

//   const calculatedWinners = (squares) =>{
//     const lines =[
//       [0, 1, 2], 
//       [3, 4, 5], 
//       [6, 7, 8], 
//       [0, 3, 6], 
//       [1, 4, 7], 
//       [2, 5, 8], 
//       [0, 4, 8],
//       [2, 4, 6]    
//     ];

//     for (let i = 0; i < lines.length; i++) {
//       const [a, b, c] = lines[i];
//       if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//         return squares[a];
//       } 
//     }none !impornone !important; !important;
//     return null;
//   }

//   const current = history[history.length  -1];
//   const winner = calculatedWinners(current.Squares);

//   let status;
  
//   if(winner) {
//     status = 'winner : '+winner; 
//   }else{
//     status = `Next player ${xIsNext? 'X' : 'O'}`  
//   }
  
//   const handleClick = (i) => {
//     const newSquares = current.Squares.slice();
//     if(calculatedWinners(newSquares) || newSquares[i]) {
//       return;
//   }

//   newSquares[i] = xIsNext? 'X' : 'O'; 
//   setHistory(...history, {Squares: newSquares});
//   setXIsNext(prev =>!prev);
//   }



//   return (
//     <div className="game">
//       <div className="game-board">
//       <Board Squares={current.squares} onClick = {(i)=> handleClick(i)}/>
//       </div>
//       <div className="game-info"> 
//       <div className='status'>{status}</div>
//       </div>
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import "./App.css";
import Board from './Components/Board';

function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const calculatedWinners = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };
  
  const current = history[stepNumber];
  const winner = calculatedWinners(current.squares);
  
  let status;
  
  if (winner) {
    status = 'winner : ' + winner;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice();
    if (calculatedWinners(newSquares) || newSquares[i]) {
      return;
    }

    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, { squares: newSquares }]);
    setXIsNext(prev => !prev);
    setStepNumber(newHistory.length);
  };

  
  const moves = history.map((step, move) => {
    const desc = move?
    'Go to move #' + move :
    'Go to game start';
    return (
      <li key={move}>
        <button className="move-button" onClick={()=>jumpTo(move)}>{desc}</button>
      </li>
    )  
  })
  
  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    // 이동하는 step이 X인가 O인가를 확인
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className='status'>{status}</div>
        <ol style={{listStyle : 'none'}}>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
