const Board = require('../model/boardModel')
//Initial state
const initialBoard = Array(9).fill(null);
const initialLocalNext = true;
const initialWinner = "";

const initGame = (req,res)=>{
    res.status(200).json({
        board: initialBoard,
        localNext:initialLocalNext,
        winner:initialWinner,
    })
}
const move = (req,res)=>{
    const {board,localNext,index} = req.body;    
        
    // Return if the square is already filled
    if (board[index]){
        console.log("winner");
        res.status(200).json({
            board: board,
            localNext:localNext,
            winner:null,
        });
        return; 
    } 

    //Response with new board
    const newBoard = board.slice();
    newBoard[index] = localNext ? 'X' : 'O';
    const winner = calculateWinner(newBoard);

    res.status(200).json({
        board: newBoard,
        localNext:!localNext,
        winner:winner,
    });
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
    initGame,
    move
}