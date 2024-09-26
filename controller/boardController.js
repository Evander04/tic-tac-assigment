const Board = require('../model/boardModel')
//Initial state
const initialBoard = Array(9).fill(null);
const localNext = true;
const winner = "";

const initGame = (req,res)=>{
    res.status(200).json({
        board: initialBoard,
        localNext,
        winner,
    })
}
// Helper function to determine the winner
const calculateWinner = (board) =>{
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
  
    return null;
}
  
module.exports = {
    initGame
}